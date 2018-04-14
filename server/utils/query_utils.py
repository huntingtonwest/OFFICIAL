from datetime import datetime
import json
import decimal
from server.models.associations import Associations
from datetime import datetime
from pytz import timezone
import pytz

def comma_num(num):
    return "{:,}".format(int(num))

def pst_time(date):
    utc_dt = pytz.utc.localize(date)
    pst_tz = timezone('US/Pacific')
    pst_dt = pst_tz.normalize(utc_dt.astimezone(pst_tz))

    return "{} PST".format(pst_dt.strftime('%m/%d/%Y %H:%M'))

def pst_date(date):
    utc_dt = pytz.utc.localize(date)
    pst_tz = timezone('US/Pacific')
    pst_dt = pst_tz.normalize(utc_dt.astimezone(pst_tz))

    return "{}".format(pst_dt.strftime('%m/%d/%Y'))

def get_property_types():
        return ['apartment', 'condo', 'duplex']
def get_status_types():
	return ['Application Pending', 'Application Approved', 'Ready for move-in', 'Not Available', 'Ready On']

def get_associations():
    associations = Associations.query.all()

    acn_list = []
    for a in associations:
        acn_list.append({
            'acn_name':a.acn_name,
            'acn_loc':a.acn_loc
            })

    return acn_list

def get_associations_by_loc():
    associations = Associations.query.all()

    acn_list = {}
    for a in associations:
        if not a.acn_loc in acn_list:
            acn_list[a.acn_loc] = [{
                                'acn_loc':a.acn_name,
                                'acn_url':a.acn_url
                            }]
        else:
            acn_list[a.acn_loc].append({
                                'acn_loc':a.acn_name,
                                'acn_url':a.acn_url
                            })


    return acn_list


def serialize(object, classname):
    columns = classname.__table__.columns
    list = {}
    for c in columns:

        # print(type(getattr(object, c.key)))

        if isinstance(getattr(object, c.key), datetime):
            list[c.key] = (getattr(object,c.key)).isoformat()
        elif isinstance(getattr(object, c.key), decimal.Decimal):
            t = float(getattr(object,c.key))
            if t % 1 == 0:
                list[c.key] = int(t)
            else:
                list[c.key] = t

        else:
            # print(getattr(object, c.key))
            list[c.key] = getattr(object, c.key)
    # print(dir(self))
    # for c in self:
    #     print(c)
        # print(getattr(c, c.key))
    return list


def jinjaf_init(app):
    app.jinja_env.globals.update(pst_time = pst_time)
    app.jinja_env.globals.update(comma_num = comma_num)
