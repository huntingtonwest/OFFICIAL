from server import db
from datetime import datetime
import json
import decimal

#property types and statuses in query utils

class Cities(db.Model):
    __tablename__ = 'Cities'
    city_id = db.Column(db.Integer, primary_key = True)
    city_name = db.Column(db.String(200), unique=True)

    properties = db.relationship('Properties', backref='city_info', lazy='dynamic')

    def __init__(self, city_name):
        self.city_name=city_name

class PropertyImgs(db.Model):
    __tablename__ = 'PropertyImgs'
    img_id =  db.Column(db.Integer, primary_key = True)
    property_id = db.Column(db.Integer, db.ForeignKey('Properties.property_id'))
    date_added = db.Column(db.DateTime(), default = datetime.utcnow)


    def __init__(self, property_id):
        self.property_id=property_id

class PropertyTypes(db.Model):
    __tablename__ = 'PropertyTypes'
    type_id = db.Column(db.Integer, primary_key=True)
    type_name = db.Column(db.String(50))

    properties = db.relationship('Properties', backref='type_info', lazy='dynamic')

    def __init__(self, type_name):
        self.type_name = type_name


class Properties(db.Model):
    __tablename__ = 'Properties'
    property_id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200))

    address_l1 = db.Column(db.String(200))
    address_l2= db.Column(db.String(200))
    city = db.Column(db.Integer, db.ForeignKey('Cities.city_id'))
    state = db.Column(db.String(2))
    zipcode = db.Column(db.Integer)

    status = db.Column(db.String(30))

    type = db.Column(db.Integer, db.ForeignKey('PropertyTypes.type_id'))

    beds = db.Column(db.Numeric())
    baths = db.Column(db.Numeric())
    price = db.Column(db.Integer)

    for_sale = db.Column(db.Boolean())
    for_rent = db.Column(db.Boolean())

    area = db.Column(db.Integer)

    notes = db.Column(db.String(2000))

    date_posted = db.Column(db.DateTime(), default = datetime.utcnow)

    images = db.relationship('PropertyImgs', backref='property', lazy='dynamic')

    def __init__(self, input):
        columns = Properties.__table__.columns
        for c in columns:
            if c.key in input:
                setattr(self,c.key, input[c.key])
    
    def update(self, input, type):
        columns = Properties.__table__.columns
        for c in columns:
            if c.key in input:
                setattr(self,c.key, input[c.key])
        
        if type =='post':
            self.date_posted = datetime.utcnow


    

    

    # def __init__(self, name, address_l1, address_l2, city, state, zipcode, type, bedrooms, baths, price, is_for_sale, is_for_rent, sqft, notes, poster_id):
    #     self.name=name
    #     self.address_l1 = address_l1
    #     self.address_l2 = address_l2
    #     self.city = city
    #     self.state = state
    #     self.zipcode = zipcode
    #     self.type = type
    #     self.bedrooms = bedrooms
    #     self.baths = baths
    #     self.price = price
    #     self.is_for_sale = is_for_sale
    #     self.is_for_rent = is_for_rent
    #     self.sqft = sqft
    #     self.notes = notes
    #     self.poster_id = poster_id
