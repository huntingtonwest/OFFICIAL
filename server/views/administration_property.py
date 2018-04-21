from flask import Blueprint, render_template, flash, request, redirect, url_for, abort, jsonify
from flask_login import login_required, current_user

from server.models.properties import Properties, PropertyImgs
from server.models.history import History, HistoryContent
from server.utils.authority_verification import is_admin
from server.forms.forms import PropertyForm, DeleteForm
from server.utils.query_utils import serialize, pst_time
from server.utils.s3_helpers import *
from server import db

from datetime import datetime



mod = Blueprint('administration_property', __name__)
ALLOWED_EXTENSIONS = ['png','jpeg','jpg']

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
		prop['images'] = [i.img_url for i in x.images]
		properties.append(prop)
		count += 1

	return render_template('administration/properties/property_settings.html', properties = properties)

@mod.route('/edit-property/<string:property_id>', methods=['GET'])
@login_required
def edit_property_get(property_id):
	form = PropertyForm()
	property = Properties.query.get(property_id)
	if not property:
		abort(404)
	form.notes.data = property.notes

	return render_template('administration/properties/edit_property.html', property=property, form=form)

@mod.route('/edit-property/<string:property_id>', methods=['POST'])
@login_required
def edit_property(property_id):

	form = PropertyForm(request.form)
	property = Properties.query.get(property_id)
	if not property:
		abort(404)
	if request.method=='POST' and form.validate():
		try:
			filelist = request.form.getlist('file-order')
			newlist = request.files.getlist('user_file')

			if not filelist:
				return jsonify({'status':'error', 'msg':'Something went wrong. Please refresh the page and try again.'})

			currentimgs = []
			imglist = property.images
			if imglist:
				for i in imglist:
					currentimgs.append(i.img_id)

			# check for changes in images
			change = False
			if len(filelist) != len(currentimgs):
				change = True
			else:
				for i,j in zip(currentimgs, filelist):
					if j == 'new':
						change = True
						break
					elif i != int(j):
						change = True
						break

			#figure out which columns have changed and set values and record history
			content = []
			for p in property.__dict__:
				for f in form.__dict__.keys():
					if p == f:
						if property.__dict__[p] != form.__dict__[p].data:
							content.append({
								form.__dict__[p].label.text: "\"{}\" to \"{}\"".format(property.__dict__[p], form.__dict__[p].data)
							})
							setattr(property, p, form.__dict__[p].data)

			address = "{}; {}; {}, {} {}".format(property.address_l1, property.address_l2, property.city, property.state, property.zipcode)


			new_history = None
			if len(content) >= 1 or change:
				#record history if there are changes
				new_history = History('edit_property',current_user.id, tgt_prop_id = property.property_id)
				db.session.add(new_history)
				db.session.flush()

				new_content = HistoryContent(new_history.history_id, 'Identifier',address)
				db.session.add(new_content)
				for c in content:
					for k in c:
						new_content = HistoryContent(new_history.history_id, k, c[k])
						db.session.add(new_content)
			else:
				return jsonify({'status':'danger', 'msg':'No changes were specified.'})

			#add new pictures and redetermine order.
			if change:
				new_content = HistoryContent(new_history.history_id, 'Images','Images edited')
				db.session.add(new_content)

				newcount = 0
				for filenum in filelist:
					if filenum == 'new':
						newfile = newlist[newcount]

						if newfile.filename == '' or not allowed_file(newfile.filename, ALLOWED_EXTENSIONS):
							return jsonify({'msg':'Only {} files are accepted.'.format(', '.join(ALLOWED_EXTENSIONS)),'status':'danger'})

						image =  PropertyImgs(property.property_id,"")
						db.session.add(image)
						db.session.flush()
						property.add_image(image)
						newfile.filename = "property_{}_{}".format(property.property_id, image.img_id)
						output = upload_file_to_s3(newfile, app.config['PROPERTY_S3_BUCKET'], app.config["S3_BUCKET"])
						if not output:
							raise
						else:
							image.img_url = output
							new_content = HistoryContent(new_history.history_id, 'Image', output)
							db.session.add(new_content)
							newcount += 1
					else:
						img_id = int(filenum)
						image = PropertyImgs.query.get(img_id)
						if not image or image.property_id != property.property_id:
							raise
						image.date_added = datetime.utcnow()
						del currentimgs[currentimgs.index(image.img_id)]

				# delete deleted images
				for i in currentimgs:
					del_img = PropertyImgs.query.get(int(i))
					if not del_img or del_img.property_id != property.property_id:
						raise
					s = delete_file_from_s3('property_{}_{}'.format(property.property_id, del_img.img_id), app.config['PROPERTY_S3_BUCKET'], app.config["S3_BUCKET"])
					if not s:
						raise
					else:
						new_content = HistoryContent(new_history.history_id, 'Image', 'deleted')
						db.session.add(new_content)
						db.session.delete(del_img)

			db.session.commit()
			flash('Property was successfully edited', 'success')
			return jsonify({'status':'success','msg':'Property was successfully edited','reload':True})
		except Exception as e:
			print(e)
			db.session.rollback()
			return jsonify({'status':'error', 'msg':'Something went wrong. Please refresh the page and try again.'})

	if form.errors:
		return jsonify({'status':'danger','msg':'There were errors in the form.', 'form_errors':form.errors})
	else:
		return jsonify({'status':'danger','msg':'Something went wrong. Please refresh the page and try again.'})



