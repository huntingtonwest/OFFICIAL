from flask import Blueprint, render_template, flash, request, redirect, url_for, abort, jsonify
from flask_login import login_required, current_user

from server.models.properties import Properties

from server.utils.authority_verification import is_admin
from sqlalchemy import or_
from server.forms.forms import PropertyForm

from config import MAIL_USERNAME
from sqlalchemy import exc
from server import db


mod = Blueprint('administration_property', __name__)

"""
PROPERTIES
"""

@mod.route('/property-settings', methods=['GET'])
@login_required
def property_settings_get():

	# available_properties = Properties.query.filter(or_(Properties.for_rent==True, Properties.for_sale==True)).all()
	# nonavailable_properties = Properties.query.filter_by(for_rent=False, for_sale=False).all()
	properties = Properties.query.all()

	return render_template('administration/property_settings.html', properties = properties)

@mod.route('/edit-property/<string:property_id>', methods=['GET', 'POST'])
@login_required
def edit_property_get(property_id):

	form = PropertyForm(request.form)
	property = Properties.query.get(property_id)
	if not property:
		abort(404)
	if request.method=='GET' and property:
		form.notes.data = property.notes
	if request.method=='POST' and property and form.validate():
		try:
			property.name = form.name.data
			property.address_l1 = form.address_l1.data
			property.address_l2 = form.address_l2.data
			property.city = form.city.data
			property.state = form.state.data
			property.zipcode = form.zipcode.data
			property.type = form.type.data
			property.beds = form.beds.data
			property.baths = form.baths.data
			property.price = form.price.data
			property.for_sale = form.for_sale.data
			property.for_rent = form.for_rent.data
			property.area = form.area.data
			property.notes = form.notes.data

			db.session.commit()
		except Exception as e:
			print(e)
			db.session.rollback()
			alert={'status':'danger','msg':'Something went wrong. Please refresh the page and try again.'}
			return render_template('administration/edit_property.html', property=property, form=form,alert=alert)


		flash('Property was successfully edited!', 'success')
		return redirect(url_for('administration_property.edit_property_get', property_id))

	return render_template('administration/edit_property.html', property=property, form=form)


@mod.route('/add-property', methods=['GET', 'POST'])
@login_required
def add_property_get():

	form = PropertyForm(request.form)

	if request.method=='POST' and form.validate():

		try:
			property = Properties(form.data)
			db.session.add(property)
			db.session.commit()

		except:
			db.session.rollback()
			alert={'status':'danger','msg':'Something went wrong. Please refresh the page and try again.'}

		flash('Property was successfully added!','success')
		return redirect(url_for('administration_property.add_property_get'))


	return render_template('administration/add_property.html', form=form)


@mod.route('/delete-property', methods=['POST'])
@login_required
def delete_property():

    try:
        property_id = int(request.form['id'])
    except:
        abort(404)

    try:
        property = Properties.query.get(property_id)
        print(property)
        db.session.delete(property)
        db.session.commit()
    except:
        db.session.rollback()
        abort(400)
    flash('Property successfully deleted!','success')
    return redirect(url_for('administration_property.property_settings_get'))
