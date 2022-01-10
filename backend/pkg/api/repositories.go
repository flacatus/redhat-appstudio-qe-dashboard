package api

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"reflect"
	"time"

	"github.com/flacatus/qe-dashboard-backend/config"
	"github.com/flacatus/qe-dashboard-backend/pkg/api/apis/github"
	"github.com/flacatus/qe-dashboard-backend/pkg/storage"
)

type SecurityScannerSpec struct {
	Vulnerabilities int64 `json:"vulnerabilities"`
}

type ArtifatcSpec struct {
	ArtifactName    string              `json:"artifact_name"`
	QuayRepo        string              `json:"quay_repo"`
	SecurityScanner SecurityScannerSpec `json:"security_scanner"`
}

type JobSpec struct {
	GithubActions github.GitHubActionsResponse `json:"github_actions"`
}

type CoverageSpec struct {
	CodeCoverage json.Number `json:"code_coverage"`
}

type Repos struct {
	GitOrganization string         `json:"git_organization"`
	RepositoryName  string         `json:"repository_name,omitempty"`
	HTMLUrl         string         `json:"html_url,omitempty"`
	Description     string         `json:"description,omitempty"`
	Jobs            JobSpec        `json:"jobs,omitempty"`
	Artifacts       []ArtifatcSpec `json:"artifacts"`
	Coverage        CoverageSpec   `json:"coverage,omitempty"`
}

// Version godoc
// @Summary Quality Repositories
// @Description returns all repository information founded in server configuration
// @Tags HTTP API
// @Produce json
// @Router /api/quality/repositories [get]
// @Success 200
func (s *Server) repositoriesHandler(w http.ResponseWriter, r *http.Request) {
	// set a value with a cost of 1
	repoList, _ := s.cache.Get(RepositoryCacheKey)
	repo, err := s.config.Storage.CreateRepository(storage.Repository{
		RepositoryName:  "e2e-tests",
		GitOrganization: "redhat-appstudio",
		Description:     "NULL",
		GitURL:          "NULL",
	})
	if err != nil {
		s.ErrorResponse(w, r, "Failed to obtain repositories. There are no repository cached", 500)
	}
	err = s.config.Storage.CreateCoverage(storage.Coverage{
		RepositoryName:  "e2e-tests",
		GitOrganization: "redhat-appstudio",
	}, repo.ID)
	if err != nil {
		s.ErrorResponse(w, r, "Failed to obtain repositories. There are no repository cached", 500)
	}
	fmt.Println(err)
	if reflect.ValueOf(repoList).IsNil() {
		s.ErrorResponse(w, r, "Failed to obtain repositories. There are no repository cached", 500)
	} else {
		s.JSONResponse(w, r, repoList)
	}
}

// Version godoc
// @Summary Quality Repositories
// @Description returns all repository information founded in server configuration
// @Tags HTTP API
// @Produce json
// @Router /api/quality/repositories/create [post]
// @Success 200
func (s *Server) repositoriesCreateHandler(w http.ResponseWriter, r *http.Request) {
	var repos config.GitRepository
	var cfg config.ConfigSpec

	json.NewDecoder(r.Body).Decode(&repos)

	repoList, found := s.cache.Get("config")
	if !found {
		s.logger.Sugar().Errorf("Failed to initialize cache")
		s.ErrorResponse(w, r, "Failed to obtain repositories. There are no repository cached", 500)
	}
	cacheRepos, err := json.Marshal(repoList)
	if err != nil {
		s.logger.Sugar().Errorf("Failed to initialize cache")
		s.ErrorResponse(w, r, "Failed to obtain repositories. There are no repository cached", 500)
	}
	err = json.Unmarshal(cacheRepos, &cfg)

	if err != nil {
		s.logger.Sugar().Errorf("Failed to initialize cache")
		s.ErrorResponse(w, r, "Failed to obtain repositories. There are no repository cached", 500)
	}

	cfg.Spec.Git = append(cfg.Spec.Git, repos)

	s.cache.Set("config", cfg, 1)

	str := staticRotationStrategy()
	s.startUpdateCache(context.TODO(), str, time.Now)

	s.JSONResponse(w, r, repos)
}
