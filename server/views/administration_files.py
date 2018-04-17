from flask import Blueprint, render_template, flash, request, redirect, url_for, abort, jsonify
from flask_login import login_required, logout_user, login_user, current_user

from server.models.users import Users
from server.models.history import History, HistoryContent
from server.models.aboutinfo import AboutInfo
from server.models.files import Files
from passlib.hash import sha256_crypt
from werkzeug.utils import secure_filename
from server.utils.s3_helpers import *

from server.utils.authority_verification import is_admin
from sqlalchemy import or_
from itsdangerous import SignatureExpired
from server.forms.forms import FileForm
from passlib.hash import sha256_crypt
from server.utils.query_utils import serialize, pst_time

from config import MAIL_USERNAME
from sqlalchemy import exc
from server.forms.forms import LoginForm, RegisterForm, PersonalSettings, PasswordForm, EmailForm, DeleteForm
from server import app, db, s, mail

mod = Blueprint('administration_files', __name__)
ALLOWED_EXTENSIONS = ['png','jpg', 'jpeg', 'pdf']



@mod.route('/file-settings', methods=['GET'])
@login_required
def file_settings():

    files = Files.query.all()

    return render_template('administration/files/file_settings.html', files=files)

@mod.route('/add-file', methods=['GET','POST'])
@login_required
def add_file():
    form = FileForm(request.form)

    if request.method == 'POST' and form.validate():

        if "user_file" not in request.files:
            flash('Please select a file.','danger')
            return render_template('administration/files/add_file.html', form=form)

        upload = request.files["user_file"]

        if upload.filename == "":
            flash('Please select a file.','danger')
            return render_template('administration/files/add_file.html', form=form)


        if upload and allowed_file(upload.filename, ALLOWED_EXTENSIONS):
            file = Files.query.filter_by(file_name = form.file_name.data).first()
            if file:
                flash('A file by this name already exists!','danger')
                return render_template('administration/files/add_file.html', form=form)

            try:
                file = Files(form.file_name.data, "")
                db.session.add(file)
                db.session.flush()

                upload.filename = 'file_{}'.format(file.file_id)

                #if filename is the same, the file is overwritten
                output = upload_file_to_s3(upload, app.config['FILES_S3_BUCKET'], app.config["S3_BUCKET"])
                # print(output)
                if not output:
                    flash('Something went wrong uploading the file. Please refresh the page and try again.','danger')
                    return render_template('administration/files/add_file.html', form=form, file = file)

                new_history = History('add_file', current_user.id, tgt_file_id=file.file_id)
                db.session.add(new_history)
                db.session.flush()

                new_content = HistoryContent(new_history.history_id, 'Identifier', form.file_name.data)
                db.session.add(new_content)

                new_content = HistoryContent(new_history.history_id, 'File', output)
                db.session.add(new_content)

                file.file_url = output
                db.session.commit()
            except Exception as e:
                # print(e)
                db.session.rollback()
                flash('Something went wrong uploading the file. Please refresh the page and try again.','danger')
                return render_template('administration/files/add_file.html',form=form)

            flash('File was successfully added!', 'success')
            return redirect(url_for('administration_files.add_file'))
        else:
            flash('Only pdf files are accepted.','danger')
            return render_template('administration/files/add_file.html', form=form)

    return render_template('administration/files/add_file.html', form=form)


@mod.route('/edit-file/<string:id>', methods=['GET','POST'])
@login_required
def edit_file(id):

    try:
        file = Files.query.get(int(id))
        if not file:
            abort(404)
    except:
        abort(404)

    form = FileForm(request.form)

    if request.method == 'POST' and form.validate():
        upload = None
        if "user_file" in request.files:
            upload = request.files["user_file"]


        if not upload and file.file_name == form.file_name.data:
            flash('No changes were made!','danger')
            return render_template('administration/files/edit_file.html', form=form, file=file)

        if file.file_name != form.file_name.data and Files.query.filter_by(file_name = form.file_name.data).first():
            flash('A file by this name already exists!','danger')
            return render_template('administration/files/edit_file.html', form=form, file=file)

        if upload and (upload.filename == "" or not allowed_file(upload.filename, ALLOWED_EXTENSIONS)):
            flash('Only {} files are accepted.'.format(', '.join(ALLOWED_EXTENSIONS)), 'danger')
            return render_template('administration/files/edit_file.html', form=form, file=file)
        print(upload)
        output = None
        if upload:
            upload.filename = '{}_{}'.format('file', file.file_id)
            output = upload_file_to_s3(upload, app.config['FILES_S3_BUCKET'], app.config["S3_BUCKET"])
            if not output:
                flash('Something went wrong uploading the file. Please refresh the page and try again.', 'danger')
                return render_template('administration/files/edit_file.html', form=form, file=file)

        try:
            new_history = History('edit_file', current_user.id, tgt_file_id=file.file_id)
            db.session.add(new_history)
            db.session.flush()

            if file.file_name != form.file_name.data:
                print('file name not equal')
                new_content = HistoryContent(new_history.history_id, 'Identifier', form.file_name.data)
                db.session.add(new_content)
                new_content = HistoryContent(new_history.history_id, 'File Name', '"{}" to "{}"'.format(file.file_name, form.file_name.data))
                db.session.add(new_content)
                file.file_name = form.file_name.data
            else:
                print('file name equal')
                new_content = HistoryContent(new_history.history_id, 'Identifier', file.file_name)
                db.session.add(new_content)

            if upload:

                file.file_url = output
                new_content = HistoryContent(new_history.history_id, 'File', output)
                db.session.add(new_content)
                print('upload file')

            db.session.commit()
        except Exception as e:
            print(e)
            db.session.rollback()
            flash('Something went wrong uploading the file. Please refresh the page and try again.','danger')
            return render_template('administration/files/edit_file.html',form=form,  file = file)

        flash('File was successfully edited!', 'success')
        return redirect(url_for('administration_files.edit_file', id=id))

    return render_template('administration/files/edit_file.html', form=form, file = file)


@mod.route('/delete-file', methods=['GET','POST'])
@login_required
def delete_file():

    form = DeleteForm(request.form)
    if request.method == 'POST' and form.validate():

        file = Files.query.get(int(form.id.data))
        if not file:
            abort(404)


        if file.file_url != "":
            s = delete_file_from_s3('{}_{}'.format('file', file.file_id), app.config['FILES_S3_BUCKET'], app.config["S3_BUCKET"])
            if not s:
                flash('Something went wrong deleting the file. Refresh the page and try again','danger')
                return redirect(url_for('administration_files.file_settings'))

        try:
            new_history = History('del_file', current_user.id, tgt_file_id=file.file_id)
            db.session.add(new_history)
            db.session.flush()

            new_content = HistoryContent(new_history.history_id, 'Identifier', file.file_name)
            db.session.add(new_content)

            db.session.delete(file)
            db.session.commit()
        except Exception as e:
            print(e)
            db.session.rollback()
            flash('Something went wrong deleting the file. Refresh the page and try again','danger')
            return redirect(url_for('administration_files.file_settings'))

        flash('File was successfully deleted.','success')
        return redirect(url_for('administration_files.file_settings'))

    flash('Something went wrong deleting the file. Refresh the page and try again','danger')
    return redirect(url_for('administration_files.file_settings'))
