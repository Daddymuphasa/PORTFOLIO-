"""Measure PAPAGEDON Vision latency and throughput on a video.

  python eval/evaluate.py --video eval/samples/crowd.mp4                 # in-process (OpenCV only)
  python eval/evaluate.py --video crowd.mp4 --url http://HOST:8080       # end-to-end over HTTP
  python eval/evaluate.py --synthetic                                    # no video needed

Writes eval/results/<timestamp>.json (+ .csv of per-frame metrics).
Optional: --s3 s3://bucket/prefix uploads the results with the AWS CLI.
"""
from __future__ import annotations

import argparse
import csv
import json
import statistics
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

import cv2
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from app.crowd import CrowdState  # noqa: E402


def frames_from_video(path: str, limit: int):
    cap = cv2.VideoCapture(path)
    if not cap.isOpened():
        raise SystemExit(f"cannot open {path}")
    n = 0
    while n < limit:
        ok, f = cap.read()
        if not ok:
            break
        n += 1
        yield f


def synthetic_frames(limit: int):
    """Dancing blobs on a dark floor: a stand-in crowd that ramps up then calms."""
    rng = np.random.default_rng(7)
    people = rng.uniform([0, 0], [320, 240], size=(25, 2))
    for i in range(limit):
        phase = np.sin(np.pi * i / limit)
        img = np.full((240, 320, 3), 25, np.uint8)
        people += rng.normal(0, 1 + 6 * phase, people.shape)
        people %= [320, 240]
        for x, y in people:
            bob = int(8 * phase * np.sin(i * 0.6 + x))
            cv2.circle(img, (int(x), int(y) + bob), 9, (180, 160, 140), -1)
        yield img


def post(url: str, jpeg: bytes, prev: bytes | None) -> dict:
    """Same request shape as the web app: multipart `frame` + previous frame `prev`."""
    boundary = "papagedonvision"
    parts = [("frame", jpeg)] + ([("prev", prev)] if prev else [])
    body = b"".join(
        (f"--{boundary}\r\nContent-Disposition: form-data; name=\"{n}\"; filename=\"{n}.jpg\"\r\n"
         "Content-Type: image/jpeg\r\n\r\n").encode() + data + b"\r\n" for n, data in parts
    ) + f"--{boundary}--\r\n".encode()
    req = urllib.request.Request(f"{url.rstrip('/')}/v1/analyze", data=body, method="POST",
                                 headers={"Content-Type": f"multipart/form-data; boundary={boundary}", "X-Session-Id": "eval"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def pct(xs, p):
    xs = sorted(xs)
    return xs[min(len(xs) - 1, int(round(p / 100 * (len(xs) - 1))))]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--video")
    ap.add_argument("--synthetic", action="store_true")
    ap.add_argument("--url", help="vision service base URL; omit to run in-process")
    ap.add_argument("--frames", type=int, default=600)
    ap.add_argument("--out", default=str(Path(__file__).parent / "results"))
    ap.add_argument("--s3")
    a = ap.parse_args()
    if not a.video and not a.synthetic:
        ap.error("give --video PATH or --synthetic")

    src = frames_from_video(a.video, a.frames) if a.video else synthetic_frames(a.frames)
    state = CrowdState()
    rows, lat = [], []
    prev = None
    cold = 0
    t_start = time.perf_counter()
    for i, frame in enumerate(src):
        small = cv2.resize(frame, (320, 240))
        jpeg = cv2.imencode(".jpg", small, [cv2.IMWRITE_JPEG_QUALITY, 70])[1].tobytes()
        t0 = time.perf_counter()
        if a.url:
            m = post(a.url, jpeg, prev)
            cold += 0 if m.get("warm", True) else 1
        else:
            m = state.update(cv2.imdecode(np.frombuffer(jpeg, np.uint8), cv2.IMREAD_COLOR))
        prev = jpeg
        ms = (time.perf_counter() - t0) * 1000
        lat.append(ms)
        rows.append({"frame": i, "latency_ms": round(ms, 2), "motion": m["motion"], "density": m["density"], "energy": m["energy"]})
    wall = time.perf_counter() - t_start
    if not lat:
        raise SystemExit("no frames read")

    summary = {
        "mode": "http" if a.url else "in-process",
        "source": a.video or "synthetic",
        "opencv": cv2.__version__,
        "frames": len(lat),
        "throughput_fps": round(len(lat) / wall, 1),
        "latency_ms": {"mean": round(statistics.mean(lat), 2), "p50": round(pct(lat, 50), 2),
                       "p95": round(pct(lat, 95), 2), "max": round(max(lat), 2)},
        "cold_sessions": cold,
        "metric_means": {k: round(statistics.mean(r[k] for r in rows), 4) for k in ("motion", "density", "energy")},
    }
    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    stamp = time.strftime("%Y%m%d-%H%M%S")
    (out / f"{stamp}.json").write_text(json.dumps(summary, indent=2))
    with open(out / f"{stamp}.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader()
        w.writerows(rows)
    print(json.dumps(summary, indent=2))
    if a.s3:
        for ext in ("json", "csv"):
            subprocess.run(["aws", "s3", "cp", str(out / f"{stamp}.{ext}"), f"{a.s3.rstrip('/')}/{stamp}.{ext}"], check=True)


if __name__ == "__main__":
    main()
