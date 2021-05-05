#! /usr/bin/env python3

import os
import logging
from flask_migrate import Migrate

from app import app
from database import db
import handler
import auth

migrate = Migrate(app, db)
