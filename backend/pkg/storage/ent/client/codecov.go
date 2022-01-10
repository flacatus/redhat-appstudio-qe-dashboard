package client

import (
	"context"

	"github.com/flacatus/qe-dashboard-backend/pkg/storage"
	"github.com/google/uuid"
)

// CreateRepository save provided repository information in database.
func (d *Database) CreateCoverage(repository storage.Coverage, repo_id uuid.UUID) error {
	_, err := d.client.CodeCov.Create().
		SetRepositoryName(repository.RepositoryName).
		SetGitOrganization(repository.GitOrganization).
		AddRepoIDIDs(repo_id).
		Save(context.TODO())
	if err != nil {
		return convertDBError("create coverage: %w", err)
	}
	return nil
}
