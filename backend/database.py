import enum
from flask import url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import composite, deferred
from app import app, cache
from dataclasses import dataclass
from decimal import Decimal

db = SQLAlchemy(app)


class Language(enum.Enum):
    PL = 'PL'
    EN = 'EN'


class Currency(enum.Enum):
    EUR = 'EUR'
    USD = 'USD'
    PLN = 'PLN'


class HolidayRequestStatus(enum.Enum):
    PENDING =   'PENDING'
    ACCEPTED =  'ACCEPTED'
    REJECTED =  'REJECTED'
    CANCELLED = 'CANCELLED'


class HolidayRequestType(enum.Enum):
    HOLIDAY = 'HOLIDAY'
    ON_DEMAND = 'ON_DEMAND'
    UNPAID = 'UNPAID'
    CHILD_CARE = 'CHILD_CARE'
    COMPASSIONATE_LEAVE = 'COMPASSIONATE_LEAVE'
    SICK_LEAVE = 'SICK_LEAVE'




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

    projects = db.relationship("Project", order_by="desc(Project.created_at)", back_populates="client")


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey(Client.id), nullable=False)
    name = db.Column(db.String, nullable=False)
    archived = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False)

    client = db.relationship(Client, back_populates="projects")
    tasks = db.relationship("Task", order_by="desc(Task.created_at)", back_populates="project")
    assignments = db.relationship("ProjectAssignment", order_by="desc(ProjectAssignment.created_at)", back_populates="project")


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(Project.id), nullable=False)
    name = db.Column(db.String, nullable=False)
    archived = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False)

    project = db.relationship(Project, back_populates="tasks")


class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    archived = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False)

    members = association_proxy('team_memberships', 'user')
    team_memberships = db.relationship("TeamMember", back_populates="team")


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    supervisor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    roles = db.Column(db.JSON, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    teams = association_proxy('team_memberships', 'team')
    team_memberships = db.relationship("TeamMember", back_populates="user")
    supervisor = db.relationship('User', remote_side=[id])
    subordinates = db.relationship('User')

    def get_all_subordinates(self):
        subordinates = [subordinate for subordinate in self.subordinates]
        for subordinate in self.subordinates:
            subordinates += subordinate.get_all_subordinates()
        return subordinates

    def is_supervisor_of(self, subordinate_id):
        subordinates = self.get_all_subordinates()
        for subordinate in subordinates:
            if(subordinate_id == subordinate.id):
                return True
        return False


class TeamMember(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey(Team.id), primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship(User, back_populates="team_memberships")
    team = db.relationship(Team, back_populates="team_memberships")

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


class HolidayRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    changed_by_id = db.Column(db.Integer, db.ForeignKey(User.id))
    type = db.Column(db.Enum(HolidayRequestType), nullable=False)
    status = db.Column(db.Enum(HolidayRequestStatus), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship(User, lazy='joined', foreign_keys=[user_id])
    changed_by = db.relationship(User, lazy='joined', foreign_keys=[changed_by_id])


class ProjectAssignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(Project.id), nullable=False)
    begin_date = db.Column(db.Date, nullable=False, index=True)
    end_date = db.Column(db.Date, nullable=False, index=True)
    hourly_rate = db.Column(db.Numeric, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    project = db.relationship(Project, back_populates="assignments")
    user = db.relationship(User)

    def date_range(self):
        return (self.begin_date, self.end_date)


class TimeLog(db.Model):
    project_assignment_id = db.Column(db.Integer,  db.ForeignKey(ProjectAssignment.id), nullable=False, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey(Task.id), nullable=False, primary_key=True)
    date = db.Column(db.Date, nullable=False, index=True, primary_key=True)
    duration = db.Column(db.Interval, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    project_assignment = db.relationship(ProjectAssignment)
    task = db.relationship(Task)

    @classmethod
    def pk(cls, project_assignment_id, task_id, date):
        return {
            'project_assignment_id': project_assignment_id,
            'task_id': task_id,
            'date': date
        }


@dataclass
class DocumentLink:
    title: str
    url: str
    language: Language


class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    language = db.Column(db.Enum(Language), nullable=False)
    content = deferred(db.Column(db.Text, nullable=False))

    def to_document_link(self):
        return DocumentLink(
            title=self.title, 
            url=url_for('get_document', id=self.id, _external=True),
            language=self.language
        )


class Invoice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey(Client.id), nullable=False)
    billing_begin_date = db.Column(db.Date, nullable=False)
    billing_end_date = db.Column(db.Date, nullable=False)
    document_id = db.Column(db.Integer, db.ForeignKey(Document.id))

    document = db.relationship(Document, lazy='joined')

    __table_args__ = (
        db.Index('invoice_query_idx', client_id, billing_begin_date, billing_end_date),
    )


@dataclass
class VendorSettings:
    name: str
    tax_id: str
    street_with_number: str
    zip_code: str
    city: str
    currency: Currency
    vat_rate: Decimal

    def __composite_values__(self):
        return self.name, self.tax_id, self.street_with_number, self.zip_code, self.city, self.currency, self.vat_rate


# singleton
class Settings(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    vendor_name = db.Column(db.String, nullable=False)
    vendor_tax_id = db.Column(db.String)
    vendor_street_with_number = db.Column(db.String)
    vendor_zip_code = db.Column(db.String)
    vendor_city = db.Column(db.String)
    vendor_currency = db.Column(db.Enum(Currency), nullable=False)
    vendor_vat_rate = db.Column(db.Numeric, nullable=False)

    vendor = composite(VendorSettings,
                       vendor_name,
                       vendor_tax_id,
                       vendor_street_with_number,
                       vendor_zip_code,
                       vendor_city,
                       vendor_currency,
                       vendor_vat_rate)

    @classmethod
    @cache.memoize(timeout=600)
    def get(cls):
        return cls.query.get(1)
