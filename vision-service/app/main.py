"""PAPAGEDON Vision service: POST frames, get crowd metrics back.

Runs locally with uvicorn and on AWS Lambda (container image + Lambda Web Adapter).

Request, either:
  * raw JPEG body (Content-Type: image/jpeg), or
  * multipart/form-data with `frame` (current JPEG) and optional `prev` (previous JPEG).
Lambda is stateless across instances: per-session state (previous frame, MOG2
model) lives in the memory of a warm instance only. When a request lands on a
cold or different instance, `prev` seeds the state so optical flow still works
on that very request; background subtraction re-learns over the next frames.
The response says which happened: "warm": true/false.

Logs are one JSON line per request in CloudWatch Embedded Metric Format, so the
metrics appear under the PAPAGEDON/Vision namespace with no extra agent.
"""
from __future__ import annotations

import json
import os
import sys
import time
from collections import OrderedDict

import cv2
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from .crowd import CrowdState, decode_jpeg

MAX_BYTES = 512 * 1024
MAX_SESSIONS = 200
ALLOWED_ORIGINS = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "https://papagedon.com,https://www.papagedon.com").split(",") if o.strip()]
ALLOWED_ORIGIN_REGEX = os.getenv("ALLOWED_ORIGIN_REGEX", r"https://.*\.vercel\.app|http://localhost(:\d+)?|http://127\.0\.0\.1(:\d+)?")

app = FastAPI(title="PAPAGEDON Vision", version="1.0.0")
app.add_middleware(
    CORSMiddleware,  # handled here (not by the Function URL) so *.vercel.app previews can be allowed by regex
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=ALLOWED_ORIGIN_REGEX or None,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["Content-Type", "X-Session-Id"],
)
sessions: "OrderedDict[str, CrowdState]" = OrderedDict()


def emf(metrics: dict, **dims) -> None:
    print(json.dumps({
        "_aws": {
            "Timestamp": int(time.time() * 1000),
            "CloudWatchMetrics": [{
                "Namespace": "PAPAGEDON/Vision",
                "Dimensions": [["Service"]],
                "Metrics": [{"Name": k, "Unit": "Milliseconds" if k.endswith("Ms") else "None"} for k in metrics],
            }],
        },
        "Service": "vision",
        **metrics,
        **dims,
    }), file=sys.stdout, flush=True)


def session(sid: str) -> tuple[CrowdState, bool]:
    s = sessions.get(sid)
    warm = s is not None
    if s is None:
        s = sessions[sid] = CrowdState()
        if len(sessions) > MAX_SESSIONS:
            sessions.popitem(last=False)
    sessions.move_to_end(sid)
    return s, warm


@app.get("/health")
def health():
    return {"ok": True, "opencv": cv2.__version__, "sessions": len(sessions), "runtime": "lambda" if os.getenv("AWS_LAMBDA_FUNCTION_NAME") else "server"}


async def read_frames(request: Request) -> tuple[bytes, bytes | None]:
    ctype = request.headers.get("content-type", "")
    if ctype.startswith("multipart/form-data"):
        form = await request.form()
        frame, prev = form.get("frame"), form.get("prev")
        if frame is None or isinstance(frame, str):
            raise HTTPException(400, "multipart needs a `frame` file")
        f = await frame.read()
        p = await prev.read() if prev is not None and not isinstance(prev, str) else None
        return f, p
    return await request.body(), None


@app.post("/v1/analyze")
async def analyze(request: Request):
    t0 = time.perf_counter()
    body, prev = await read_frames(request)
    if not body or len(body) > MAX_BYTES or (prev and len(prev) > MAX_BYTES):
        raise HTTPException(413 if body else 400, "send JPEG frames, max 512 KB each")
    sid = (request.headers.get("x-session-id") or "default")[:64]
    try:
        frame = decode_jpeg(body)
        prev_img = decode_jpeg(prev) if prev else None
    except ValueError as e:
        raise HTTPException(400, str(e))
    state, warm = session(sid)
    if not warm and prev_img is not None:
        state.update(prev_img)  # cold start: seed previous frame + background
    out = state.update(frame)
    ms = (time.perf_counter() - t0) * 1000
    emf({"AnalyzeLatencyMs": round(ms, 2), "ColdSession": 0 if warm else 1, "Motion": out["motion"], "Density": out["density"], "CrowdEnergy": out["energy"]})
    return {**out, "warm": warm, "serverMs": round(ms, 2), "opencv": cv2.__version__}
