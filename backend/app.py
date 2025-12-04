import os
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3

from s3_utils import upload_fileobj, BUCKET
import rekognition
import textract_utils
import bedrock_client
from resume_pdf import generate_resume_pdf

from bedrock_client import generate as bedrock_generate



app = Flask(__name__)
CORS(app)

AWS_REGION = os.environ.get("AWS_REGION", "ap-south-1")
BUCKET = os.environ.get("BUCKET_NAME", "career.copilot.storage")

# DynamoDB init
dynamodb = boto3.resource("dynamodb", region_name=AWS_REGION)
table = dynamodb.Table(os.environ.get("DDB_TABLE", "Users"))


# --------------------------------------------------------------
# REGISTER
# --------------------------------------------------------------
@app.route("/register", methods=["POST"])
def register():
    user_id = request.form.get("user_id") or str(uuid.uuid4())
    f = request.files.get("image")

    if not f:
        return jsonify({"error": "no image"}), 400

    key = f"users/{user_id}/ref.jpg"
    upload_fileobj(f, BUCKET, key)

    table.put_item(Item={"userId": user_id, "ref_key": key})

    return jsonify({"status": "ok", "userId": user_id, "ref_key": key})


# --------------------------------------------------------------
# LOGIN (FACE MATCH)
# --------------------------------------------------------------
@app.route("/login", methods=["POST"])
def login():
    user_id = request.form.get("user_id")
    selfie = request.files.get("selfie")

    if not user_id or not selfie:
        return jsonify({"error": "missing"}), 400

    tmp_key = f"tmp/{user_id}_selfie_{uuid.uuid4().hex}.jpg"
    upload_fileobj(selfie, BUCKET, tmp_key)

    # Get reference image from DynamoDB
    resp = table.get_item(Key={"userId": user_id})
    if "Item" not in resp:
        return jsonify({"error": "user not found"}), 404

    ref_key = resp["Item"]["ref_key"]

    result = rekognition.compare_faces(
        BUCKET,
        tmp_key,
        ref_key
    )

    return jsonify(result)


# --------------------------------------------------------------
# INTERVIEW GENERATION (Bedrock or Stub)
# --------------------------------------------------------------
@app.route("/generate_interview", methods=["POST"])
def generate_interview():
    data = request.get_json() or {}
    company = data.get("company", "Acme")
    role = data.get("role", "SDE")
    prompt = f"Generate 10 interview questions and concise answers for the role {role} at the company {company} in JSON array form."

    resp = bedrock_generate(prompt, model_id=data.get("model_id"), max_tokens=256)

    # Normalize response shape for frontend:
    if resp.get("ok"):
        # if response_text present, return it; else return parsed response
        if "response" in resp:
            return jsonify({"ok": True, "model_id": resp.get("model_id"), "response": resp["response"]})
        else:
            return jsonify({"ok": True, "model_id": resp.get("model_id"), "response_text": resp.get("response_text")})
    else:
        return jsonify(resp), 500
# --------------------------------------------------------------
# RESUME CREATION (FULL DATA)
# --------------------------------------------------------------
@app.route("/resume", methods=["POST"])
def create_resume():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "invalid JSON"}), 400

        user_id = data.get("user_id", "anon")

        # Generate PDF via ReportLab
        pdf_buffer = generate_resume_pdf(data)

        key = f"users/{user_id}/resume_{uuid.uuid4().hex}.pdf"
        upload_fileobj(pdf_buffer, BUCKET, key)

        return jsonify({
            "status": "ok",
            "s3_key": key,
            "s3_url": f"s3://{BUCKET}/{key}"
        })

    except Exception as e:
        return jsonify({"error": "resume_generation_failed", "details": str(e)}), 500


# --------------------------------------------------------------
# DOCUMENT VERIFICATION (Textract)
# --------------------------------------------------------------
@app.route("/verify", methods=["POST"])
def verify_doc():
    try:
        user_id = request.form.get("user_id")
        f = request.files.get("file")

        if not user_id:
            return jsonify({"error": "missing user_id"}), 400

        if not f:
            return jsonify({"error": "no file uploaded"}), 400

        key = f"users/{user_id}/docs/{uuid.uuid4().hex}_{f.filename}"
        upload_fileobj(f, BUCKET, key)

        job_id = textract_utils.start_text_detection(BUCKET, key)
        result = textract_utils.get_text_detection(job_id)

        lines = []
        for block in result.get("Blocks", []):
            if block.get("BlockType") == "LINE":
                lines.append(block.get("Text"))

        extracted = "\n".join(lines)

        return jsonify({
            "status": "succeeded",
            "job_id": job_id,
            "extracted_text": extracted[:5000]
        })

    except Exception as exc:
        return jsonify({
            "error": "textract_failure",
            "details": str(exc)
        }), 500

# PRESIGN DOWNLOAD URL - returns a short-lived signed URL for a resume PDF
@app.route("/presign", methods=["POST"])
def presign():
    """
    Expects JSON: { "s3_key": "<s3 key>", "user_id": "<user id - optional but recommended>" }
    Returns: { "url": "<presigned-url>" }
    """
    try:
        data = request.get_json(force=True)
        if not data or "s3_key" not in data:
            return jsonify({"error": "missing s3_key"}), 400

        s3_key = data["s3_key"]
        user_id = data.get("user_id")

        # simple safety check: if user_id provided, ensure key belongs to that user
        if user_id and not s3_key.startswith(f"users/{user_id}/"):
            return jsonify({"error": "s3_key does not belong to user"}), 403

        s3_client = boto3.client("s3", region_name=AWS_REGION)

        url = s3_client.generate_presigned_url(
            "get_object",
            Params={"Bucket": BUCKET, "Key": s3_key},
            ExpiresIn=3600,  # link valid for 1 hour
        )
        return jsonify({"url": url})
    except Exception as e:
        return jsonify({"error": "presign_failed", "details": str(e)}), 500


# --------------------------------------------------------------
# MAIN
# --------------------------------------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
