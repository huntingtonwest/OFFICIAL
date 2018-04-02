from flask import Blueprint, render_template, flash, request, redirect, url_for, abort, jsonify
from flask_login import login_required, logout_user, login_user, current_user

from server.models.users import Users
from passlib.hash import sha256_crypt

from server.utils.authority_verification import is_admin
from sqlalchemy import or_
from itsdangerous import SignatureExpired
from server.forms.forms import PropertyForm
from passlib.hash import sha256_crypt

from config import MAIL_USERNAME
from sqlalchemy import exc
from server.forms.forms import LoginForm, RegisterForm, PersonalSettings, PasswordForm, EmailForm
from server import db, s, mail

mod = Blueprint('administration_general', __name__)

"""
LOGIN
"""

@mod.route('/login', methods=['GET','POST'])
def login():

	form = LoginForm(request.form)

	if not current_user.is_anonymous:
		return redirect(url_for('administration_general.admin_home_get'))

	if request.method == 'POST' and form.validate():
		email = (form.email.data).strip()

		try:
			user = Users.query.filter_by(email=email, is_verified=True).one()
		except:
			form.email.errors.append('Invalid email or password.')
			return render_template('administration/login.html', form=form)

		if sha256_crypt.verify(form.password.data, user.password):
			login_user(user)
			return redirect(url_for('administration_general.admin_home_get'))

		form.email.errors.append('Invalid email or password.')

	return render_template('administration/login.html', form=form)


@mod.route('/logout', methods=['GET'])
@login_required
def logout():
	logout_user()
	flash('Logout successful','success')
	return redirect(url_for('administration_general.login'))


"""
REGISTRATION - after a user is created by admin, user can set password and start using acct
"""
@mod.route('/register/<string:token>', methods=['GET','POST'])
def register(token):
	form = RegisterForm(request.form)
	try:
		email = s.loads(token, salt='email_confirm', max_age=60*60)
	except SignatureExpired:
		alert={'status':'danger','msg':'The token has expired. Ask an administrator to resend the invitation.'}
		return render_template('administration/registration.html',alert=alert,form=form)
	except:
		abort(403)

	if request.method == 'POST' and form.validate():
		try:
			user = Users.query.filter_by(email=email).one()
			user.password = sha256_crypt.encrypt(form.password.data)
			user.first = form.first_name.data
			user.last = form.last_name.data
			user.is_verified=True

			db.session.commit()


		except:
			db.session.rollback()
			abort(400)
		flash('Successfully registered!','success')
		return redirect(url_for('administration_general.login'))

	return render_template('administration/registration.html',form=form)

"""
ADMIN HOME
"""
@mod.route('/admin-home', methods=['GET'])
@login_required
def admin_home_get():
	return render_template('administration/home.html')

@mod.route('/personal-settings', methods=['GET','POST'])
@login_required
def personal_settings():

	form = PersonalSettings(request.form)

	if request.method=='POST' and form.validate():
		first = form.first_name.data
		last = form.last_name.data

		try:
			current_user.first = first
			current_user.last = last
			db.session.commit()
		except:
			db.session.rollback()

		flash('Personal settings have been saved','success')
		return redirect(url_for('administration_general.personal_settings'))

	return render_template('administration/personal_settings.html', form=form)

@mod.route('/password-settings', methods=['GET','POST'])
@login_required
def password_settings():

	form = PasswordForm(request.form)

	if request.method=='POST' and form.validate():
		password = form.new_password.data

		try:
			current_user.password = sha256_crypt.encrypt(password)
			db.session.commit()
		except:
			db.session.rollback()
			abort(400)
		flash('Password was successfully changed.','success')
		return redirect(url_for('administration_general.password_settings'))

	return render_template('administration/password_settings.html', form=form)
