from flask_login import current_user
from ariadne import QueryType, MutationType, convert_kwargs_to_snake_case, ScalarType, ObjectType
from sqlalchemy import desc
from database import Client, Project, Team, Task, User, TeamMember, db
from datetime import datetime
from error import NotFound
from auth import roles_required

query = QueryType()
mutation = MutationType()
datetime_scalar = ScalarType("DateTime")
client_object = ObjectType("Client")
project_object = ObjectType("Project")


def find_item(item_type, id):
    item = item_type.query.get(id)
    if item:
        return item
    else:
        raise NotFound(item_type.__name__, id)


def mutate_item(item_type, id_property):
    """
    Helper decorator for mutations that require some db object to perform
    a mutation with.
    """
    def inner(func):
        @convert_kwargs_to_snake_case
        def wrapper(obj, info, input):
            item = find_item(item_type, input[id_property])
            result = func(item, input)
            db.session.commit()
            return result
        return wrapper
    return inner


@datetime_scalar.serializer
def serialize_datetime(value):
    return value.isoformat()


@query.field("clients")
@convert_kwargs_to_snake_case
def resolve_clients(obj, info, include_archived, offset, limit):
    filters = []
    if not include_archived:
        filters.append(Client.archived == False)
    return Client.query.order_by(desc(Client.created_at)).filter(db.and_(*filters)).offset(offset).limit(limit).all()


@query.field("client")
def resolve_client(obj, info, id):
    return find_item(Client, id)


@client_object.field("projects")
@convert_kwargs_to_snake_case
def resolve_projects(client, info, include_archived):
    return filter(lambda p: True if include_archived else not p.archived, client.projects)


@query.field("project")
def resolve_project(obj, info, id):
    return find_item(Project, id)


@project_object.field("tasks")
@convert_kwargs_to_snake_case
def resolve_tasks(project, info, include_archived):
    return filter(lambda t: True if include_archived else not t.archived, project.tasks)


@query.field("task")
def resolve_task(obj, info, id):
    return find_item(Task, id)


@query.field("users")
@roles_required('manager')
def resolve_users(obj, info, offset, limit):
    return User.query.order_by(desc(User.created_at)).offset(offset).limit(limit).all()


@query.field("user")
@roles_required('manager')
def resolve_user(obj, info, id):
    return find_item(User, id)


@query.field("me")
def resolve_me(obj, info):
    return current_user


@mutation.field("createClient")
@roles_required('manager')
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


@mutation.field("updateClient")
@roles_required('manager')
@mutate_item(Client, 'client_id')
def resolve_update_client(client, input):
    client.name = input['name']
    client.tax_id = input.get('tax_id'),
    client.street_with_number = input.get('street_with_number'),
    client.zip_code = input.get('zip_code'),
    client.city = input.get('city')
    return client


@mutation.field("archiveClient")
@roles_required('manager')
@mutate_item(Client, 'client_id')
def resolve_archive_client(client, input):
    client.archived = True
    return client


@mutation.field("unarchiveClient")
@roles_required('manager')
@mutate_item(Client, 'client_id')
def resolve_unarchive_client(client, input):
    client.archived = False
    return client


@mutation.field("addProject")
@roles_required('manager')
@mutate_item(Client, 'client_id')
def resolve_add_project(client, input):
    project = Project(
        name=input['name'],
        created_at=datetime.now(),
        client_id=client.id
    )
    db.session.add(project)
    return project


@mutation.field("updateProject")
@roles_required('manager')
@mutate_item(Project, 'project_id')
def resolve_update_project(project, input):
    project.name = input['name']
    return project


@mutation.field("archiveProject")
@roles_required('manager')
@mutate_item(Project, 'project_id')
def resolve_archive_project(project, input):
    project.archived = True
    return project


@mutation.field("unarchiveProject")
@roles_required('manager')
@mutate_item(Project, 'project_id')
def resolve_unarchive_project(project, input):
    project.archived = False
    return project


@mutation.field("addTask")
@roles_required('manager')
@mutate_item(Project, 'project_id')
def resolve_add_task(project, input):
    task = Task(
        name=input['name'],
        created_at=datetime.now(),
        project_id=project.id
    )
    db.session.add(task)
    return task


@mutation.field("updateTask")
@roles_required('manager')
@mutate_item(Task, 'task_id')
def resolve_update_task(task, input):
    task.name = input['name']
    return task


@mutation.field("archiveTask")
@roles_required('manager')
@mutate_item(Task, 'task_id')
def resolve_archive_task(task, input):
    task.archived = True
    return task


@mutation.field("unarchiveTask")
@roles_required('manager')
@mutate_item(Task, 'task_id')
def resolve_unarchive_task(task, input):
    task.archived = False
    return task


@query.field("teams")
@convert_kwargs_to_snake_case
def resolve_teams(obj, info, include_archived, offset, limit):
    filters = []
    if not include_archived:
        filters.append(Client.archived == False)
    return Team.query.order_by(desc(Team.name)).filter(db.and_(*filters)).offset(offset).limit(limit).all()


@query.field("team")
def resolve_team(obj, info, id):
    return find_item(Team, id)


@mutation.field("createTeam")
@convert_kwargs_to_snake_case
def resolve_create_team(obj, info, input):
    team = Team(
        name=input.get('name'),
        description=input.get('description'),
        created_at=datetime.now()
    )
    db.session.add(team)
    db.session.commit()
    return team


@mutation.field("updateTeam")
@mutate_item(Team, 'team_id')
def resolve_update_client(team, input):
    team.name = input.get('name')
    team.description = input.get('description'),
    return team

@mutation.field("archiveTeam")
@mutate_item(Team, 'team_id')
def resolve_archive_project(team, input):
    team.archived = True
    return team


@mutation.field("unarchiveTeam")
@mutate_item(Team, 'team_id')
def resolve_archive_project(team, input):
    team.archived = False
    return team


@mutation.field("createTeamMember")
@convert_kwargs_to_snake_case
def resolve_create_team_member(obj, info, input):
    team_member = TeamMember(
        user_id=input.get('user_id'),
        team_id=input.get('team_id'),
        created_at=datetime.now()
    )
    db.session.add(team_member)
    db.session.commit()
    return team_member

@mutation.field("deleteTeamMember")
@convert_kwargs_to_snake_case
def resolve_delete_team_member(obj, info, input):
    user_id = input.get('user_id')
    team_id = input.get('team_id')
    db.session.query(TeamMember).filter(TeamMember.user_id == user_id, TeamMember.team_id == team_id).delete()
    db.session.commit()
    if(TeamMember.query.filter(TeamMember.user_id == user_id, TeamMember.team_id == team_id)):
        return False
    return True

@query.field("teamMembers")
@convert_kwargs_to_snake_case
def resolve_team_members(obj, info, team_id):
    return db.session.query(TeamMember).filter(TeamMember.team_id == team_id)


@query.field("userTeams")
@convert_kwargs_to_snake_case
def resolve_team_members(obj, info, user_id):
    return db.session.query(TeamMember).filter(TeamMember.user_id == user_id)


@query.field("userTeams")
@convert_kwargs_to_snake_case
def resolve_team_member(obj, info, user_id, team_id):
    return db.session.query(TeamMember).filter(TeamMember.user_id == user_id, TeamMember.team_id == team_id)