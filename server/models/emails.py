from server import db
from datetime import datetime

class Roles(db.Model):
	__tablename__ = 'Roles'
	role_id = db.Column(db.Integer, primary_key = True)
	role_name = db.Column(db.String(200), unique=True)



	def __init__(self, role_name):
		self.role_name=role_name

class Emails(db.Model):
    __tablename__ = 'Emails'
    email_id = db.Column(db.Integer, primary_key = True)

    email = db.Column(db.String(200))
    role_id = db.Column(db.Integer)

    edit_date = db.Column(db.DateTime(), default = datetime.utcnow)
    added_by = db.Column(db.Integer, db.ForeignKey('Users.id'))

    db.UniqueContraint('role_id', 'email')

    def __init__(self, email, password):
        self.email = email
        self.password=password