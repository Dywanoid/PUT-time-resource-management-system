import os

from flask import Flask, redirect, url_for, send_from_directory
from flask_caching import Cache
from flask_cors import CORS
from flask_login import LoginManager
from flask_talisman import Talisman

OIDC_BASE_URL = os.getenv("OIDC_BASE_URL", "http://localhost:8080/auth/realms/pracujtime-realm/protocol/openid-connect")

app = Flask(__name__, static_folder='/app/frontend/build')
app.config.update({
    'SQLALCHEMY_DATABASE_URI': os.getenv("DATABASE_URL"),
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,
    'SQLALCHEMY_ECHO': bool(os.getenv("SQLALCHEMY_ECHO", False)),
    'SECRET_KEY': os.getenv("SECRET_KEY", os.urandom(16)),
    'SERVER_NAME': os.getenv("SERVER_NAME", "localhost"),
    'PREFERRED_URL_SCHEME': os.getenv("PREFERRED_URL_SCHEME", "http"),
    'CORS_SUPPORTS_CREDENTIALS': True,
    'CORS_ORIGINS': 'http://localhost*',
    'CACHE_TYPE': 'SimpleCache',
    'CACHE_DEFAULT_TIMEOUT': 60,
    'OIDC_BASE_URL': OIDC_BASE_URL,
    'OIDC_CLIENT_ID': os.getenv("OIDC_CLIENT_ID", "pracujtime"),
    'OIDC_CLIENT_SECRET': os.getenv("OIDC_CLIENT_SECRET", "99188acf-689e-41e2-b949-b4c50c10233d"),
    'OIDC_USERINFO_URL': os.getenv("OIDC_USERINFO_URL", f"{OIDC_BASE_URL}/userinfo"),
    'OIDC_TOKEN_URL': os.getenv("OIDC_TOKEN_URL", f"{OIDC_BASE_URL}/token"),
    'OIDC_AUTHORIZATION_URL': os.getenv("OIDC_AUTHORIZATION_URL", f"{OIDC_BASE_URL}/auth"),
    'OIDC_END_SESSION_URL': os.getenv("OIDC_END_SESSION_URL", f"{OIDC_BASE_URL}/logout"),
    'OIDC_HOST_HEADER_OVERRIDE': os.getenv("OIDC_HOST_HEADER_OVERRIDE", None)
})
cache = Cache(app)
login_manager = LoginManager(app)

CORS(app)
Talisman(app, content_security_policy=None)
