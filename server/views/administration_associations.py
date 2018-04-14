from flask import Blueprint, render_template, flash, request, redirect, url_for, abort, jsonify
from flask_login import login_required, current_user

from server.models.associations import Associations
from server.models.history import History, HistoryContent
from server.utils.authority_verification import is_admin
from server.forms.forms import AssociationForm, AssociationDeleteForm, AssociationEditForm
from server import db



mod = Blueprint('administration_associations', __name__)

@mod.route('/association-settings', methods=['GET'])
@login_required
def association_settings():
	associations = Associations.query.all()
	return render_template('administration/associations/association_settings.html', associations=associations)

@mod.route('/add-association', methods=['GET','POST'])
@login_required
def add_association():

	form = AssociationForm(request.form)
	if request.method =='POST' and form.validate():
		association = Associations(acn_name = form.acn_name.data, acn_loc = form.acn_loc.data, acn_url = form.acn_url.data)

		try:
			db.session.add(association)
			db.session.flush()

			new_history = History('add_association', current_user.id, tgt_acn_id = association.acn_id)
			db.session.add(new_history)
			db.session.flush()

			new_content = HistoryContent(new_history.history_id, 'Identifier', association.acn_name)
			db.session.add(new_content)

			db.session.commit()
		except Exception as e:
			print(e)
			db.session.rollback()
			flash('Something went wrong. Refresh the page and try again.','danger')
			return render_template('administration/associations/add_association.html',form=form)

		flash('Association was successfully added.','success')
		return redirect(url_for('administration_associations.add_association'))

	return render_template('administration/associations/add_association.html',form=form)


@mod.route('/delete-association', methods=['POST'])
@login_required
def delete_association():
	form = AssociationDeleteForm(request.form)

	if form.validate():
		acn_id = form.acn_id.data
		acn_name = form.acn_name.data
		try:
			association = Associations.query.get(acn_id)

			new_history = History('del_association',current_user.id, tgt_acn_id= acn_id)
			db.session.add(new_history)
			db.session.flush()

			new_content = HistoryContent(new_history.history_id, 'Identifier', association.acn_name)
			db.session.add(new_content)


			db.session.delete(association)
			db.session.commit()
		except Exception as e:
			print(e)
			db.session.rollback()
			flash('Something went wrong. Refresh the page and try again.','danger')
			return redirect(url_for('administration_associations.association_settings'))

		flash('{} was successfully removed'.format(acn_name),'success')
		return redirect(url_for('administration_associations.association_settings'))

	flash('Something went wrong. Refresh the page and try again.','danger')
	return redirect(url_for('administration_associations.association_settings'))


@mod.route('/edit-association/<string:acn_id>', methods=['GET','POST'])
@login_required
def edit_association(acn_id):

	form = AssociationEditForm(request.form)

	acn = Associations.query.get(acn_id)
	if not acn:
		abort(404)

	if request.method == 'POST' and form.validate():
		new_name = form.acn_name.data
		new_loc = form.acn_loc.data
		new_url = form.acn_url.data

		if acn.acn_name.lower() == new_name.lower():
			pass
		else:
			associations = Associations.query.all()
			for a in associations:
				if a.acn_name.lower() == new_name.lower():
					flash('This association name already exists!','danger')
					return render_template('administration/associations/edit_association.html',form=form, acn=acn)

		try:
			content = []
			for p in acn.__dict__:
				for f in form.__dict__.keys():
					if p == f:
						if acn.__dict__[p] != form.__dict__[p].data:
							content.append({
								form.__dict__[p].label.text: "\"{}\" to \"{}\"".format(acn.__dict__[p], form.__dict__[p].data)
								})
							setattr(acn, p, form.__dict__[p].data)

			new_history = History('edit_association', current_user.id, tgt_acn_id=acn.acn_id)
			db.session.add(new_history)
			db.session.flush()

			new_content = HistoryContent(new_history.history_id, 'Identifier', acn.acn_name)
			db.session.add(new_content)
			if len(content) >= 1:
				for c in content:
					for k in c:
						new_content = HistoryContent(new_history.history_id, k, c[k])
						db.session.add(new_content)


			# acn.acn_name = new_name
			# acn.acn_loc = new_loc
			# acn.acn_url = new_url
			db.session.commit()
		except Exception as e:
			print(e)
			db.session.rollback()
			flash('Something went wrong. Please refresh the page and try again.','danger')
			return render_template('administration/associations/edit_association.html',form=form, acn=acn)

		flash('Association changes were saved!','success')
		return redirect(url_for('administration_associations.edit_association', acn_id=acn_id))

	return render_template('administration/associations/edit_association.html',form=form, acn=acn)
