from app import DB

class User(DB.Model):
    ''' User model '''
    id = DB.Column(DB.Integer, primary_key=True)
    email = DB.Column(DB.String(80), unique=True, nullable=False)
    first_name = DB.Column(DB.String(80), nullable=False)
    last_name = DB.Column(DB.String(80), nullable=False)
    trips = DB.relationship('UserTrip', backref='user', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.id

class UserTrip(DB.Model):
    ''' UserTrip model '''
    id = DB.Column(DB.Integer, primary_key=True)
    user_id = DB.Column(DB.Integer, DB.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return '<UserTrip %r>' % self.id

class UserActivity(DB.Model):
    ''' UserActivity model '''
    id = DB.Column(DB.Integer, primary_key=True)
    user_id = DB.Column(DB.Integer, DB.ForeignKey('user.id'), nullable=False)
    user_paid = DB.Column(DB.Boolean, unique=True, nullable=False)

    def __repr__(self):
        return '<UserActivity %r>' % self.id
