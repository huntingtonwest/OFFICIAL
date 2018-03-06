from datetime import datetime
import json
import decimal
from server.models.associations import Associations




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