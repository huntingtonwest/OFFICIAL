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
@mod.route('/login', methods=['GET'])
def login_get():

	if not current_user.is_anonymous:
		return redirect(url_for('administration.admin_home_get'))

	return render_template('administration/login.html')

@mod.route('/login', methods=['POST'])
def login_post():

	

	email=""
	password=""

	if 'email' in request.form and 'password' in request.form and len(request.form['password'].strip()) > 0:
		email = request.form['email']
		password = request.form['password']
	else:
		abort(400)

	try:
		user = Users.query.filter_by(email=email, password=password, is_verified=True).one()
	except:
		user = None
	if user:
		login_user(user)
		return redirect(url_for('administration.admin_home_get'))
	else:
		return "incorrect username or password"	

@mod.route('/logout', methods=['GET'])
def logout():
	logout_user()
	return redirect(url_for('administration.login_get'))


"""
REGISTRATION - after a user is created by admin, user can set password and start using acct
"""
@mod.route('/register/<string:token>', methods=['GET'])
def register_get(token):
	try:
		email = s.loads(token, salt='email_confirm', max_age=60*60)
	except SignatureExpired:
		return 'The token has expired. Ask an administrator to resend the invitation'
	except:
		abort(403)

	return render_template('administration/registration.html')

@mod.route('/register/<string:token>', methods=['POST'])
def register_post(token):

	try:
		email = s.loads(token, salt='email_confirm', max_age=60*60)
	except SignatureExpired:
		return 'The token has expired. Ask an administrator to resend the invitation'
	except:
		abort(403)

	if 'password' in request.form and 'first' in request.form and 'last' in request.form:
		password=request.form['password']
		first = request.form['first']
		last = request.form['last']
	else:
		return 'try refreshing the page and trying again'

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

	return redirect(url_for('administration.login_get'))


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

	email = request.form['email']

	user = Users(email=email)
	

	try:
		role = Roles.query.filter_by(role_name='User Registration').one()
	except:
		abort(400)

	print('here')

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

	#send email to create password

	return 'user invitation sent successfully'

@mod.route('/resend-invitation', methods=['POST'])
@login_required
@is_admin
def resend_invitation():

	user_id = request.form['id']
	email = request.form['email']

	try:
		print('here')
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

	return 'invitation re-sent!'

@mod.route('/delete-user', methods=['POST'])
@login_required
@is_admin
def delete_user():

	user_id = request.form['id']

	user = Users.query.get(user_id)
	print(user.is_admin)
	if user.is_admin and not current_user.is_master:
		return 'only the master admin can delete admin accounts'
	if user.id == current_user.id:
		return 'you cannot delete your own account'
		

	try:
		print('here')
		db.session.delete(user)
		db.session.commit()
	except:
		abort(400)


	return redirect(url_for('administration.user_settings_get'))


@mod.route('/edit-user/<string:user_id>', methods=['GET'])
@login_required
@is_admin
def edit_user_get(user_id):

	user = Users.query.get(user_id)

	return render_template('administration/edit_user.html', user=user)

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


	return 1

@mod.route('/add-property', methods=['GET'])
def add_property_get():
	return render_template('administration/add_property.html')

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