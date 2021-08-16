import re
from flask import render_template
from flask_login import current_user
from ariadne import EnumType, QueryType, MutationType, convert_kwargs_to_snake_case, ObjectType
from graphql import default_field_resolver
from sqlalchemy import desc, func
from sqlalchemy.orm import contains_eager
from database import Client, Currency, Document, DocumentLink, Invoice, Language, Project, Task, Team, TimeLog, TeamMember, User, ProjectAssignment, Settings, HolidayRequest, HolidayRequestStatus, HolidayRequestType, db
from dataclasses import dataclass
from datetime import datetime, date, timedelta
from error import NotFound, ValidationError, ActiveHolidayRequestError, Unauthorized
from auth import roles_required, roles_check
from reporting import get_client_reports

query = QueryType()
mutation = MutationType()

client_object = ObjectType("Client")
project_object = ObjectType("Project")
project_assignment_object = ObjectType("ProjectAssignment")
currency_enum = EnumType("Currency", Currency)
language_enum = EnumType("Language", Language)
holiday_request_type_enum = EnumType("HolidayRequestType", HolidayRequestType)
holiday_request_status_enum = EnumType("HolidayRequestStatus", HolidayRequestStatus)

@dataclass
class TimeLogInfo:
    earliest_date: date
    latest_date: date
    total_count: int


def find_item(item_type, id):
    item = item_type.query.get(id)
    if item:
        return item
    else:
        raise NotFound.item(item_type.__name__, id)


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
def resolve_user(obj, info, id=None):
    id = id or str(current_user.id)
    if id != str(current_user.id):
        roles_check('manager')
    return find_item(User, id)


@mutation.field("updateSupervisor")
@roles_required('supervisor_editor')
@mutate_item(User, 'user_id')
def resolve_update_supervisor(user, input):
    supervisor_id = int(input.get('supervisor_id'))
    if(user.id == supervisor_id):
        raise ValidationError("You can't be your own supervisor")
    subordinates = user.get_all_subordinates()
    subordinates_id = {subordinate.id for subordinate in subordinates}
    if(supervisor_id in subordinates_id):
        raise ValidationError(f"User with ID: {supervisor_id} is subordinate of {user.id}.")
    user.supervisor_id = supervisor_id
    return user


@mutation.field("updateSupervisorBatch")
@roles_required('supervisor_editor')
@convert_kwargs_to_snake_case
def resolve_update_supervisor(obj, info, input):
    supervisor_id = int(input.get('supervisor_id'))
    user_id_list = input.get('user_list')
    user_list = []
    for user_id in user_id_list:
        user = find_item(User, user_id)
        if(user.id == supervisor_id):
            raise ValidationError(f"User {user_id} can't supervisor of himself")
        subordinates = user.get_all_subordinates()
        subordinates_id = {subordinate.id for subordinate in subordinates}
        if(supervisor_id in subordinates_id):
            raise ValidationError(f"User with ID: {supervisor_id} is subordinate of {user.id}.")
        user.supervisor_id = supervisor_id
        user_list.append(user)
    db.session.add_all(user_list)
    db.session.commit()
    return user_list


@mutation.field("unassignSupervisor")
@roles_required('supervisor_editor')
@mutate_item(User, 'user_id')
def resolve_update_supervisor(user, input):
    user.supervisor_id = None
    return user


@mutation.field("unassignSupervisorBatch")
@roles_required('supervisor_editor')
@convert_kwargs_to_snake_case
def resolve_update_supervisor(obj, info, input):
    user_id_list = input.get('user_list')
    user_list = []
    for user_id in user_id_list:
        user = find_item(User, user_id)
        user.supervisor_id = None
        user_list.append(user)
    db.session.add_all(user_list)
    db.session.commit()
    return user_list
    

@query.field("getAllSubordinates")
@convert_kwargs_to_snake_case
def resolve_get_all_subordinates(obj, info, user_id = None):
    id = user_id if user_id else current_user.id
    user = find_item(User, id)
    return user.get_all_subordinates()

