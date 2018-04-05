import os

basedir = os.path.abspath(os.path.dirname(__file__))

SECRET_KEY = os.environ.get('SECRET_KEY') or '4719fa05-d059-4ebc-9dc4-d447c2207053'
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
# SQLALCHEMY_DATABASE_URI =  'postgres://postgres:2dover3d@localhost/hwp'
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')
SQLALCHEMY_TRACK_MODIFICATIONS = False
MAIL_PORT = 465
MAIL_USE_SSL = True
MAIL_USE_TLS = False
MAIL_USERNAME = 'hwptesting@gmail.com'
MAIL_PASSWORD = 'wRec84ehed'
MAIL_SERVER = 'smtp.gmail.com'
# SERVER_NAME = 'localhost:5000'

serializer_key  = '27f06ca6-b864-4ff9-895b-42abd7ca8a22'

POSTS_PER_PAGE = 30
