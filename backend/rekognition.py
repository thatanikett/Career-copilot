import boto3, os
rek = boto3.client('rekognition', region_name=os.environ.get('AWS_REGION'))

def compare_faces(bucket, source_key, target_key, similarity_threshold=85):
    source = {'S3Object': {'Bucket': bucket, 'Name': source_key}}
    target = {'S3Object': {'Bucket': bucket, 'Name': target_key}}
    resp = rek.compare_faces(SimilarityThreshold=70, SourceImage=source, TargetImage=target)
    matches = resp.get('FaceMatches', [])
    if not matches:
        return {"match": False, "reason": "no match", "similarity": 0}
    best = max(matches, key=lambda m: m['Similarity'])
    sim = best['Similarity']
    return {"match": sim >= similarity_threshold, "similarity": sim}
