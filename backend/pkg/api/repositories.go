package api

import (
	"encoding/json"
	"net/http"

	"github.com/flacatus/qe-dashboard-backend/pkg/api/apis/github"
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
	GithubActions github.GitHubActionsResponse `json:"actions_jobs"`
}

type CoverageSpec struct {
	CodeCoverage json.Number `json:"code_coverage"`
}

type Repos struct {
	GitOrganization string         `json:"git_organization"`
	RepositoryName  string         `json:"repository_name"`
	Description     string         `json:"description"`
	Jobs            JobSpec        `json:"jobs"`
	Artifacts       []ArtifatcSpec `json:"artifacts"`
	Coverage        CoverageSpec   `json:"coverage"`
}

// Version godoc
// @Summary Quality Repositories
// @Description returns all repository information founded in server configuration
// @Tags HTTP API
// @Produce json
// @Router /quality/repositories [get]
// @Success 200
func (s *Server) repositoriesHandler(w http.ResponseWriter, r *http.Request) {
	// set a value with a cost of 1
	repoList, found := s.cache.Get(RepositoryCacheKey)
	if !found {
		s.JSONResponse(w, r, ErrorResponse{
			Message:    "Failed to obtain repositories infromation from cache",
			StatusCode: 500,
		})
	}
	s.JSONResponse(w, r, repoList)
}
