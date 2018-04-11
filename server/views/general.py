from flask import Blueprint, render_template, request, redirect, url_for, abort, jsonify
from flask_login import login_required, logout_user, login_user, current_user

from server.models.users import Users
from server.models.files import Files
from server.models.aboutinfo import AboutInfo
from server.models.properties import Properties
from passlib.hash import sha256_crypt
# from flask_mail import Message

from server.utils.hwp_email_template import html_consultation_form
# from validate_email import validate_email

from server.forms.forms import ConsultationForm, ContactForm
from sqlalchemy import or_
from server.utils.query_utils import serialize, get_associations_by_loc, pst_date

import json

from server import db

mod = Blueprint('general', __name__)



@mod.route('/', methods = ['GET'])
def init():
	return 'hwp home'
	# return jsonify({'status':'success'})

#returns list of all properties that are for sale or for rent
@mod.route('/get-properties', methods=['GET'])
def get_properties_get():

	p = Properties.query.filter(or_(Properties.for_sale == True, Properties.for_rent == True)).all()

	properties = []
	for x in p:
		prop = serialize(x, Properties)

		images = []
		for img in x.images:
			images.append(img.img_url)
		prop['images'] = images
		properties.append(prop)



	return jsonify({'properties':properties})

@mod.route('/get-associations', methods=['GET'])
def get_associations_get():

	associations = get_associations_by_loc()

	return jsonify({'associations':associations})

@mod.route('/get-files', methods=['GET'])
def get_files_get():
	file = Files.query.all()

	files=[]
	for f in file:
		# print(f)
		fs = serialize(f, Files)
		fs['date'] =pst_date(f.date)
		del fs['file_id']
		if fs['file_url'] == "":
			continue
		files.append(fs)

	return jsonify({'files':files})

@mod.route('/get-about')
def get_about_get():
	about = AboutInfo.query.order_by(AboutInfo.date.asc()).all()

	abouts=[]
	for f in about:
		# print(f)
		fs = serialize(f, AboutInfo)
		del fs['date']
		del fs['aboutinfo_id']
		if fs['img_url'] == "":
			continue
		abouts.append(fs)

	return jsonify({'people':abouts})

@mod.route('/property-test')
def prop_test():

	p = Properties.query.filter(or_(Properties.for_sale == True, Properties.for_rent == True)).all()

	properties = []
	for x in p:
		prop = serialize(x, Properties)

		prop['city'] = x.city_info.city_name
		prop['type'] = x.type_info.type_name

		properties.append(prop)


	return render_template('general/available_properties.html', properties=properties)

@mod.route('/ass-test')
def ass_test():

	associations = get_associations_by_loc()

	return render_template('general/resources.html', ass=associations)
