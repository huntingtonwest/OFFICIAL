from flask import Blueprint, render_template, request, redirect, url_for, abort
from flask_login import login_required, logout_user, login_user, current_user

from server.models.users import Users
from server.models.properties import Properties
from passlib.hash import sha256_crypt
# from validate_email import validate_email

from server.utils.authority_verification import is_admin
from sqlalchemy import or_

from server import db

mod = Blueprint('administration', __name__)

"""
LOGIN
"""
@mod.route('/login', methods=['GET'])
def login_get():

	return render_template('administration/login.html')

@mod.route('/login', methods=['POST'])
def login_post():

	email=None
	password=None

	if 'email' in request.form:
		email = request.form['email']
	else:
		abort(400)

	if 'password' in request.form and len(request.form['password']) > 0:
		password = request.form['password']
	else:
		abort(400)
	print(email)
	print(password)

	try:
		user = Users.query.filter_by(email=email, password=password, is_verified=True).one()
	except:
		user = None
	if user:
		login_user(user)
		return redirect(url_for('administration.admin_home_get'))
	else:
		return "incorrect username or password"	

"""
REGISTRATION - after a user is created by admin, user can set password and start using acct
"""
@mod.route('/register/<string:token>', methods=['GET'])
def register_get(token):



	return render_template('administration/register.html')

@mod.route('/register/<string:token>', methods=['POST'])
def register_post(token):

	email=""

	
	if 'email' in request.form:
		email = request.form['email']

	#send email verification

	return 1


"""
ADMIN HOME
"""
@mod.route('/admin-home', methods=['GET'])
@login_required
def admin_home_get():
	return render_template('administration/home.html')


"""
USER SETTINGS - allows admins to control who has access to admin 
"""
@mod.route('/user-settings', methods=['GET'])
@login_required
@is_admin
def user_settings_get():

	users = Users.query.filter_by(is_verified=True).all()
	not_verified = Users.query.filter_by(is_verified=False).all()

	return render_template('administration/user_settings.html', users=users, not_verified=not_verified)

@mod.route('/create-user', methods=['GET'])
@login_required
@is_admin
def create_user_get():
	return render_template('administration/create_user.html')

@mod.route('/create-user', methods=['POST'])
@login_required
@is_admin
def create_user_post():

	first = request.form['first']
	last = request.form['last']
	email = request.form['email']

	user = Users({'first':first,
		'last':last,
		'email':email
		})
	try:
		db.session.add(user)
		db.session.commit()
	except:
		abort(400)

	#send email to create password

	return render_template('administration/create_user.html')


@mod.route('/delete-user', methods=['POST'])
@login_required
@is_admin
def delete_user():

	id = request.form['id']

	user = Users.query.get(id)

	try:
		db.session.remove(user)
		db.session.commit()
	except:
		abort(400)


	return redirect(url_for)


@mod.route('/edit-user/<string:user_id>', methods=['GET'])
@login_required
@is_admin
def edit_user_get(user_id):

	user = Users.query.get(user_id)

	return render_template('administration/edit_user.html', user=user)


@mod.route('/edit-user/<string:user_id>', methods=['POST'])
@login_required
@is_admin
def edit_user_post(user_id):

	if int(user_id) == current_user.id:
		return "go to personal settings to change your own settings"

	first = request.form['first']
	last = request.form['last']
	email = request.form['email']
	is_admin = request.form['is_admin']

	user = Users.query.get(user_id)
	user.first = first
	user.last = last
	user.email = email
	user.is_admin= is_admin

	try:
		db.session.commit()
	except:
		abort(400)

	return redirect(url_for('administration.user_settings_get'))


"""
PROPERTIES
"""

@mod.route('/property-settings', methods=['GET'])
@login_required
def property_settings_get():

	available_properties = Properties.query.filter(or_(Properties.for_rent==True, Properties.for_sale==True)).all()
	nonavailable_properties = Properties.query.filter_by(for_rent=False, for_sale=False).all()

	return render_template('administration/property_settings.html', available_properties=available_properties, 
		nonavailable_properties=nonavailable_properties)

@mod.route('/edit-property/<string:property_id>', methods=['GET'])
@login_required
def edit_property_get(property_id):

	property = Properties.query.get(property_id)

	return render_template('administration/edit_property.html', property=property)

@mod.route('/edit-property/<string:action>/<string:property_id>', methods=['POST'])
@login_required
def edit_property_post(action):

	if action == "add":
		add_property()

	if action == "edit":
		edit_property()

	if action == "delete":
		delete_property()

	return 1


def add_property():
	return 1

def edit_property():
	return 1

def delete_property():
	return 1