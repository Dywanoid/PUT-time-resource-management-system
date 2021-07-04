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
from database import db, User, ProjectAssignment, TimeLog, Client, Settings
import re
from datetime import date
import reporting

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
@roles_required('manager')
def export(start_date, end_date):
    pattern = r"^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
    if(not (re.match(pattern, start_date) and re.match(pattern, end_date))):
        return
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


@app.route('/client/<client_id>/invoice.html', methods=["GET"])
def client_invoice_html(client_id):
    html_string = create_invoice_html(client_id, request)

    response = make_response(html_string)
    response.headers['Content-Type'] = 'text/html; charset=UTF-8'
    response.headers['Content-Disposition'] = 'inline; filename=invoice.html'
    return response


def create_invoice_html(client_id, request):
    client = Client.query.get(client_id)
    team_ids = get_team_ids(request)
    [from_date, to_date] = parse_date_range(request)
    lang = get_language(request)
    settings = Settings.get()

    [client_report] = reporting.get_client_reports([client.id], team_ids, from_date, to_date)
    html_string = render_template(f'invoice-{lang}.html', cr=client_report, v=settings.vendor)
    html_string.encode('UTF-8')

    return html_string


def find_client(client_id):
    client = Client.query.get(client_id)
    return client if client else abort(404, description=f"Could not resolve Client with id {client_id}")


def parse_date_range(request):
    try:
        from_date = date.fromisoformat(request.args.get('from_date'))
        to_date = date.fromisoformat(request.args.get('to_date'))
        return (from_date, to_date)
    except Exception:
        abort(400, description=f"Invalid or missing parameter from_date or to_date")


def get_team_ids(request):
    return request.args.getlist('team_ids') or []


def get_language(request):
    supported_languages = ['en', 'pl']
    lang = request.args.get('lang') if request.args.get('lang') in supported_languages else None
    lang = lang or request.accept_languages.best_match(supported_languages)
    return lang
