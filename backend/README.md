# Running the app

## Local run

### Requirements

* [Python 3.8](https://www.python.org/downloads/)
* [PostgreSQL 13](https://www.postgresql.org/download/)

### Start Postgres Database

TODO

### Install dependencies
```shell script
pip install -r requirements.txt
```

### Configure environment variables
```shell script
export PORT=80
export DATABASE_URL=postgres://postgres:password@localhost/pracujta
```
### Run the app
```
./main.py db upgrade && ./main.py runserver
```

or

```
python3 main.py db upgrade && python3 main.py runserver
```

## Docker run

### Requirements
The only requirement is to have Docker and Docker Compose installed in your system.
You can install these tools with [Docker Desktop](https://docs.docker.com/desktop/) distribution.

## Running the app

```shell script
./docker-compose up
```

# Open the Ariadne Playground

http://localhost/graphql