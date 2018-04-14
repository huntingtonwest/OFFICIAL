from flask import Blueprint, render_template, flash, request, redirect, url_for, abort, jsonify
from flask_login import login_required, current_user
from flask_mail import Message

from server.models.users import Users
from server.models.history import History, HistoryContent
from server.utils.authority_verification import is_admin
from server.utils.query_utils import serialize, pst_time
from server.forms.forms import CreateUser, Resend, EditUser, DeleteForm, EditMasterForm
from server import app, db,s, mail
from server.views.general import init

from datetime import datetime


MAIL_USERNAME = app.config['MAIL_USERNAME']

mod = Blueprint('administration_users', __name__)


"""
USER SETTINGS - allows admins to control who has access to admin
"""
@mod.route('/user-settings', methods=['GET'])
@login_required
# @is_admin
def user_settings_get():
	users_query = Users.query.filter_by(is_verified=True, is_deleted=False).order_by(Users.first).all()
	not_verified_query = Users.query.filter_by(is_verified=False, is_deleted=False).order_by(Users.email).all()

	users = []
	for u in users_query:
		v = serialize(u,Users)
		v['join_date'] =pst_time(u.join_date)
		users.append(v)

	not_verified = []
	for u in not_verified_query:
		v = serialize(u,Users)
		v['join_date'] =pst_time(u.join_date)
		not_verified.append(v)

	# print(users)
	# print(not_verified)

	return render_template('administration/users/user_settings.html', users=users, not_verified=not_verified)


@mod.route('/create-user', methods=['GET','POST'])
@login_required
@is_admin
def create_user():
	form = CreateUser(request.form)

	if request.method == 'POST' and form.validate():
		email = (form.email.data).strip()

		check = Users.query.filter_by(email=email, is_deleted=False).first()
		if check:
			flash('This email is already used by a user or is waiting validation.', 'danger')
			return render_template('administration/users/create_user.html', form=form)

		user=Users(email=email)
		token = s.dumps(email, salt='email_confirm')
		msg = Message('Confirm Email', sender=MAIL_USERNAME, recipients=[email])
		link = url_for('administration_general.register', token=token, external=True)
		msg.html = 'Go to <a href="{}{}">this</a> link to register as a moderator for Huntington West Properties website.'.format(request.url_root,link)

		# msg.body = 'Go to this link to register as a moderator for Huntington West Properties website: {}'.format(link)

		try:
			db.session.add(user)
			db.session.flush()

			new_history = History('add_user',current_user.id, tgt_user_id=user.id)
			db.session.add(new_history)
			db.session.flush()

			new_content = HistoryContent(new_history.history_id, 'Identifier', email)
			db.session.add(new_content)

			db.session.commit()
		except Exception as e:
			db.session.rollback()
			flash('Something went wrong. Refresh the page and try again.', 'danger')
			return render_template('administration/users/create_user.html', form=form)

		try:
			mail.send(msg)
		except:
			flash('Invitation failed to send. Refresh and try again.', 'danger')
			return render_template('administration/users/create_user.html', form=form)

		flash('Invitation successfully sent!','success')
		return redirect(url_for('administration_users.create_user'))

	return render_template('administration/users/create_user.html', form=form)

@mod.route('/resend-invitation', methods=['POST'])
@login_required
@is_admin
def resend_invitation():
	form = Resend(request.form)
	if form.validate():
		email = (form.email.data).strip()
		id = form.id.data
		try:
			user = Users.query.filter_by(id = id, email=email, is_verified=False, is_deleted=False).one()
		except Exception as e:
			print(e)
			return jsonify({'status':'danger','msg':'Something went wrong. Refresh the page and try again.'})

		token = s.dumps(email, salt='email_confirm')
		msg = Message('Confirm Email', sender=MAIL_USERNAME, recipients=[email])
		link = url_for('administration_general.register', token=token, external=True)
		msg.html = 'Go to <a href="{}{}">this</a> link to register as a moderator for Huntington West Properties website.'.format(request.url_root,link)

		try:
			mail.send(msg)
		except Exception as e:
			print(e)
			return jsonify({'status':'danger','msg':'Invitation failed to resend. Refresh the page and try again.'})
	else:
		return jsonify({'status':'danger','msg':'Something went wrong. Refresh the page and try again.'})
	return jsonify({'status':'success','msg':'Invitation was successfully re-sent!'})

@mod.route('/delete-user', methods=['POST'])
@login_required
@is_admin
def delete_user():

	form = DeleteForm(request.form)

	if form.validate():
		user_id = form.id.data

		try:
			user = Users.query.get(int(user_id))
			if user.is_deleted:
				abort(404)
		except Exception as e:
			print(e)
			flash('Something went wrong. Please try again after refreshing the page.','danger')
			return redirect(url_for('administration_users.user_settings_get'))

		if user.is_admin and not current_user.is_master:
			flash('Only the master admin can delete admin accounts','danger')
			return redirect(url_for('administration_users.user_settings_get'))
		if user.is_master:
			flash("You cannot the master admin's account",'danger')
			return redirect(url_for('administration_users.user_settings_get'))
		if user.id == current_user.id:
			flash('You cannot delete your own account','danger')
			return redirect(url_for('administration_users.user_settings_get'))

		email = user.email

		try:
			new_history = History('delete_user', current_user.id, tgt_user_id=user.id)
			db.session.add(new_history)
			db.session.flush()

			new_content = HistoryContent(new_history.history_id, 'Identifier', email)
			db.session.add(new_content)
			db.session.flush()
			user.is_master = False
			user.is_admin = False
			user.is_deleted=True
			user.delete_date = datetime.utcnow()
			db.session.commit()
		except Exception as e:
			print(e)
			db.session.rollback()
			flash('User was not successfully removed. Please try again after refreshing the page.','danger')
			return redirect(url_for('administration_users.user_settings_get'))

		flash('User "{}" was successfully removed.'.format(email),'success')
		return redirect(url_for('administration_users.user_settings_get'))

	flash('Something went wrong. Please refresh the page and try again.','danger')
	return redirect(url_for('administration_users.user_settings_get'))


@mod.route('/edit-user/<string:user_id>', methods=['GET', 'POST'])
@login_required
@is_admin
def edit_user(user_id):

	if not current_user.is_master:
		abort(403)

	try:
		user = Users.query.get(int(user_id))
		if user.is_deleted:
			abort(404)
	except:
		abort(404)

	form = EditMasterForm(request.form)

	if request.method=='POST' and form.validate():
		try:
			if not user.is_verified or user.is_deleted:
				raise
			elif user.id == current_user.id:
				flash('You cannot edit you own settings!', 'danger')
				return render_template('administration/users/edit_user.html', user=user)

			user.is_master = True
			current_user.is_master = False
			db.session.commit()
			flash('{} {} is now the master admin. You have relinquished your master admin privileges.'.format(user.first, user.last),'success')
			return redirect(url_for('administration_general.admin_home_get'))
		except Exception as e:
			print(e)
			db.session.rollback()
			flash('Something went wrong. Please refresh the page and try again.','danger')

	return render_template('administration/users/edit_user.html', user=user)
