package config

type GithubActionsSpec struct {
	Monitor bool `yaml:"monitor"`
}

type OpenshiftCISpec struct {
	Monitor bool `yaml:"monitor"`
}

type CIAnalyzerCoverageSpec struct {
	GitHubActions GithubActionsSpec `yaml:"actions"`
	OpenshiftCI   OpenshiftCISpec   `yaml:"openshiftCI"`
}

type CIAnalyzerArtifactsSpec struct {
	GitHubActions GithubActionsSpec `yaml:"actions"`
	OpenshiftCI   OpenshiftCISpec   `yaml:"openshiftCI"`
} //

type Artifacts struct {
	ContainerName string `yaml:"containerName"`
	ContainerURL  string `yaml:"containerUrl"`
}

type JobSpec struct {
	GitHubActions GithubActionsSpec `yaml:"actions"`
	OpenshiftCI   OpenshiftCISpec   `yaml:"openshiftCI"`
}

type Git struct {
	GitOrganization string      `yaml:"gitOrganization"`
	GitRepository   string      `yaml:"repoName"`
	Jobs            JobSpec     `yaml:"jobs"`
	Artifacts       []Artifacts `yaml:"artifacts"`
}

type RepoSpec struct {
	Git []Git `yaml:"git"`
}

type ConfigSpec struct {
	Name string   `yaml:"name"`
	Spec RepoSpec `yaml:"spec"`
}
