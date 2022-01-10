package storage

import (
	"errors"

	"github.com/flacatus/qe-dashboard-backend/pkg/storage/ent/db"
	"github.com/google/uuid"
)

var (
	// ErrNotFound is the error returned by storages if a resource cannot be found.
	ErrNotFound = errors.New("not found")

	// ErrAlreadyExists is the error returned by storages if a resource ID is taken during a create.
	ErrAlreadyExists = errors.New("ID already exists")
)

// Storage is the storage interface used by the server. Implementations are
// required to be able to perform atomic compare-and-swap updates and either
// support timezones or standardize on UTC.
type Storage interface {
	Close() error

	// GET
	//GetUser(email string) (User, error)
	//ListUsers() ([]User, error)

	// POST
	CreateRepository(p Repository) (*db.Repository, error)

	// POST
	CreateCoverage(p Coverage, repo_id uuid.UUID) error

	// Delete
	//DeleteUser(email string) error
}

// Repository is an github repository info managed by the storage.
type Repository struct {
	// RepositoryName identify an github repository
	RepositoryName string `json:"repository_name"`

	GitOrganization string `json:"git_organization"`

	Description string `json:"description"`

	GitURL string `json:"git_url"`
}

// Repository is an github repository info managed by the storage.
type Coverage struct {
	// RepositoryName identify an github repository
	RepositoryName string `json:"repository_name"`

	GitOrganization string `json:"git_organization"`
}
