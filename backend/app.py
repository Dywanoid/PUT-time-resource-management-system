import os

from flask import Flask, redirect, url_for

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

@app.route('/')
def index():
    return redirect(url_for('graphql_blueprint.graphql_server'))
