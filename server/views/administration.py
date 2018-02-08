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

	username=None
	password=None

	if 'username' in request.form:
		username = request.form['username']
	else:
		abort(400)

	if 'password' in request.form:
		password = request.form['password']
	else:
		abort(400)

	return 1

@mod.route('/register', methods=['GET'])
def register_get():
	return 1

@mod.route('/register', methods=['POST'])
def register_post():
	return 1

@mod.route('/a/create-user', methods=['GET'])
@login_required
def create_user_get():
	return 1

@mod.route('/a/create-user', methods=['POST'])
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