def find_project_assignments(offset, limit, from_date, to_date, user_id=None, project_id=None, exclude_project_assignment_id=None):
    filters = [
        ProjectAssignment.end_date >= from_date,
        ProjectAssignment.begin_date <= to_date
    ]
    if project_id:
        filters.append(ProjectAssignment.project_id == project_id)

    if user_id:
        filters.append(ProjectAssignment.user_id == user_id)

    if exclude_project_assignment_id:
        filters.append(ProjectAssignment.id != exclude_project_assignment_id)

    return (ProjectAssignment.query
            .filter(db.and_(*filters))
            .order_by(desc(ProjectAssignment.created_at))
            .offset(offset).limit(limit)
            .all())


@query.field("projectAssignments")
@convert_kwargs_to_snake_case
def resolve_project_assignments(obj, info, offset, limit, from_date, to_date, user_id=None, project_id=None):
    if user_id is None or user_id != str(current_user.id):
        roles_check('client_editor')
    return find_project_assignments(offset, limit, from_date, to_date, user_id, project_id)


@project_assignment_object.field("timeLogs")
@convert_kwargs_to_snake_case
def resolve_time_logs(project_assignment, info, from_date=None, to_date=None):
    filters = [TimeLog.project_assignment_id == project_assignment.id]
    if from_date:
        filters.append(TimeLog.date >= from_date)
    if to_date:
        filters.append(TimeLog.date <= to_date)

    return TimeLog.query.filter(db.and_(*filters)).order_by(TimeLog.date).all()


def get_time_log_info(project_assignment):
    (earliest_date, latest_date, total_count) = (db.session
        .query(func.min(TimeLog.date), func.max(TimeLog.date), func.count(TimeLog.date))
        .filter(TimeLog.project_assignment_id == project_assignment.id)
        .first()
    )
    return TimeLogInfo(earliest_date=earliest_date, latest_date=latest_date, total_count=total_count)


@project_assignment_object.field("timeLogInfo")
@convert_kwargs_to_snake_case
def resolve_time_log_info(project_assignment, info):
    return get_time_log_info(project_assignment)


def get_overlap_range(lhs, rhs):
    return (max(lhs[0], rhs[0]), min(lhs[1], rhs[1]))


def format_range(range):
    return f"{str(range[0])} to {str(range[1])}"


def validate_project_assignment(project_assignment):
    errors = []
    if project_assignment.begin_date > project_assignment.end_date:
        errors.append("Begin date cannot be after the end date")
    if not project_assignment.hourly_rate > 0:
        errors.append("Hourly rate must be greater than 0")
    existing_project_assignment = find_project_assignments(0, 1, project_assignment.begin_date, project_assignment.end_date, project_assignment.user_id, project_assignment.project_id, project_assignment.id)
    if existing_project_assignment:
        overlap = get_overlap_range(existing_project_assignment[0].date_range(), project_assignment.date_range())
        errors.append(f"Date range partially overlaps with existing project assignment with id {existing_project_assignment[0].id} in range {format_range(overlap)}")
    return errors


@mutation.field("createProjectAssignment")
@roles_required('client_editor')
@convert_kwargs_to_snake_case
def resolve_add_project_assignment(obj, info, input):
    project = find_item(Project, input['project_id'])
    user = find_item(User, input['user_id'])
    project_assignment = ProjectAssignment(
        user_id=user.id,
        project_id=project.id,
        begin_date=input.get('begin_date'),
        end_date=input.get('end_date'),
        hourly_rate=input['hourly_rate'],
        created_at=datetime.now()
    )
    errors = validate_project_assignment(project_assignment)
    if errors:
        raise ValidationError.errors(errors)
    db.session.add(project_assignment)
    db.session.commit()
    return project_assignment


@mutation.field("updateProjectAssignment")
@roles_required('client_editor')
@mutate_item(ProjectAssignment, 'project_assignment_id')
def resolve_update_project_assignment(project_assignment, input):
    project_assignment.begin_date = input.get('begin_date')
    project_assignment.end_date = input.get('end_date')
    project_assignment.hourly_rate = input['hourly_rate']
    errors = validate_project_assignment(project_assignment)

    time_log_info = get_time_log_info(project_assignment)
    if time_log_info.total_count > 0:
        if project_assignment.begin_date > time_log_info.earliest_date:
            errors.append(f"Begin date cannot be after the earliest time log date {time_log_info.earliest_date}")
        if project_assignment.end_date < time_log_info.latest_date:
            errors.append(f"End date cannot be before the latest time log date {time_log_info.latest_date}")

    if errors:
        raise ValidationError.errors(errors)

    return project_assignment


