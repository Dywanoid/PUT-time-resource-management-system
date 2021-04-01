#! /usr/bin/env python3

import os
from flask_migrate import Migrate

from app import app
from database import db
import handler

migrate = Migrate(app, db)
