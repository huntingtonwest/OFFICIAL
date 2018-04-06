
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
# db.session.rollback()
# sys.exit()
try:
	#load roles
	roles = [{

		'role_name':'Consultation Form',
		'email':'bestgirlshiina@gmail.com'
		},{
		'role_name':'Contact Form',
		'email':'bestgirlshiina@gmail.com'
		}]

	files = [{
		'file_name':'Enter-exit Checklist',
		'file_url':''
		},{
		'file_name':'30-Day Notice',
		'file_url':''
		},{
		'file_name': 'Cleaning Checklist',
		'file_url':''
		},{
		'file_name':'Satellite Dish Addendum',
		'file_url':''
		},{
		'file_name':'General Rules & Policies',
		'file_url':''
		}]

	properties = [{
	'name':'property1',
	'address_l1': '123 center st',
	'address_l2':'',
	'city':'Los Angeles',
	'state': 'CA',
	'zipcode': '11111',
	'type':'condo',
	'beds':2,
	'baths': 1,
	'sale_price': 1000,
	'rent_price': 500,
	'for_sale':True,
	'for_rent':True,
	'area':1000,
	'notes':'This is a beautiful condo',
	'poster_id':1,
	'images':''
	},
	{
	'name':'property2',
	'address_l1': '123 middle st',
	'address_l2':'apt no. 123',
	'city':'Sacramento',
	'state': 'CA',
	'zipcode': '22222',
	'type':'apartment',
	'beds':3,
	'baths': 1.5,
	'price': 2500,
	'sale_price': 10000,
	'rent_price': 6000,
	'area':2000,
	'notes':'This is a beautiful apartment',
	'poster_id':1,
	'images':''
	},
	{
	'name':'property3',
	'address_l1': '321 center st',
	'address_l2':'',
	'city':'Reno',
	'state': 'NV',
	'zipcode': '33333',
	'type':'duplex',
	'beds':1,
	'baths': 0,
	'sale_price': 4000,
	'rent_price': 1000,
	'for_sale':False,
	'for_rent':True,
	'area':500,
	'notes':'This is a beautiful duplex',
	'poster_id':1,
	'images':''
	},
	{
	'name':'property4',
	'address_l1': '123 center st',
	'address_l2':'',
	'city':'Sacramento',
	'state': 'FL',
	'zipcode': '44444',
	'type':'condo',
	'beds':2.5,
	'baths': 1,
	'sale_price': 4000,
	'rent_price': 5600,
	'for_sale':True,
	'for_rent':False,
	'area':2300,
	'notes':'This is a beautiful condo',
	'poster_id':1,
	'images':''
	}]

	for p in properties:
		try:
			prop = Properties.query.filter_by(name=p['name']).one()
		except:
			new_prop = Properties(p)
			db.session.add(new_prop)
			print('property added')

	print('properties done')
	for r in roles:
		try:
			role = Roles.query.filter_by(role_name=r['role_name']).one()
		except:
			role = Roles(role_name=r['role_name'])
			db.session.add(role)
			try:
				db.session.flush()
			except:
				db.session.rollback()

		try:
			email = Emails.query.filter_by(email=r['email']).one()
			role.add_email(email)

		except:
			email = Emails(email=r['email'])
			db.session.add(email)
			db.session.flush()
			try:
				db.session.flush()
			except:
				db.session.rollback()

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
	print('associations done')
	for f in files:
		try:
			# print(f)
			file = Files.query.filter_by(file_name=f['file_name']).one()
		except:
			# print('here')
			file = Files(file_name=f['file_name'], file_url=f['file_url'])
			db.session.add(file)
	#load master user
	print('files done')
	try:
		user = Users.query.filter_by(email='bestgirlshiina@gmail.com', is_deleted=False).one()
	except:
		user = Users(email='bestgirlshiina@gmail.com')
		db.session.add(user)
		try:
			x = 1
			db.session.flush()
		except:
			db.session.rollback()
		user.first = 'shiina'
		user.last = 'mashiiro'
		user.password = sha256_crypt.encrypt('sakurasou')
		user.is_master = True
		user.is_admin = True
		user.is_verified = True
	print('user added')
	db.session.commit()
	print('success')
except Exception as e:
	print(e)
	db.session.rollback()
	# db.session.expire_all()
	db.session.close()
