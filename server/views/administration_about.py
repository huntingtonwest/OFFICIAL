from flask import Blueprint, render_template, flash, request, redirect, url_for, abort, jsonify
from flask_login import login_required, logout_user, login_user, current_user

from server.models.users import Users
from server.models.history import History, HistoryContent
from server.models.aboutinfo import AboutInfo
from passlib.hash import sha256_crypt

from server.utils.authority_verification import is_admin
from sqlalchemy import or_
from itsdangerous import SignatureExpired
from server.forms.forms import PropertyForm
from passlib.hash import sha256_crypt
from server.utils.query_utils import serialize, pst_time
from server.utils.s3_helpers import *


from config import MAIL_USERNAME
from sqlalchemy import exc
from server.forms.forms import DeleteForm, AboutInfoForm
from server import app, db, s, mail
from datetime import datetime

mod = Blueprint('administration_about', __name__)
ALLOWED_EXTENSIONS=['png','jpeg','jpg']

@mod.route('/about-info-settings', methods=['GET','POST'])
@login_required
def about_settings():

	about = AboutInfo.query.order_by(AboutInfo.date.asc()).all()

	if request.method=='POST':

		try:
			ids = request.form.getlist('sort-id')
			print(ids)
			for id in ids:
				tabout = AboutInfo.query.get(int(id))
				tabout.date = datetime.utcnow()
				print('updated')
			db.session.commit()
			flash('Order was successfully saved!','success')
			return redirect(url_for('administration_about.about_settings'))
		except Exception as e:
			print(e)
			flash('Something went wrong. Refresh the page and try again.','danger')
			return redirect(url_for('administration_about.about_settings'))


	return render_template('administration/about/about_settings.html', about=about)

@mod.route('/add-about',methods=['GET'])
@login_required
def add_about_get():
	form = AboutInfoForm()
	return render_template('administration/about/add_about.html', form=form)

@mod.route('/add-about', methods=['POST'])
@login_required
def add_about_post():
	form = AboutInfoForm(request.form)

	if request.method=='POST' and form.validate():
		if not "user_file" in request.files:
			return jsonify({'status':'danger','msg':'You must upload an image.'})

		upload = request.files['user_file']
		if upload.filename == "":
			return jsonify({'status':'danger','msg':'Please upload an image.'})

		if upload and allowed_file(upload.filename, ALLOWED_EXTENSIONS):

			try:
				new = AboutInfo(form.first.data, form.last.data, form.position.data, form.email.data, form.phone.data, "")
				db.session.add(new)
				db.session.flush()

				upload.filename = "about_{}".format(new.aboutinfo_id)
				output = upload_file_to_s3(upload, app.config['ABOUT_S3_BUCKET'], app.config["S3_BUCKET"])
				if not output:
					raise
				new.img_url = output

				new_history = History('add_about', current_user.id, tgt_about_id=new.aboutinfo_id)
				db.session.add(new_history)
				db.session.flush()

				new_content = HistoryContent(new_history.history_id, 'Identifier', "{} {}".format(form.first.data,form.last.data))
				db.session.add(new_content)

				for f in form.__dict__['_fields'].keys():
					col_name = form.__dict__[f].label.text
					col_content = form.__dict__[f].data
					new_content = HistoryContent(new_history.history_id, col_name, col_content)
					db.session.add(new_content)

				new_content = HistoryContent(new_history.history_id, 'Image', output)
				db.session.add(new_content)

				db.session.commit()
				return jsonify({'status':'success','msg':'The employee was successfully added','reload':'true'})
			except Exception as e:
				print(e)
				db.session.rollback()
				return jsonify({'status':'danger','msg':'Something went wrong. Please refresh the page and try again.'})

		else:
			return jsonify({'msg':'Only {} files are accepted.'.format(', '.join(ALLOWED_EXTENSIONS)),'status':'danger'})

	if form.errors:
		return jsonify({'status':'danger','msg':'There were errors in the form.', 'form_errors':form.errors})
	else:
		return jsonify({'status':'danger','msg':'Something went wrong. Please refresh the page and try again.'})


@mod.route('/edit-about/<string:id>', methods=['GET'])
@login_required
def edit_about_get(id):
	form = AboutInfoForm()
	try:
		about = AboutInfo.query.get(int(id))
		if not about:
			abort(404)
	except:
		abort(404)

	return render_template('administration/about/edit_about.html', about=about, form=form)

