'''
    Stipend
    Flask Web server that handles REST API endpoints
'''
import os
from flask import Flask, send_from_directory, request
from dotenv import load_dotenv, find_dotenv
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from google_auth import verify_user_token
from invite_users import send_invites

load_dotenv(find_dotenv())  # This is to load your env variables from .env

APP = Flask(__name__, static_folder='./build/static')
DB = SQLAlchemy(APP)

# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

import models

CURRENT_SESSIONS = {}


def verify_headers(headers):
    '''
        Helper method to check the headers of a request to determine if the
        api request is valid. Returns a dictionary.
        Format for dictionary:
            success: True/False; status of the header, required
            message: String; if success was false, is the reason for failing, required for
                     when success is false.
    '''
    if 'Authorization' not in headers:
        return {'success': False, 'message': 'Missing Authorization header.'}
    if 'Bearer' not in headers['Authorization']:
        return {
            'success': False,
            'message': 'Missing Bearer in Authorization header.'
        }
    if len(headers['Authorization'].split(' ')) != 2:
        return {
            'success': False,
            'message': 'Missing token in Authorization header.'
        }
    return {'success': True}


def verify_token_id(token_id):
    '''
        Helper method to check a token id and determine if it's associated with a user.
        Returns a dictionary.
        Format for dictionary:
            success: True/False; status of the token id, required
            message: String; if success was false, is the failing message
            user: User; if success was true, is the current user associated with
                  the token id
    '''
    email = get_email_from_token_id(CURRENT_SESSIONS, token_id)
    if len(email) == 0 or email[0] == "":
        return {
            'success': False,
            'message': 'Invalid token ID. Please relogin.'
        }
    current_user = models.User.query.filter_by(email=email[0]).first()
    if current_user is None:
        return {
            'success': False,
            'message': 'Could not find user matching token ID. Please relogin.'
        }
    return {'success': True, 'user': current_user}


def get_email_from_token_id(sessions, token_id):
    '''
        Returns a list of emails from a dictionary if the token ID matches
    '''
    return [key for key in sessions if sessions[key] == token_id]


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    ''' Route user to view webpage '''
    return send_from_directory('./build', filename)


def add_user_to_database(email, first_name, last_name):
    '''
        This function adds
        a new user to the database
    '''
    new_user = models.User(email=email,
                           first_name=first_name,
                           last_name=last_name)
    DB.session.add(new_user)
    DB.session.commit()

    all_users = models.User.query.all()
    users = []
    for user in all_users:
        users.append(user.email)
    return users


@APP.route('/api/auth/login', methods=['POST'])
def authenticate_user():
    '''
        Given a token ID, this logs in a user and creates a session.
        If a user is not found, it creates one.
    '''
    token_id = request.get_json()['token_id']
    if token_id != "" and token_id is not None:
        first_name, last_name, email, is_valid_user = verify_user_token(
            token_id)
        # Valid token ID from Google, send success
        if is_valid_user:
            # Check if user exists in database
            user = models.User.query.filter_by(email=email).first()
            # User doesn't exist, create new user
            if user is None:
                add_user_to_database(email, first_name, last_name)
            # Add to token id to session list, for future API calls
            CURRENT_SESSIONS[email] = token_id
            return {'success': True}, 200
    return {'success': False}, 401


@APP.route('/api/auth/logout', methods=['POST'])
def authenticate_user_logout():
    '''
        Given a token ID, this clears the user sessions and logs them out.
    '''
    token_id = request.get_json()['token_id']
    if token_id != "" and token_id is not None:
        email = get_email_from_token_id(CURRENT_SESSIONS, token_id)

        # Token ID matches a session
        if len(email) != 0 and email[0] != "":
            CURRENT_SESSIONS.pop(email[0], None)
            return {'success': True}, 200
    return {'success': False}, 401


@APP.route('/api/user', methods=['GET'])
def handle_user_api():
    '''
        Given a token ID, this returns the user's email, name, and trips
    '''
    if 'Authorization' in request.headers:
        if 'Bearer ' in request.headers['Authorization']:
            token_id = request.headers['Authorization'].split(' ')[1]
            email = get_email_from_token_id(CURRENT_SESSIONS, token_id)

            # Token ID matches a session
            if len(email) != 0 and email[0] != "":
                current_user = models.User.query.filter_by(
                    email=email[0]).first()
                if current_user is not None:
                    trips = []
                    for trip in current_user.trips:
                        current_trip = models.Trip.query.filter_by(
                            id=trip.trip_id).first()
                        trips.append({
                            'trip_id': trip.trip_id,
                            'name': current_trip.trip_name
                        })
                    return {
                        'success': True,
                        'email': current_user.email,
                        'firstName': current_user.first_name,
                        'lastName': current_user.last_name,
                        'trips': trips
                    }, 200
        return {
            'success': False,
            'message': 'Invalid token ID. Please relogin.'
        }, 401
    return {'success': False, 'message': 'Missing Authorization header.'}, 401


