import re
from wtforms import ValidationError
from server.models.associations import Associations
#used when user is creating a password
def password_creation_validator(form, field):
    password = str(field.data)

    msg = 'You must have at least 1 capital letter and an approved special character in your password.'

    #check for a special char and a capital letter
    if re.search(r"[~!@#$%^&*()_+=\-|{}\[\]\"'<>,.?;`:]",password):
        if re.search(r"[A-Z]", password):
            return
    raise ValidationError(msg)

def all(form, field):
    raise ValidationError('tada')
#makes sure the number is an integer or is in an increment of 0.5
def decimal_validator(form, field):
    message = '{} must be an integer or in increments of 0.5'.format(field.name)
    s = str(field.data)

    if '.' in s:
        if len(s) - s.index('.') - 1 != 1 or s[-1:] != '5':
            raise ValidationError(message)

#makes sure that zipcode is 5 digits and is made up of numbers
def zipcode_validator(form, field):
    s = str(field.data)
    message = 'Please enter a valid zipcode.'

    if len(s) != 5:
        raise ValidationError(message)
    try:
        int(s)
    except:
        raise ValidationError(message)

#a name can only have alpabet values and periods
def name_validator(form, field):
    name = str(field.data)
    msg = 'Only alphabet characters and ";\'., are allowed.'
    if re.match(r"^[A-Za-z0-9 .'\";]*$", name):
        return
    raise ValidationError(msg)

#makes sure ids are numbers
def id_validator(form, field):
    try:
        int(field.data)
    except:
        raise ValidationError('Invalid input.')

#makes sure phone numbers are valid
def phone_number_validator(form, field):

    filtered_num = re.sub('-','',str(field.data))

    if re.match(r"^[0-9]*$", filtered_num):
        if not len(filtered_num) in [10,11]:
            msg = 'Please enter a valid phone number'
            raise ValidationError(msg)
    else:
        msg = 'Please use only numbers and dashes'
        raise ValidationError(msg)

    if len(filtered_num) == 10:
        country = 1
        area = filtered_num[:3]
        mid = filtered_num[3:6]
        end = filtered_num[6:]
    elif len(filtered_num) == 11:
        country = filtered_num[:1]
        area = filtered_num[1:4]
        mid = filtered_num[4:7]
        end = filtered_num[7:]

        new_num = '{}-{}-{}-{}'.format(country, area,mid,end)
        field.data=new_num

#make sure that state abbreviation input is valid
def state_validator(form, field):
    states = ["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]
    if not field.data in states:
        raise ValidationError('Invalid input.')

def association_add_validator(form, field):
    name = field.data
    associations = Associations.query.all()

    for a in associations:
        if (name.strip()).lower() == a.acn_name.lower():
            raise ValidationError('This association already exists!')

#makes sure the input association is valid
def association_validator(form, field):
    name = (field.strip()).lower()

    associations = Associations.query.all()

    for a in associations:
        if  name == a.acn_name.lower():
            # print(name)
            field.data = a.acn_name
            return

    raise ValidationError('Please enter a valid association')

def alphanumeric_validator(form, field):
    name = field.data
    msg = 'Only alphanumeric characters and .\'"; are allowed.'
    if re.match(r"^[A-Z a-z0-9.\-'\";]*$", name):
        return
    raise ValidationError(msg)

# if for_rent is true, there must be a rental price
def rent_validator(form, field):
    price = form._fields.get('rent_price')
    if field.data:
        if not price.data or price.data <= 0:
            raise ValidationError('You must input a rental price!')

# if for_sale is true, there must be a sale price
def sale_validator(form, field):
    price = form._fields.get('sale_price')
    if field.data:
        if not price.data or price.data <= 0:
            raise ValidationError('You must input a sale price!')
