@mod.route('/consultation-form', methods=['POST'])
def consultation_form_post():

	try:
		first_name = request.form['first_name']
		last_name = request.form['last_name']
		email = request.form['email']
		phone_number = request.form['phone_number']
		company_name = request.form['company_name']
		tenant_rep = request.form['tenant_rep']
		tenant_rep_city = request.form['tenant_rep_city']
		coi = request.form['cities_of_interest']
		msg = request.form['msg']
	except:
		abort(400)

	name = "{} {}".format(first_name, last_name)

	for s in [name, email, company_name, phone_number, tenant_rep, tenant_rep_city, coi, msg]:
		' '.join(s.split())

	html = html_consultation_form(name, email, company_name, phone_number, tenant_rep, tenant_rep_city, coi, msg)

	try:
		sender_role = Roles.query.filter_by(role_name='Consultation Form Sender').one()
		receiver_role = Roles.query.filter_by(role_name='Consultation Form Sender').one()
		sender = Emails.query.filter_by(role_id = role.role_id).one()
		temp = Emails.query().filter_by(role_id=receiver_role.role_id).all()
	except MultipleResultsFound:
		abort(400)
	except NoResultFound:
		abort(400)
	except:
		abort(400)

	recipients = []




	msg = Message()

	msg.html(html)
	msg.recipients(recipients)
	msg.sender(sender.email)
	msg.subject('Consultation Form Submission')


	#send email

	return 1