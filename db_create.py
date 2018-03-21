
#!flask/bin/python
from migrate.versioning import api
from config import SQLALCHEMY_DATABASE_URI
from config import SQLALCHEMY_MIGRATE_REPO
from server import db
from server.models.associations import Associations
from server.models.users import Users
from server.models.roles import Roles, Emails
import os.path
db.create_all()

try:
	#load roles
	roles = [{
		'role_name':'Consultation Form Sender',
		'email':'hwptesting@gmail.com'
		},{
		'role_name':'Consultation Form Receiver',
		'email':'bestgirlshiina@gmail.com'
		},{
		'role_name':'Contact Form Sender',
		'email':'hwptesting@gmail.com'
		},{
		'role_name':'Contact Form Receiver',
		'email':'bestgirlshiina@gmail.com'
		},{
		'role_name':'User Registration',
		'email':'hwptesting@gmail.com'
		}]


	for r in roles:
		try:
			role = Roles.query.filter_by(role_name=r['role_name']).one()
		except:
			role = Roles(role_name=r['role_name'])
			db.session.add(role)
			db.session.flush()

		try:
			email = Emails.query.filter_by(email=r['email']).one()
			role.add_email(email)

		except:
			email = Emails(email=r['email'])
			db.session.add(email)
			db.session.flush()
			
			role.add_email(email)

	print('roles and emails done')
	#load associations
	associations = [{
		'acn_name':'Ash Street Community Association', 
		'acn_loc':'Huntington Beach'
		},{
		'acn_name':'B.P. Homeowners Association',
		'acn_loc':'Newport Beach'
		},{
		'acn_name':'Birchview Brea Homeowners Association', 
		'acn_loc':'Brea'
		},{
		'acn_name': 'Casa Gaviota Homeoners Association, Inc.', 
		'acn_loc':'Signal Hill'
		}]

	for a in associations:
		try:
			association = Associations.query.filter_by(acn_name=a['acn_name'], acn_loc=a['acn_loc']).one()
		except:
			association = Associations(acn_name=a['acn_name'], acn_loc=a['acn_loc'])
			db.session.add(association)

	#load master user
	user = Users(email='bestgirlshiina@gmail.com')
	db.session.add(user)
	db.session.flush()
	user.first = 'shiina'
	user.last = 'mashiiro'
	user.password = 'sakurasou'
	user.is_master = True
	user.is_admin = True
	user.is_verified = True

	db.session.commit()
	print('success')
except Exception as e:
	print(e)
	db.session.rollback()
	db.session.expire_all()