def add_trip_to_database(trip_name, join_code, owner_id):
    '''
        This function adds
        a new trip to the database
    '''
    if len(join_code) == 7:
        new_trip = models.Trip(trip_name=trip_name,
                               join_code=join_code,
                               owner_id=owner_id)
        DB.session.add(new_trip)
        DB.session.commit()

    all_trips = models.Trip.query.all()
    trips = []
    for trip in all_trips:
        trips.append(trip.trip_name)
    return trips


@APP.route('/api/trip', methods=['GET'])
def handle_trip_info():
    '''
        Given a token ID and trip ID, retrieves trip info
    '''
    headers_status = verify_headers(request.headers)
    if not headers_status['success']:
        return headers_status, 401
    token_status = verify_token_id(
        request.headers['Authorization'].split(' ')[1])
    if not token_status['success']:
        return token_status, 401

    current_user = token_status['user']
    query_parameters = request.args
    trip_id = int(query_parameters.get('tripId'))

    # Check if trip exists
    trip = models.Trip.query.filter_by(id=trip_id).first()
    if trip is not None:
        # Check if user is already in the trip
        trip_user = models.TripUser.query.filter_by(
            trip_id=trip.id, user_id=current_user.id).first()
        # User is in trip
        if trip_user is not None:
            # Get trip owner
            trip_owner = models.User.query.filter_by(id=trip.owner_id).first()
            users = []
            for user in trip.users:
                current_user = models.User.query.filter_by(
                    id=user.user_id).first()
                if current_user is not None:
                    users.append(current_user.to_json())
            return {
                'success': True,
                'tripName': trip.trip_name,
                'tripOwner': trip_owner.first_name,
                'participants': users
            }, 200
        return {
            'success': False,
            'message': 'You are not authorized to view this trip.'
        }, 401
    return {'success': False, 'message': 'Invalid trip id.'}, 401


@APP.route('/api/trip/create', methods=['POST'])
def handle_create_trip():
    '''
        Given a token ID and tripData, will create a trip connected to the user creating the trip
    '''
    headers_status = verify_headers(request.headers)
    if not headers_status['success']:
        return headers_status, 401
    token_status = verify_token_id(
        request.headers['Authorization'].split(' ')[1])
    if not token_status['success']:
        return token_status, 401

    current_user = token_status['user']
    trip_data = request.get_json()['trip_data']
    # Check if join code exists
    valid_trip = models.Trip.query.filter_by(
        join_code=trip_data['join_code']).first()
    if valid_trip is not None:
        return {'success': False, 'message': 'Join code already exists.'}, 200
    # Create Trip
    add_trip_to_database(trip_data['trip_name'], trip_data['join_code'],
                         current_user.id)
    # Create TripUser
    new_trip_user = models.TripUser(trip_id=DB.session.query(
        func.max(models.Trip.id)),
                                    user_id=current_user.id)
    DB.session.add(new_trip_user)
    DB.session.commit()
    trip_id = models.Trip.query.filter_by(
        join_code=trip_data['join_code']).first().id
    return {'success': True, 'tripId': trip_id}, 200


@APP.route('/api/trip/invite', methods=['POST'])
def invite_to_trip():
    '''
        Given a token ID, list of emails, and join code, will invite all emails
        to the trip associated with the join code
    '''
    headers_status = verify_headers(request.headers)
    if not headers_status['success']:
        return headers_status, 401
    token_status = verify_token_id(
        request.headers['Authorization'].split(' ')[1])
    if not token_status['success']:
        return token_status, 401
    current_user = token_status['user']
    invited_emails = request.get_json()['invited_emails']
    join_code = request.get_json()['join_code']
    send_invites(current_user.first_name + ' ' + current_user.last_name,
                 invited_emails, join_code)
    return {'success': True, 'message': 'Successfully invited.'}


@APP.route('/api/trip/join', methods=['POST'])
def handle_join_trip():
    '''
        Given a token ID and join code, user can join trip
    '''
    headers_status = verify_headers(request.headers)
    if not headers_status['success']:
        return headers_status, 401
    token_status = verify_token_id(
        request.headers['Authorization'].split(' ')[1])
    if not token_status['success']:
        return token_status, 401

    current_user = token_status['user']
    join_code = request.get_json()['join_code']
    if join_code == "" or join_code is None:
        return {'success': False, 'message': 'Invalid join code.'}, 401
    # Check if join code is real
    trip = models.Trip.query.filter_by(join_code=join_code).first()
    if trip is not None:
        # Check if user is already in the trip
        trip_user = models.TripUser.query.filter_by(
            trip_id=trip.id, user_id=current_user.id).first()
        if trip_user is None:
            new_trip_user = models.TripUser(trip_id=trip.id,
                                            user_id=current_user.id)
            DB.session.add(new_trip_user)
            DB.session.commit()
            return {
                'success': True,
                'tripId': trip.id,
                'message': 'Successfully joined.'
            }, 200
        return {
            'success': False,
            'message': 'You have already joined this trip.'
        }, 401
    return {'success': False, 'message': 'An error has occured.'}, 401


