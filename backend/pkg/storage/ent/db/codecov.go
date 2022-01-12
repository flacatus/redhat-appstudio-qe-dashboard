// Code generated by entc, DO NOT EDIT.

package db

import (
	"fmt"
	"strings"

	"entgo.io/ent/dialect/sql"
	"github.com/flacatus/qe-dashboard-backend/pkg/storage/ent/db/codecov"
	"github.com/flacatus/qe-dashboard-backend/pkg/storage/ent/db/repository"
	"github.com/google/uuid"
)

// CodeCov is the model entity for the CodeCov schema.
type CodeCov struct {
	config `json:"-"`
	// ID of the ent.
	ID uuid.UUID `json:"id,omitempty"`
	// RepositoryName holds the value of the "repository_name" field.
	RepositoryName string `json:"repository_name,omitempty"`
	// GitOrganization holds the value of the "git_organization" field.
	GitOrganization string `json:"git_organization,omitempty"`
	// CoveragePercentage holds the value of the "coverage_percentage" field.
	CoveragePercentage float64 `json:"coverage_percentage,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the CodeCovQuery when eager-loading is set.
	Edges              CodeCovEdges `json:"edges"`
	repository_codecov *uuid.UUID
}

// CodeCovEdges holds the relations/edges for other nodes in the graph.
type CodeCovEdges struct {
	// Codecov holds the value of the codecov edge.
	Codecov *Repository `json:"codecov,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [1]bool
}

// CodecovOrErr returns the Codecov value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e CodeCovEdges) CodecovOrErr() (*Repository, error) {
	if e.loadedTypes[0] {
		if e.Codecov == nil {
			// The edge codecov was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: repository.Label}
		}
		return e.Codecov, nil
	}
	return nil, &NotLoadedError{edge: "codecov"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*CodeCov) scanValues(columns []string) ([]interface{}, error) {
	values := make([]interface{}, len(columns))
	for i := range columns {
		switch columns[i] {
		case codecov.FieldCoveragePercentage:
			values[i] = new(sql.NullFloat64)
		case codecov.FieldRepositoryName, codecov.FieldGitOrganization:
			values[i] = new(sql.NullString)
		case codecov.FieldID:
			values[i] = new(uuid.UUID)
		case codecov.ForeignKeys[0]: // repository_codecov
			values[i] = &sql.NullScanner{S: new(uuid.UUID)}
		default:
			return nil, fmt.Errorf("unexpected column %q for type CodeCov", columns[i])
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the CodeCov fields.
func (cc *CodeCov) assignValues(columns []string, values []interface{}) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case codecov.FieldID:
			if value, ok := values[i].(*uuid.UUID); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value != nil {
				cc.ID = *value
			}
		case codecov.FieldRepositoryName:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field repository_name", values[i])
			} else if value.Valid {
				cc.RepositoryName = value.String
			}
		case codecov.FieldGitOrganization:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field git_organization", values[i])
			} else if value.Valid {
				cc.GitOrganization = value.String
			}
		case codecov.FieldCoveragePercentage:
			if value, ok := values[i].(*sql.NullFloat64); !ok {
				return fmt.Errorf("unexpected type %T for field coverage_percentage", values[i])
			} else if value.Valid {
				cc.CoveragePercentage = value.Float64
			}
		case codecov.ForeignKeys[0]:
			if value, ok := values[i].(*sql.NullScanner); !ok {
				return fmt.Errorf("unexpected type %T for field repository_codecov", values[i])
			} else if value.Valid {
				cc.repository_codecov = new(uuid.UUID)
				*cc.repository_codecov = *value.S.(*uuid.UUID)
			}
		}
	}
	return nil
}

// QueryCodecov queries the "codecov" edge of the CodeCov entity.
func (cc *CodeCov) QueryCodecov() *RepositoryQuery {
	return (&CodeCovClient{config: cc.config}).QueryCodecov(cc)
}

// Update returns a builder for updating this CodeCov.
// Note that you need to call CodeCov.Unwrap() before calling this method if this CodeCov
// was returned from a transaction, and the transaction was committed or rolled back.
func (cc *CodeCov) Update() *CodeCovUpdateOne {
	return (&CodeCovClient{config: cc.config}).UpdateOne(cc)
}

// Unwrap unwraps the CodeCov entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (cc *CodeCov) Unwrap() *CodeCov {
	tx, ok := cc.config.driver.(*txDriver)
	if !ok {
		panic("db: CodeCov is not a transactional entity")
	}
	cc.config.driver = tx.drv
	return cc
}

// String implements the fmt.Stringer.
func (cc *CodeCov) String() string {
	var builder strings.Builder
	builder.WriteString("CodeCov(")
	builder.WriteString(fmt.Sprintf("id=%v", cc.ID))
	builder.WriteString(", repository_name=")
	builder.WriteString(cc.RepositoryName)
	builder.WriteString(", git_organization=")
	builder.WriteString(cc.GitOrganization)
	builder.WriteString(", coverage_percentage=")
	builder.WriteString(fmt.Sprintf("%v", cc.CoveragePercentage))
	builder.WriteByte(')')
	return builder.String()
}

// CodeCovs is a parsable slice of CodeCov.
type CodeCovs []*CodeCov

func (cc CodeCovs) config(cfg config) {
	for _i := range cc {
		cc[_i].config = cfg
	}
}
