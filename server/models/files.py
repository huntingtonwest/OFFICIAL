from server import db
from datetime import datetime


class Files(db.Model):
    __tablename__ = 'Files'
    file_id = db.Column(db.Integer, primary_key = True)
    file_name = db.Column(db.String(200), unique=True)
    file_url = db.Column(db.String(1000))
    date = db.Column(db.DateTime(), onupdate = datetime.utcnow, default = datetime.utcnow)

    history = db.relationship('History', backref = 'file', lazy = 'dynamic')

    def __init__(self, file_name, file_url):
        self.file_url = file_url
        self.file_name = file_name
