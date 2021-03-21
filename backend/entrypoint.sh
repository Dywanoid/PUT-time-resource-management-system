#! /usr/bin/env sh

set -e

export FLASK_APP=main.py

if [ "$OIDC_CLIENT_SECRETS" == "" ]; then
    export OIDC_CLIENT_SECRETS=/tmp/client_secrets.json
    python3 create_client_secrets.py "$OIDC_CLIENT_SECRETS"
    echo "Client secrets saved to $OIDC_CLIENT_SECRETS"
fi

flask db upgrade && flask run --host=0.0.0.0 --port=${PORT:-80}
