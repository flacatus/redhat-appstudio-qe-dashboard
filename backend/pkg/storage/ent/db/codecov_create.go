// Code generated by entc, DO NOT EDIT.

package db

import (
	"context"
	"errors"
	"fmt"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/flacatus/qe-dashboard-backend/pkg/storage/ent/db/codecov"
	"github.com/flacatus/qe-dashboard-backend/pkg/storage/ent/db/repository"
	"github.com/google/uuid"
)

// CodeCovCreate is the builder for creating a CodeCov entity.
type CodeCovCreate struct {
	config
	mutation *CodeCovMutation
	hooks    []Hook
}

// SetRepositoryName sets the "repository_name" field.
func (ccc *CodeCovCreate) SetRepositoryName(s string) *CodeCovCreate {
	ccc.mutation.SetRepositoryName(s)
	return ccc
}

// SetGitOrganization sets the "git_organization" field.
func (ccc *CodeCovCreate) SetGitOrganization(s string) *CodeCovCreate {
	ccc.mutation.SetGitOrganization(s)
	return ccc
}

// SetID sets the "id" field.
func (ccc *CodeCovCreate) SetID(u uuid.UUID) *CodeCovCreate {
	ccc.mutation.SetID(u)
	return ccc
}

// AddRepoIDIDs adds the "repo_id" edge to the Repository entity by IDs.
func (ccc *CodeCovCreate) AddRepoIDIDs(ids ...uuid.UUID) *CodeCovCreate {
	ccc.mutation.AddRepoIDIDs(ids...)
	return ccc
}

// AddRepoID adds the "repo_id" edges to the Repository entity.
func (ccc *CodeCovCreate) AddRepoID(r ...*Repository) *CodeCovCreate {
	ids := make([]uuid.UUID, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return ccc.AddRepoIDIDs(ids...)
}

// Mutation returns the CodeCovMutation object of the builder.
func (ccc *CodeCovCreate) Mutation() *CodeCovMutation {
	return ccc.mutation
}

// Save creates the CodeCov in the database.
func (ccc *CodeCovCreate) Save(ctx context.Context) (*CodeCov, error) {
	var (
		err  error
		node *CodeCov
	)
	ccc.defaults()
	if len(ccc.hooks) == 0 {
		if err = ccc.check(); err != nil {
			return nil, err
		}
		node, err = ccc.sqlSave(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*CodeCovMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			if err = ccc.check(); err != nil {
				return nil, err
			}
			ccc.mutation = mutation
			if node, err = ccc.sqlSave(ctx); err != nil {
				return nil, err
			}
			mutation.id = &node.ID
			mutation.done = true
			return node, err
		})
		for i := len(ccc.hooks) - 1; i >= 0; i-- {
			if ccc.hooks[i] == nil {
				return nil, fmt.Errorf("db: uninitialized hook (forgotten import db/runtime?)")
			}
			mut = ccc.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ccc.mutation); err != nil {
			return nil, err
		}
	}
	return node, err
}

// SaveX calls Save and panics if Save returns an error.
func (ccc *CodeCovCreate) SaveX(ctx context.Context) *CodeCov {
	v, err := ccc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ccc *CodeCovCreate) Exec(ctx context.Context) error {
	_, err := ccc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ccc *CodeCovCreate) ExecX(ctx context.Context) {
	if err := ccc.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ccc *CodeCovCreate) defaults() {
	if _, ok := ccc.mutation.ID(); !ok {
		v := codecov.DefaultID()
		ccc.mutation.SetID(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ccc *CodeCovCreate) check() error {
	if _, ok := ccc.mutation.RepositoryName(); !ok {
		return &ValidationError{Name: "repository_name", err: errors.New(`db: missing required field "CodeCov.repository_name"`)}
	}
	if v, ok := ccc.mutation.RepositoryName(); ok {
		if err := codecov.RepositoryNameValidator(v); err != nil {
			return &ValidationError{Name: "repository_name", err: fmt.Errorf(`db: validator failed for field "CodeCov.repository_name": %w`, err)}
		}
	}
	if _, ok := ccc.mutation.GitOrganization(); !ok {
		return &ValidationError{Name: "git_organization", err: errors.New(`db: missing required field "CodeCov.git_organization"`)}
	}
	return nil
}

func (ccc *CodeCovCreate) sqlSave(ctx context.Context) (*CodeCov, error) {
	_node, _spec := ccc.createSpec()
	if err := sqlgraph.CreateNode(ctx, ccc.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{err.Error(), err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		_node.ID = *_spec.ID.Value.(*uuid.UUID)
	}
	return _node, nil
}

func (ccc *CodeCovCreate) createSpec() (*CodeCov, *sqlgraph.CreateSpec) {
	var (
		_node = &CodeCov{config: ccc.config}
		_spec = &sqlgraph.CreateSpec{
			Table: codecov.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeUUID,
				Column: codecov.FieldID,
			},
		}
	)
	if id, ok := ccc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = &id
	}
	if value, ok := ccc.mutation.RepositoryName(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: codecov.FieldRepositoryName,
		})
		_node.RepositoryName = value
	}
	if value, ok := ccc.mutation.GitOrganization(); ok {
		_spec.Fields = append(_spec.Fields, &sqlgraph.FieldSpec{
			Type:   field.TypeString,
			Value:  value,
			Column: codecov.FieldGitOrganization,
		})
		_node.GitOrganization = value
	}
	if nodes := ccc.mutation.RepoIDIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   codecov.RepoIDTable,
			Columns: []string{codecov.RepoIDColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeUUID,
					Column: repository.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// CodeCovCreateBulk is the builder for creating many CodeCov entities in bulk.
type CodeCovCreateBulk struct {
	config
	builders []*CodeCovCreate
}

// Save creates the CodeCov entities in the database.
func (cccb *CodeCovCreateBulk) Save(ctx context.Context) ([]*CodeCov, error) {
	specs := make([]*sqlgraph.CreateSpec, len(cccb.builders))
	nodes := make([]*CodeCov, len(cccb.builders))
	mutators := make([]Mutator, len(cccb.builders))
	for i := range cccb.builders {
		func(i int, root context.Context) {
			builder := cccb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*CodeCovMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				nodes[i], specs[i] = builder.createSpec()
				var err error
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, cccb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, cccb.driver, spec); err != nil {
						if sqlgraph.IsConstraintError(err) {
							err = &ConstraintError{err.Error(), err}
						}
					}
				}
				if err != nil {
					return nil, err
				}
				mutation.id = &nodes[i].ID
				mutation.done = true
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, cccb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (cccb *CodeCovCreateBulk) SaveX(ctx context.Context) []*CodeCov {
	v, err := cccb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (cccb *CodeCovCreateBulk) Exec(ctx context.Context) error {
	_, err := cccb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (cccb *CodeCovCreateBulk) ExecX(ctx context.Context) {
	if err := cccb.Exec(ctx); err != nil {
		panic(err)
	}
}
