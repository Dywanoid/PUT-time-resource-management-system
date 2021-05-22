from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin
from app import app


db = SQLAlchemy(app)


class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    tax_id = db.Column(db.String)
    street_with_number = db.Column(db.String)
    zip_code = db.Column(db.String)
    city = db.Column(db.String)
    archived = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False)
    projects = db.relationship("Project", lazy='joined', order_by="desc(Project.created_at)")


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey(Client.id), nullable=False)
    name = db.Column(db.String)
    archived = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False)
    tasks = db.relationship("Task", lazy='joined', order_by="desc(Task.created_at)")


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(Project.id), nullable=False)
    name = db.Column(db.String)
    archived = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False)

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


class OAuth(OAuthConsumerMixin, db.Model):
    provider_user_id = db.Column(db.String, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    user = db.relationship(User)


class HolidayRequestType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)


class HolidayRequestStatus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)


class HolidayRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    type_id = db.Column(db.Integer, db.ForeignKey(HolidayRequestType.id))
    status_id = db.Column(db.Integer, db.ForeignKey(HolidayRequestStatus.id))
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    status = db.relationship("HolidayRequestStatus", lazy='joined', foreign_keys="HolidayRequest.status_id")
    type = db.relationship("HolidayRequestType", lazy='joined', foreign_keys="HolidayRequest.type_id")
