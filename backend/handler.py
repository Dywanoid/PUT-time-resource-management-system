import os

from ariadne import graphql_sync
from ariadne.constants import PLAYGROUND_HTML
from flask import abort, request, jsonify, Flask, redirect, render_template, url_for, send_from_directory, make_response
from schema import schema
from app import app
from datetime import datetime
from flask_login import login_required, logout_user
from auth import oidc_blueprint
from werkzeug.urls import url_encode
from datetime import date
from database import Client, db
import pdfkit
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


@app.route('/client/<client_id>/invoice.pdf', methods=["GET"])
def client_invoice_pdf(client_id):
    html_string = create_invoice_html(client_id, request)

    pdf_options = {
        'encoding': 'UTF-8',
        'enable-forms': True
    }
    pdf_string = pdfkit.from_string(html_string, False, pdf_options)

    response = make_response(pdf_string)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=invoice.pdf'
    return response


def create_invoice_html(client_id, request):
    client = Client.query.get(client_id)
    [from_date, to_date] = parse_date_range(request)
    lang = get_language(request)

    [client_report] = reporting.get_client_reports([client.id], from_date, to_date)
    html_string = render_template(f'invoice-{lang}.html', cr=client_report)
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


def get_language(request):
    supported_languages = ['en', 'pl']
    lang = request.args.get('lang') if request.args.get('lang') in supported_languages else None
    lang = lang or request.accept_languages.best_match(supported_languages)
    return lang
