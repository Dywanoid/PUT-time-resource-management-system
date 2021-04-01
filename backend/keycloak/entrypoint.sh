#! /usr/bin/env sh

set -e

if [ "$DATABASE_URL" != "" ]; then
    regex='^postgres://([a-zA-Z0-9_-]+):([a-zA-Z0-9]+)@([a-z0-9.-]+):([[:digit:]]+)/([a-zA-Z0-9_-]+)$'
    if [[ $DATABASE_URL =~ $regex ]]; then
        export DB_ADDR=${BASH_REMATCH[3]}
        export DB_PORT=${BASH_REMATCH[4]}
        export DB_DATABASE=${BASH_REMATCH[5]}
        export DB_USER=${BASH_REMATCH[1]}
        export DB_PASSWORD=${BASH_REMATCH[2]}
        export DB_VENDOR=postgres

        echo "DB_ADDR=$DB_ADDR, DB_PORT=$DB_PORT, DB_DATABASE=$DB_DATABASE, DB_USER=$DB_USER, DB_PASSWORD=$DB_PASSWORD"
    else
        echo "DATABASE_URL doesn't match $regex"
    fi
fi

exec /opt/jboss/tools/docker-entrypoint.sh -Djboss.http.port=${PORT:-8080} -b 0.0.0.0
exit $?
