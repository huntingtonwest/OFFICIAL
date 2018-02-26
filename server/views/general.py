from flask import Blueprint, render_template, request, redirect, url_for, abort, jsonify
from flask_login import login_required, logout_user, login_user, current_user

from server.models.users import Users
from server.models.properties import Properties
from passlib.hash import sha256_crypt
# from flask_mail import Message

from server.utils.hwp_email_template import html_consultation_form
# from validate_email import validate_email

from server.forms.forms import ConsultationForm
from sqlalchemy import or_
import json

from server import db

mod = Blueprint('general', __name__)




@mod.route('/', methods = ['GET'])
def init():
    return redirect(url_for('general.home_get'))


#HOME
@mod.route('/home', methods=['GET'])
def home_get():
	return render_template('general/home.html')

#PROPERTY MANAGEMENT
@mod.route('/property-management', methods=['GET'])
def property_management_get():
	consultation_form = ConsultationForm(request.form)

	# print(dir(consultation_form))
	print(consultation_form)

	print(consultation_form.regarding_dropdown())

	return render_template('general/property_management.html', consultation_form=consultation_form)


#AVAILABLE PROPERTIES
@mod.route('/available-properties', methods=['GET'])
def available_properties_get():

	properties = Properties.query.filter(or_(Properties.for_sale == True, Properties.for_rent == True)).all()
	print(properties)
	# jprop = json.dumps(properties)

	# print(jprop)
	# city=list(s['var1'] for s in properties)

	# page = request.args.get('page', 1, type=int)
	# property_list = properties.paginate(page, app.config['PROPERTIES_PER_PAGE'], False)

	return render_template('general/available_properties.html', properties=properties)


@mod.route('/available-properties/filter', methods=['POST'])
def available_properties_filter_post():

	# filter_categories = ['bedrooms', 'baths', 'price_min','price_max','sqft_min', 'sqft_max', 'city']

	# filters = {}
	# for x in request.form if x in filter_categories:
	# 	filters[x]=request.form.get(x)

	# properties = Properties.query.filter(Properties.bedrooms==filters['bedrooms'], Properties.baths==filters['baths'],\
	# 	Properties.price<=filters['price_min'], Properties.price>=filters['price_max'],Properties.sqft<=filters['sqft_min'],\
	# 	Properties.sqft>=filters['sqft_max'],Properties.city==filters['city']).all()

	# page = request.args.get('page', 1, type=int)
	# property_list = properties.paginate(page, app.config['PROPERTIES_PER_PAGE'], False)


	return property_list

#ABOUT
@mod.route('/about', methods=['GET'])
def about_get():
	return render_template('about.html')

#RESOURCES
@mod.route('/resources', methods=['GET'])
def resources_get():
	return render_template('resources.html')

#CONTACT
@mod.route('/contact', methods=['GET'])
def contact_get():
	return render_template('contact.html')


