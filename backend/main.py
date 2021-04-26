#! /usr/bin/env python3

import os
import logging
from flask_migrate import Migrate

from app import app
from database import db
import handler

migrate = Migrate(app, db)

logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