@mod.route('/add-property', methods=['GET'])
@login_required
def add_property_get():
	form = PropertyForm()
	return render_template('administration/properties/add_property.html', form=form)

@mod.route('/add-property', methods=['POST'])
@login_required
def add_property():
	msg = 'Something went wrong uploading the file. Please refresh the page and try again.'

	form = PropertyForm(request.form)

	if request.method=='POST' and form.validate():

		# make sure file is a valid file
		if 'user_file' not in request.files:
			return jsonify({'status':'danger','msg':'You must upload an image.'})

		uploads = request.files.getlist('user_file')
		if not uploads:
			return jsonify({'status':'danger','msg':'You must upload an image.'})

		for file in uploads:
			if file.filename == '':
				del uploads[uploads.index(file)]
				# return jsonify({'status':'danger','msg':'Please upload an image.'})
			if not allowed_file(file.filename, ALLOWED_EXTENSIONS):
				return jsonify({'msg':'Only {} files are accepted.'.format(', '.join(ALLOWED_EXTENSIONS)),'status':'danger'})


		try:
			#initiate property data
			property = Properties(form.data)
			db.session.add(property)
			db.session.flush()

			#initiatiate history data
			address = "{}; {}; {}, {} {}".format(form.address_l1.data, form.address_l2.data, form.city.data, form.state.data, form.zipcode.data)

			new_history = History('add_property',current_user.id, tgt_prop_id = property.property_id)
			db.session.add(new_history)
			db.session.flush()

			#record history of new property
			content = []
			for f in form.__dict__['_fields'].keys():
				content.append({form.__dict__[f].label.text: form.__dict__[f].data})
			print(content)
			new_content = HistoryContent(new_history.history_id, 'Identifier',address)
			db.session.add(new_content)
			for c in content:
				for k in c:
					new_content = HistoryContent(new_history.history_id, k, c[k])
					db.session.add(new_content)
			print('here')
			#upload pictures. if successful, record history
			for file in uploads:
				image =  PropertyImgs(property.property_id,"")
				db.session.add(image)
				db.session.flush()
				property.add_image(image)
				file.filename = "property_{}_{}".format(property.property_id, image.img_id)
				output = upload_file_to_s3(file, app.config['PROPERTY_S3_BUCKET'], app.config["S3_BUCKET"])
				if not output:
					raise
				else:
					image.img_url = output
					new_content = HistoryContent(new_history.history_id, 'Image', output)
					db.session.add(new_content)

			db.session.commit()
			flash('Property was successfully added!','success')
			return jsonify({'status':'success','msg':'Property was successfully added!','reload':True})

		except Exception as e:
			print(e)
			db.session.rollback()
			return jsonify({'msg':msg,'status':'danger'})

	if form.errors:
		return jsonify({'status':'danger','msg':'There were errors in the form.', 'form_errors':form.errors})
	else:
		return jsonify({'status':'danger','msg':'Something went wrong. Please refresh the page and try again.'})


@mod.route('/delete-property', methods=['POST'])
@login_required
def delete_property():

	form = DeleteForm(request.form)
	if not form.validate():
		flash('Something went wrong. Please refresh the page and try again.','danger')
		return redirect(url_for('administration_property.property_settings'))

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

		images = property.images
		if images:
			for i in images:
				s = delete_file_from_s3('property_{}_{}'.format(property.property_id, i.img_id), app.config['PROPERTY_S3_BUCKET'], app.config["S3_BUCKET"])
				if not s:
					raise

		db.session.delete(property)
		db.session.commit()
		# return jsonify({'status':'success', 'msg':'Property successfully deleted!', 'reload':'true'})
		flash('Property was successfully deleted','success')
		return redirect(url_for('administration_property.property_settings'))
	except Exception as e:
		print(e)
		db.session.rollback()
		flash('Something went wrong. Please refresh the page and try again.','danger')
		return redirect(url_for('administration_property.property_settings'))
