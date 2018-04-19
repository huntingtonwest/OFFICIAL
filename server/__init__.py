from flask import Flask, render_template, session, g
from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from flask_login import LoginManager, current_user
from flask_mail import Mail
from itsdangerous import URLSafeTimedSerializer
from config import serializer_key
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect
import datetime


application = Flask(__name__)
app = application
app.config.from_object('config')
db = SQLAlchemy(app)

migrate = Migrate(app,db)
manager = Manager(app)
manager.add_command('db',MigrateCommand)
csrf = CSRFProtect(app)
mail = Mail(app)
CORS(app)

s = URLSafeTimedSerializer(serializer_key)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'administration_general.login'


@app.errorhandler(400)
def error400(error):
	print('400 error')
	return render_template('errors/400.html'), 400

@app.errorhandler(404)
def error404(error):
	print('404 error')
	print(error)
	return render_template('errors/404.html'), 404

@app.errorhandler(403)
def error403(error):
	print('403 error')
	return render_template('errors/403.html'), 403

from server.utils.query_utils import jinjaf_init
jinjaf_init(app)

from server.views import general
from server.views import administration_general
from server.views import administration_property
from server.views import administration_users
from server.views import administration_emails
from server.views import administration_associations
from server.views import administration_about
from server.views import administration_files
from server.views import forms
app.register_blueprint(general.mod)
app.register_blueprint(administration_general.mod)
app.register_blueprint(administration_property.mod)
app.register_blueprint(administration_emails.mod)
app.register_blueprint(administration_associations.mod)
app.register_blueprint(administration_users.mod)
app.register_blueprint(administration_about.mod)
app.register_blueprint(administration_files.mod)
app.register_blueprint(forms.mod)
csrf.exempt(forms.mod)
# csrf.exempt(administration_about.mod)
from server import models
from server.models.users import Users

@login_manager.user_loader
def load_user(id):
    return Users.query.get(int(id))

#times out user
@app.before_request
def before_request():
    session.permanent = True
    app.permanent_session_lifetime = datetime.timedelta(minutes=15)
    session.modified = True
    g.user = current_user
