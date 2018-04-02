from flask import Blueprint, render_template, flash, request, redirect, url_for, abort, jsonify
from flask_login import login_required, current_user
from flask_mail import Message

from server.models.users import Users

from server.utils.authority_verification import is_admin
from server.forms.forms import PropertyForm

from config import MAIL_USERNAME
from server.forms.forms import CreateUser, Resend, EditUser
from server import db,s, mail


mod = Blueprint('administration_users', __name__)


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
def create_user():
	form = CreateUser()
	return render_template('administration/create_user.html', form=form)


@mod.route('/add-user', methods=['POST'])
@login_required
@is_admin
def add_user():
	form = CreateUser(request.form)

	if request.method == 'POST' and form.validate():
		email = (form.email.data).strip()

		check = Users.query.filter_by(email=email).first()
		if check:
			return jsonify({'status':'danger','msg':'This email is already used by a user or is waiting validation.'})

		user=Users(email=email)
		token = s.dumps(email, salt='email_confirm')
		msg = Message('Confirm Email', sender=MAIL_USERNAME, recipients=[email])
		link = url_for('administration_general.register', token=token, external=True)
		# msg.html = 'Go to <a href="{}">this</a> link to register as a moderator for Huntington West Properties website.'.format(link)
		msg.body = 'Go to this link to register as a moderator for Huntington West Properties website: {}'.format(link)

		try:
			db.session.add(user)
			db.session.commit()
		except Exception as e:
			db.session.rollback()
			abort(400)

		try:
			mail.send(msg)

		except:
			return jsonify({'status':'danger','msg':'Invitation failed to send. Click here to try again.'})
	else:
		abort(400)

	return jsonify({'status':'success','msg':'Invitation was sent!'})

@mod.route('/resend-invitation', methods=['POST'])
@login_required
@is_admin
def resend_invitation():
	form = Resend(request.form)
	if form.validate():
		email = (form.email.data).strip()
		id = form.id.data
		try:
			user = Users.query.filter_by(id = id, email=email, is_verified=False).one()
		except:
			abort(400)

		token = s.dumps(email, salt='email_confirm')
		msg = Message('Confirm Email', sender=MAIL_USERNAME, recipients=[email])
		link = url_for('administration_general.register', token=token, external=True)
		msg.body = 'Go to this link to register as a moderator for Huntington West Properties website: {}'.format(link)

		try:
			mail.send(msg)
		except:
			return jsonify({'status':'danger','msg':'Invitation failed to resend. Refresh the page and try again.'})
	else:
		abort(400)
	return jsonify({'status':'success','msg':'Invitation was successfully re-sent!'})

@mod.route('/delete-user', methods=['POST'])
@login_required
@is_admin
def delete_user():
	user_id = request.form['id']
	try:
		user = Users.query.get(int(user_id))
	except:
		abort(400)

	if user.is_admin and not current_user.is_master:
		flash('Only the master admin can delete admin accounts','danger')
		return redirect(url_for('administration_users.user_settings_get'))

	if user.id == current_user.id:
		flash('You cannot delete your own account','danger')
		return redirect(url_for('administration_users.user_settings_get'))

	email = user.email
	try:
		db.session.delete(user)
		db.session.commit()
	except:
		db.session.rollback()
		flash('User was not successfully removed. Please try again after refreshing the page.','danger')

	flash('User "{}" was successfully removed.'.format(email),'success')
	return redirect(url_for('administration_users.user_settings_get'))


@mod.route('/edit-user/<string:user_id>', methods=['GET','POST'])
@login_required
@is_admin
def edit_user_post(user_id):
    form=EditUser(request.form)

    try:
        user_id = int(user_id)
    except:
        abort(403)
    user = Users.query.get(user_id)

    if request.method=='POST' and form.validate():

        is_admin = form.is_admin.data
        print(is_admin)
        if int(user_id) == current_user.id:
            alert={'status':'danger','msg':"Go to personal settings to change your own settings."}
            return render_template('administration/edit_user.html', user=user, alert=alert, form=form)
        if not user.is_verified:
            alert = {'status':'danger','msg':"This user must have their email verified first."}
            return render_template('administration/edit_user.html', user=user, alert=alert, form=form)
        if user.is_admin and not current_user.is_master:
            alert = {'status':'danger','msg':'Only the master admin can edit admin accounts.'}
            return render_template('administration/edit_user.html', user=user, alert=alert, form=form)
        if is_admin != user.is_admin and user.is_admin and not current_user.is_master:
            alert={'status':'success','msg':'Only the master admin can promote/demote admins.'}
            return render_template('administration/edit_user.html', user=user, alert=alert, form=form)
        try:
            user.is_admin= is_admin
            db.session.commit()
        except:
            db.session.rollback()
            abort(400)
        flash('Settings saved for {} {}'.format(user.first, user.last),'success')
        return redirect(url_for('administration_users.user_settings_get'))
    return render_template('administration/edit_user.html', user=user,form=form)
