provider "heroku" {}

resource "heroku_app" "pracujta-api" {
  name   = "pracujta-api"
  region = "eu"
}

//resource "heroku_collaborator" "john-doe" {
//  app = heroku_app.pracujta-api.name
//  email = "john@doe.com"
//}
