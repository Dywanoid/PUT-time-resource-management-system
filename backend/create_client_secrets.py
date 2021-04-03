#! /usr/bin/env python3

import json
import click

@click.command()
@click.argument('output-file')
@click.option("--client-id", required=True)
@click.option("--client-secret", required=True)
@click.option("--realm", required=True)
@click.option("--redirect-uri", required=True)
@click.option("--keycloak-root-uri", required=True)
@click.option("--keycloak-root-uri-external")
def create_client_secrets(output_file, client_id, client_secret, realm, redirect_uri, keycloak_root_uri, keycloak_root_uri_external):
    """Creates a JSON config file, that enables the app to connect to a keycloak instance using OIDC protocol"""
    client_secrets = {
        "web": {
            "client_id": client_id,
            "client_secret": client_secret,
            "issuer": f"{keycloak_root_uri_external or keycloak_root_uri}/auth/realms/{realm}",
            "auth_uri": f"{keycloak_root_uri_external or keycloak_root_uri}/auth/realms/{realm}/protocol/openid-connect/auth",
            "token_uri": f"{keycloak_root_uri}/auth/realms/{realm}/protocol/openid-connect/token",
            "token_introspection_uri": f"{keycloak_root_uri}/auth/realms/{realm}/protocol/openid-connect/token/introspect",
            "userinfo_uri": f"{keycloak_root_uri}/auth/realms/{realm}/protocol/openid-connect/userinfo", 
            "realm": f"{realm}",
            "resource": client_id,
            "redirect_uris": [redirect_uri]
        }
    }
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(client_secrets, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    create_client_secrets(auto_envvar_prefix='OIDC')
