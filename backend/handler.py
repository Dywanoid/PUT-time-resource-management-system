import os

from ariadne import graphql_sync
from ariadne.constants import PLAYGROUND_HTML
from flask import abort, request, jsonify, Flask, redirect, render_template, url_for, send_from_directory, make_response
from schema import schema
from app import app
from datetime import datetime
from flask_login import login_required, logout_user
from auth import oidc_blueprint, roles_required
from werkzeug.urls import url_encode
import csv
from io import StringIO
from database import db, Document, User, ProjectAssignment, TimeLog, Client, Settings
import re
from datetime import date

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


@app.route('/export/employees_time/<string:start_date>/<string:end_date>', methods=['GET'])
@roles_required('report_viewer')
def export(start_date, end_date):
    pattern = r"^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
    if(not (re.match(pattern, start_date) and re.match(pattern, end_date))):
        return abort(400, description=f"Invalid date format, expected YYYY-MM-DD")
    si = StringIO()
    cw = csv.writer(si, delimiter=';')
    cw.writerow(["Employee Number", "Name", "Worked hours"])
    rows = (TimeLog.query.with_entities(User.id, User.name, db.func.sum(TimeLog.duration)).
        join(ProjectAssignment, ProjectAssignment.id == TimeLog.project_assignment_id).
        join(User, User.id == ProjectAssignment.user_id).
        filter(TimeLog.date >= start_date, TimeLog.date <= end_date).
        group_by(User.id, User.name).
        order_by(User.id).
        all())
    rows = [(row[0], row[1], row[2].total_seconds() / 3600) for row in rows]
    cw.writerows(rows)
    response = make_response(si.getvalue())
    response.headers['Content-Disposition'] = f'attachment; filename=report_{start_date}_{end_date}.csv'
    response.headers["Content-type"] = "text/csv"
    return response


@app.route('/logout')
def logout():
    encoded_redirect_params = url_encode({'redirect_uri': url_for('oidc.login', _external=True)})
    oidc_logout_url = f"{app.config['OIDC_END_SESSION_URL']}?{encoded_redirect_params}"
    logout_user()
    return redirect(oidc_logout_url)


@app.route('/document/<id>', methods=["GET"])
def get_document(id):
    document = Document.query.get(id)
    if document:
        response = make_response(document.content)
        response.headers['Content-Type'] = 'text/html; charset=UTF-8'
        response.headers['Content-Disposition'] = f'attachment; filename={document.title}'
        return response
    else:
        abort(404, description=f"Could not resolve Document with id {id}")

