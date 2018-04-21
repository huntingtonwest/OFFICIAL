from flask import Blueprint, render_template, request, redirect, url_for, abort, jsonify
from flask_login import login_required, current_user

from server.models.users import Users
from server.models.roles import Roles
from server.models.history import History, HistoryContent
from flask_mail import Message


from server.utils.hwp_email_template import html_consultation_form, html_contact_form

from server.forms.forms import ConsultationForm, ContactForm
from sqlalchemy import or_
from server.utils.query_utils import serialize, get_associations

from server import app, db, mail

mod = Blueprint('forms', __name__)


@mod.route('/consultation-form', methods=['POST'])
# @csrf.exempt
def consultation_form_post():

	form = ConsultationForm(request.form)

	if not form.validate():
		return jsonify({'status':'error', 'errors':form.errors})

	name = form.first_name.data + " " + form.last_name.data
	email_content = html_consultation_form(name = name,
										email = form.email.data,
										phone_num =form.phone_num.data,
										regarding = form.regarding.data,
										msg = form.msg.data
										)

	try:
		receivers = Roles.query.filter_by(role_name='Consultation Form').one()
	except:
		return jsonify({'status':'error', 'msg': 'Something went wrong. Please refresh the page and try again.'})

	recipients = [r.email for r in receivers.emails]


	msg = Message('"{}" Consultation Form Submission'.format(name), sender=app.config['MAIL_USERNAME'], recipients=recipients)
	msg2 = Message('Consultation Form Submission Receipt', sender=app.config['MAIL_USERNAME'], recipients=[form.email.data])
	msg.html = email_content
	msg2.html = "Thank you for contacting Huntington West Properties. Someone will be in contact with you shortly.<br><br>{}".format(email_content)

	try:
		new_history = History('consultation_form', None)
		db.session.add(new_history)
		db.session.flush()
		id_content = HistoryContent(new_history.history_id, 'Identifier', 'Consultation Form Submission')
		name_content = HistoryContent(new_history.history_id, 'Name', name)
		email_content = HistoryContent(new_history.history_id, 'Email', form.email.data)
		phone_content = HistoryContent(new_history.history_id, 'Phone Number', form.phone_num.data)
		regarding_content = HistoryContent(new_history.history_id, 'Subject', form.regarding.data)
		msg_content = HistoryContent(new_history.history_id, 'Message', form.msg.data)
		db.session.add(id_content)
		db.session.add(name_content)
		db.session.add(email_content)
		db.session.add(phone_content)
		db.session.add(regarding_content)
		db.session.add(msg_content)
		db.session.commit()

		mail.send(msg)
		mail.send(msg2)
	except Exception as e:
		print(e)
		db.session.rollback()
		return jsonify({'status':'error', 'msg': 'Form failed to send. Please try again.'})

	return jsonify({'status':'success', 'msg': 'Consultation form was successfully sent! Someone will contact you soon.'})


@mod.route('/contact-form', methods=['POST'])
# @csrf.exempt
def contact_form_post():

	form = ContactForm(request.form)

	if not form.validate():
		return jsonify({'status':'error', 'errors':form.errors})

	name = form.first_name.data + " " + form.last_name.data
	email_content = html_contact_form(name = name,
										email = form.email.data,
										phone_num =form.phone_num.data,
										subject = form.subject.data,
										association = form.association.data,
										unit=form.unit.data,
										msg = form.msg.data
										)

	try:
		receivers = Roles.query.filter_by(role_name='Contact Form').one()
	except:
		return jsonify({'status':'error', 'msg': 'Something went wrong. Please refresh the page and try again.'})

	# recipients = receivers.emails
	recipients = [r.email for r in receivers.emails]

	msg = Message('"{}" Contact Form Submission'.format(name), sender=app.config['MAIL_USERNAME'], recipients=recipients)
	msg2 = Message('Contact Form Submission Receipt', sender=app.config['MAIL_USERNAME'], recipients=[form.email.data])
	msg.html = email_content
	msg2.html = "Thank you for contacting Huntington West Properties. Someone will be in contact with you shortly.<br><br>{}".format(email_content)
	# print(msg2.html)
	try:
		new_history = History('contact_form', None)
		db.session.add(new_history)
		db.session.flush()

		id_content = HistoryContent(new_history.history_id, 'Identifier', 'Contact Form Submission')
		name_content = HistoryContent(new_history.history_id, 'Name', name)
		email_content = HistoryContent(new_history.history_id, 'Email', form.email.data)
		phone_content = HistoryContent(new_history.history_id, 'Phone Number', form.phone_num.data)
		regarding_content = HistoryContent(new_history.history_id, 'Subject', form.subject.data)
		acn_content = HistoryContent(new_history.history_id, 'Association', form.association.data)
		unit_content = HistoryContent(new_history.history_id, 'Unit', form.unit.data)
		msg_content = HistoryContent(new_history.history_id, 'Message', form.msg.data)
		db.session.add(id_content)
		db.session.add(name_content)
		db.session.add(email_content)
		db.session.add(phone_content)
		db.session.add(regarding_content)
		db.session.add(acn_content)
		db.session.add(unit_content)
		db.session.add(msg_content)
		db.session.commit()

		mail.send(msg)
		mail.send(msg2)
	except:
		db.session.rollback()
		return jsonify({'status':'error', 'msg': 'Form failed to send. Please try again.'})
	return jsonify({'status':'success', 'msg': 'Contact form was successfully sent! Someone will contact you soon.'})
