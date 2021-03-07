# Running terraform locally

## Requirements 

Heroku account [Heroku sign up](https://signup.heroku.com/)

Heroku CLI [Installation instructions](https://devcenter.heroku.com/articles/heroku-cli#getting-started)

Being a collaborator on the `pracujta-api` and the `pracujta-terraform-backend` heroku apps. 

## Configure the environment

Login to your heroku account

```shell script
heroku login
```

Export your email
```shell script
heroku whoami
export HEROKU_EMAIL=<your-email>
```

Create the authorization token
```shell script
heroku authorizations:create --description terraform-pracujta
export HEROKU_API_KEY=<api-token>
```

Add these variables into the shell rc file
```shell script
echo "export HEROKU_EMAIL=$HEROKU_EMAIL" >> ~/.zshrc
echo "export HEROKU_API_KEY=HEROKU_API_KEY" >> ~/.zshrc
```

## Initialize terraform

```shell script
export DATABASE_URL=$(heroku config:get DATABASE_URL --app pracujta-terraform-backend)
terraform init -backend-config="conn_str=$DATABASE_URL"
```

## Verify setup

```shell script
tarraform plan
```
