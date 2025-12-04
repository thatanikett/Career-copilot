# inside backend/bedrock_client.py — replace existing generate(...) with this function
import json
import boto3
from botocore.config import Config
import os

AWS_REGION = os.environ.get("AWS_REGION", "ap-south-1")
MODEL_ID = os.environ.get("BEDROCK_MODEL_ID")  # should be e.g. "amazon.titan-text-lite-v1"

_bedrock = boto3.client("bedrock-runtime", region_name=AWS_REGION, config=Config(retries={"max_attempts":3}))

def _format_for_model(prompt: str, model_id: str):
    if model_id and "anthropic" in model_id.lower():
        return "\n\nHuman: " + prompt.strip() + "\n\nAssistant:"
    return prompt

def generate(prompt: str, model_id: str | None = None, max_tokens: int = 128):
    """
    Robust generator:
    - For Titan models, try the minimal Titan payload first:
        { "inputText": "...", "textGenerationConfig": {"maxTokenCount": N} }
    - For Anthropic, wrap in Human/Assistant form.
    - Returns dict: on success -> {"ok":True, "model_id":..., "response": parsed-or-text}
      on failure -> {"error":"invoke_failed","details": "<raw exception/message>"}
    """
    model_id = model_id or MODEL_ID
    if not model_id:
        return {"error": "no_model_configured", "message": "Set BEDROCK_MODEL_ID env var (e.g. amazon.titan-text-lite-v1)"}

    # Small safety clamp for max tokens
    try:
        max_tokens = int(max_tokens)
    except Exception:
        max_tokens = 128
    if max_tokens < 1:
        max_tokens = 64
    if max_tokens > 4000:
        max_tokens = 4000

    # Choose payload based on model family
    try:
        if "titan" in model_id.lower():
            # Minimal Titan payload (most likely accepted)
            body = {
                "inputText": prompt,
                "textGenerationConfig": {
                    "maxTokenCount": max_tokens
                }
            }
            content_type = "application/json"
            body_bytes = json.dumps(body).encode("utf-8")

        else:
            # default/generic payload (works for many text models)
            formatted = _format_for_model(prompt, model_id)
            body = {"prompt": formatted, "max_tokens_to_sample": max_tokens}
            content_type = "application/json"
            body_bytes = json.dumps(body).encode("utf-8")

        resp = _bedrock.invoke_model(
            modelId=model_id,
            contentType=content_type,
            accept="application/json",
            body=body_bytes,
        )

        stream_body = resp.get("body")
        if hasattr(stream_body, "read"):
            raw_bytes = stream_body.read()
            # decode safely
            try:
                raw_text = raw_bytes.decode("utf-8")
            except Exception:
                raw_text = raw_bytes.decode("latin-1") if isinstance(raw_bytes, (bytes, bytearray)) else str(raw_bytes)

            # try JSON parse
            try:
                parsed = json.loads(raw_text)
                return {"ok": True, "model_id": model_id, "response": parsed}
            except Exception:
                # not JSON — return raw text in response_text
                return {"ok": True, "model_id": model_id, "response_text": raw_text}

        # No body present
        return {"error": "no_body", "raw": str(resp)}

    except Exception as e:
        # return helpful debug info (do NOT leak credentials)
        # If boto3 raised a botocore error, include the message text so we can see validation details.
        return {"error": "invoke_failed", "details": str(e)}

    """
    Robust generator:
    - For Titan models, try the minimal Titan payload first:
        { "inputText": "...", "textGenerationConfig": {"maxTokenCount": N} }
    - For Anthropic, wrap in Human/Assistant form.
    - Returns dict: on success -> {"ok":True, "model_id":..., "response": parsed-or-text}
      on failure -> {"error":"invoke_failed","details": "<raw exception/message>"}
    """
    model_id = model_id or MODEL_ID
    if not model_id:
        return {"error": "no_model_configured", "message": "Set BEDROCK_MODEL_ID env var (e.g. amazon.titan-text-lite-v1)"}

    # Small safety clamp for max tokens
    try:
        max_tokens = int(max_tokens)
    except Exception:
        max_tokens = 128
    if max_tokens < 1:
        max_tokens = 64
    if max_tokens > 1024:
        max_tokens = 1024

    # Choose payload based on model family
    try:
        if "titan" in model_id.lower():
            # Minimal Titan payload (most likely accepted)
            body = {
                "inputText": prompt,
                "textGenerationConfig": {
                    "maxTokenCount": max_tokens
                }
            }
            content_type = "application/json"
            body_bytes = json.dumps(body).encode("utf-8")

        else:
            # default/generic payload (works for many text models)
            formatted = _format_for_model(prompt, model_id)
            body = {"prompt": formatted, "max_tokens_to_sample": max_tokens}
            content_type = "application/json"
            body_bytes = json.dumps(body).encode("utf-8")

        resp = _bedrock.invoke_model(
            modelId=model_id,
            contentType=content_type,
            accept="application/json",
            body=body_bytes,
        )

        stream_body = resp.get("body")
        if hasattr(stream_body, "read"):
            raw_bytes = stream_body.read()
            # decode safely
            try:
                raw_text = raw_bytes.decode("utf-8")
            except Exception:
                raw_text = raw_bytes.decode("latin-1") if isinstance(raw_bytes, (bytes, bytearray)) else str(raw_bytes)

            # try JSON parse
            try:
                parsed = json.loads(raw_text)
                return {"ok": True, "model_id": model_id, "response": parsed}
            except Exception:
                # not JSON — return raw text in response_text
                return {"ok": True, "model_id": model_id, "response_text": raw_text}

        # No body present
        return {"error": "no_body", "raw": str(resp)}

    except Exception as e:
        # return helpful debug info (do NOT leak credentials)
        # If boto3 raised a botocore error, include the message text so we can see validation details.
        return {"error": "invoke_failed", "details": str(e)}
