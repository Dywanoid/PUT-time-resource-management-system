import os

from ariadne import graphql_sync
from ariadne.constants import PLAYGROUND_HTML
from flask import request, jsonify, Flask, redirect, url_for, send_from_directory
from schema import schema
from app import app, oidc
from database import User, db
from datetime import datetime


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@oidc.require_login
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        create_or_update_user() # TODO replace this with hook
        return send_from_directory(app.static_folder, 'index.html')


def create_or_update_user():
    user_id = oidc.user_getfield('sub')
    user = User.query.get(user_id)
    if user:
        user.name = oidc.user_getfield('name')
    else:
        user = User(
            id=user_id,
            name=oidc.user_getfield('name'),
            created_at=datetime.now()
        )
        db.session.add(user)
    db.session.commit()


@app.route("/graphql", methods=["GET"])
@oidc.require_login
def graphql_playground():
    return PLAYGROUND_HTML, 200


@app.route("/graphql", methods=["POST"])
@oidc.require_login
def graphql_server():
    data = request.get_json()

    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=False
    )

    status_code = 200 if success else 400
    return jsonify(result), status_code
