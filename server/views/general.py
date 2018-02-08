from flask import Blueprint, render_template, request, redirect, url_for, abort
from flask_login import login_required, logout_user, login_user, current_user

from server.models.users import Users
from passlib.hash import sha256_crypt
from flask_mail import Message

from server.utils.hwp_email_template import html_consultation_form
# from validate_email import validate_email

from server import db

mod = Blueprint('general', __name__)




@mod.route('/', methods = ['GET'])
def init():
    redirect(url_for('general.home_get'))



#HOME
@mod.route('/home', methods=['GET'])
def home_get():
	return 1

#PROPERTY MANAGEMENT
@mod.route('/property-management', methods=['GET'])
def property_management_get():
	return 1


#AVAILABLE PROPERTIES
@mod.route('/available-properties', methods=['GET'])
def available_properties_get():

	properties = Properties.query.all()

	baths=list(s['var1'] for s in properties)
	bedrooms=list(s['var1'] for s in properties)
	prices=list(s['var1'] for s in properties)
	sqft=list(s['var1'] for s in properties)
	city=list(s['var1'] for s in properties)

	page = request.args.get('page', 1, type=int)
	property_list = properties.paginate(page, app.config['PROPERTIES_PER_PAGE'], False)

	return render_template('s.html', property_list=property_list)


@mod.route('/available-properties/filter', methods=['POST'])
def available_properties_filter_post():

	filter_categories = ['bedrooms', 'baths', 'price_min','price_max','sqft_min', 'sqft_max', 'city']

	filters = {}
	for x in request.form if x in filter_categories:
		filters[x]=request.form.get(x)

	properties = Properties.query.filter(Properties.bedrooms==filters['bedrooms'], Properties.baths==filters['baths'],\
		Properties.price<=filters['price_min'], Properties.price>=filters['price_max'],Properties.sqft<=filters['sqft_min'],\
		Properties.sqft>=filters['sqft_max'],Properties.city==filters['city']).all()

	page = request.args.get('page', 1, type=int)
	property_list = properties.paginate(page, app.config['PROPERTIES_PER_PAGE'], False)


	return render_template('s.html', property_list=property_list)

#ABOUT
@mod.route('/about', methods=['GET'])
def about_get():
	return render_template('templates/about.html')

#RESOURCES
@mod.route('/resources', methods=['GET'])
def resources_get():
	return 1

#CONTACT
@mod.route('/contact', methods=['GET'])
def contact_get():
	return 1


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