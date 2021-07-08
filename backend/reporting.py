from collections import defaultdict
from database import Client, Currency, Document, DocumentLink, Invoice, Project, Task, Team, TeamMember, TimeLog, User, ProjectAssignment, db
from datetime import datetime, date, timedelta
from dataclasses import dataclass, field
from typing import Dict, List
from decimal import *
from sqlalchemy import func
from sqlalchemy.orm import contains_eager, joinedload
from formatting import rounded_decimal, hours
from app import app


@dataclass
class TimeLogSummary:
    client: Client
    project: Project
    task: Task
    project_assignment: ProjectAssignment
    user: User
    duration: timedelta
    cost: Decimal


@dataclass
class Report:
    total_cost: Decimal = Decimal(0)

    def add_tls(self, tls):
        pass


@dataclass
class ProjectAssignmentReport(Report):
    project_assignment: ProjectAssignment = None
    total_duration: timedelta = timedelta(seconds=0)

    def add_tls(self, tls):
        self.total_cost += tls.cost
        self.total_duration += tls.duration


@dataclass
class UserReport(Report):
    user: User = None
    project_assignment_reports_by_id: Dict[int, ProjectAssignmentReport] = field(
        default_factory=dict)

    @property
    def project_assignment_reports(self):
        return self.project_assignment_reports_by_id.values()

    def add_tls(self, tls):
        self.total_cost += tls.cost
        project_assignment_report = self.project_assignment_reports_by_id.setdefault(
            tls.project_assignment.id, ProjectAssignmentReport(project_assignment=tls.project_assignment))
        project_assignment_report.add_tls(tls)


@dataclass
class TaskReport(Report):
    task: Task = None
    user_reports_by_id: Dict[int, UserReport] = field(default_factory=dict)

    @property
    def user_reports(self):
        return self.user_reports_by_id.values()

    def add_tls(self, tls):
        self.total_cost += tls.cost
        user_report = self.user_reports_by_id.setdefault(
            tls.user.id, UserReport(user=tls.user))
        user_report.add_tls(tls)


@dataclass
class ProjectReport(Report):
    project: Project = None
    task_reports_by_id: Dict[int, TaskReport] = field(default_factory=dict)
    user_reports_by_id: Dict[int, UserReport] = field(default_factory=dict)

    @property
    def task_reports(self):
        return self.task_reports_by_id.values()

    @property
    def user_reports(self):
        return self.user_reports_by_id.values()

    def add_tls(self, tls):
        self.total_cost += tls.cost
        task_report = self.task_reports_by_id.setdefault(
            tls.task.id, TaskReport(task=tls.task))
        task_report.add_tls(tls)
        user_report = self.user_reports_by_id.setdefault(
            tls.user.id, UserReport(user=tls.user))
        user_report.add_tls(tls)


@dataclass
class ClientReport(Report):
    client: Client = None
    project_reports_by_id: Dict[int, ProjectReport] = field(
        default_factory=dict)
    user_reports_by_id: Dict[int, UserReport] = field(default_factory=dict)
    invoice_links: List[str] = field(default_factory=list)

    @property
    def project_reports(self):
        return self.project_reports_by_id.values()

    @property
    def user_reports(self):
        return self.user_reports_by_id.values()

    def add_tls(self, tls):
        self.total_cost += tls.cost
        project_report = self.project_reports_by_id.setdefault(
            tls.project.id, ProjectReport(project=tls.project))
        project_report.add_tls(tls)
        user_report = self.user_reports_by_id.setdefault(
            tls.user.id, UserReport(user=tls.user))
        user_report.add_tls(tls)


def get_client_reports(client_ids, from_date, to_date):
    filters = [ProjectAssignment.end_date >= from_date, ProjectAssignment.begin_date <= to_date]
    if client_ids:
        filters.append(Client.id.in_(client_ids))

    clients = (Client.query
               .outerjoin(Client.projects, Project.assignments, ProjectAssignment.user)
               .options(contains_eager(Client.projects, Project.assignments, ProjectAssignment.user))
               .options(joinedload(Client.projects, Project.tasks))
               .filter(db.and_(*filters))
               .all())

    invoice_filters = [Invoice.billing_end_date >= from_date, Invoice.billing_begin_date <= to_date]
    if client_ids:
        invoice_filters.append(Invoice.client_id.in_(client_ids))
    
    invoices = (Invoice.query
                .filter(db.and_(*invoice_filters))
                .all())

    invoices_by_client_id = defaultdict(list)
    for invoice in invoices:
        invoices_by_client_id[invoice.client_id].append(invoice)

    client_reports_by_id = {client.id: ClientReport(client=client, invoice_links=map(lambda i: i.document.to_document_link(), invoices_by_client_id[client.id])) for client in clients}
    project_assignments_by_id = {project_assignment.id: project_assignment for client in clients for project in client.projects for project_assignment in project.assignments}
    tasks_by_id = {task.id: task for client in clients for project in client.projects for task in project.tasks}

    tls_source = (db.session
                  .query(TimeLog.task_id, TimeLog.project_assignment_id, func.sum(TimeLog.duration))
                  .filter(TimeLog.date >= from_date, TimeLog.date <= to_date)
                  .group_by(TimeLog.task_id, TimeLog.project_assignment_id)
                  .all())

    for [task_id, project_assignment_id, duration] in tls_source:
        if task_id not in tasks_by_id or project_assignment_id not in project_assignments_by_id:
            app.logger.warning(f"Time logged for task with id {task_id} outside of it's project assignment date range")
            continue
        task = tasks_by_id[task_id]
        project_assignment = project_assignments_by_id[project_assignment_id]
        cost = calculate_cost(project_assignment.hourly_rate, duration)
        tls = TimeLogSummary(
            client=task.project.client,
            project=task.project,
            task=task,
            project_assignment=project_assignment,
            user=project_assignment.user,
            duration=duration,
            cost=cost
        )

        client_reports_by_id[tls.client.id].add_tls(tls)

    return client_reports_by_id.values()


def calculate_cost(hourly_rate, duration):
    return rounded_decimal(hourly_rate * Decimal(hours(duration)))
