// Code generated by entc, DO NOT EDIT.

package db

import (
	"context"
	"fmt"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/flacatus/qe-dashboard-backend/pkg/storage/ent/db/codecov"
	"github.com/flacatus/qe-dashboard-backend/pkg/storage/ent/db/predicate"
)

// CodeCovDelete is the builder for deleting a CodeCov entity.
type CodeCovDelete struct {
	config
	hooks    []Hook
	mutation *CodeCovMutation
}

// Where appends a list predicates to the CodeCovDelete builder.
func (ccd *CodeCovDelete) Where(ps ...predicate.CodeCov) *CodeCovDelete {
	ccd.mutation.Where(ps...)
	return ccd
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (ccd *CodeCovDelete) Exec(ctx context.Context) (int, error) {
	var (
		err      error
		affected int
	)
	if len(ccd.hooks) == 0 {
		affected, err = ccd.sqlExec(ctx)
	} else {
		var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
			mutation, ok := m.(*CodeCovMutation)
			if !ok {
				return nil, fmt.Errorf("unexpected mutation type %T", m)
			}
			ccd.mutation = mutation
			affected, err = ccd.sqlExec(ctx)
			mutation.done = true
			return affected, err
		})
		for i := len(ccd.hooks) - 1; i >= 0; i-- {
			if ccd.hooks[i] == nil {
				return 0, fmt.Errorf("db: uninitialized hook (forgotten import db/runtime?)")
			}
			mut = ccd.hooks[i](mut)
		}
		if _, err := mut.Mutate(ctx, ccd.mutation); err != nil {
			return 0, err
		}
	}
	return affected, err
}

// ExecX is like Exec, but panics if an error occurs.
func (ccd *CodeCovDelete) ExecX(ctx context.Context) int {
	n, err := ccd.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (ccd *CodeCovDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := &sqlgraph.DeleteSpec{
		Node: &sqlgraph.NodeSpec{
			Table: codecov.Table,
			ID: &sqlgraph.FieldSpec{
				Type:   field.TypeUUID,
				Column: codecov.FieldID,
			},
		},
	}
	if ps := ccd.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return sqlgraph.DeleteNodes(ctx, ccd.driver, _spec)
}

// CodeCovDeleteOne is the builder for deleting a single CodeCov entity.
type CodeCovDeleteOne struct {
	ccd *CodeCovDelete
}

// Exec executes the deletion query.
func (ccdo *CodeCovDeleteOne) Exec(ctx context.Context) error {
	n, err := ccdo.ccd.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{codecov.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (ccdo *CodeCovDeleteOne) ExecX(ctx context.Context) {
	ccdo.ccd.ExecX(ctx)
}
