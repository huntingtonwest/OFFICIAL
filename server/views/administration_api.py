from flask import Blueprint, render_template, request, redirect, url_for, abort
from flask_login import login_required, logout_user, login_user, current_user
from flask_mail import Message

from server.models.users import Users
from server.models.properties import Properties
from server.models.roles import Roles
from passlib.hash import sha256_crypt
# from validate_email import validate_email

from server.utils.authority_verification import is_admin
from sqlalchemy import or_
from itsdangerous import SignatureExpired
from server.forms.forms import PropertyForm

from server import db, s, mail

mod = Blueprint('administration', __name__)

"""
LOGIN
"""
@mod.route('/login', methods=['POST'])
def login():

	if not current_user.is_anonymous:
		return jsonify({'status':'success'})

	email = request.form['email']
	password = request.form['password']

	try:
		user = Users.query.filter_by(email=email, password=password, is_verified=True).one()
	except:
		user = None
	if user:
		login_user(user)
		return jsonify({'status':'success'})
	else:
		return jsonify({'status':'error', 'msg':"Incorrect username or password"})

@mod.route('/logout', methods=['GET'])
def logout():
	logout_user()
	return jsonify({'status':'success'})


"""
REGISTRATION - after a user is created by admin, user can set password and start using acct
"""
@mod.route('/register/<string:token>', methods=['POST'])
def register(token):

	try:
		email = s.loads(token, salt='email_confirm', max_age=60*60)
	except SignatureExpired:
		return jsonify({'status':'error','msg':'The token has expired. Ask an administrator to resend the invitation'})
	except:
		abort(403)

	password=request.form['password']
	first = request.form['first']
	last = request.form['last']

	try:
		user = Users.query.filter_by(email=email).one()
	except:
		abort(400)

	user.password = password
	user.first = first
	user.last = last
	user.is_verified=True

	try:
		db.session.commit()
	except:
		db.session.rollback()
		db.session.flush()
		abort(400)

	return jsonify({'status':'success', 'msg':'You have been registered!'})


"""
USER SETTINGS - allows admins to control who has access to admin
"""

#TODO: update personal settings
#TODO: get personal settings

@mod.route('/get-users', methods=['GET'])
@login_required
@is_admin
def get_users():

	users = Users.query.filter_by(is_verified=True).all()
	not_verified = Users.query.filter_by(is_verified=False).all()

	return jsonify({'users':users, 'not_verified':not_verified})


@mod.route('/create-user', methods=['POST'])
@login_required
@is_admin
def create_user():

	email = request.form['email']

	user = Users(email=email)

	try:
		role = Roles.query.filter_by(role_name='User Registration').one()
	except:
		abort(400)


	sender = [s.email for s in role.emails]

	token = s.dumps(email, salt='email_confirm')
	msg = Message('Confirm Email', sender=sender[0], recipients=[email])
	link = url_for('administration.register_post', token=token, external=True)
	msg.body = 'Go to this link to register as a moderator for Huntington West Properties website: {}'.format(link)

	try:
		db.session.add(user)
		db.session.commit()
	except:
		db.session.rollback()
		db.session.flush()
		abort(400)

	try:
		mail.send(msg)
	except:
		abort(400)

	return jsonify({'status':'success', 'msg': 'The invitation has been successfully sent!'})

@mod.route('/resend-invitation', methods=['POST'])
@login_required
@is_admin
def resend_invitation():

	user_id = request.form['id']
	email = request.form['email']

	try:
		user = Users.query.filter_by(id = user_id, email=email, is_verified=False).one()
		role = Roles.query.filter_by(role_name='User Registration').one()
	except:
		abort(400)

	sender = [s.email for s in role.emails]

	token = s.dumps(email, salt='email_confirm')
	msg = Message('Confirm Email', sender=sender[0], recipients=[email])
	link = url_for('administration.register_post', token=token, external=True)
	msg.body = 'Go to this link to register as a moderator for Huntington West Properties website: {}'.format(link)

	try:
		mail.send(msg)
	except:
		abort(400)

	return jsonify({'status':'success', 'msg': 'The invitation has been successfully sent!'})

@mod.route('/delete-user', methods=['POST'])
@login_required
@is_admin
def delete_user():

	user_id = request.form['id']

	user = Users.query.get(user_id)
	if user.is_admin and not current_user.is_master:
		return jsonify({'status':'error','msg':'Only the master admin can delete admin accounts'})
	if user.id == current_user.id:
		return jsonify({'status':'error','msg':'you cannot delete your own account'})

	try:
		db.session.delete(user)
		db.session.commit()
	except:
		abort(400)


	return jsonify({'status':'success', 'msg': 'The user has been successfully removed!'})


#TODO: needs testing
@mod.route('/edit-user/<string:user_id>', methods=['POST'])
@login_required
@is_admin
def edit_user_post(user_id):

	#assuming checked will return 'on' string
	is_admin = None
	checkbox = request.form['is_admin']
	if checkbox in ['on']:
		print('checked')
		is_admin = True
	else:
		is_admin = False

	if int(user_id) == current_user.id:
		return "go to personal settings to change your own settings"

	user = Users.query.get(user_id)

	if not user.is_verified:
		return "this user must have their email verified first"
	if user.is_admin and not current_user.is_master:
		return 'only the master admin can edit admin accounts'
	if is_admin != user.is_admin and user.is_admin and not current_user.is_master:
		return 'only the master admin can promote/demote admins'

	user.is_admin= is_admin
	try:
		db.session.commit()
	except:
		abort(400)

	return redirect(url_for('administration.user_settings_get'))


"""
PROPERTIES
"""

@mod.route('/all-properties-get', methods=['GET'])
@login_required
def property_settings_get():

	p = Properties.query.all()
	
	properties = []
	for x in p:
		prop = serialize(x, Properties)

		prop['city'] = x.city_info.city_name
		prop['type'] = x.type_info.type_name

		properties.append(prop)

	return jsonify({'properties':properties})


#WIP
@mod.route('/get-property/<string:property_id>', methods=['GET'])
@login_required
def get_property(property_id):

	p = Properties.query.get(property_id)
	prop = serialize(p, Properties)
	prop['city'] = x.city_info.city_name
	prop['type'] = x.type_info.type_name

	return jsonify({'property':prop})


@mod.route('/edit-property/<string:action>/<string:property_id>', methods=['POST'])
@login_required
def edit_property_post(action):


	return 1


@mod.route('/add-property', methods=['POST'])
def add_property_post():

	form = PropertyForm(request.form)

	if not form.validate():
		abort(400)

	prop_info={
		'name':form['name'],
		'address_l1':form['address_l1'],
		'address_l2':form['address_l2'],
		'city':form['city'],
		'state':form['state'],
		'zipcode':form['zipcode'],
		'status':form['zipcode'],
		'type':form['type'],
		'beds':form['beds'],
		'baths':form['baths'],
		'price':form['price'],
		'for_sale':form['for_sale'],
		'for_rent':form['for_rent'],
		'area':form['area'],
		'noted':form['notes']
	}





	return 'add property successful'

def delete_property():
	return 1
