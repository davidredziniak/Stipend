import os
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())  # This is to load your env variables from .env

PORT = 465  # For SSL
SMTP_SERVER = "smtp.gmail.com"
SENDER = os.getenv('G_EMAIL')
WEBSITE_LINK = "INSERT_LINK_HERE"

def create_invite_message(inviter_name, join_code):
    message = '''\
    <html>
        <body>
            <p>
                ''' + inviter_name + ''' has invited you to plan the expenses of your upcoming trip with Stipend!<br>
                Instructions:<br>
            </p>
            <ol type="1">
                <li>Join site via link: ''' + WEBSITE_LINK + '''</li>
                <li>Sign in using a Google Account</li>
                <li>Once signed in, press the "Join Trip" button on the top navigation bar</li>
                <li>Inpute the join code: ''' + join_code + '''</li>
            </ol>
            <p><br>
                We look forward to helping you plan your trip!
            </p>
        </body>
    </html>
    '''
    
    return message

def create_email(inviter_name):
    message = MIMEMultipart('alternative')
    message["Subject"] = inviter_name + ' has invited you to plan a trip!'
    message["From"] = SENDER
    
    return message

def send_invites(inviter_name, invitees, join_code):
    html_message = create_invite_message(inviter_name, join_code)
    message = create_email(inviter_name)
    email_body = MIMEText(html_message, "html")
    message.attach(email_body)
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(SMTP_SERVER, PORT, context=context) as server:
        server.login(SENDER, os.getenv('G_EMAIL_PASS'))
        for invitee in invitees:
            server.sendmail(SENDER, invitee, message.as_string())