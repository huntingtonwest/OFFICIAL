
#!flask/bin/python

from migrate.versioning import api
from config import SQLALCHEMY_DATABASE_URI
from config import SQLALCHEMY_MIGRATE_REPO
from server import db
from server.models.associations import Associations
from server.models.users import Users
from server.models.roles import Roles, Emails
from server.models.properties import Properties
from server.models.files import Files
from passlib.hash import sha256_crypt
import os.path
import sys
db.create_all()
