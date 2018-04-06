from flask import Blueprint, render_template, flash, request, redirect, url_for, abort, jsonify
from flask_login import login_required, logout_user, login_user, current_user

from server.models.users import Users
from server.models.history import History, HistoryContent
from passlib.hash import sha256_crypt
from flask_mail import Message


from server.utils.authority_verification import is_admin
from sqlalchemy import or_
from itsdangerous import SignatureExpired
from server.forms.forms import PropertyForm, Resend
from passlib.hash import sha256_crypt
from server.utils.query_utils import serialize, pst_time

from config import MAIL_USERNAME
from sqlalchemy import exc
from server.forms.forms import LoginForm, RegisterForm, PersonalSettings, PasswordForm, EmailForm, DeleteForm, PasswordResetForm
from server import app, db, s, mail

mod = Blueprint('administration_general', __name__)

"""
LOGIN/LOGOUT
"""
@mod.route('/login', methods=['GET','POST'])
def login():

	form = LoginForm(request.form)

	if not current_user.is_anonymous:
		return redirect(url_for('administration_general.admin_home_get'))

	if request.method == 'POST' and form.validate():
		email = (form.email.data).strip()

		try:
			user = Users.query.filter_by(email=email, is_verified=True, is_deleted=False).one()
		except:
			form.email.errors.append('Invalid email or password.')
			return render_template('administration/general/login.html', form=form)

		if sha256_crypt.verify(form.password.data, user.password):
			login_user(user)
			return redirect(url_for('administration_general.admin_home_get'))

		form.email.errors.append('Invalid email or password.')

	return render_template('administration/general/login.html', form=form)

@mod.route('/logout', methods=['GET'])
@login_required
def logout():
	logout_user()
	flash('Logout successful','success')
	return redirect(url_for('administration_general.login'))


"""
RESET PASSWORD
"""
@mod.route('/forgot-password', methods=['GET','POST'])
def forgot_password():
	form=Resend(request.form)

	if request.method=='POST' and form.validate():
		user = Users.query.filter_by(email=form.email.data, is_deleted=False).first()
		if not user:
			flash("This email doesn't exist!", 'danger')
			return render_template('administration/general/forgot_password.html', form=form)

		token = s.dumps(form.email.data, salt='password_change')
		msg = Message('HWP Reset Password', sender=MAIL_USERNAME, recipients=[form.email.data])
		link = url_for('administration_general.reset_password', token=token, external=True)
		msg.html = 'Go to <a href="{}/{}">this</a> link to reset your password for Huntington West Properties website.'.format(request.url_root,link)

		try:
			mail.send(msg)
		except:
			flash('Something went wrong. Refresh the page and try again.', 'danger')
			return render_template('administration/users/create_user.html', form=form)

		flash('An email has been sent to reset your password','success')
		return redirect(url_for('administration_general.login'))

	return render_template('administration/general/forgot_password.html', form=form)


@mod.route('/reset-password/<string:token>', methods=['GET','POST'])
def reset_password(token):

	form = PasswordResetForm(request.form)

	try:
		email = s.loads(token, salt='password_change', max_age=60*10)
	except SignatureExpired:
		alert={'status':'danger','msg':'This link has expired.'}
		return redirect(url_for('administration_general.login'))
	except:
		abort(403)

	if request.method== 'POST' and form.validate():
		user = Users.query.filter_by(email=email, is_deleted=False).first()
		if not user:
			abort(404)
		try:
			user.password = sha256_crypt.encrypt(form.password.data)
			db.session.commit()
		except:
			flash('Something went wrong. Please refresh the page and try again.','danger')
			return render_template('administration/general/reset_password.html', form=form, token=token)
		flash('Password was successfully reset.','success')
		return redirect(url_for('administration_general.login'))

	return render_template('administration/general/reset_password.html', form=form, token=token)




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
		return render_template('administration/general/registration.html',alert=alert,form=form)
	except:
		abort(403)

	if request.method == 'POST' and form.validate():
		try:
			user = Users.query.filter_by(email=email, is_deleted=False).one()
			user.password = sha256_crypt.encrypt(form.password.data)
			user.first = form.first_name.data
			user.last = form.last_name.data
			user.is_verified=True

			print('here')
			new_history = History('user_join',user.id, tgt_user_id=user.id)
			db.session.add(new_history)
			db.session.flush()
			print('here2')

			new_content = HistoryContent(new_history.history_id, 'Identifier',user.email)
			db.session.add(new_content)
			print('here3')

			db.session.commit()


		except Exception as e:
			print(e)
			db.session.rollback()
			flash('Something went wrong. Refresh the page and try again.','danger')
			return render_template('administration/general/registration.html',form=form)

		flash('Successfully registered!','success')
		return redirect(url_for('administration_general.login'))

	return render_template('administration/general/registration.html',form=form)

"""
ADMIN HOME
"""
@mod.route('/admin-home', methods=['GET'])
@login_required
def admin_home_get():
	# print('here')
	page = request.args.get('page', 1, type=int)
	history_query = History.query.order_by(History.date.desc()).paginate(page, app.config['POSTS_PER_PAGE'], False)

	next_url = url_for('administration_general.admin_home_get', page=history_query.next_num) \
		if history_query.has_next else None
	prev_url = url_for('administration_general.admin_home_get', page=history_query.prev_num) \
		if history_query.has_prev else None

	for i in history_query.items:
		print(i)

	return render_template('administration/general/home.html', history=history_query.items, next_url=next_url, prev_url=prev_url)




"""
Personal Settings
"""

@mod.route('/personal-settings', methods=['GET','POST'])
@login_required
def personal_settings():

	form = PersonalSettings(request.form)

	if request.method=='POST' and form.validate():

		if int(form.id.data) != int(current_user.id):
			flash('Something went wrong. Refresh the page and try again')
			return redirect(url_for('administration_general.logout'))

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

	return render_template('administration/general/personal_settings.html', form=form)

@mod.route('/password-settings', methods=['GET','POST'])
@login_required
def password_settings():

	form = PasswordForm(request.form)

	if request.method=='POST' and form.validate():

		if int(form.id.data) != int(current_user.id):
			flash('Something went wrong. Refresh the page and try again')
			return redirect(url_for('administration_general.logout'))

		old_password = form.password.data
		password = form.new_password.data

		if not sha256_crypt.verify(old_password, current_user.password):
			form.password.errors.append('Your original password is incorrect!')
			return render_template('administration/general/password_settings.html', form=form)

		try:
			current_user.password = sha256_crypt.encrypt(password)
			db.session.commit()
		except:
			db.session.rollback()
			abort(400)
		flash('Password was successfully changed.','success')
		return redirect(url_for('administration_general.password_settings'))

	return render_template('administration/general/password_settings.html', form=form)


"""
DELETE RECORDED HISTORY
"""
@mod.route('/delete-history', methods=['POST'])
@login_required
@is_admin
def delete_history():

	form = DeleteForm(request.form)
	if request.method=='POST' and form.validate():
		history = History.query.get(form.id.data)
		if not history:
			abort(404)

		try:
			db.session.delete(history)
			db.session.commit()
		except:
			db.session.rollback()
			flash('Something went wrong. Please refresh and try again.','danger')
			return redirect(url_for('administration_general.admin_home_get'))

		flash('History was successfully deleted.','success')
		return redirect(url_for('administration_general.admin_home_get'))

	flash('Something went wrong. Please refresh and try again.','danger')
	return redirect(url_for('administration_general.admin_home_get'))
