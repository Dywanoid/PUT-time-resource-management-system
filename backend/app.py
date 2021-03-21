import os

from flask import Flask, redirect, url_for, send_from_directory
from flask_oidc import OpenIDConnect

app = Flask(__name__, static_folder='build')
app.config.update({
    'SQLALCHEMY_DATABASE_URI': os.getenv("DATABASE_URL"),
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,
    'SECRET_KEY': os.getenv("SECRET_KEY"),
    'OIDC_SCOPES': ['openid', 'email', 'profile'],
    'OIDC_COOKIE_SECURE': False, # True for production
    'OIDC_CLIENT_SECRETS': os.getenv("OIDC_CLIENT_SECRETS")
})
oidc = OpenIDConnect(app)

@app.route('/')
def index():
    return redirect(url_for('graphql_server'))

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
