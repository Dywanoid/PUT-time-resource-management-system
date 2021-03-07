terraform {
  required_version = "~> 0.14"

  required_providers {
    heroku = {
      source = "heroku/heroku"
      version = "~> 4.0"
    }
  }

  backend "pg" {
  }
}
