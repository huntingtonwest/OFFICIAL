from flask import Blueprint, render_template, flash, request, redirect, url_for, abort, jsonify
from flask_login import login_required, logout_user, login_user, current_user

from server.models.users import Users
from server.models.roles import Roles, Emails
from server.models.associations import Associations
from passlib.hash import sha256_crypt

from server.utils.authority_verification import is_admin
from sqlalchemy import or_
from itsdangerous import SignatureExpired
from server.forms.forms import PropertyForm
from passlib.hash import sha256_crypt

from config import MAIL_USERNAME
from sqlalchemy import exc
from server.forms.forms import EmailForm
from server import db, mail

mod = Blueprint('administration_misc', __name__)

@mod.route('/email-settings', methods=['GET'])
@login_required
def email_settings():
	form = EmailForm(request.form)
	parent_email = MAIL_USERNAME
	try:
		consultation = Roles.query.filter_by(role_name = 'Consultation Form').one()
		contact = Roles.query.filter_by(role_name = 'Contact Form').one()
	except:
		abort(400)

	forms = [{
		'name':'Consultation Form',
		'recipients':consultation.emails
		},{
		'name': 'Contact Form',
		'recipients': contact.emails
		}]
	return render_template('administration/email_settings.html', parent_email=parent_email, form=form, forms=forms)

@mod.route('/add-email', methods=['POST'])
@login_required
def add_email():
	form = EmailForm(request.form)
	role_name = form.role.data
	email = form.email.data

	if form.validate():

		new_email=None
		try:
			check = Emails.query.filter_by(email=email).first()
			if check:
				new_email=check
			else:
				new_email = Emails(email)
				db.session.add(new_email)
				db.session.flush()
			role = Roles.query.filter_by(role_name = role_name).one()
			role.add_email(new_email)
			db.session.commit()
		except:
			db.session.rollback()
			return jsonify({'status':'danger', 'msg':'Something went wrong. Refresh the page and try again.'})

		return jsonify({'status':'success','msg':'Email was successfully added.'})

	msg=""
	if form.email.errors:
		msg = form.email.errors[0]
	else:
		msg = 'Something went wrong. Refresh the page and try again.'
	return jsonify({'status':'danger', 'msg':msg})

@mod.route('/delete-email', methods=['POST'])
@login_required
def delete_email():

	form = EmailForm(request.form)
	role_name = form.role.data
	form_email = form.email.data

	if form.validate():
		try:
			email = Emails.query.filter_by(email=form_email).one()
			role = Roles.query.filter_by(role_name = role_name).one()

			role_emails = [r.email for r in role.emails]
			print(role_emails)
			if len(role_emails) <= 1:
				return jsonify({'status':'danger', 'msg':'You must have at least one recipient.'})
			else:
				role.remove_email(email)

				email_roles = [e.role_name for e in email.roles]
				print(email_roles)
				if len(email_roles) <= 0:
					db.session.delete(email)

				db.session.commit()
		except:
			db.session.rollback()
			return jsonify({'status':'danger', 'msg':'Something went wrong. Refresh the page and try again.'})

		return jsonify({'status':'success','msg':'Email was removed successfully.'})

	return jsonify({'status':'danger', 'msg':'Something went wrong. Refresh the page and try again.'})

@mod.route('/association-settings', methods=['GET'])
@login_required
def association_settings():

	associations = Associations.query.all()

	return render_template('administration/association_settings.html', associations=associations)
