import os

from flask import Flask

app = Flask(__name__)

@app.route("/hello")
def hello():
    return "Hello flask app"

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=os.getenv("PORT", "80"))
