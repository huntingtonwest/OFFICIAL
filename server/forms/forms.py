from wtforms import Form, BooleanField, IntegerField, StringField, DecimalField, validators, ValidationError, PasswordField
from wtforms.widgets import TextArea
from server.forms.form_utils import *
from server.models.associations import Associations


class LoginForm(Form):
    email = StringField('Email', [validators.DataRequired(message=required()),
                                        validators.Length(min=1, max=100, message=len_error_msg(min=1, max=100)),
                                        validators.Email(message='Please enter a valid email.')])
    password = PasswordField('Password', [validators.DataRequired(message=required()),
        validators.Length(min=1, max=100, message=len_error_msg(min=1, max=100))])

class CreateUser(Form):
    email = StringField('Email', [validators.DataRequired(message=required()),
                                        validators.Length(min=1, max=100, message=len_error_msg(min=1, max=100)),
                                        validators.Email(message='Please enter a valid email.')])
    confirm = StringField('Confirm', [validators.InputRequired(), validators.EqualTo('email', message='Passwords must match')])

class Resend(Form):
    id = IntegerField([validators.InputRequired()])
    email = StringField('Email', [validators.DataRequired(message=required()),
                                        validators.Length(min=1, max=100, message=len_error_msg(min=1, max=100)),
                                        validators.Email(message='Please enter a valid email.')])

class RegisterForm(Form):
    first_name = StringField('First Name', [validators.DataRequired(message=required()),
                                            validators.Length(min=1, max=30, message=len_error_msg(min=1, max=30))])
    last_name  = StringField('Last Name', [validators.DataRequired(message=required()),
                                            validators.Length(min=1, max=30, message=len_error_msg(min=1, max=30))])
    password = PasswordField('Password', [validators.DataRequired(message=required()),
                                            validators.Length(min=1, max=100, message=len_error_msg(min=1, max=100))])
    confirm = PasswordField('Confirm', [validators.InputRequired(), validators.EqualTo('password', message='Passwords must match')])

class PersonalSettings(Form):
    first_name = StringField('First Name', [validators.DataRequired(message=required()),
                                            validators.Length(min=1, max=30, message=len_error_msg(min=1, max=30))])
    last_name  = StringField('Last Name', [validators.DataRequired(message=required()),
                                        validators.Length(min=1, max=30, message=len_error_msg(min=1, max=30))])

class EditUser(Form):
    is_admin   = BooleanField('Is Admin')


class PasswordForm(Form):
    password = PasswordField('Password', [validators.DataRequired(message=required()),
                                            validators.Length(min=1, max=100, message=len_error_msg(min=1, max=100))])
    new_password = PasswordField('New Password', [validators.DataRequired(message=required()),
                                            validators.Length(min=1, max=100, message=len_error_msg(min=1, max=100))])
    confirm = PasswordField('Confirm New Password', [validators.InputRequired(), validators.EqualTo('new_password', message='Passwords must match')])

class EmailForm(Form):
    role = StringField('Role')
    email = StringField('Email', [validators.DataRequired(message=required()),
                                        validators.Length(min=1, max=100, message=len_error_msg(min=1, max=100)),
                                        validators.Email(message='Please enter a valid email.')])
# class AssociationForm():

class ConsultationForm(Form):

    def regarding_dropdown(self):
        list = ['Association Management', 'Residential Property Management', 'Available Properties', 'Listing Properties', 'Employment Opportunities', 'Other']
        return list

    def regarding_validator(self, field):
        message='Choose one.'
        if not field.data in self.regarding_dropdown():
            raise ValidationError(message)

    first_name = StringField('First Name', [validators.DataRequired(message=required()),
                                            validators.Length(min=1, max=30, message=len_error_msg(min=1, max=30))])
    last_name  = StringField('Last Name', [validators.DataRequired(message=required()),
                                            validators.Length(min=1, max=30, message=len_error_msg(min=1, max=30))])
    email      = StringField('Email', [validators.DataRequired(message=required()),
                                        validators.Length(min=1, max=30, message=len_error_msg(min=1, max=100)),
                                        validators.Email(message='Please enter a valid email.')])
    phone_num  = StringField('Phone Number', [validators.Length(min=10,max=11, message='Please enter a valid phone number.')])
    regarding  = StringField('Regarding', [validators.DataRequired(message=required()),
                                            regarding_validator])
    msg        = StringField('Message', [validators.Length(max=1000, message=len_error_msg(max=1000))])

    def get_names(self):
        names=[]
        for x in self:
            names.append(x.name)
        return names


