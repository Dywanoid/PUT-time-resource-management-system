from ariadne import QueryType, MutationType, convert_kwargs_to_snake_case
from database import Client, db

query = QueryType()
mutation = MutationType()


@query.field("listClients")
def resolve_listClients(obj, info):
    return [client.to_dict() for client in Client.query.all()]


@query.field("getClient")
def resolve_getClient(obj, info, id):
    client = Client.query.get(id)
    return client.to_dict() if client else None


@mutation.field("createClient")
@convert_kwargs_to_snake_case
def resolve_createClient(obj, info, client_input):
    client = Client(
        name=client_input['name']
    )
    db.session.add(client)
    db.session.commit()
    return client.to_dict()
