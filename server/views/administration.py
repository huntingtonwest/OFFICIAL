from flask import Blueprint, render_template, request, redirect, url_for, abort
from flask_login import login_required, logout_user, login_user, current_user

from server.models.users import Users
from passlib.hash import sha256_crypt
# from validate_email import validate_email

from server import db

mod = Blueprint('administration', __name__)

@mod.route('/login', methods=['GET'])
def login_get():
	return 1

@mod.route('/login', methods=['POST'])
def login_post():

	email=None
	password=None

	if 'email' in request.form:
		email = request.form['email']
	else:
		abort(400)

	if 'password' in request.form:
		password = request.form['password']
	else:
		abort(400)

	try:
		user = Users.query.filter_by(email=email, password=password).one()
	except:
		pass
	if user:
		login_user(user)
		return redirect(url_for('administration.admin_home'))
	else:
		return "incorrect username or password"	

@mod.route('/register', methods=['GET'])
def register_get():
	return 1

@mod.route('/register', methods=['POST'])
def register_post():
	return 1

@mod.route('/create-user', methods=['GET'])
@login_required
def create_user_get():
	return 1

@mod.route('/create-user', methods=['POST'])
@login_required
def create_user_post():

	if 'email' in request.form:
		email = request.form['email']
	else:
		abort(400)

	if 'confirm' in request.form:
		confirm=request.form['confirm']
	else:
		abort(400)


	return 1

@mod.route('/home', methods=['GET'])
@login_required
def admin_home_get():
	return 1

@mod.route('/edit-property', methods=['GET'])
@login_required
def edit_property_get():
	return 1

@mod.route('/edit-property/<string:action>', methods=['POST'])
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