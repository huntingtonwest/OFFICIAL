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

mod = Blueprint('administration_employees', __name__)

@mod.route('/employee-info-settings', methods=['GET'])
@login_required
def employee_settings():
    return render_template('administration/employees/employee_settings.html')

@mod.route('/add-employee', methods=['GET','POST'])
@login_required
def add_employee():
    return render_template('administration/employees/add_employee.html')

@mod.route('/edit-employee/<string:id>', methods=['GET','POST'])
@login_required
def edit_employee(id):
    return render_template('administration/employees/edit_employee.html')

@mod.route('/delete-employee')
@login_required
def delete_employee():
    return render_template('administration/employees/employee_settings.html')
