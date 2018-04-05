from flask import Blueprint, render_template, flash, request, redirect, url_for, abort, jsonify
from flask_login import login_required, current_user

from server.models.properties import Properties
from server.models.history import History, HistoryContent
from server.utils.authority_verification import is_admin
from server.forms.forms import PropertyForm
from server.utils.query_utils import serialize, pst_time
from server import db



mod = Blueprint('administration_property', __name__)

"""
PROPERTIES
"""

@mod.route('/property-settings', methods=['GET'])
@login_required
def property_settings():
	p = Properties.query.order_by(Properties.date_posted.desc()).all()
	count = 0
	properties = []
	for x in p:
		prop = serialize(x, Properties)
		prop['date_posted'] = pst_time(x.date_posted)
		prop['recent_order'] = count
		properties.append(prop)
		count += 1

	return render_template('administration/properties/property_settings.html', properties = properties)

@mod.route('/edit-property/<string:property_id>', methods=['GET', 'POST'])
@login_required
def edit_property(property_id):

	form = PropertyForm(request.form)
	property = Properties.query.get(property_id)
	if not property:
		abort(404)
	if request.method=='GET' and property:
		form.notes.data = property.notes
	if request.method=='POST' and property and form.validate():
		try:
			#figure out which columns have changed
			content = []
			for p in property.__dict__:
				for f in form.__dict__.keys():
					if p == f:
						if property.__dict__[p] != form.__dict__[p].data:
							content.append({
								form.__dict__[p].label.text: "\"{}\" to \"{}\"".format(property.__dict__[p], form.__dict__[p].data)
							})
			address = "{}; {}; {}, {} {}".format(property.address_l1, property.address_l2, property.city, property.state, property.zipcode)

			property.name = form.name.data
			property.address_l1 = form.address_l1.data
			property.address_l2 = form.address_l2.data
			property.city = form.city.data
			property.state = form.state.data
			property.zipcode = form.zipcode.data
			property.type = form.type.data
			property.beds = form.beds.data
			property.baths = form.baths.data
			property.rent_price = form.rent_price.data
			property.sale_price = form.sale_price.data
			property.for_sale = form.for_sale.data
			property.for_rent = form.for_rent.data
			property.area = form.area.data
			property.notes = form.notes.data

			if len(content) >= 1:
				#record history
				new_history = History('edit_property',current_user.id, tgt_prop_id = property.property_id)
				db.session.add(new_history)
				db.session.flush()

				new_content = HistoryContent(new_history.history_id, 'Identifier',address)
				db.session.add(new_content)
				for c in content:
					for k in c:
						new_content = HistoryContent(new_history.history_id, k, c[k])
						db.session.add(new_content)


			db.session.commit()
		except Exception as e:
			print(e)
			db.session.rollback()


			flash('Something went wrong. Please refresh the page and try again.','danger')
			return render_template('administration/properties/edit_property.html', property=property, form=form)


		flash('Property was successfully edited!', 'success')
		return redirect(url_for('administration_property.edit_property',property_id= property_id))

	return render_template('administration/properties/edit_property.html', property=property, form=form)


@mod.route('/add-property', methods=['GET', 'POST'])
@login_required
def add_property():

	form = PropertyForm(request.form)

	if request.method=='POST' and form.validate():

		try:
			property = Properties(form.data)
			db.session.add(property)
			db.session.flush()

			address = "{}; {}; {}, {} {}".format(form.address_l1.data, form.address_l2.data, form.city.data, form.state.data, form.zipcode.data)

			new_history = History('add_property',current_user.id, tgt_prop_id = property.property_id)
			db.session.add(new_history)
			db.session.flush()

			new_content = HistoryContent(new_history.history_id, 'Identifier', address)
			db.session.add(new_content)

			db.session.commit()
		except:
			db.session.rollback()
			flash('Something went wrong. Please refresh the page and try again.')
			render_template('administration/properties/add_property.html',form=form)

		flash('Property was successfully added!','success')
		return redirect(url_for('administration_property.add_property'))


	return render_template('administration/properties/add_property.html', form=form)


@mod.route('/delete-property', methods=['POST'])
@login_required
def delete_property():

	try:
		property_id = int(request.form['id'])
	except:
		abort(404)

	try:
		property = Properties.query.get(property_id)

		new_history = History('del_property',current_user.id, tgt_prop_id=property.property_id)
		db.session.add(new_history)
		db.session.flush()

		address = "{}; {}; {}, {} {}".format(property.address_l1, property.address_l2, property.city, property.state, property.zipcode)
		new_content = HistoryContent(new_history.history_id, 'Identifier', address)
		db.session.add(new_content)

		db.session.delete(property)
		db.session.commit()
	except Exception as e:
		print(e)
		db.session.rollback()
		flash('Something went wrong. Refresh the page and try again','danger')
		return redirect(url_for('administration_property.property_settings'))
	flash('Property successfully deleted!','success')
	return redirect(url_for('administration_property.property_settings'))