@mutation.field("deleteProjectAssignment")
@roles_required('client_editor')
@mutate_item(ProjectAssignment, 'project_assignment_id')
def resolve_delete_project_assignment(project_assignment, input):
    time_log_info = get_time_log_info(project_assignment)
    if time_log_info.total_count > 0:
        raise ValidationError(f"There are {time_log_info.total_count} time logs for this project assingment")
    db.session.delete(project_assignment)
    db.session.commit()
    return project_assignment


@mutation.field("createUpdateOrDeleteTimeLog")
@convert_kwargs_to_snake_case
def resolve_create_update_or_delete_time_log(obj, info, input):
    project_assignment = find_item(ProjectAssignment, input['project_assignment_id'])
    task = find_item(Task, input['task_id'])
    date = input['date']
    duration = input['duration']

    if project_assignment.user_id != current_user.id:
        roles_check('client_editor')
    errors = []
    if not (task.project_id == project_assignment.project_id):
        errors.append(f"Task {task.id} not assigned to project {project_assignment.project_id}")
    if not (project_assignment.begin_date <= date <= project_assignment.end_date):
        errors.append(f"Date is out of the project assignment range {format_range(project_assignment.date_range())}")
    if not (timedelta(seconds=0) <= duration <= timedelta(hours=24)):
        errors.append(f"Duration must be not more than 24 hours")

    if errors:
        raise ValidationError.errors(errors)

    existing_time_log = TimeLog.query.get(TimeLog.pk(project_assignment.id, task.id, date))
    if existing_time_log:
        db.session.delete(existing_time_log)

    time_log = TimeLog(
        project_assignment=project_assignment,
        task=task,
        date=date,
        duration=duration,
        created_at=datetime.now()
    )
    if duration > timedelta(seconds=0):
        db.session.add(time_log)

    db.session.commit()
    return time_log


@query.field("clientReports")
@convert_kwargs_to_snake_case
def resolve_client_reports(obj, info, client_ids, from_date, to_date):
    return get_client_reports(client_ids, from_date, to_date)


@mutation.field("createClient")
@roles_required('client_editor')
@convert_kwargs_to_snake_case
def resolve_create_client(obj, info, input):
    client = Client(
        name=input['name'],
        tax_id=input.get('tax_id'),
        street_with_number=input.get('street_with_number'),
        zip_code=input.get('zip_code'),
        city=input.get('city'),
        currency=input.get('currency') or Currency.EUR,
        created_at=datetime.now()
    )
    db.session.add(client)
    db.session.commit()
    return client


@mutation.field("updateClient")
@roles_required('client_editor')
@mutate_item(Client, 'client_id')
def resolve_update_client(client, input):
    client.name = input['name']
    client.tax_id = input.get('tax_id'),
    client.street_with_number = input.get('street_with_number'),
    client.zip_code = input.get('zip_code'),
    client.city = input.get('city')
    client.currency = input.get('currency') or Currency.EUR
    return client


@mutation.field("archiveClient")
@roles_required('client_editor')
@mutate_item(Client, 'client_id')
def resolve_archive_client(client, input):
    client.archived = True
    return client


@mutation.field("unarchiveClient")
@roles_required('client_editor')
@mutate_item(Client, 'client_id')
def resolve_unarchive_client(client, input):
    client.archived = False
    return client


@mutation.field("addProject")
@roles_required('client_editor')
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
@roles_required('client_editor')
@mutate_item(Project, 'project_id')
def resolve_update_project(project, input):
    project.name = input['name']
    return project


@mutation.field("archiveProject")
@roles_required('client_editor')
@mutate_item(Project, 'project_id')
def resolve_archive_project(project, input):
    project.archived = True
    return project


@mutation.field("unarchiveProject")
@roles_required('client_editor')
@mutate_item(Project, 'project_id')
def resolve_unarchive_project(project, input):
    project.archived = False
    return project


@mutation.field("addTask")
@roles_required('client_editor')
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
@roles_required('client_editor')
@mutate_item(Task, 'task_id')
def resolve_update_task(task, input):
    task.name = input['name']
    return task


@mutation.field("archiveTask")
@roles_required('client_editor')
@mutate_item(Task, 'task_id')
def resolve_archive_task(task, input):
    task.archived = True
    return task


