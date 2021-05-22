class NotFound(Exception):
    def __init__(self, message):
        super().__init__(message)

    @classmethod
    def item(cls, type_name, id):
        return cls(f"Could not resolve {type_name} with id {id}")

class Unauthorized(Exception):
    def __init__(self, user_name):
        super().__init__(f"User {user_name} is not authorized to perform this action")

class ActiveRequestError(Exception):
    def __init__(self, start_date, end_date):
        super().__init__(f"There is already active request between {start_date} and {end_date}")

class WrongTimespanError(Exception):
    def __init__(self, start_date, end_date):
        super().__init__(f"Starting date ({start_date}) must be earlier than ending date ({end_date})")
