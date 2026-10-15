import cv2
import numpy as np
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def jpeg(img):
    return cv2.imencode(".jpg", img)[1].tobytes()


def test_health_reports_opencv_5():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["opencv"].startswith("5.")


def test_static_scene_has_no_motion_and_moving_scene_does():
    still = np.full((240, 320, 3), 60, np.uint8)
    for _ in range(5):
        r = client.post("/v1/analyze", content=jpeg(still), headers={"X-Session-Id": "still"})
    assert r.json()["motion"] < 0.05
    for i in range(15):
        img = still.copy()
        x = 20 + i * 15
        cv2.rectangle(img, (x, 60), (x + 60, 200), (230, 230, 230), -1)
        r = client.post("/v1/analyze", content=jpeg(img), headers={"X-Session-Id": "moving"})
    body = r.json()
    assert body["motion"] > 0.05
    assert body["density"] > 0.01


def test_rejects_garbage():
    assert client.post("/v1/analyze", content=b"nope").status_code == 400


def test_cold_start_with_prev_frame_gets_motion_on_first_request():
    a = np.full((240, 320, 3), 60, np.uint8)
    b = a.copy()
    cv2.rectangle(a, (40, 60), (100, 200), (230, 230, 230), -1)
    cv2.rectangle(b, (70, 60), (130, 200), (230, 230, 230), -1)
    r = client.post("/v1/analyze", headers={"X-Session-Id": "cold-burst"},
                    files={"frame": ("f.jpg", jpeg(b), "image/jpeg"), "prev": ("p.jpg", jpeg(a), "image/jpeg")})
    body = r.json()
    assert r.status_code == 200
    assert body["warm"] is False
    assert body["motion"] > 0
    r2 = client.post("/v1/analyze", content=jpeg(a), headers={"X-Session-Id": "cold-burst"})
    assert r2.json()["warm"] is True


def test_cors_allows_vercel_preview_and_localhost():
    for origin in ("https://portfolio-git-x.vercel.app", "http://localhost:3000", "https://papagedon.com"):
        r = client.options("/v1/analyze", headers={"Origin": origin, "Access-Control-Request-Method": "POST"})
        assert r.headers.get("access-control-allow-origin") == origin
