import boto3, os, time
tex = boto3.client('textract', region_name=os.environ.get('AWS_REGION'))

def start_text_detection(bucket, key):
    s3obj = {"S3Object": {"Bucket": bucket, "Name": key}}
    res = tex.start_document_text_detection(DocumentLocation=s3obj)
    return res['JobId']

def get_text_detection(job_id, wait=True, poll_interval=2):
    if not wait:
        return None
    while True:
        r = tex.get_document_text_detection(JobId=job_id)
        if r['JobStatus'] in ('SUCCEEDED','FAILED'):
            return r
        time.sleep(poll_interval)
