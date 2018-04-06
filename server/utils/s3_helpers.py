import boto3, botocore
from config import S3_KEY, S3_SECRET, S3_BUCKET
from server import app

s3 = boto3.client(
   "s3",
   aws_access_key_id=S3_KEY,
   aws_secret_access_key=S3_SECRET
)

def allowed_file(filename, allowed):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed \
           and len(filename.split('.')) == 2

def upload_file_to_s3(file, subfol, bucket_name, acl="public-read"):

    filename = '{}/{}'.format(subfol,file.filename)
    try:
        s3.upload_fileobj(
            file,
            bucket_name,
            filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        # print("Something Happened: ", e)
        return False

    return "{}/{}".format(app.config['S3_LOCATION'], filename)

def delete_file_from_s3(filename, subfol, bucket_name):

    filename = '{}/{}'.format(subfol, filename)

    try:
        s3.delete_object(
        Bucket=bucket_name,
        Key=filename)
    except Exception as e:
        # print(e)
        return False
    return True
