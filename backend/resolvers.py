from ariadne import QueryType, MutationType, convert_kwargs_to_snake_case, ScalarType, ObjectType
from sqlalchemy import desc
from database import Client, Project, Task, db
from datetime import datetime

query = QueryType()
mutation = MutationType()
datetime_scalar = ScalarType("DateTime")


@datetime_scalar.serializer
def serialize_datetime(value):
    return value.isoformat()


@query.field("clients")
def resolve_clients(obj, info, offset, limit):
    return Client.query.order_by(desc(Client.created_at)).offset(offset).limit(limit).all()


@query.field("client")
def resolve_client(obj, info, id):
    return Client.query.get(id)


@mutation.field("createClient")
@convert_kwargs_to_snake_case
def resolve_create_client(obj, info, input):
    client = Client(
        name=input['name'],
        tax_id=input.get('tax_id'),
        street_with_number=input.get('street_with_number'),
        zip_code=input.get('zip_code'),
        city=input.get('city'),
        created_at=datetime.now()
    )
    db.session.add(client)
    db.session.commit()
    return client


@mutation.field("addProject")
@convert_kwargs_to_snake_case
def resolve_add_project(obj, info, input):
    client = Client.query.get(input['client_id'])

    if client:
        project = Project(
            name=input['name'],
            created_at=datetime.now(),
            client_id=client.id
        )
        db.session.add(project)
        db.session.commit()
        return project
    else:
        # TODO return error instead of None
        return None


@mutation.field("addTask")
@convert_kwargs_to_snake_case
def resolve_add_task(obj, info, input):
    project = Project.query.get(input['project_id'])

    if project:
        task = Task(
            name=input['name'],
            created_at=datetime.now(),
            project_id=project.id
        )
        db.session.add(task)
        db.session.commit()
        return task
    else:
        # TODO return error instead of None
        return None
