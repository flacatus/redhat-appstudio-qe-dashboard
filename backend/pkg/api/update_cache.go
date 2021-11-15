package api

import (
	"context"
	"time"

	"github.com/flacatus/qe-dashboard-backend/config"
	"github.com/flacatus/qe-dashboard-backend/pkg/api/apis/codecov"
	"github.com/flacatus/qe-dashboard-backend/pkg/api/apis/github"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

var RepositoryCacheKey = "repositories"

// rotationStrategy describes a strategy for generating cryptographic keys, how
// often to rotate them, and how long they can validate signatures after rotation.
type rotationStrategy struct {
	// Time between rotations.
	rotationFrequency time.Duration
}

// startUpdateCache begins repo information rotation in a new goroutine, closing once the context is canceled.
func (s *Server) startUpdateCache(ctx context.Context, strategy rotationStrategy, now func() time.Time) {
	// Try to rotate immediately so properly configured repositories.
	if err := s.rotate(); err != nil {
		s.logger.Sugar().Infof("Update failed: %v", err)
	}

	go func() {
		for {
			select {
			case <-ctx.Done():
				return
			case <-time.After(time.Second * 30):
				if err := s.rotate(); err != nil {
					s.logger.Sugar().Infof("failed to update cache: %v", err)
				}
			}
		}
	}()
}

func (s *Server) rotate() error {
	qualityInformation, err := s.CacheRepositoriesInformation()
	if err != nil {
		s.logger.Sugar().Errorf("Failed to update cache", zap.Error(err))
		return err
	}

	// set a value with a cost of 1
	s.cache.Set(RepositoryCacheKey, qualityInformation, 1)

	// wait for value to pass through buffers
	s.cache.Wait()

	return nil
}

// staticRotationStrategy returns a strategy which never rotates keys.
func staticRotationStrategy() rotationStrategy {
	return rotationStrategy{
		// Setting these values to 4 hours is easier than having a flag indicating no rotation.
		rotationFrequency: time.Minute * 10,
	}
}

func (s *Server) CacheRepositoriesInformation() (repos []Repos, err error) {
	gh := github.NewGitubClient()
	codecov := codecov.NewCodeCoverageClient()

	cfg, err := config.GetServerConfiguration(viper.GetString("config-file"))
	if err != nil {
		s.logger.Sugar().Errorf("Failed to obtain configuration from file", zap.Error(err))
		return repos, err
	}
	for _, repo := range cfg.ConfigSpec.Spec.Git {
		s.logger.Sugar().Infof("Obtaining quality information for organization %s from repository %s", repo.GitOrganization, repo.GitRepository)

		repoInfo, err := gh.GetRepositoriesInformation(repo.GitOrganization, repo.GitRepository)
		if err != nil {
			s.logger.Sugar().Errorf("Failed to obtain information from Github", zap.Error(err), zap.String("organization", repo.GitOrganization), zap.String("repository", repo.GitRepository))
			return repos, err
		}

		codecov, err := codecov.GetCodeCovInfo(repo.GitOrganization, repo.GitRepository)
		if err != nil {
			s.logger.Sugar().Errorf("Failed to obtain information from Codecov", zap.Error(err), zap.String("organization", repo.GitOrganization), zap.String("repository", repo.GitRepository))
			return repos, err
		}

		workflows, err := gh.GetRepositoryWorkflows(repo.GitOrganization, repo.GitRepository)
		if err != nil {
			s.logger.Sugar().Errorf("Failed to obtain workflows information", zap.Error(err), zap.String("organization", repo.GitOrganization), zap.String("repository", repo.GitRepository))
			return repos, err
		}

		repos = append(repos, Repos{
			GitOrganization: repo.GitOrganization,
			RepositoryName:  repoInfo.RepositoryName,
			Description:     repoInfo.Description,
			Coverage: CoverageSpec{
				CodeCoverage: codecov.Commit.Totals.TotalCoverage,
			},
			Jobs: JobSpec{
				GithubActions: workflows,
			},
			Artifacts: []ArtifatcSpec{},
		})
	}

	return repos, err
}
