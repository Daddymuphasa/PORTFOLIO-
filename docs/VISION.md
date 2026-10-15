# PAPAGEDON Vision (OpenCV AI Competition 2026, powered by AWS)

PAPAGEDON Vision is an agent that **sees the crowd, hears the music, and directs
the visuals live** at `papagedon.com/app`.

## Architecture

```mermaid
flowchart LR
  Cam[Camera] -->|160x120 frame, 10/s| Choice{NEXT_PUBLIC_VISION_SERVICE_URL set?}
  Choice -->|"yes: frame + previous frame (multipart, HTTPS)"| URL[Lambda Function URL]
  URL --> L["AWS Lambda container image (from ECR)<br/>Lambda Web Adapter -> FastAPI + OpenCV 5<br/>Farneback flow / MOG2 / CLAHE"]
  L -->|EMF logs| CW[(CloudWatch logs, metrics, alarms<br/>PAPAGEDON/Vision)]
  L -->|motion, density, energy, warm| Fuse
  Choice -->|no / service down| Browser[In-browser fallback<br/>frame diff + learned background]
  Browser --> Fuse
  Mic[Track / mic] --> Audio[AudioAnalyzer<br/>port of PAPAGEDON-CORE-] -->|A_t, beats, BPM| Fuse
  Fuse["fuse(): E_t = aV_t + (1-a)A_t<br/>ease when they disagree"] --> Dir[SceneDirector<br/>hysteresis + 8 s hold]
  Op[Operator override] --> Dir
  Dir --> Viz[9 original Three.js visualizers]
  Eval[eval/evaluate.py] -->|results JSON/CSV| S3[(S3)]
```

* **AWS services**: Amazon ECR (container image), AWS Lambda (container image + Function URL for
  HTTPS), Amazon CloudWatch (logs, Embedded Metric Format metrics, latency and error alarms),
  Amazon S3 (evaluation results). Defined in `vision-service/deploy/template.yaml` (CloudFormation).
* **Vision service** (`vision-service/`): OpenCV `5.0.0` (`opencv-python-headless==5.0.0.93`),
  FastAPI, run on Lambda through the AWS Lambda Web Adapter (same image runs locally with Docker).
  `POST /v1/analyze` takes multipart `frame` + optional `prev` JPEGs (or a raw JPEG body).
  Per session it keeps the previous frame and a MOG2 model:
  * motion: share of pixels with Farneback optical-flow magnitude > 0.8 px
  * density: share of foreground pixels from MOG2 (after a morphological open)
  * crowd energy: vertical "bounce" in the flow field + burstiness of motion over a 30-frame window
  * low light: CLAHE + Gaussian blur before flow; light cues/strobes (global brightness jump) are skipped
* **Fusion** (`lib/vision/fusion.ts`): `V_t = 0.45·motion + 0.25·density + 0.30·energy`,
  `E_t = αV_t + (1-α)A_t` (α default 0.4, slider in the UI). When `|V_t - A_t| > 0.35`
  the room energy is pulled toward the quieter signal, so loud music over a still crowd builds instead of peaking.
* **Director**: room energy picks one of the nine original visualizers, ordered calm→peak:
  Liquid Mirror, Wave Tunnel, Obsidian Bloom, Nano Hex Genesis, Armor Scales, Prism Shards,
  Circuit Matrix, Gilded Reactor, Electric Nexus. Hysteresis + an 8 s minimum hold stop flicker.
  Room energy also scales visual intensity (0.55× still room → 1.35× peak).
* **State on Lambda (honest version)**: Lambda instances are stateless and can be recycled or
  scaled out at any time. Session state (previous frame, MOG2 background) lives only in a warm
  instance's memory, keyed by `X-Session-Id`. Every request also carries the previous frame, so a
  cold or different instance still computes optical flow on its first request; the response
  reports `"warm": false` and CloudWatch counts `ColdSession`. Background subtraction (density)
  and the 30-frame energy window restart on a new instance and take ~1-3 s of frames to settle.
* **Fallbacks**: service unreachable 3× in a row → in-browser analysis, retrying the service every 30 s. The first call allows 15 s for a cold start. No camera / camera
  lost / no data for 1.5 s → audio-only. Operator can lock any scene (Manual or keys 1–9).

