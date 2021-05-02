from ariadne import graphql_sync
from ariadne.constants import PLAYGROUND_HTML
from flask import request, jsonify
from schema import schema
from app import app, oidc


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
