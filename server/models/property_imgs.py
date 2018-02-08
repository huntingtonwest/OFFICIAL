from server import db
from datetime import datetime

#image id will be same as forum id

class ProperyImgs(db.Model):
    __tablename__ = 'PropertyImgs'
    img_id =  db.Column(db.Integer, primary_key = True)
    property_id = db.Column(db.Integer,, db.ForeignKey('Properties.property_id'))
    date_added = db.Column(db.DateTime(), default = datetime.utcnow)

    def __init__(self, property_id):
        self.property_id=property_id