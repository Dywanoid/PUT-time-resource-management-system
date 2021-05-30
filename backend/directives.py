from ariadne import SchemaDirectiveVisitor
from graphql import default_field_resolver
from datetime import date


class DefaultValueDirective(SchemaDirectiveVisitor):
    def __init__(self, defalut_value, *args, **kwargs):
        self.default_value = defalut_value
        super().__init__(*args, **kwargs)

    def visit_field_definition(self, field, object_type):
        original_resolver = field.resolve or default_field_resolver

        def resolve_max_date(obj, info, **kwargs):
            result = original_resolver(obj, info, **kwargs)
            return result if result != self.default_value else None

        field.resolve = resolve_max_date
        return field

    def visit_input_field_definition(self, field, object_type):
        field.default_value = self.default_value
        return field

    def visit_argument_definition(self, argument, field, object_type):
        argument.default_value = self.default_value
        return argument


class DefaultMaxDirective(DefaultValueDirective):
    def __init__(self, *args, **kwargs):
        super().__init__(date.max, *args, **kwargs)


class DefaultMinDirective(DefaultValueDirective):
    def __init__(self, *args, **kwargs):
        super().__init__(date.min, *args, **kwargs)
