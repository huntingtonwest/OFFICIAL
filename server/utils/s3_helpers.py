# import boto3, botocore
# from config import S3_KEY, S3_SECRET, S3_BUCKET
# from server import app
#
# s3 = boto3.client(
#    "s3",
#    aws_access_key_id=S3_KEY,
#    aws_secret_access_key=S3_SECRET
# )
#
# ALLOWED_EXTENSIONS = ['png','jpg']
# def allowed_file(filename):
#     return '.' in filename and \
#            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
# def upload_file_to_s3(file, subfol, bucket_name, acl="public-read"):
#
#     """
#     Docs: http://boto3.readthedocs.io/en/latest/guide/s3.html
#     """
#     filename = '{}/{}'.format(subfol,file.filename)
#     try:
#
#         s3.upload_fileobj(
#             file,
#             bucket_name,
#             filename,
#             ExtraArgs={
#                 "ACL": acl,
#                 "ContentType": file.content_type
#             }
#         )
#
#     except Exception as e:
#         print("Something Happened: ", e)
#         return False
#
#     return True
