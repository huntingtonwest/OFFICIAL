from server import db
from datetime import datetime

#image id will be same as forum id

class Properties(db.Model):
    __tablename__ = 'Properties'
    property_id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200))

    address_l1 = db.Column(db.String(200))
    address_l2= db.Column(db.String(200))
    city = db.Column(db.String(200))
    state = db.Column(db.String(2))
    zipcode = db.Column(db.Integer)

    type = db.Column(db.Integer)

    bedrooms = db.Column(db.Decimal())
    baths = db.Column(db.Decimal())
    price = db.Column(db.Integer)

    is_for_sale = db.Column(db.Boolean())
    is_for_rent = db.Column(db.Boolean())

    sqft = db.Column(db.Integer)

    notes = db.Column(db.String(2000))

    poster_id = db.Column(db.Integer, db.ForeignKey('Users.id'))
    date_posted = db.Column(db.DateTime(), default = datetime.utcnow)

    images = db.relationship('PropertyImgs', backref='property', lazy='dynamic')

    def __init__(self, name, address_l1, address_l2, city, state, zipcode, type, bedrooms, baths, price, is_for_sale, is_for_rent, sqft, notes, poster_id):
        self.name=name
        self.address_l1 = address_l1
        self.address_l2 = address_l2
        self.city = city
        self.state = state
        self.zipcode = zipcode
        self.type = type
        self.bedrooms = bedrooms
        self.baths = baths
        self.price = price
        self.is_for_sale = is_for_sale
        self.is_for_rent = is_for_rent
        self.sqft = sqft
        self.notes = notes
        self.poster_id = poster_id
        