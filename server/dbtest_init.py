from server.models.users import Users
from server.models.properties import Properties, PropertyTypes, Cities

from server.models.roles import Roles
from passlib.hash import sha256_crypt
# from flask_mail import Message


from server import db

users = [{
	'first':'mirai',
	"last":'kuriyama',
	'email':'mirai@gmail.com',
	'password':'party123',
	'is_admin':True
	},
	{
	'first': 'rikka',
	'last':'takanashi',
	'email':'rikka@gmail.com',
	'password':'party123',
	'is_admin':False
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
	'type':'house',
	'beds':1,
	'baths': 0,
	'price': 1000,
	'for_sale':False,
	'for_rent':True,
	'area':500,
	'notes':'This is a beautiful house',
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


def testdb_init(properties, users):
	for u in users:
		try:
			user = Users.query.filter_by(email=u['email']).one()
		except:
			user = Users(u)
			db.session.add(user)
			db.session.flush()
			print('user added')
	
	print('in props')
	for p in properties:
	
		try:
			type = PropertyTypes.query.filter_by(type_name=p['type']).one()
			p['type'] = type.type_id
		except:
			type = PropertyTypes(type_name=p['type'])
			db.session.add(type)
			db.session.flush()
			p['type'] = type.type_id
			print('property type added')
	
		try:
			city = Cities.query.filter_by(city_name=p['city']).one()
			p['city'] = city.city_id

		except:
			city = Cities(city_name=p['city'])
			db.session.add(city)
			db.session.flush()
			p['city'] = city.city_id
			print('city added')
	
		try:
			prop = Properties.query.filter_by(name=p['name']).one()
		except:
			new_prop = Properties(p)
			db.session.add(new_prop)
			print('property added')


	for p in properties:
		print (p)

	try:
		db.session.commit()
		print('users and properties added')
	except:
		db.session.rollback()
		print('db init failed or already done before')
