#! /usr/bin/env python3

import os

from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand

from app import app
from database import db
from handler import graphql_bp

app.register_blueprint(graphql_bp)

migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)
manager.add_command('runserver', Server(
    host="0.0.0.0",
    port=os.getenv("PORT", "80"),
    use_debugger=True,
    use_reloader=True
))

if __name__ == "__main__":
    manager.run()
