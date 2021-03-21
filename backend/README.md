# Running the app

## Requirements
The only requirement is to have Docker and Docker Compose installed in your system.
You can install these tools with [Docker Desktop](https://docs.docker.com/desktop/) distribution.

## Start all the services

```shell script
docker-compose up
```

## Open the app homepage

Login either as `jkowalski` or `pnowak`. Password for both users is `password`.

http://localhost/

# User management

* [Keycloak administration console](http://localhost:8080/auth/admin/) - user `admin`, password `admin`
* [Account console](http://localhost:8080/auth/realms/pracujta-realm/account) - user credentials, eg. user `jkowalski`, password `password`


# Realm export

If you changed the realm settings or added new users and you wish your settings to be persisted between application restarts, you will need to export realm from running container.

## Start the export

While `docker-compose` is up, run the following command, it will start the 2nd keycloak instance which will export the `pracujta-realm` into the JSON file:
```
docker exec -e DB_VENDOR=postgres -e DB_ADDR=db -e DB_USER=postgres -e DB_PASSWORD=password \
  -it backend_auth_1 /opt/jboss/keycloak/bin/standalone.sh \
  -Djboss.socket.binding.port-offset=100 -Dkeycloak.migration.action=export \
  -Dkeycloak.migration.provider=singleFile \
  -Dkeycloak.migration.realmName=pracujta-realm \
  -Dkeycloak.migration.usersExportStrategy=REALM_FILE \
  -Dkeycloak.migration.file=/tmp/realm-export.json
```
## Stop the 2nd instance

Stop the second instance by pressing `Ctrl+C` in the console.

## Copy the exported file

The exported file needs to be copied to the local filesystem:
```
docker cp backend_auth_1:/tmp/realm-export.json keycloak/realm-export.json
```
