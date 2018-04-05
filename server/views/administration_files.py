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

from config import MAIL_USERNAME
from sqlalchemy import exc
from server.forms.forms import LoginForm, RegisterForm, PersonalSettings, PasswordForm, EmailForm, DeleteForm
from server import app, db, s, mail

mod = Blueprint('administration_files', __name__)



@mod.route('/file-settings')
@login_required
@is_admin
def file_settings():
    return render_template('administration/files/file_settings.html')
