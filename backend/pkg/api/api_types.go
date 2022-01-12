package api

type GithubActionsSpec struct {
	Monitor bool `json:"monitor"`
}

type OpenshiftCISpec struct {
	Monitor bool `json:"monitor"`
}

type CIAnalyzerCoverageSpec struct {
	GitHubActions GithubActionsSpec `json:"actions"`
	OpenshiftCI   OpenshiftCISpec   `json:"openshiftCI"`
}

type JobSpec struct {
	GitHubActions GithubActionsSpec `json:"github_actions"`
	OpenshiftCI   OpenshiftCISpec   `json:"openshift_ci"`
}

type GitRepositoryRequest struct {
	GitOrganization string   `json:"git_organization"`
	GitRepository   string   `json:"repository_name"`
	Jobs            JobSpec  `json:"jobs"`
	Artifacts       []string `json:"artifacts"`
}

// ErrorResponse Represents an error.
type ErrorResponse struct {

	// The error message.
	// Required: true
	Message string `json:"message"`

	// The error message.
	// Required: false
	StatusCode int `json:"statusCode"`
}