@mutation.field("unarchiveTask")
@roles_required('client_editor')
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


@mutation.field("createInvoice")
@convert_kwargs_to_snake_case
def resolve_create_invoice(obj, info, input):
    client = find_item(Client, input['client_id'])
    language = input['language']
    billing_begin_date = input['billing_begin_date']
    billing_end_date = input['billing_end_date']

    invoice = Invoice(
        client_id=client.id, 
        billing_begin_date=billing_begin_date,
        billing_end_date=billing_end_date
    )

    db.session.add(invoice)
    db.session.flush()

    settings = Settings.get()
    [client_report] = get_client_reports([client.id], billing_begin_date, billing_end_date)
    html_string = render_template(f'invoice-{language.value.lower()}.html', cr=client_report, v=settings.vendor, invoice_no=invoice.id)
    html_string.encode('UTF-8')

    document = Document(
        title=f'invoice_{invoice.id}_client_{client.id}_{language.value.lower()}.html',
        language=language,
        content=html_string
    )
    invoice.document = document
    db.session.add(document)
    db.session.commit()


    return document.to_document_link()


@mutation.field("createTeam")
@roles_required("team_editor")
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
@roles_required("team_editor")
@mutate_item(Team, 'team_id')
def resolve_update_client(team, input):
    team.name = input.get('name')
    team.description = input.get('description'),
    return team

@mutation.field("archiveTeam")
@roles_required("team_editor")
@mutate_item(Team, 'team_id')
def resolve_archive_project(team, input):
    team.archived = True
    return team


@mutation.field("unarchiveTeam")
@roles_required("team_editor")
@mutate_item(Team, 'team_id')
def resolve_archive_project(team, input):
    team.archived = False
    return team


@mutation.field("createTeamMember")
@roles_required("team_editor")
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


@mutation.field("createTeamMemberBatch")
@roles_required("team_editor")
@convert_kwargs_to_snake_case
def resolve_create_team_member(obj, info, input):
    user_id_list = input.get('user_id_list')
    team_id = input.get('team_id')
    team_members = []
    for user_id in user_id_list:
        team_member = TeamMember(
            user_id=user_id,
            team_id=team_id,
            created_at=datetime.now()
        )
        team_members.append(team_member)
    db.session.add_all(team_members)
    db.session.commit()
    return team_members


@mutation.field("deleteTeamMember")
@roles_required("team_editor")
@convert_kwargs_to_snake_case
def resolve_delete_team_member(obj, info, input):
    user_id = input.get('user_id')
    team_id = input.get('team_id')
    team_member = find_item(TeamMember, TeamMember.pk(user_id, team_id))
    db.session.delete(team_member)
    db.session.commit()
    return team_member


@mutation.field("deleteTeamMemberBatch")
@roles_required("team_editor")
@convert_kwargs_to_snake_case
def resolve_delete_team_member_batch(obj, info, input):
    user_id_list = set(input.get('user_id_list'))
    team_id = input.get('team_id')
    team_members = db.session.query(TeamMember).filter(TeamMember.user_id.in_(user_id_list), TeamMember.team_id == team_id).with_for_update().all()
    if(len(user_id_list) != len(team_members)):
        result_user_id = {str(x.user_id) for x in team_members}
        not_found = user_id_list - result_user_id
        db.session.close()
        raise NotFound(f"Can't find user {not_found} in team {team_id}")
    for team_member in team_members:
        db.session.delete(team_member)
    db.session.commit()
    return team_members


@query.field("teamMembers")
@convert_kwargs_to_snake_case
def resolve_team_members(obj, info, team_id):
    return TeamMember.query.filter(TeamMember.team_id == team_id).all()


@query.field("userTeams")
@convert_kwargs_to_snake_case
def resolve_user_teams(obj, info, user_id):
    return TeamMember.query.filter(TeamMember.user_id == user_id).all()


