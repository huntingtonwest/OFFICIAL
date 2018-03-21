from flask import Blueprint, render_template, request, redirect, url_for, abort, jsonify
from flask_login import login_required, logout_user, login_user, current_user

from server.models.users import Users
from server.models.properties import Properties
from passlib.hash import sha256_crypt
# from flask_mail import Message

from server.utils.hwp_email_template import html_consultation_form
# from validate_email import validate_email

from server.forms.forms import ConsultationForm, ContactForm
from sqlalchemy import or_
from server.utils.query_utils import serialize, get_associations

import json

from server import db

mod = Blueprint('general', __name__)

filter_categories = ['city', 'beds', 'baths', 'price_min','price_max', 'type', 'area_min', 'area_max', 'status']

@mod.route('/', methods = ['GET'])
def init():
    return redirect(url_for('general.home_get'))


#HOME
@mod.route('/home', methods=['GET'])
def home_get():
	return render_template('general/home.html')

#PROPERTY MANAGEMENT
#form_name = all the "names" of required fields of the consultation form
#regarding_dropdown = all the choices for the dropdown menu in "regarding" field of consultation form
@mod.route('/property-management', methods=['GET'])
def property_management_get():

	#get consultation form
	consultation_form = ConsultationForm()
	form_names = jsonify(consultation_form.get_names())
	regarding_dropdown = jsonify(consultation_form.regarding_dropdown())

	# print(form_names.data)
	# print(regarding_dropdown.data)

	return render_template('general/property_management.html', form_names=form_names, regarding_dropdown=regarding_dropdown)


#AVAILABLE PROPERTIES
#form_names = all the required fields of the consultation form
#regarding_dropdown = all the choices for the dropdown menu in "regarding" field of consultation form
#properties = list of all properties that are for sale or rent. for fields, refer to models.properties
#filters = all the "names" of the property filters
@mod.route('/available-properties', methods=['GET'])
def available_properties_get():

	#get consultation form
	consultation_form = ConsultationForm()
	form_names = jsonify(consultation_form.get_names())
	regarding_dropdown = jsonify(consultation_form.regarding_dropdown())


	#get list of properties
	p = Properties.query.filter(or_(Properties.for_sale == True, Properties.for_rent == True)).all()

	properties = []
	for x in p:
		properties = serialize(x, Properties)

		properties['city'] = x.city_info.city_name
		properties['type'] = x.type_info.type_name

	#get list of viable filters
	filters=jsonify(filter_categories)

	# page = request.args.get('page', 1, type=int)
	# property_list = properties.paginate(page, app.config['PROPERTIES_PER_PAGE'], False)

	# print(properties)

	return render_template('general/available_properties.html', form_names=form_names, regarding_dropdown=regarding_dropdown, \
		properties=properties, filters=filters)

#will be done on react. therefore not yet tested
@mod.route('/available-properties/filter', methods=['POST'])
def available_properties_filter_post():

	filters = request.form


	p = Properties.query.filter(or_(Properties.for_sale == True, Properties.for_rent == True)).all()

	#TODO: make sure inputs are of correct values
	properties = []
	for x in p:
		if 'price_min' in filters and 'price_max' in filters:
			if int(x.price) >= filters['price_min'] or int(x.price) <= filters['price_max']:
				properties.append(x)
		if 'city' in filters:
			if x.city == filters['city']:
				properties.append(x)
		if 'beds' in filters:
			if int(x.beds) == filters['beds']:
				properties.append(x)
		if 'baths' in filters:
			if int(x.baths) == filters['baths']:
				properties.append(x)
		if 'type' in filters:
			if x.type == filters['type']:
				properties.append(x)
		if 'area_min' in filters and 'area_max' in filters:
			if int(x.area) >= filters['area_min'] or int(x.area) <= filters['area_max']:
				properties.append(x)
		if 'status' in filters:
			if x.status == filters['status']:
				properties.append(x)


	# page = request.args.get('page', 1, type=int)
	# property_list = properties.paginate(page, app.config['PROPERTIES_PER_PAGE'], False)


	return properties

#will be done on react
@mod.route('/available-properties/sort', methods=['POST'])
def available_properties_sort_post():
	
	return 1

#ABOUT
@mod.route('/about', methods=['GET'])
def about_get():
	return render_template('general/about.html')

#RESOURCES
#form_names = all the required fields of the specified form
#regarding_dropdown = all the choices for the dropdown menu in "regarding" field of specified form
#asn_dropdown = all associations
@mod.route('/resources', methods=['GET'])
def resources_get():

	#get consultation form
	consultation_form = ConsultationForm()
	consultation_form_names = jsonify(consultation_form.get_names())
	consultation_regarding_dropdown = jsonify(consultation_form.regarding_dropdown())

	#get contact form
	contact_form = ContactForm()
	contact_form_names = jsonify(contact_form.get_names())
	asn_dropdown = jsonify(get_associations())


	return render_template('general/resources.html',  consultation_form_names=consultation_form_names, consultation_regarding_dropdown=consultation_regarding_dropdown,
		contact_form=contact_form, contact_form_names=contact_form_names, asn_dropdown=asn_dropdown)

#CONTACT
# form_names = all the required fields of the consultation form
#regarding_dropdown = all the choices for the dropdown menu in "regarding" field of consultation form
@mod.route('/contact', methods=['GET'])
def contact_get():

	#get consultation form
	consultation_form = ConsultationForm()
	form_names = jsonify(consultation_form.get_names())
	regarding_dropdown = jsonify(consultation_form.regarding_dropdown())



	return render_template('general/contact.html', form_names=form_names, regarding_dropdown=regarding_dropdown)


