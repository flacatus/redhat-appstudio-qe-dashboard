package client

import (
	"context"

	"github.com/flacatus/qe-dashboard-backend/pkg/storage"
	"github.com/flacatus/qe-dashboard-backend/pkg/storage/ent/db"
)

// CreateRepository save provided repository information in database.
func (d *Database) CreateRepository(repository storage.Repository) (*db.Repository, error) {
	repo, err := d.client.Repository.Create().
		SetRepositoryName(repository.RepositoryName).
		SetGitOrganization(repository.GitOrganization).
		SetDescription(repository.Description).
		SetGitURL(repository.GitURL).
		Save(context.TODO())
	if err != nil {
		return nil, convertDBError("create repository: %w", err)
	}

	return repo, nil
}
