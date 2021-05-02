from ariadne import load_schema_from_path, make_executable_schema, snake_case_fallback_resolvers
from resolvers import query, mutation, datetime_scalar, client_object, project_object

type_defs = load_schema_from_path("schema.graphql")
schema = make_executable_schema(
    type_defs, [query, mutation, datetime_scalar, client_object, project_object], snake_case_fallback_resolvers
)
