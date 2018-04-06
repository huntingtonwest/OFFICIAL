from server import db
from datetime import datetime


class AboutInfo(db.Model):
    __tablename__ = 'AboutInfo'
    aboutinfo_id = db.Column(db.Integer, primary_key = True)
    first = db.Column(db.String(100))
    last = db.Column(db.String(100))
    position = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(11))
    img_url = db.Column(db.String(1000))

    date = db.Column(db.DateTime(), onupdate = datetime.utcnow, default = datetime.utcnow)

    history = db.relationship('History', backref = 'aboutinfo', lazy = 'dynamic')

    def __init__(self, first, last, position, email, phone, img_url):
        self.first = first
        self.last = last
        self.position = position
        self.email = email
        self.phone = phone
        self.img_url=img_url