## Run locally

```bash
npm install && npm run dev                       # http://localhost:3000/app
cd vision-service && python -m venv .venv && . .venv/bin/activate
pip install -r requirements-dev.txt && pytest -q
uvicorn app.main:app --port 8080
# then NEXT_PUBLIC_VISION_SERVICE_URL=http://localhost:8080 npm run dev
# (for local use add ALLOWED_ORIGINS=http://localhost:3000 when starting uvicorn)
```

## Deploy to AWS (one command)

Needs AWS CLI v2 with credentials and Docker. Works in Linux/macOS shells and Windows Git Bash
(Docker Desktop).

```bash
AWS_REGION=us-east-1 ./vision-service/deploy/deploy.sh
```

What it does:
1. If the `papagedon-vision` stack is stuck in `ROLLBACK_COMPLETE` (failed first create), deletes it.
2. Creates the ECR repo if needed, builds the image with `--platform linux/amd64 --provenance=false`
   (Lambda needs a single-arch manifest) and pushes it.
3. Deploys `deploy/template.yaml`: Lambda function (container image, 1024 MB, 15 s timeout, x86_64),
   public Function URL (HTTPS; CORS answered by the app for papagedon.com, `*.vercel.app` and
   localhost), CloudWatch log group `/aws/lambda/papagedon-vision` with EMF metrics
   (`AnalyzeLatencyMs`, `ColdSession`, `Motion`, `Density`, `CrowdEnergy`), a p95 latency alarm and an
   error alarm, and a private, encrypted S3 bucket for evaluation results.
4. Points the function at the new image, prints the Function URL and calls `/health`.

Set the printed URL as `NEXT_PUBLIC_VISION_SERVICE_URL` on Vercel and redeploy the site.
Tear down: `aws cloudformation delete-stack --stack-name papagedon-vision` (empty the S3 bucket first),
then delete the ECR repo if you no longer need the images.

The Function URL is public (`AuthType: NONE`) so the browser can call it. It only returns aggregate
numbers, but anyone with the URL can invoke it; watch the CloudWatch metrics / AWS bill and add a
reserved-concurrency cap once the account's concurrency quota allows it.

## Evaluation

```bash
cd vision-service
python eval/evaluate.py --synthetic                                  # no video needed
python eval/evaluate.py --video crowd.mp4                            # in-process OpenCV
python eval/evaluate.py --video crowd.mp4 --url https://<function-url> # end-to-end over HTTPS
python eval/evaluate.py --video crowd.mp4 --s3 s3://<ResultsBucket>/eval
```

Writes `eval/results/<timestamp>.json` (throughput fps, latency mean/p50/p95/max,
metric means) and a per-frame CSV. Measured on the build box (not on AWS) with the
synthetic crowd, 320×240 JPEG frames, OpenCV 5.0.0:

| mode | frames | throughput | latency p50 | p95 |
|---|---|---|---|---|
| in-process | 300 | 182 fps | 5.1 ms | 5.7 ms |
| HTTP, localhost | 200 | 132 fps | 6.8 ms | 9.7 ms |

Re-run against the Lambda Function URL and with real venue footage before quoting numbers.

## Limitations

* Crowd energy comes from optical-flow statistics, not a pose model. OpenCV 5's
  wheels no longer ship the HOG people detector, so there is no people count yet;
  a DNN pose/person model (`cv2.dnn`) is the next step.
* Signals are tuned by hand on synthetic and small samples, not a labelled venue dataset.
* Lambda is stateless: session state only survives on a warm instance (see above). Cold starts
  add a few seconds to the first request.
* The browser fallback is a simpler frame-difference stand-in, not OpenCV.

## Responsible use

* Crowd-level numbers only. No face detection, recognition, tracking of individuals,
  or identity of any kind. Frames are processed in memory and never stored (not in S3, not in logs); CloudWatch
  receives only the aggregate numbers and latency.
* The camera is off until the operator turns it on, and the browser asks permission.
* Venues should tell guests a camera is used for lighting/visuals.
* The operator can override the agent at any time; the show never goes dark if the camera or service fails.
