# PUT-time-resource-management-system

## Frontend development

### Requirements

The only requirement is to have Node.js installed in your system. [Get npm!](https://www.npmjs.com/get-npm).

### Install dependencies

```
cd frontend
npm install
```

### Start the development server

```
npm start
```

## Backend development

### Requirements

The only requirement is to have Docker and Docker Compose installed in your system.
Get them with [Docker Desktop](https://docs.docker.com/desktop/) distribution.

### Start all the services

```
docker-compose -p pracujtime up
```

### Open the app

Login as `jkowalski` with password `password`. 

http://localhost/

All available user logins are listed in the table below. Password for all of them is `password`.

| User          | Role                      |
|---------------|---------------------------|
| aszymanska    | client_editor             |
| awisniewska   | report_viewer             |
| jkowalczyk    | supervisor_editor         |
| jkowalski     | manager                   |
| kwojcik       | team_editor               |
| mkaminska     | timelog_viewer            |
| mwozniak      | holiday_request_approver  |
| mzielinska    |                           |
| plewandowski  |                           |
| pnowak        |                           |

### Stop all the services

Prest `Ctrl+C` in the console, wait for services to be stopped and then run command below to release allocated resources.

```
docker-compose -p pracujtime down
```

## Keycloak configuration

* [Keycloak administration console](http://localhost:8080/auth/admin/) - user `admin`, password `admin`
* [Account console](http://localhost:8080/auth/realms/pracujtime-realm/account) - user credentials, eg. user `jkowalski`, password `password`

If you wish to export updated settings see the [keycloak.md](./backend/keycloak/keycloak.md) for more informaiton.
