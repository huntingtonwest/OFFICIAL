
#!flask/bin/python
from migrate.versioning import api
#from dev_config import SQLALCHEMY_DATABASE_URI
#from dev_config import SQLALCHEMY_MIGRATE_REPO
from server import db
import os.path
db.reflect()
db.drop_all()

# if not os.path.exists(SQLALCHEMY_MIGRATE_REPO):
#     api.create(SQLALCHEMY_MIGRATE_REPO, 'database repository')
#     api.version_control(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO)
# else:
#     api.version_control(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO, api.version(SQLALCHEMY_MIGRATE_REPO))
