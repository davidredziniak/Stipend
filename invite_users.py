import os
import smtplib, ssl
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())  # This is to load your env variables from .env

port = 465  # For SSL
smtp_server = "smtp.gmail.com"
sender_email = os.getenv('G_EMAIL')  # Enter your address
receiver_email = "mm2373@njit.edu"
password = os.getenv('G_EMAIL_PASS')
message = """\
Subject: Hi there

This message is sent from Python."""

context = ssl.create_default_context()
with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, message)