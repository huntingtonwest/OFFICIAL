from server import db
from datetime import datetime

class History(db.Model):
    __tablename__ = 'History'
    history_id = db.Column(db.Integer, primary_key = True)
    type = db.Column(db.String(20))
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'))

    tgt_user_id = db.Column(db.Integer, db.ForeignKey('Users.id'))
    tgt_prop_id = db.Column(db.Integer, db.ForeignKey('Properties.property_id'))
    tgt_acn_id = db.Column(db.Integer, db.ForeignKey('Associations.acn_id'))
    tgt_file_id = db.Column(db.Integer, db.ForeignKey('Files.file_id'))
    tgt_about_id = db.Column(db.Integer, db.ForeignKey('AboutInfo.aboutinfo_id'))


    is_deleted = db.Column(db.Boolean(), default=False)
    date = db.Column(db.DateTime(), default = datetime.utcnow)

    content = db.relationship('HistoryContent', backref='row_content', lazy='dynamic')
    # user = db.relationship('Users', backref='history', lazy='dynamic')
    # tgt_user = db.relationship('Users', backref='history', lazy='dynamic')
    def __init__(self, type, user_id, **kwargs):
        self.type=type
        self.user_id = user_id
        # if 'content' in kwargs:
        #     self.content = kwargs['content']
        if 'tgt_prop_id' in kwargs:
            self.tgt_prop_id = kwargs['tgt_prop_id']
        if 'tgt_user_id' in kwargs:
            self.tgt_user_id = kwargs['tgt_user_id']
        if 'tgt_acn_id' in kwargs:
            self.tgt_acn_id = kwargs['tgt_acn_id']
        if 'tgt_file_id' in kwargs:
            self.tgt_file_id = kwargs['tgt_file_id']
        if 'tgt_about_id' in kwargs:
            self.tgt_about_id = kwargs['tgt_about_id']



class HistoryContent(db.Model):
    __tablename__ = 'HistoryContent'
    content_id = db.Column(db.Integer, primary_key = True)
    history_id = db.Column(db.Integer, db.ForeignKey('History.history_id'))
    col_name = db.Column(db.String(100))
    col_content = db.Column(db.String(4000))



    def __init__(self, history_id, col_name, col_content):
        self.history_id = history_id
        self.col_name = col_name
        self.col_content = col_content

# form record
# add/edit/delete/join user X
# add/edit/delete property X
# add/delete email X
# add/edit/delete association X
# add/edit/delete employee info
# add/edit/delete files