@APP.route('/api/trip/delete', methods=['DELETE'])
def handle_trip_delete():
    '''
        Given a token ID and trip ID, retrieves trip info
    '''
    headers_status = verify_headers(request.headers)
    if not headers_status['success']:
        return headers_status, 401
    token_status = verify_token_id(
        request.headers['Authorization'].split(' ')[1])
    if not token_status['success']:
        return token_status, 401

    current_user = token_status['user']
    trip_id = request.get_json()['trip_id']
    if trip_id == "" or trip_id is None:
        return {'success': False, 'message': 'Invalid trip id.'}, 401

    # Check if trip exists
    trip = models.Trip.query.filter_by(id=trip_id).first()
    if trip is not None:
        # Check if user is authorized to delete trip
        if current_user.id == trip.owner_id:
            for user in trip.users:
                current_session = DB.session.object_session(user)
                current_session.delete(user)
                current_session.commit()
            current_session = DB.session.object_session(trip)
            current_session.delete(trip)
            current_session.commit()
            return {'success': True}, 200
        return {
            'success': False,
            'message': 'You are not authorized to delete this trip.'
        }, 401
    return {'success': False, 'message': 'Invalid trip id.'}, 401


def add_activity_to_database(trip_id, activity_name, cost, num_participants,
                             owner_id):
    '''
        This function adds
        a new activity to the database
    '''
    new_activity = models.Trip(trip_id=trip_id,
                               activity_name=activity_name,
                               total_sum=cost,
                               total_users=num_participants,
                               owner_id=owner_id)
    DB.session.add(new_activity)
    DB.session.commit()
    return new_activity.id


def add_user_to_activity(activity_id, user_id):
    '''
        This function adds
        a new user to an activity
    '''
    new_activity_user = models.ActivityUser(activity_id=activity_id,
                                            user_id=user_id)
    DB.session.add(new_activity_user)
    DB.session.commit()
    return new_activity_user


@APP.route('/api/activity/create', methods=['POST'])
def handle_create_activity():
    '''
        Given a token ID, trip ID, and activity data, creates activity
    '''
    headers_status = verify_headers(request.headers)
    if not headers_status['success']:
        return headers_status, 401
    token_status = verify_token_id(
        request.headers['Authorization'].split(' ')[1])
    if not token_status['success']:
        return token_status, 401

    current_user = token_status['user']
    trip_id = request.get_json()['trip_id']
    if trip_id == "" or trip_id is None:
        return {'success': False, 'message': 'Invalid trip id.'}, 401

    # Check for valid name and cost
    activity_name = request.get_json()['activity_name']
    cost = request.get_json()['activity_cost']
    if activity_name == "" or activity_name is None or cost is None:
        return {'success': False, 'message': 'Invalid details of trip.'}, 401

    participants = request.get_json()['participants']
    if participants is None:
        return {
            'success': False,
            'message': 'Invalid list of participants.'
        }, 401

    # Check if trip exists
    trip = models.Trip.query.filter_by(id=trip_id).first()
    if trip is not None:
        # Check if user is in the trip
        trip_user = models.TripUser.query.filter_by(
            trip_id=trip.id, user_id=current_user.id).first()
        if trip_user is not None:
            valid_participants = []
            # Check if participant list is valid
            for participant in participants:
                # Check if participant is a valid user
                current_participant = models.User.query.filter_by(
                    email=str(participant)).first()
                if current_participant:
                    valid_participants.append(current_participant)
                return {
                    'success': False,
                    'message': 'Email of a participant is invalid.'
                }, 401

            # Create Activity using provided details
            result = add_activity_to_database(trip.id, activity_name, cost,
                                              len(valid_participants),
                                              current_user.id)

            # Create database objects to link user to activity
            if result:
                for user in valid_participants:
                    add_user_to_activity(result, user.id)
                return {
                    'success': True,
                    'message': 'Successfully created the activity.'
                }, 401
            return {
                'success': False,
                'message': 'Error creating the activity.'
            }, 401
        return {
            'success': False,
            'message':
            'You are not authorized to create an activity on this trip.'
        }, 401
    return {'success': False, 'message': 'Invalid trip id.'}, 401


# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
    APP.run(
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', "8081")),
    )
