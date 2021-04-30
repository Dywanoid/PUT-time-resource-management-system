import os

from flask import Flask, redirect, url_for, send_from_directory
from flask_oidc import OpenIDConnect
from flask_talisman import Talisman
from flask_cors import CORS

app = Flask(__name__, static_folder='/app/frontend/build')
app.config.update({
    'SQLALCHEMY_DATABASE_URI': os.getenv("DATABASE_URL"),
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,
    'SECRET_KEY': os.getenv("SECRET_KEY", "secret"),
    'OIDC_SCOPES': ['openid', 'email', 'profile'],
    'OIDC_COOKIE_SECURE': os.getenv("OIDC_COOKIE_SECURE", True),
    'OIDC_CLIENT_SECRETS': os.getenv("OIDC_CLIENT_SECRETS", "local_client_secrets.json"),
    'OVERWRITE_REDIRECT_URI': os.getenv("OVERWRITE_REDIRECT_URI", False),
    'CORS_SUPPORTS_CREDENTIALS': True,
    'CORS_ORIGINS': 'http://localhost*'
})
cors = CORS(app)
oidc = OpenIDConnect(app)
Talisman(app, content_security_policy=None)





@app.route('/info')
def info():
    if oidc.user_loggedin:
        return 'Logged in as %s' % oidc.user_getfield('name')
    else:
        return 'Not logged in'


@app.route('/login')
@oidc.require_login
def login():
    return 'Welcome %s' % oidc.user_getfield('name')


@app.route('/logout')
def logout():
    oidc.logout()
    return 'You have successfully logged out'

