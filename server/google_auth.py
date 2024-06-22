'''
    Checks whether or not the provided Token ID actually matches a Google Account
'''
import os
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from dotenv import load_dotenv, find_dotenv
import traceback
import logging
import google.oauth2.credentials
import requests



load_dotenv(find_dotenv())  # to load API keys from .env


def verify_user_token(client_code):
    '''
        Given a token ID from the client, check the token ID
        with Google and return user information.
    '''
    client_id = os.getenv('REACT_APP_CLIENT_ID')
    client_secret = os.getenv('REACT_APP_CLIENT_SECRET')
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        
        # Retrieve tokens from code that was sent from client
        url = 'https://oauth2.googleapis.com/token'
        data = {
            "code": client_code,
            "client_id": client_id,
            "client_secret": client_secret,
            'redirect_uri': 'postmessage',
            'grant_type': 'authorization_code'
        }
 
        response = requests.post(url, json=data)
        token = ''
        if(response.status_code == 200):
            token = response.json()['id_token']
            request = google_requests.Request()
            id_info = id_token.verify_oauth2_token(token, request, client_id, clock_skew_in_seconds=10)

            # ID token is valid. Get the user info and return
            email = id_info['email']
            first_name = id_info['given_name']
            last_name = id_info['family_name']
            return first_name, last_name, email, True
        return "", "", "", False
    except Exception as e:
        logging.error(traceback.format_exc())
        # Logs the error appropriately. 
        return "", "", "", False
