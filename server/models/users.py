from server import db
from datetime import datetime
from flask_login import UserMixin
from server.models.history import History


# class QueryWithSoftDelete(db.Query):
#     def __new__(cls, *args, **kwargs):
#         obj = super(QueryWithSoftDelete, cls).__new__(cls)
#         if len(args) > 0:
#             super(QueryWithSoftDelete, obj).__init__(*args, **kwargs)
#             return obj.filter_by(is_deleted=False)
#         return obj
#
#     def __init__(self, *args, **kwargs):
#         pass


class Users(UserMixin, db.Model):
    __tablename__ = 'Users'
    id = db.Column(db.Integer, primary_key = True)

    first = db.Column(db.String(100))
    last = db.Column(db.String(100))

    email = db.Column(db.String(100))
    password = db.Column(db.String(80))
    is_master = db.Column(db.Boolean(), default=False)
    is_admin = db.Column(db.Boolean(), default=False)
    is_verified = db.Column(db.Boolean(), default=False)

    join_date = db.Column(db.DateTime(), default = datetime.utcnow)

    is_deleted = db.Column(db.Boolean(), default=False)
    delete_date = db.Column(db.DateTime(), default=datetime.utcnow)

    history_subj = db.relationship("History", backref='user_info', foreign_keys=[History.user_id], order_by='History.date.desc()', passive_deletes="all")
    history_target = db.relationship("History", backref='tgt_info', foreign_keys=[History.tgt_user_id], cascade_backrefs=False)

    history = db.relationship('History', primaryjoin="or_(Users.id == History.user_id, Users.id == History.tgt_user_id)", order_by='History.date.desc()')

    # query_class = QueryWithSoftDelete

    def __init__(self, email):
        self.email = email




    # def __init__(self, first, last, email, password):
    #     self.first = first
    #     self.last = last
    #     self.email = email
    #     self.password=password
