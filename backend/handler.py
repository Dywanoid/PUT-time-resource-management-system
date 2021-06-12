import os

from ariadne import graphql_sync
from ariadne.constants import PLAYGROUND_HTML
from flask import request, jsonify, Flask, redirect, url_for, send_from_directory
from schema import schema
from app import app
from datetime import datetime
from flask_login import login_required, logout_user
from auth import oidc_blueprint
from werkzeug.urls import url_encode

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
    encoded_redirect_params = url_encode({'redirect_uri': url_for('oidc.login', _external=True)})
    oidc_logout_url = f"{app.config['OIDC_END_SESSION_URL']}?{encoded_redirect_params}"
    logout_user()
    return redirect(oidc_logout_url)
