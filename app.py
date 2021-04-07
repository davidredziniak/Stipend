import os
from flask import Flask, send_from_directory
from dotenv import load_dotenv, find_dotenv
from flask_sqlalchemy import SQLAlchemy

APP = Flask(__name__, static_folder='./build/static')
DB = SQLAlchemy(APP)

import models

# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


APP.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
