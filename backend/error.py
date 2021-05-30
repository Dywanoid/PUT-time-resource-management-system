class NotFound(Exception):
    def __init__(self, message):
        super().__init__(message)

    @classmethod
    def item(cls, type_name, id):
        return cls(f"Could not resolve {type_name} with id {id}")

class Unauthorized(Exception):
    def __init__(self, user_name):
        super().__init__(f"User {user_name} is not authorized to perform this action")


class ValidationError(Exception):
    def __init__(self, message):
        super().__init__(message)

    @classmethod
    def errors(cls, errors):
        return cls(f"Vaidation errors: {', '.join(errors)}")
