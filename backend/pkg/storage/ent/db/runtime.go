// Code generated by entc, DO NOT EDIT.

package db

import (
	"github.com/flacatus/qe-dashboard-backend/pkg/storage/ent/db/codecov"
	"github.com/flacatus/qe-dashboard-backend/pkg/storage/ent/db/repository"
	"github.com/flacatus/qe-dashboard-backend/pkg/storage/ent/schema"
	"github.com/google/uuid"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	codecovFields := schema.CodeCov{}.Fields()
	_ = codecovFields
	// codecovDescRepositoryName is the schema descriptor for repository_name field.
	codecovDescRepositoryName := codecovFields[1].Descriptor()
	// codecov.RepositoryNameValidator is a validator for the "repository_name" field. It is called by the builders before save.
	codecov.RepositoryNameValidator = codecovDescRepositoryName.Validators[0].(func(string) error)
	// codecovDescID is the schema descriptor for id field.
	codecovDescID := codecovFields[0].Descriptor()
	// codecov.DefaultID holds the default value on creation for the id field.
	codecov.DefaultID = codecovDescID.Default.(func() uuid.UUID)
	repositoryFields := schema.Repository{}.Fields()
	_ = repositoryFields
	// repositoryDescRepositoryName is the schema descriptor for repository_name field.
	repositoryDescRepositoryName := repositoryFields[1].Descriptor()
	// repository.RepositoryNameValidator is a validator for the "repository_name" field. It is called by the builders before save.
	repository.RepositoryNameValidator = repositoryDescRepositoryName.Validators[0].(func(string) error)
	// repositoryDescGitOrganization is the schema descriptor for git_organization field.
	repositoryDescGitOrganization := repositoryFields[2].Descriptor()
	// repository.GitOrganizationValidator is a validator for the "git_organization" field. It is called by the builders before save.
	repository.GitOrganizationValidator = repositoryDescGitOrganization.Validators[0].(func(string) error)
	// repositoryDescDescription is the schema descriptor for description field.
	repositoryDescDescription := repositoryFields[3].Descriptor()
	// repository.DescriptionValidator is a validator for the "description" field. It is called by the builders before save.
	repository.DescriptionValidator = repositoryDescDescription.Validators[0].(func(string) error)
	// repositoryDescID is the schema descriptor for id field.
	repositoryDescID := repositoryFields[0].Descriptor()
	// repository.DefaultID holds the default value on creation for the id field.
	repository.DefaultID = repositoryDescID.Default.(func() uuid.UUID)
}
