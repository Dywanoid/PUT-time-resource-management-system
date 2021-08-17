import os
import logging

from datetime import datetime
from flask import Flask, redirect, url_for, Blueprint
from flask_login import current_user, login_user
from flask_dance.consumer import OAuth2ConsumerBlueprint, oauth_authorized
from flask_dance.consumer.storage.sqla import SQLAlchemyStorage

from app import app, cache, login_manager
from database import User, OAuth, db
from error import Unauthorized

from werkzeug.exceptions import ServiceUnavailable


def role_check(role):
    roles_check([role])


def roles_check(all_roles=[], any_role=[]):
    def role_predicate(role):
        return role in current_user.roles

    all_present = all(map(role_predicate, all_roles))
    any_present = any(map(role_predicate, any_role))

    if not all_present:
        raise Unauthorized(current_user.name)
    if any_role and not any_present:
        raise Unauthorized(current_user.name)


def role_required(role):
    """
    Decorator that checks if current user has specified role assigned.
    If not throws an exception.
    """
    return roles_required([role])


def roles_required(all_roles=[], any_role=[]):
    """
    Decorator that checks if current user has specified roles assigned.
    If not throws an exception.
    """
    def inner(func):
        def wrapper(*args, **kwargs):
            roles_check(all_roles, any_role)
            return func(*args, **kwargs)
        return wrapper
    return inner


@login_manager.user_loader
@cache.memoize(timeout=60)
def load_user(user_id):
    return User.query.get(user_id)


@login_manager.unauthorized_handler
def unauthorized_callback():
    return redirect(url_for('oidc.login'))


oidc_blueprint = OAuth2ConsumerBlueprint(
    "oidc", __name__,
    client_id=app.config['OIDC_CLIENT_ID'],
    client_secret=app.config['OIDC_CLIENT_SECRET'],
    scope=['openid', 'email', 'profile'],
    storage=SQLAlchemyStorage(OAuth, db.session, user=current_user),
    base_url=app.config['OIDC_BASE_URL'],
    token_url=app.config['OIDC_TOKEN_URL'],
    authorization_url=app.config['OIDC_AUTHORIZATION_URL']
)


@oauth_authorized.connect_via(oidc_blueprint)
def authorized_callback(blueprint, token):
    host = app.config['OIDC_HOST_HEADER_OVERRIDE']
    headers = {'Host': host} if host else {}
    response = blueprint.session.get(app.config['OIDC_USERINFO_URL'], headers=headers)

    if not response.ok:
        logging.error(f"Error {response.status_code} from authorization server, url {response.url}")
        raise ServiceUnavailable("Unable to retreive user details")

    user_info = response.json()
    provider_user_id = str(user_info['sub'])
    user_roles = user_info['resource_access'].get('pracujta', {}).get('roles', [])
    user_name = user_info['name']
    oauth = OAuth.query.filter_by(provider=blueprint.name,
                                  provider_user_id=provider_user_id).first()
    if not oauth:
        oauth = OAuth(provider=blueprint.name,
                      provider_user_id=provider_user_id,
                      token=token)
        user = User(name=user_name, roles=user_roles,
                    created_at=datetime.now())
        oauth.user = user
        db.session.add_all([user, oauth])
        db.session.commit()
        login_user(user)
    else:
        oauth.token = token
        user = oauth.user
        user.name = user_name
        user.roles = user_roles
        db.session.commit()
        login_user(user)

    return False


app.register_blueprint(oidc_blueprint, url_prefix="/login")
