#returns message for required field
def required():
    return 'This field is required.'


#makes sure that zipcode is 5 digits and is made up of numbers
def zipcode_check(form, field):

    message = 'Invalid zipcode'

    if len(field.data) != 5:
        raise ValidationError(message)

    try:
        int(field.data)
    except:
        raise ValidationError(message)


#makes sure the number is an integer or is in an increment of 0.5
def decimal_check(form, field, digits):
    message = '{} must be an integer or in increments of 0.5'.format(field.name)

    s = str(field.data)

    if '.' in s:
        if len(s) - s.index('.') - 1 != 1 or s[-1:] != '5':
            raise ValidationError(message)


#returns an error message for a string that doesnt follow length requirements
def len_error_msg(**kwargs):
    if 'max' in kwargs and 'min' in kwargs:
        return 'This field must be between {} and {} characters.'.format(kwargs['min'], kwargs['max'])
    elif 'min' in kwargs:
        return 'This field must be at least {} characters.'.format(kwargs['min'])
    elif 'max' in kwargs:
        return 'This field can only be a maximum of {} characters.'.format(kwargs['max'])
    elif 'fixed' in kwargs:
        return 'This field must be {} characters.'.format(kwargs['fixed'])
    else:
        return ''

#returns an error message for an integer that doesnt follow length requirements
def int_error_msg(**kwargs):
    if 'max' in kwargs and 'min' in kwargs:
        return 'This field must be between {} and {}.'.format(kwargs['min'], kwargs['max'])
    elif 'min' in kwargs:
        return 'This field must be at least {}.'.format(kwargs['min'])
    elif 'max' in kwargs:
        return 'This field can only be a maximum of {}.'.format(kwargs['max'])
    else:
        return ''