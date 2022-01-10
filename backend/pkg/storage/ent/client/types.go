package client

import (
	"github.com/flacatus/qe-dashboard-backend/pkg/storage"
	"github.com/flacatus/qe-dashboard-backend/pkg/storage/ent/db"
)

func toStoragePassword(p *db.Repository) storage.Repository {
	return storage.Repository{
		RepositoryName:  p.RepositoryName,
		GitOrganization: p.GitOrganization,
	}
}
