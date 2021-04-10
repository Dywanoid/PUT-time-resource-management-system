from flask_sqlalchemy import SQLAlchemy
from app import app

db = SQLAlchemy(app)


class Client(db.Model):
    __tablename__ = "client"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    contact = db.Column(db.String)
    tax_id = db.Column(db.String, nullable=False)
    postal_code = db.Column(db.String)
    city = db.Column(db.String)
    street = db.Column(db.String)
    house_number = db.Column(db.String)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "contact": self.contact,
            "tax_id": self.tax_id,
            "postal_code": self.postal_code,
            "city": self.city,
            "street": self.street,
            "house_number": self.house_number
        }


class Employee(db.Model):
    __tablename__ = "employee"
    id = db.Column(db.Integer,primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    profession = db.Column(db.String)
    supervisor_id = db.Column(db.Integer, db.ForeignKey(id))

    supervisor = db.relationship("Employee", foreign_keys="Employee.id")

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "profession": self.profession,
            "supervisor": {
                "id": self.supervisor.id,
                "first_name": self.supervisor.first_name,
                "last_name": self.supervisor.last_name
            }
        }


class ProjectStatuse(db.Model):
    __tablename__ = "project_status"
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String, nullable=False)


class Project(db.Model):
    __tablename__ = "project"
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey(Client.id), nullable=False)
    name = db.Column(db.String, nullable=False)
    due_date = db.Column(db.Date)
    deadline = db.Column(db.Date)
    status_id = db.Column(db.Integer, db.ForeignKey(ProjectStatuse.id))

    client = db.relationship("Client", foreign_keys="Project.client_id")
    status = db.relationship("ProjectStatuse", foreign_keys="Project.status_id")

    def to_dict(self):
        return {
            "id": self.id,
            "client": {
                "id": self.client.id,
                "name": self.client.name
            },
            "name": self.name,
            "due_date": self.due_date,
            "deadline": self.deadline,
            "status": self.status.status
        }
    

class ProjectRole(db.Model):
    __tablename__ = "project_role"
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String, nullable=False)


class ProjectAssignment(db.Model):
    __tablename__ = "project_assignment"
    employee_id = db.Column(db.Integer, db.ForeignKey(Employee.id),primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(Project.id),primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey(ProjectRole.id))

    employee = db.relationship("Employee", foreign_keys="ProjectAssignment.employee_id")
    project = db.relationship("Project", foreign_keys="ProjectAssignment.project_id")
    role = db.relationship("ProjectRole", foreign_keys="ProjectAssignment.role_id")