
import os
import json
#from html import escape
from flask import Flask, send_from_directory, request
from dotenv import load_dotenv, find_dotenv
from flask_sqlalchemy import SQLAlchemy
from google_auth import verify_user_token

load_dotenv(find_dotenv())  # This is to load your env variables from .env

APP = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)

import models


CURRENT_SESSIONS = {}

# ACCESSING THE EMAILS USING CURRENT_SESSION AND TOKEN_ID
def get_email_from_token_id(sessions,token_id):
     return [key for key in sessions if (sessions[key] == token_id)]


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# ENDPOINT FOR LOGIN, IT ALSO POPULATES DB WITH USER
@APP.route('/api/auth/login', methods=['POST'])
def authenticate_user():
    token_id = request.get_json()['token_id']
    if token_id != "" and token_id is not None:
        first_name, last_name, email, is_valid_user = verify_user_token(token_id)
        # Valid token ID from Google, send success
        if is_valid_user:
            # Check if user exists in database
            user = models.User.query.filter_by(email=email).first()
            # User doesn't exist, create new user
            if user is None:
                new_user = models.User(email=email, first_name=first_name, last_name=last_name)
                DB.session.add(new_user)
                DB.session.commit()
            # Add to token id to session list, for future API calls
            CURRENT_SESSIONS[email] = token_id
            return {'success': True}, 200
    return {'success': False}, 401

# ENDPOINT FOR LOGOUT
@APP.route('/api/auth/logout', methods=['POST'])
def authenticate_user_logout():
    token_id = request.get_json()['token_id']
    if token_id != "" and token_id is not None:
        email = get_email_from_token_id(CURRENT_SESSIONS, token_id)
            
        # Token ID matches a session
        if len(email) != 0 and email[0] != "":
            CURRENT_SESSIONS.pop(email[0], None)
            return {'success': True}, 200
    return {'success': False}, 401

# VARIFYING USER'S TOKEN
@APP.route('/api/user', methods=['GET'])
def handle_user_api():
    if 'Authorization' in request.headers:
        if 'Bearer ' in request.headers['Authorization']:
            token_id = request.headers['Authorization'].split(' ')[1]
            email = get_email_from_token_id(CURRENT_SESSIONS, token_id)
            
            # Token ID matches a session
            if len(email) != 0 and email[0] != "":
                return {'success': True }, 200
        return {'success': False, 'error': 'Invalid token ID. Please relogin.'}, 401
    else:
        return {'success': False, 'error': 'Missing Authorization header.'}, 401


@APP.route('/api/joinTrip', methods=['GET'])
def join_trip_api():
    token_id = request.get_json()['token_id']
    if token_id != "" and token_id is not None:
        first_name, last_name, email, is_valid_user = verify_user_token(token_id)
     # Valid token ID from Google, send success
        if is_valid_user:
            # Check if user exists in database
            user = models.User.query.filter_by(email=email).first()
            # User doesn't exist, create new user
            if user is None:
                #THE JOIN_CODE IS DEFINED TO BE A STRING TYPE
                new_user = models.Trip(trip_name='someSTRING', join_code='someSTRING', owner_id='someINT')
                DB.session.add(new_user)
                DB.session.commit()
    # Add to token id to session list, for future API calls
            CURRENT_SESSIONS[email] = token_id
            return {'success': True}, 200
    return {'success': False}, 401

@APP.route('/api/trip/trip_id={id}', methods=['GET'])    
def trip_id_api():
    token_id = request.get_json()['token_id']
    if token_id != "" and token_id is not None:
        first_name, last_name, email, is_valid_user = verify_user_token(token_id)
     # Valid token ID from Google, send success
        if is_valid_user:
            # Check if user exists in database
            user = models.User.query.filter_by(email=email).first()
            # User doesn't exist, create new user
            if user is None:
                #THE JOIN_CODE IS DEFINED TO BE A STRING TYPE
                new_user = models.TripUser(trip_id='someINT', user_id='someINT')
                DB.session.add(new_user)
                DB.session.commit()
    # Add to token id to session list, for future API calls
            CURRENT_SESSIONS[email] = token_id
            return {'success': True}, 200
    return {'success': False}, 401


# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
    APP.run(
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', "8081")),
    )
    