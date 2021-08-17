# Realm export

If you changed the realm settings or added new users and you wish to persist your settings between application restarts, you will need to export the realm from a running container.

## Start all the services

If you haven't already, start the services by running following command in the project root directory.

```
docker-compose -p pracujta up
```

## Start the export

While the services are up, run the following command, it will start the 2nd keycloak instance which will export the `pracujta-realm` into the JSON file:
```
docker exec -e DB_VENDOR=postgres -e DB_ADDR=db -e DB_USER=postgres -e DB_PASSWORD=password \
  -it pracujta_auth_1 /opt/jboss/keycloak/bin/standalone.sh \
  -Djboss.socket.binding.port-offset=100 -Dkeycloak.migration.action=export \
  -Dkeycloak.migration.provider=singleFile \
  -Dkeycloak.migration.realmName=pracujta-realm \
  -Dkeycloak.migration.usersExportStrategy=REALM_FILE \
  -Dkeycloak.migration.file=/tmp/realm-export.json
```
## Stop the 2nd instance

Wait till the 2nd instance has started successfully, by awaiting for a log entry that looks similar to `Keycloak 12.0.4 (WildFly Core 13.0.3.Final) started in 12630ms`, then stop it by pressing `Ctrl+C` in the console.

## Replace the existing realm settings

Replace the existing `realm-export.json` with the recently exported one:
```
docker cp pracujta_auth_1:/tmp/realm-export.json backend/keycloak/realm-export.json
```
