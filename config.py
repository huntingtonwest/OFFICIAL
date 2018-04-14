import os

basedir = os.path.abspath(os.path.dirname(__file__))


S3_BUCKET                 = os.environ.get("S3_BUCKET_NAME")
PROPERTY_S3_BUCKET        = os.environ.get("PROPERTY_S3_BUCKET")
FILES_S3_BUCKET           = os.environ.get("FILES_S3_BUCKET")
ABOUT_S3_BUCKET           = os.environ.get("ABOUT_S3_BUCKET")
S3_KEY                    = os.environ.get("S3_ACCESS_KEY")
S3_SECRET                 = os.environ.get("S3_SECRET_ACCESS_KEY")
S3_LOCATION               = 'https://s3-us-west-1.amazonaws.com/{}'.format(S3_BUCKET)

MAIL_USERNAME             = os.environ.get("MAIL_USERNAME")
MAIL_PASSWORD             = os.environ.get("MAIL_PASSWORD")
MAIL_SERVER               = os.environ.get("MAIL_SERVER")




SECRET_KEY                = os.urandom(32)
SQLALCHEMY_DATABASE_URI   = os.environ.get('DATABASE_URL')
SQLALCHEMY_MIGRATE_REPO   = os.path.join(basedir, 'db_repository')


SQLALCHEMY_TRACK_MODIFICATIONS = False
MAIL_PORT = 465
MAIL_USE_SSL = True
MAIL_USE_TLS = False
MAX_CONTENT_LENGTH = 16 * 1024 * 1024

serializer_key  = os.urandom(32)
POSTS_PER_PAGE = 50
