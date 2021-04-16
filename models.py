# pylint: disable=no-member
# pylint: disable=too-few-public-methods
import os
from app import DB
from flask import Flask, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')

APP.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")

APP.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

DB = SQLAlchemy(APP)

class User(DB.Model):
    ''' User model '''
    id = DB.Column(DB.Integer, primary_key=True)
    email = DB.Column(DB.String(80), unique=True, nullable=False)
    first_name = DB.Column(DB.String(80), nullable=False)
    last_name = DB.Column(DB.String(80), nullable=False)
    owned_trips = DB.relationship('Trip', backref='user', lazy=True)
    owned_activities = DB.relationship('Activity', backref='user', lazy=True)
    trips = DB.relationship('TripUser', backref='user', lazy=True)
    activities = DB.relationship('ActivityUser', backref='user', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.id

class Trip(DB.Model):
    ''' Trip model '''
    id = DB.Column(DB.Integer, primary_key=True)
    trip_name = DB.Column(DB.String(100), unique=False, nullable=False)
    join_code = DB.Column(DB.String(7), unique=True, nullable=False)
    owner_id = DB.Column(DB.Integer, DB.ForeignKey('user.id'), nullable=False)
    activities = DB.relationship('Activity', backref='trip', lazy=True)
    users = DB.relationship('TripUser', backref='trip', lazy=True)

    def __repr__(self):
        return '<Trip %r>' % self.id

class TripUser(DB.Model):
    ''' TripUser model '''
    id = DB.Column(DB.Integer, primary_key=True)
    trip_id = DB.Column(DB.Integer, DB.ForeignKey('trip.id'), nullable=False)
    user_id = DB.Column(DB.Integer, DB.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return '<TripUser %r>' % self.id

class Activity(DB.Model):
    ''' Activity model '''
    id = DB.Column(DB.Integer, primary_key=True)
    trip_id = DB.Column(DB.Integer, DB.ForeignKey('trip.id'), nullable=False)
    activity_name = DB.Column(DB.String(100), unique=False, nullable=False)
    total_sum = DB.Column(DB.Float, nullable=False)
    total_users = DB.Column(DB.Integer, nullable=False)
    owner_id = DB.Column(DB.Integer, DB.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return '<Activity %r>' % self.id

class ActivityUser(DB.Model):
    ''' ActivityUser model '''
    id = DB.Column(DB.Integer, primary_key=True)
    activity_id = DB.Column(DB.Integer, DB.ForeignKey('activity.id'), nullable=False)
    user_id = DB.Column(DB.Integer, DB.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return '<ActivityUser %r>' % self.id
