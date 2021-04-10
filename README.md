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
docker-compose -p pracujta up
```

### Open the app

Login either as `jkowalski` or `pnowak`. Password for both users is `password`.

http://localhost/


## Keycloak configuration

* [Keycloak administration console](http://localhost:8080/auth/admin/) - user `admin`, password `admin`
* [Account console](http://localhost:8080/auth/realms/pracujta-realm/account) - user credentials, eg. user `jkowalski`, password `password`

If you wish to export updated settings see the [keycloak.md](./backend/keycloak/keycloak.md) for more informaiton.