class ContactForm(Form):

    def subject_validator(self, field):
        message = 'Choose one.'
        options = ['Residential Property', 'Association']
        if field.data not in options:
            raise ValidationError(message)

    def is_association(self,acn_name):
        association = Associations.query.all()
        for a in association:
            if acn_name == a.acn_name:
                return True
        return False

    def if_association(self, field):
        subject = self._fields.get('subject')
        if subject.data == 'Association' and not self.is_association(field.data):
            message = "You must choose a valid association"
            raise ValidationError(message)


    first_name  = StringField('First Name', [validators.DataRequired(message=required()),
                                            validators.Length(min=1, max=30, message=len_error_msg(min=1, max=30))])
    last_name   = StringField('Last Name', [validators.DataRequired(message=required()),
                                            validators.Length(min=1, max=30, message=len_error_msg(min=1, max=30))])
    subject     = StringField('Subject', [validators.DataRequired(message=required()),
                                            subject_validator])
    association = StringField('Association', [if_association])
    unit        = StringField('Unit', [validators.DataRequired(message=required()),
                                        validators.Length(min=1, max=20, message=len_error_msg(min=1, max=20))])
    email       = StringField('Email', [validators.DataRequired(message=required()),
                                        validators.Length(min=1, max=30, message=len_error_msg(min=1, max=100)),
                                        validators.Email(message='Please enter a valid email.')])
    phone_num   = StringField('Phone Number', [validators.Length(min=10,max=11, message='Please enter a valid phone number.')])
    msg         = StringField('Message', [validators.Length(max=1000, message=len_error_msg(max=1000))])

    def get_names(self):
        names=[]
        for x in self:
            names.append(x.name)
        return names



class PropertyForm(Form):
    name       = StringField('Property Name', [validators.Length(max=200, message=len_error_msg(max=200)),
                                                validators.DataRequired(message=required())])
    address_l1 = StringField('Address Line 1', [validators.Length(min=1, max=200, message=len_error_msg(min=1, max=200)),
                                                validators.DataRequired(message=required())])
    address_l2 = StringField('Address Line 2', [validators.Length(max=200, message=len_error_msg(max=200))])
    city       = StringField('City', [validators.Length(min=1, max=200, message=len_error_msg(min=1,max=200)),
                                        validators.DataRequired(message=required())])
    state      = StringField('State', [validators.Length(min=2, max=2, message=len_error_msg(fixed=2)),
                                        validators.DataRequired(message=required())])
    zipcode    = StringField('Zipcode', [validators.Length(min=5, max=5, message=len_error_msg(fixed=5)),
                                            validators.DataRequired(message=required())])
    type       = StringField('Property Type', [validators.Length(max=200, message=required()),
                                            validators.DataRequired(message=required())])
    beds       = DecimalField('Beds', [validators.NumberRange(min=0, message=int_error_msg(min=0)),
                                        decimal_check,
                                        validators.DataRequired(message=required())])
    baths      = DecimalField('Baths', [validators.NumberRange(min=0, message=int_error_msg(min=0)),
                                        decimal_check,
                                        validators.DataRequired(message=required())])
    price      = IntegerField('Price', [validators.NumberRange(min=0, message=int_error_msg(min=0)),
                                        validators.DataRequired(message=required())])
    for_sale   = BooleanField('For Sale')
    for_rent   = BooleanField('For Rent')
    area       = IntegerField('Area (sq ft)', [validators.NumberRange(min=0, message=int_error_msg(min=0)),
                                                validators.DataRequired(message=required())])
    notes      = StringField('Notes/Comments', [validators.Length(max=2000, message=len_error_msg(max=2000))], widget=TextArea())
