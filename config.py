import os

basedir = os.path.abspath(os.path.dirname(__file__))

SECRET_KEY = os.environ.get('SECRET_KEY') or 'temp'
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgres://postgres:2dover3d@localhost/hwp'
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')
SQLALCHEMY_TRACK_MODIFICATIONS = False
MAIL_PORT = 465
MAIL_USE_SSL = True

PROPERTIES_PER_PAGE = 20



