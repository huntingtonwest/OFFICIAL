from server import db
from datetime import datetime
from flask_login import UserMixin


class Users(UserMixin, db.Model):
    __tablename__ = 'Users'
    id = db.Column(db.Integer, primary_key = True)

    email = db.Column(db.String(200),unique=True)
    password = db.Column(db.String(80))
    is_admin = db.Column(db.Boolean())

    join_date = db.Column(db.DateTime(), default = datetime.utcnow)

    properties_posted = db.relationship('Properties', backref='user', lazy='dynamic')
    emails_edited = db.relationship('Emails',backref='user', lazy='dynamic')

    def __init__(self, email, password):
        self.email = email
        self.password=password