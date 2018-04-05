from server import db
from datetime import datetime

class Associations(db.Model):
	__tablename__ = 'Associations'
	acn_id = db.Column(db.Integer, primary_key=True)
	acn_name = db.Column(db.String(200))
	acn_loc = db.Column(db.String(200))

	history = db.relationship('History', backref='acn', lazy='dynamic', order_by='History.date.desc()')

	def __init__(self, acn_name, acn_loc):
		self.acn_name = acn_name
		self.acn_loc = acn_loc
