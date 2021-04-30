class NotFound(Exception):
    def __init__(self, type_name, id):
        super().__init__(f"Could not resolve {type_name} with id {id}")