@mod.route('/edit-about/<string:id>', methods=['POST'])
@login_required
def edit_about_post(id):
	try:
		about = AboutInfo.query.get(int(id))
		if not about:
			abort(404)
	except:
		abort(404)

	form = AboutInfoForm(request.form)

	if request.method=='POST' and form.validate():
		upload = None
		if "user_file" in request.files:
			upload = request.files['user_file']
			print(upload)
			if upload.filename == "":
				return jsonify({'status':'danger','msg':'Please upload an image.'})
			if not upload or not allowed_file(upload.filename, ALLOWED_EXTENSIONS):
				return jsonify({'msg':'Only {} files are accepted.'.format(', '.join(ALLOWED_EXTENSIONS)),'status':'danger'})

		content = []
		# print(dir(about))
		for p in about.__dict__:
			for f in form.__dict__['_fields'].keys():
				if p == f:
					if about.__dict__[p] != form.__dict__[p].data:
						content.append({
							form.__dict__[p].label.text: "\"{}\" to \"{}\"".format(about.__dict__[p], form.__dict__[p].data)
						})
						setattr(about,p, form.__dict__[p].data)

		if len(content) <= 0 and not upload:
			return jsonify({'status':'danger','msg':'No changes were made.'})

		new_history = History('edit_about', current_user.id, tgt_about_id=about.aboutinfo_id)
		db.session.add(new_history)
		db.session.flush()

		new_content = HistoryContent(new_history.history_id, 'Identifier', "{} {}".format(form.first.data,form.last.data))
		db.session.add(new_content)
		for c in content:
			for k in c:
				new_content = HistoryContent(new_history.history_id, k, c[k])
				db.session.add(new_content)

		if upload:
			print('here')
			upload.filename = "about_{}".format(about.aboutinfo_id)
			# s = delete_file_from_s3('{}_{}'.format('about', about.aboutinfo_id), app.config['ABOUT_S3_BUCKET'], app.config["S3_BUCKET"])
			# if not s:
			# 	raise
			output = upload_file_to_s3(upload, app.config['ABOUT_S3_BUCKET'], app.config["S3_BUCKET"])
			# output = False
			if output:
				print(output)
				new_content = HistoryContent(new_history.history_id, 'Image', output)
				about.img_url = output
				db.session.add(new_content)
			else:
				return jsonify({'status':'danger','msg':'Something went wrong. Please refresh the page and try again.'})

		try:
			db.session.commit()
			return jsonify({'status':'success','msg':'The employee was successfully edited','reload':'true'})
		except Exception as e:
			print(e)
			db.session.rollback()
			return jsonify({'status':'danger','msg':'Something went wrong. Please refresh the page and try again.'})

	if form.errors:
		return jsonify({'status':'danger','msg':'There were errors in the form.', 'form_errors':form.errors})
	else:
		return jsonify({'status':'danger','msg':'Something went wrong. Please refresh the page and try again.'})


@mod.route('/delete-about', methods=['POST'])
@login_required
def delete_about():

	form = DeleteForm(request.form)

	if request.method=='POST' and form.validate():
		try:
			about = AboutInfo.query.get(int(form.id.data))
			if not about:
				abort(404)
		except Exception as e:
			print(e)
			abort(404)

		new_history = History('del_about', current_user.id, tgt_about_id=about.aboutinfo_id)
		db.session.add(new_history)
		db.session.flush()

		new_content = HistoryContent(new_history.history_id, 'Identifier', "{} {}".format(about.first,about.last))
		db.session.add(new_content)

		s = delete_file_from_s3('{}_{}'.format('about', about.aboutinfo_id), app.config['ABOUT_S3_BUCKET'], app.config["S3_BUCKET"])
		if not s:
			flash('Something went wrong deleting the file. Refresh the page and try again','danger')
			return redirect(url_for('administration_files.file_settings'))

		db.session.delete(about)

		try:
			db.session.commit()
			return jsonify({'status':'success','msg':'The employee was successfully deleted','reload':'true'})
		except Exception as e:
			print(e)
			db.session.rollback()

	return jsonify({'status':'danger','msg':'Something went wrong. Please refresh the page and try again.'})
