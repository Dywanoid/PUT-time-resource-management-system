from ariadne import load_schema_from_path, make_executable_schema, snake_case_fallback_resolvers
from directives import DefaultMaxDirective, DefaultMinDirective
from resolvers import query, mutation, client_object, project_object, project_assignment_object, currency_enum
from scalars import datetime_scalar, date_scalar, interval_scalar

type_defs = load_schema_from_path("schema.graphql")
resolvers = [query, mutation, datetime_scalar, date_scalar, interval_scalar, client_object, project_object, project_assignment_object, currency_enum]
schema = make_executable_schema(
    type_defs, 
    resolvers,
    snake_case_fallback_resolvers,
    directives={
        "defaultmax": DefaultMaxDirective,
        "defaultmin": DefaultMinDirective
    }
)
