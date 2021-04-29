from flask_sqlalchemy import SQLAlchemy
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
