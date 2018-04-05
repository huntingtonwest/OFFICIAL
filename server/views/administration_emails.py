from flask import Blueprint, render_template, flash, request, redirect, url_for, abort, jsonify
from flask_login import login_required, current_user

from server.models.roles import Roles, Emails
from server.utils.authority_verification import is_admin
from server.forms.forms import EmailForm
from server import app,db, mail

MAIL_USERNAME = app.config['MAIL_USERNAME']
mod = Blueprint('administration_emails', __name__)

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
	return render_template('administration/emails/email_settings.html', parent_email=parent_email, form=form, forms=forms)

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
			flash('Something went wrong. Refresh the page and try again.', 'danger')
			return redirect(url_for('administration_emails.email_settings'))

		flash('Email was successfully added!','success')
		return redirect(url_for('administration_emails.email_settings'))

	msg=""
	if form.email.errors:
		msg = form.email.errors[0]
	else:
		msg = 'Something went wrong. Refresh the page and try again.'
	flash(msg,'danger')
	return redirect(url_for('administration_emails.email_settings'))


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
			if len(role_emails) <= 1:
				flash('You must have at least one recipient for each form.','danger')
				return redirect(url_for('administration_emails.email_settings'))
			else:
				role.remove_email(email)

				email_roles = [e.role_name for e in email.roles]
				if len(email_roles) <= 0:
					db.session.delete(email)

				db.session.commit()
		except:
			db.session.rollback()
			flash('Something went wrong. Refresh the page and try again.','danger')
			return redirect(url_for('administration_emails.email_settings'))

		flash('Email was removed successfully.','success')
		return redirect(url_for('administration_emails.email_settings'))

	flash('Something went wrong. Refresh the page and try again.','danger')
	return redirect(url_for('administration_emails.email_settings'))
