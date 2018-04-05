import re

#returns message for required field
def required():
    return 'This field is required.'

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
