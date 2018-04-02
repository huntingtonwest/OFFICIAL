from server import db
from datetime import datetime

role_email = db.Table('role_email',
    db.Column('role_id',db.Integer(),db.ForeignKey('Roles.role_id')),
    db.Column('email_id',db.Integer(),db.ForeignKey('Emails.email_id')),
    db.UniqueConstraint('role_id', 'email_id', name='role_email_constraint')
)


class Roles(db.Model):
    __tablename__ = 'Roles'
    role_id = db.Column(db.Integer, primary_key = True)
    role_name = db.Column(db.String(200), unique=True)

    edit_date = db.Column(db.DateTime(), onupdate = datetime.utcnow, default = datetime.utcnow)

    emails = db.relationship('Emails', secondary=role_email, backref=db.backref('roles',lazy='dynamic'), lazy='dynamic')


    def __init__(self, role_name):
        self.role_name=role_name

    def add_email(self, email):
        if not self.has_email(email):
            self.emails.append(email)

    def remove_email(self, email):
        if self.has_email(email):
            self.emails.remove(email)

    def has_email(self, email):
        return self.emails.filter(Emails.email_id == email.email_id).count() > 0



class Emails(db.Model):
    __tablename__ = 'Emails'
    email_id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(200), unique=True)
    # role_id = db.Column(db.Integer, db.ForeignKey())


    def __init__(self, email):
        self.email = email
