import enum
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin
from app import app


db = SQLAlchemy(app)


class Currency(enum.Enum):
    EUR = 'EUR'
    USD = 'USD'
    PLN = 'PLN'


class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    tax_id = db.Column(db.String)
    street_with_number = db.Column(db.String)
    zip_code = db.Column(db.String)
    city = db.Column(db.String)
    currency = db.Column(db.Enum(Currency), nullable=False)
    archived = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False)
    projects = db.relationship("Project", order_by="desc(Project.created_at)")


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey(Client.id), nullable=False)
    name = db.Column(db.String, nullable=False)
    archived = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False)
    client = db.relationship(Client, lazy='joined')
    tasks = db.relationship("Task", order_by="desc(Task.created_at)")
    assignments = db.relationship("ProjectAssignment", order_by="desc(ProjectAssignment.created_at)")


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(Project.id), nullable=False)
    name = db.Column(db.String, nullable=False)
    archived = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False)
    project = db.relationship(Project, lazy='joined')


class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    archived = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    roles = db.Column(db.JSON, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)


class TeamMember(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey(Team.id), primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False)

    @classmethod
    def pk(cls, user_id, team_id):
        return {
            'user_id': user_id,
            'team_id': team_id
        }


class OAuth(OAuthConsumerMixin, db.Model):
    provider_user_id = db.Column(db.String, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    user = db.relationship(User)


class ProjectAssignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(Project.id), nullable=False)
    begin_date = db.Column(db.Date, nullable=False, index=True)
    end_date = db.Column(db.Date, nullable=False, index=True)
    hourly_rate = db.Column(db.Numeric, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    project = db.relationship(Project, lazy='joined')
    user = db.relationship(User, lazy='joined')

    def date_range(self):
        return (self.begin_date, self.end_date)


class TimeLog(db.Model):
    project_assignment_id = db.Column(db.Integer,  db.ForeignKey(ProjectAssignment.id), nullable=False, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey(Task.id), nullable=False, primary_key=True)
    date = db.Column(db.Date, nullable=False, index=True, primary_key=True)
    duration = db.Column(db.Interval, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    project_assignment = db.relationship(ProjectAssignment, lazy='joined')
    task = db.relationship(Task, lazy='joined')

    @classmethod
    def pk(cls, project_assignment_id, task_id, date):
        return {
            'project_assignment_id': project_assignment_id,
            'task_id': task_id,
            'date': date
        }
