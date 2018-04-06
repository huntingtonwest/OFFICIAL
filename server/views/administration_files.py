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
# from server.forms.forms import FileForm
from passlib.hash import sha256_crypt
from server.utils.query_utils import serialize, pst_time

from config import MAIL_USERNAME
from sqlalchemy import exc
from server.forms.forms import LoginForm, RegisterForm, PersonalSettings, PasswordForm, EmailForm, DeleteForm
from server import app, db, s, mail

mod = Blueprint('administration_files', __name__)



@mod.route('/file-settings')
# @login_required
def file_settings():

    files = Files.query.all()

    return render_template('administration/files/file_settings.html', files=files)

@mod.route('/edit-file/<string:id>', methods=['GET','POST'])
# @login_required
def edit_file(id):

    try:
        file = Files.query.get(int(id))
        if not file:
            abort(404)
    except:
        abort(404)

    if request.method == 'POST':

        if "user_file" not in request.files:
            flash('Please select a file.','danger')
            return render_template('administration/files/edit_file.html', file=file)

        upload = request.files["user_file"]

        if upload.filename == "":
            flash('Please select a file.','danger')
            return render_template('administration/files/edit_file.html', file=file)


        if upload and allowed_file(upload.filename):
            upload.filename = secure_filename(upload.filename)
            output = upload_file_to_s3(upload, app.config['FILES_S3_BUCKET'], app.config["S3_BUCKET"])
            return str(output)

        else:
            return redirect("/")

    return render_template('administration/files/edit_file.html', file = file)


@mod.route('/delete-file', methods=['GET','POST'])
def delete_file():
    if request.method == 'POST':

        if "user_file" not in request.files:
            return "No user_file key in request.files"

        file    = request.files["user_file"]

        if file.filename == "":
            return "Please select a file"

	# D.
        if file and allowed_file(file.filename):
            file.filename = secure_filename(file.filename)
            output = upload_file_to_s3(file, app.config['PROPERTY_S3_BUCKET'], app.config["S3_BUCKET"])

            if not output:
                flash('Something went wrong uploading the file. Please refresh the page and try again.')
                render_template('administration/files/edit_file.html', file = file)

            return str(output)

        else:
            return redirect("/")
