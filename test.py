import re
from server.models.associations import Associations
#makes sure phone numbers are valid
#makes sure the input association is valid
def association_validator(stri):
    name = stri
    associations = Associations.query.all()

    for a in associations:
        if (name.strip()).lower() == a.acn_name.lower():

            print('valid')


#isalpha
association_validator('Ash Street CommunityAssociation')
