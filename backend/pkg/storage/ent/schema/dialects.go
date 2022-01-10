package schema

import (
	"entgo.io/ent/dialect"
)

var textSchema = map[string]string{
	dialect.Postgres: "text",
}

var timeSchema = map[string]string{
	dialect.Postgres: "timestamptz",
}
