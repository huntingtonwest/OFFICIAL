from flask import Blueprint, render_template, request, redirect, url_for, abort, jsonify
from flask_login import login_required, current_user

from server.models.users import Users
from server.models.roles import Roles
from flask_mail import Message


from server.utils.hwp_email_template import html_consultation_form, html_contact_form

from server.forms.forms import ConsultationForm, ContactForm
from sqlalchemy import or_
from server.utils.query_utils import serialize, get_associations
from config import MAIL_USERNAME

from server import db, mail

mod = Blueprint('forms', __name__)


@mod.route('/consultation-form', methods=['POST'])
def consultation_form_post():

	form = ConsultationForm(request.form)

	if not form.validate():
		abort(400)

	name = form['first_name'].data + " " + form['last_name'].data
	email_content = html_consultation_form(name = name,
										email = form['email'].data,
										phone_num =form['phone_num'].data,
										regarding = form['regarding'].data,
										msg = form['msg'].data
										)

	try:
		receivers = Roles.query.filter_by(role_name='Consultation Form').one()
	except:
		abort(400)

	recipients = [r.email for r in receivers.emails]


	msg = Message('"{}" Consultation Form Submission'.format(name), sender=MAIL_USERNAME, recipients=recipients)
	msg.html = email_content
	try:
		mail.send(msg)
	except:
		return jsonify({'status':'error', 'msg': 'Form failed to send. Please try again.'})

	return jsonify({'status':'success', 'msg': 'Consultation form was successfully sent! Someone will contact you soon.'})


@mod.route('/contact-form', methods=['POST'])
def contact_form_post():

	form = ContactForm(request.form)

	if not form.validate():
		abort(400)

	name = form['first_name'].data + " " + form['last_name'].data
	email_content = html_contact_form(name = name,
										email = form['email'].data,
										phone_num =form['phone_num'].data,
										subject = form['subject'].data,
										association = form['association'].data,
										unit=form['unit'].data,
										msg = form['msg'].data
										)

	try:
		receivers = Roles.query.filter_by(role_name='Contact Form').one()
	except:
		abort(400)

	# recipients = receivers.emails
	recipients = [r.email for r in receivers.emails]

	msg = Message('"{}" Contact Form Submission'.format(name), sender=MAIL_USERNAME, recipients=recipients)
	msg.html = email_content
	try:
		mail.send(msg)
	except:
		return jsonify({'status':'error', 'msg': 'Form failed to send. Please try again.'})
	return jsonify({'status':'success', 'msg': 'Contact form was successfully sent! Someone will contact you soon.'})
