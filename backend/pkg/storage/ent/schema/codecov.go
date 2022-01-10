package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

/* Original SQL table:
create table password
(
    email    text not null  primary key,
    hash     blob not null,
    username text not null,
    user_id  text not null
);
*/

// Password holds the schema definition for the Password entity.
type CodeCov struct {
	ent.Schema
}

// Fields of the Password.
func (CodeCov) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			StorageKey("id").
			Unique(),
		field.Text("repository_name").
			SchemaType(textSchema).
			NotEmpty(),
		field.Text("git_organization").
			SchemaType(textSchema),
	}
}

// Edges of the Password.
func (CodeCov) Edges() []ent.Edge {
	return []ent.Edge{
		// Create an inverse-edge called "owner" of type `User`
		// and reference it to the "cars" edge (in User schema)
		// explicitly using the `Ref` method.
		edge.To("repo_id", Repository.Type),
	}
}
