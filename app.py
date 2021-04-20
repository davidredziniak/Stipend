'''
    Stipend
    Flask Web server that handles REST API endpoints
'''
import os
from flask import Flask, send_from_directory, request
from dotenv import load_dotenv, find_dotenv
from sqlalchemy import func
from google_auth import verify_user_token
from models import DB, User, Trip, TripUser

load_dotenv(find_dotenv())  # This is to load your env variables from .env

APP = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB.init_app(APP)

CURRENT_SESSIONS = {}



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
            user = User.query.filter_by(email=email).first()
            # User doesn't exist, create new user
            if user is None:
                new_user = User(email=email,
                                first_name=first_name,
                                last_name=last_name)
                DB.session.add(new_user)
                DB.session.commit()
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
                current_user = User.query.filter_by(email=email[0]).first()
                if current_user is not None:
                    trips = []
                    for trip in current_user.trips:
                        current_trip = Trip.query.filter_by(
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



@APP.route('/api/createTrip', methods=['POST'])
def create_trip():
    '''
        Given a token ID and tripData, will create a trip connected to the user creating the trip
    '''
    if 'Authorization' in request.headers:
        if 'Bearer ' in request.headers['Authorization']:
            trip_data = request.get_json()['trip_data']
            token_id = request.headers['Authorization'].split(' ')[1]
            email = get_email_from_token_id(CURRENT_SESSIONS, token_id)

            if len(email) != 0 and email[0] != "":
                current_user = User.query.filter_by(email=email[0]).first()
                if current_user is not None:
                    # Create Trip
                    new_trip = Trip(trip_name=trip_data['trip_name'],
                                    join_code=trip_data['join_code'],
                                    owner_id=current_user.id)
                    DB.session.add(new_trip)
                    # Create TripUser
                    new_trip_user = TripUser(trip_id=DB.session.query(func.max(Trip.id)),
                                             user_id=current_user.id)
                    DB.session.add(new_trip_user)
                    DB.session.commit()
                    return {'success': True}, 200
        return {
            'success': False,
            'error': 'Invalid token ID. Please relogin.'
        }, 401
    return {'success': False, 'error': 'Missing Authorization header.'}, 401


@APP.route('/api/joinTrip', methods=['POST'])
def handle_join_trip():
    '''
        Given a token ID and join code, user can join trip
    '''
    if 'Authorization' in request.headers:
        if 'Bearer ' in request.headers['Authorization']:
            token_id = request.headers['Authorization'].split(' ')[1]
            join_code = request.get_json()['join_code']

            # Valid join code
            if join_code != "":
                email = get_email_from_token_id(CURRENT_SESSIONS, token_id)

                # Token ID matches a session
                if len(email) != 0 and email[0] != "":
                    current_user = User.query.filter_by(email=email[0]).first()
                    if current_user is not None:
                        # Valid user

                        # Check if join code is real
                        trip = Trip.query.filter_by(join_code=join_code).first()
                        if trip is not None:
                            # Check if user is already in the trip
                            trip_user = TripUser.query.filter_by(trip_id=trip.id,
                                                                 user_id=current_user.id).first()
                            if trip_user is None:
                                new_trip_user = TripUser(
                                    trip_id=trip.id,
                                    user_id=current_user.id)
                                DB.session.add(new_trip_user)
                                DB.session.commit()
                                return {'success': True, 'message': 'Successfully joined.'}, 200
                            return {'success': False,
                                    'message': 'You have already joined this trip.'}, 401
                        return {'success': False, 'message': 'Invalid join code.'}, 401
        return {
            'success': False,
            'message': 'Invalid token ID. Please relogin.'
        }, 401
    return {'success': False, 'message': 'An error has occured.'}, 401


@APP.route('/api/trip', methods=['GET'])
def handle_trip_info():
    '''
        Given a token ID and trip ID, retrieves trip info
    '''
    if 'Authorization' in request.headers:
        if 'Bearer ' in request.headers['Authorization']:
            token_id = request.headers['Authorization'].split(' ')[1]

            # Check for valid query param
            query_parameters = request.args
            trip_id = int(query_parameters.get('tripId'))
            email = get_email_from_token_id(CURRENT_SESSIONS, token_id)

            # Token ID matches a session
            if len(email) != 0 and email[0] != "":
                current_user = User.query.filter_by(email=email[0]).first()
                if current_user is not None:

                    # Check if trip exists
                    trip = Trip.query.filter_by(id=trip_id).first()
                    if trip is not None:
                        # Check if user is already in the trip
                        trip_user = TripUser.query.filter_by(trip_id=trip.id,
                                                             user_id=current_user.id).first()

                        # User is in trip
                        if trip_user is not None:
                            users = []
                            for user in trip.users:
                                current_user = User.query.filter_by(id=user.user_id).first()
                                if current_user is not None:
                                    users.append(current_user.to_json())
                            return {'success': True,
                                    'tripName': trip.trip_name,
                                    'tripOwner': trip.owner_id, 'participants': users}, 200
                        return {'success': False,
                                'message': 'You are not authorized to view this trip.'}, 401
                    return {'success': False, 'message': 'Invalid trip id.'}, 401
        return {
            'success': False,
            'message': 'Invalid token ID. Please relogin.'
        }, 401
    return {'success': False, 'message': 'Missing Authorization header.'}, 401



# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
    APP.run(
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', "8081")),
    )
