package config

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

type GitRepository struct {
	GitOrganization string   `json:"git_organization"`
	GitRepository   string   `json:"repository_name"`
	Jobs            JobSpec  `json:"jobs"`
	Artifacts       []string `json:"artifacts"`
}

type RepoSpec struct {
	Git []GitRepository `json:"git_repository"`
}

type ConfigSpec struct {
	Name string   `json:"name"`
	Spec RepoSpec `json:"spec"`
}
