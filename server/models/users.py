from server import db
from datetime import datetime
from flask_login import UserMixin


class Users(UserMixin, db.Model):
    __tablename__ = 'Users'
    id = db.Column(db.Integer, primary_key = True)

    first = db.Column(db.String(200))
    last = db.Column(db.String(200))

    email = db.Column(db.String(200),unique=True)
    password = db.Column(db.String(80))
    is_admin = db.Column(db.Boolean(), default=False)

    join_date = db.Column(db.DateTime(), default = datetime.utcnow)

    def __init__(self, input):
        columns = Users.__table__.columns
        for c in columns:
            if c.key in input:
                setattr(self,c.key, input[c.key])

    # def __init__(self, first, last, email, password):
    #     self.first = first
    #     self.last = last
    #     self.email = email
    #     self.password=password