@mutation.field("createHolidayRequest")
@convert_kwargs_to_snake_case
def resolve_create_holiday_request(obj, info, input):
    user = find_item(User, current_user.id)
    user_id = int(input.get('user_id'))
    if(user_id != current_user.id and not user.is_supervisor_of(user_id)):
        roles_check('holiday_request_approver')
    start_date = input.get('start_date')
    end_date = input.get('end_date')
    if(end_date < start_date):
        raise ValidationError(f"Starting date ({start_date}) must be earlier than ending date ({end_date})")
    if(HolidayRequest.query.filter(
        HolidayRequest.user_id == user_id,
        HolidayRequest.end_date >= start_date, 
        HolidayRequest.start_date <= end_date,
        HolidayRequest.status.in_((HolidayRequestStatus.PENDING, HolidayRequestStatus.ACCEPTED))
        ).count()):
            raise ActiveHolidayRequestError(start_date, end_date)
    holiday_request = HolidayRequest(
        user_id=user_id,
        type=input.get('type'),
        changed_by_id=current_user.id,
        status=HolidayRequestStatus.PENDING,
        start_date=input.get('start_date'),
        end_date=input.get('end_date'),
        created_at=datetime.now()
    )
    db.session.add(holiday_request)
    db.session.commit()
    return holiday_request


@mutation.field("changeHolidayRequestStatus")
@mutate_item(HolidayRequest, 'request_id')
def resolve_change_holiday_request_status(holiday_request, input):
    user = find_item(User, current_user.id)
    status = input.get('status')
    if(status == holiday_request.status):
        raise ValidationError(f"Holiday request {holiday_request.id} is already {holiday_request.status}")
    if(holiday_request.user_id == current_user.id):
        if(holiday_request.status != HolidayRequestStatus.PENDING or status != HolidayRequestStatus.CANCELLED):
            roles_check('manager')
    elif(user.is_supervisor_of(holiday_request.user_id)):
        if(holiday_request.status != HolidayRequestStatus.PENDING or status not in [HolidayRequestStatus.ACCEPTED, HolidayRequestStatus.REJECTED]):
            roles_check('holiday_request_approver')
    else:
        roles_check('manager')
    holiday_request.status = status
    holiday_request.changed_by_id = current_user.id
    return holiday_request


@query.field("holidayRequests")
@convert_kwargs_to_snake_case
def resolve_holiday_requests(obj, info, request_statuses = [], request_types = [], user_list = [], team_list = [], start_date = date.min, end_date = date.max):
    user = find_item(User, current_user.id)
    subordinates = user.get_all_subordinates()
    subordinates = {subordinate.id for subordinate in subordinates}
    wanted_teams = {str(team.id) for team in team_list}
    if(not(user_list or team_list)):
        wanted_users = {current_user.id}
    else:
        wanted_users = {int(user) for user in user_list}
        team_members = TeamMember.query.filter(TeamMember.team_id.in_(wanted_teams)).all()
        wanted_users.update({team_member.user_id for team_member in team_members})
    if(end_date < start_date):
        raise ValidationError(f"Starting date ({start_date}) must be earlier than ending date ({end_date})")
    filters = [HolidayRequest.end_date >= start_date, 
        HolidayRequest.start_date <= end_date,
        HolidayRequest.user_id.in_(wanted_users)]
    if request_statuses:
        filters.append(HolidayRequest.status.in_(request_statuses))
    if request_types:
        filters.append(HolidayRequest.type.in_(request_types))
    if(wanted_users != {current_user.id}):
        permitted_to = subordinates.union({current_user.id})
        if(not wanted_users.issubset(permitted_to)):
            roles_check('holiday_request_approver')
    result = HolidayRequest.query.filter(*filters).all()
    return result


@query.field("daysOff")
@convert_kwargs_to_snake_case
def resolve_holiday_requests(obj, info, user_list = [], team_list = [], start_date = date.min, end_date = date.max):
    wanted_users = {int(user) for user in user_list}
    wanted_teams =  {str(team.id) for team in team_list}
    if(end_date < start_date):
        raise ValidationError(f"Starting date ({start_date}) must be earlier than ending date ({end_date})")
    filters = [HolidayRequest.end_date >= start_date, 
        HolidayRequest.start_date <= end_date,
        HolidayRequest.status == HolidayRequestStatus.ACCEPTED]
    if(user_list or team_list):
        wanted_users = {int(user) for user in user_list}
        team_members = TeamMember.query.filter(TeamMember.team_id.in_(wanted_teams)).all()
        wanted_users.update({team_member.user_id for team_member in team_members})
    result = HolidayRequest.query.filter(*filters).all()
    return result
