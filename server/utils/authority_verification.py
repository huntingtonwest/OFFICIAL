from functools import wraps
from flask_login import login_required, current_user
from flask import abort

def is_admin(test):
    @wraps(test)
    def decorated_view(*args, **kwargs):
        print('verifying {} as admin'.format(current_user.id))

        # if not current_user.is_admin:
        if not current_user.is_master:
        	abort(403)

        return test(*args,**kwargs)
    return decorated_view
