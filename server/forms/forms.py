from wtforms import Form, BooleanField, IntegerField, StringField, DecimalField, validators, ValidationError, PasswordField
from wtforms.widgets import TextArea
from server.forms.form_err_msg import *
from server.models.associations import Associations
from server.forms.form_validators import *

class Fields():
    email = StringField('Email', [validators.DataRequired(message=required()),
                                    validators.Length(max=100, message=len_error_msg(max=100)),
                                    validators.Email(message='Please enter a valid email.')])

    def name(fieldname):
        return StringField(fieldname, [validators.DataRequired(message=required()),
                                            validators.Length(max=100, message=len_error_msg(max=100)),
                                            name_validator])
    def property_line(fieldname):
        return StringField(fieldname, [validators.DataRequired(message=required()),
                                            validators.Length(max=200, message=len_error_msg(max=200)),
                                            alphanumeric_validator])
    def new_password(fieldname):
        return PasswordField(fieldname, [validators.DataRequired(message=required()),
                                                validators.Length(min=6, max=100, message=len_error_msg(min=6, max=100)),
                                                password_creation_validator])

class LoginForm(Form):
    email = Fields.email
    password = PasswordField('Password', [validators.DataRequired(message=required())])

#when someone invites a user
class CreateUser(Form):
    email = Fields.email
    confirm = StringField('Confirm', [validators.DataRequired(), validators.EqualTo('email', message='Passwords must match')])

#when resending the invitation
class Resend(Form):
    id = IntegerField([validators.InputRequired(), id_validator])
    email = Fields.email

#when a new user registers
class RegisterForm(Form):
    first_name = Fields.name('First Name')
    last_name  = Fields.name('Last Name')
    password = Fields.new_password('Password')
    confirm = PasswordField('Confirm', [validators.DataRequired(), validators.EqualTo('password', message='Passwords must match')])

class PersonalSettings(Form):
    id = IntegerField('User Id',[validators.InputRequired(), id_validator])
    first_name = Fields.name('First Name')
    last_name  = Fields.name('Last Name')

class EditUser(Form):
    is_admin   = BooleanField('Is Admin')

class DeleteForm(Form):
    id = IntegerField('History Id',[validators.InputRequired(), id_validator])

class PasswordForm(Form):
    id = IntegerField('User Id',[validators.InputRequired(), id_validator])
    password = PasswordField('Password', [validators.DataRequired(message=required())])
    new_password = Fields.new_password('New Password')
    confirm = PasswordField('Confirm New Password', [validators.InputRequired(), validators.EqualTo('new_password', message='Passwords must match')])

class EmailForm(Form):
    role = StringField('Role', [validators.DataRequired()])
    email = Fields.email

class AssociationDeleteForm(Form):
    acn_id = IntegerField('User Id',[validators.InputRequired(), id_validator])
    acn_name = StringField('Association Name', [validators.DataRequired(message=required()), association_validator])

class AssociationEditForm(Form):
    acn_name = StringField('Association Name',[validators.DataRequired(), validators.Length(max=200, message=len_error_msg(max=200)),
                    alphanumeric_validator])
    acn_loc = StringField('Association Location',[validators.DataRequired(), validators.Length(max=200, message=len_error_msg(max=200)),
                    alphanumeric_validator])

class AssociationForm(Form):
    acn_name = StringField('Association Name',[validators.DataRequired(), validators.Length(max=200, message=len_error_msg(max=200)),
                    alphanumeric_validator, association_add_validator])
    acn_loc = StringField('Association Location',[validators.DataRequired(), validators.Length(max=200, message=len_error_msg(max=200)),
                    alphanumeric_validator])

class ConsultationForm(Form):

    def regarding_validator(self, field):
        options = ['association management', 'residential property management', 'available properties', 'listing properties', 'employment opportunities', 'other']

        message='Choose one.'
        if not (field.data.strip()).lower() in options:
            raise ValidationError(message)

    first_name = Fields.name('First Name')
    last_name  = Fields.name('Last Name')
    email      = Fields.email
    phone_num  = StringField('Phone Number', [phone_number_validator])
    regarding  = StringField('Regarding', [validators.DataRequired(message=required()),
                                            regarding_validator])
    msg        = StringField('Message', [validators.Length(max=1000, message=len_error_msg(max=1000))])

    # def get_names(self):
    #     names=[]
    #     for x in self:
    #         names.append(x.name)
    #     return names

class AboutInfoForm(Form):
    first    = Fields.name('First Name')
    last     = Fields.name('Last Name')
    position = Fields.name('Position')
    email    = Fields.email
    phone    = StringField('Phone Number', [phone_number_validator])

class ContactForm(Form):

    def subject_validator(self, field):
        message = 'Choose one.'
        options = ['residential property', 'association']
        if (field.data.strip()).lower() not in options:
            raise ValidationError(message)

    def if_association(self, field):
        subject = self._fields.get('subject')
        if (subject.data.strip()).lower() == 'association' and not association_validator(self, field.data):
            message = "You must choose a valid association"
            raise ValidationError(message)

    first_name  = Fields.name('First Name')
    last_name   = Fields.name('Last Name')
    subject     = StringField('Subject', [validators.DataRequired(message=required()),
                                            subject_validator])
    association = StringField('Association', [if_association])
    unit        = StringField('Unit', [validators.DataRequired(message=required()),
                                        validators.Length(max=20, message=len_error_msg(max=20)),
                                        name_validator])
    email       = Fields.email
    phone_num   = StringField('Phone Number', [phone_number_validator])
    msg         = StringField('Message', [validators.Length(max=1000, message=len_error_msg(max=1000))])


class PropertyForm(Form):
    name       = Fields.property_line('Property Name')
    address_l1 = Fields.property_line('Address Line 1')
    address_l2 = StringField('Address Line 2', [validators.Length(max=200, message=len_error_msg(max=200)), name_validator])
    city       = Fields.property_line('City')

    state      = StringField('State', [validators.Length(min=2, max=2, message=len_error_msg(fixed=2)),
                                        validators.DataRequired(message=required()),
                                        state_validator])
    zipcode    = IntegerField('Zipcode', [zipcode_validator,validators.InputRequired(message=required())])
    type       = StringField('Property Type', [validators.Length(max=50, message=len_error_msg(max=50)),
                                            validators.DataRequired(message=required())])
    beds       = DecimalField('Beds', [validators.InputRequired(message=required()),
                                        validators.NumberRange(min=0, message=int_error_msg(min=0)),
                                        decimal_validator])
    baths      = DecimalField('Baths', [validators.InputRequired(message=required()),
                                        validators.NumberRange(min=0, message=int_error_msg(min=0)),
                                        decimal_validator])
    for_rent   = BooleanField('For Rent', [rent_validator])
    rent_price   = IntegerField('Rental Price', [validators.NumberRange(min=0, message=int_error_msg(min=0))])
    for_sale   = BooleanField('For Sale', [sale_validator])
    sale_price  = IntegerField('Sale Price', [validators.NumberRange(min=0, message=int_error_msg(min=0))])


    area       = IntegerField('Area (sq ft)', [validators.NumberRange(min=0, message=int_error_msg(min=0)),
                                                validators.InputRequired(message=required())])
    notes      = StringField('Notes/Comments', [validators.Length(max=2000, message=len_error_msg(max=2000))], widget=TextArea())
