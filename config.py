import os

basedir = os.path.abspath(os.path.dirname(__file__))

SECRET_KEY = os.environ.get('SECRET_KEY') or 'temp'
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgres://postgres:2dover3d@localhost/hwp'
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')
SQLALCHEMY_TRACK_MODIFICATIONS = False
PROPERTIES_PER_PAGE = 20


# PROPERTIES_VARS = ['name', 'address_l1', 'address_l2', 'city', 'state', 'zipcode', 'type', 'beds', 'baths', 'price',\
# 'for_sale', 'for_rent', 'area', 'notes', 'date_posted']
# USER_VARS = ['first', 'last', 'email', 'password']
