class NotFound(Exception):
    def __init__(self, type_name, id):
        super().__init__(f"Could not resolve {type_name} with id {id}")


class Unauthorized(Exception):
    def __init__(self, user_name):
        super().__init__(f"User {user_name} is not authorized to perform this action")
