"""PAPAGEDON Vision service: POST a JPEG frame, get crowd metrics back.

Run:  uvicorn app.main:app --host 0.0.0.0 --port 8080
Logs are one JSON line per request in CloudWatch Embedded Metric Format, so when
the container logs to CloudWatch (awslogs driver) the metrics appear under the
PAPAGEDON/Vision namespace with no extra agent.
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
ALLOWED_ORIGIN_REGEX = os.getenv("ALLOWED_ORIGIN_REGEX", r"https://.*\.vercel\.app")

app = FastAPI(title="PAPAGEDON Vision", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
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


def session(sid: str) -> CrowdState:
    s = sessions.get(sid)
    if s is None:
        s = sessions[sid] = CrowdState()
        if len(sessions) > MAX_SESSIONS:
            sessions.popitem(last=False)
    sessions.move_to_end(sid)
    return s


@app.get("/health")
def health():
    return {"ok": True, "opencv": cv2.__version__, "sessions": len(sessions)}


@app.post("/v1/analyze")
async def analyze(request: Request):
    t0 = time.perf_counter()
    body = await request.body()
    if not body or len(body) > MAX_BYTES:
        raise HTTPException(413 if body else 400, "send one JPEG frame, max 512 KB")
    sid = (request.headers.get("x-session-id") or "default")[:64]
    try:
        frame = decode_jpeg(body)
    except ValueError as e:
        raise HTTPException(400, str(e))
    out = session(sid).update(frame)
    ms = (time.perf_counter() - t0) * 1000
    emf({"AnalyzeLatencyMs": round(ms, 2), "Motion": out["motion"], "Density": out["density"], "CrowdEnergy": out["energy"]})
    return {**out, "serverMs": round(ms, 2), "opencv": cv2.__version__}
