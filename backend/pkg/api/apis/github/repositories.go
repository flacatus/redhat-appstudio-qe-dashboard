package github

import (
	"context"
	"encoding/json"
)

type GitHubTagResponse struct {
	RepositoryName     string `json:"name"`
	RepositoryFullName string `json:"full_name,omitempty"`
	HTMLUrl            string `json:"html_url"`
	Description        string `json:"description"`
}

func (c *API) GetRepositoriesInformation(organization string, repo string) (repository GitHubTagResponse, err error) {
	gh := GitHubTagResponse{}

	response, err := c.Get(context.Background(), "aplication/json", organization, repo)
	if err != nil {
		return gh, err
	}
	err = json.NewDecoder(response.Body).Decode(&gh)
	if err != nil {
		panic(err)
	}

	return gh, nil
}
