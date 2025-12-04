import boto3, os

s3 = boto3.client('s3', region_name=os.environ.get('AWS_REGION'))
BUCKET = os.environ.get('BUCKET_NAME') or "career.copilot.storage"

def upload_fileobj(fileobj, bucket, key):
    fileobj.seek(0)
    s3.upload_fileobj(fileobj, bucket, key)
    return f"s3://{bucket}/{key}"

def download_to_file(bucket, key, filename):
    s3.download_file(bucket, key, filename)
