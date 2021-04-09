from google.oauth2 import id_token
from google.auth.transport import requests
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv()) # to load API keys from .env

def verify_user(token):
    CLIENT_ID = os.getenv('REACT_APP_CLIENT_ID')
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        id_info = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        
        # ID token is valid. Get the user's Google Account ID from the decoded token.
        user_id = id_info['sub']
        print(id_info)
        return True
    except ValueError:
        # Invalid token
        return False