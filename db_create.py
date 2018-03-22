
#!flask/bin/python
from migrate.versioning import api
from config import SQLALCHEMY_DATABASE_URI
from config import SQLALCHEMY_MIGRATE_REPO
from server import db
from server.models.associations import Associations
from server.models.users import Users
from server.models.roles import Roles, Emails
from server.models.properties import Properties, PropertyTypes, Cities

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
	'price': 1000,
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
	'for_sale':False,
	'for_rent':True,
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
	'price': 1000,
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
	'price': 3000,
	'for_sale':True,
	'for_rent':False,
	'area':2300,
	'notes':'This is a beautiful condo',
	'poster_id':1,
	'images':''
	}]

	for p in properties:
	
		try:
			type = PropertyTypes.query.filter_by(type_name=p['type']).one()
			p['type'] = type.type_id
		except:
			type = PropertyTypes(type_name=p['type'])
			db.session.add(type)
			db.session.flush()
			p['type'] = type.type_id
			# print('property type added')
	
		try:
			city = Cities.query.filter_by(city_name=p['city']).one()
			p['city'] = city.city_id

		except:
			city = Cities(city_name=p['city'])
			db.session.add(city)
			db.session.flush()
			p['city'] = city.city_id
			# print('city added')
	
		try:
			prop = Properties.query.filter_by(name=p['name']).one()
		except:
			new_prop = Properties(p)
			db.session.add(new_prop)
			print('property added')


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

	try:
		user = Users.query.filter_by(email='bestgirlshiina@gmail.com').one()
	except:
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