'''
    Checks whether or not the provided Token ID actually matches a Google Account
'''
import os
from google.oauth2 import id_token
from google.auth.transport import requests
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())  # to load API keys from .env


def verify_user_token(token_id):
    '''
        Given a token ID from the client, check the token ID
        with Google and return user information.
    '''
    client_id = os.getenv('REACT_APP_CLIENT_ID')
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        id_info = id_token.verify_oauth2_token(token_id, requests.Request(),
                                               client_id)
        # ID token is valid. Get the user info and return
        email = id_info['email']
        first_name = id_info['given_name']
        last_name = id_info['family_name']
        return first_name, last_name, email, True
    except ValueError:
        # Invalid token
        return "", "", "", False
