import os

from ariadne import graphql_sync
from ariadne.constants import PLAYGROUND_HTML
from flask import request, jsonify, Flask, redirect, url_for, send_from_directory
from schema import schema
from app import app
from database import User, db
from datetime import datetime
from flask_login import login_required, logout_user


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@login_required
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route("/graphql", methods=["GET"])
@login_required
def graphql_playground():
    return PLAYGROUND_HTML, 200


@app.route("/graphql", methods=["POST"])
@login_required
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

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('oidc.login'))
