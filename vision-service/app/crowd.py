"""Crowd-level metrics from video frames with OpenCV 5.

motion  : share of the frame moving, from dense Farneback optical flow
density : share of the frame that is foreground, from MOG2 background subtraction
energy  : crowd energy, from vertical "bounce" in the flow field plus how bursty
          motion has been over a rolling window
All three are 0..1 and smoothed with an exponential moving average.
Only these numbers leave this module. Frames are never written anywhere.
"""
from __future__ import annotations

from collections import deque
from dataclasses import dataclass, field

import cv2
import numpy as np

WIDTH, HEIGHT = 160, 120


@dataclass
class CrowdState:
    window: int = 30
    smoothing: float = 0.3
    prev: np.ndarray | None = None
    bg: cv2.BackgroundSubtractor = field(
        default_factory=lambda: cv2.createBackgroundSubtractorMOG2(history=300, varThreshold=25, detectShadows=False)
    )
    history: deque = field(default_factory=lambda: deque(maxlen=30))
    motion: float = 0.0
    density: float = 0.0
    energy: float = 0.0

    def update(self, frame_bgr: np.ndarray) -> dict:
        small = cv2.resize(frame_bgr, (WIDTH, HEIGHT), interpolation=cv2.INTER_AREA)
        gray = cv2.cvtColor(small, cv2.COLOR_BGR2GRAY)
        # Low light / strobes: equalise contrast and blur sensor noise before flow.
        gray = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(4, 4)).apply(gray)
        gray = cv2.GaussianBlur(gray, (5, 5), 0)

        fg = self.bg.apply(gray)
        fg = cv2.morphologyEx(fg, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
        density = float(np.count_nonzero(fg)) / fg.size

        if self.prev is None:
            self.prev = gray
            return self.snapshot()
        # A strobe or light cue shifts every pixel at once: skip that frame instead of reading it as motion.
        if abs(float(gray.mean()) - float(self.prev.mean())) > 25:
            self.prev = gray
            return self.snapshot()
        flow = cv2.calcOpticalFlowFarneback(self.prev, gray, None, 0.5, 3, 15, 3, 5, 1.2, 0)
        self.prev = gray
        mag = np.linalg.norm(flow, axis=2)
        moving = mag > 0.8
        motion = float(np.count_nonzero(moving)) / moving.size
        bounce = float(np.mean(np.abs(flow[..., 1][moving]))) if moving.any() else 0.0

        self.history.append(motion)
        h = np.asarray(self.history)
        burst = float(h.std()) if len(h) > 2 else 0.0
        energy = min(1.0, 0.6 * min(1.0, bounce / 4.0) + 2.5 * burst + 0.3 * motion)

        k = self.smoothing
        self.motion += (min(1.0, motion * 2.0) - self.motion) * k
        self.density += (min(1.0, density * 1.5) - self.density) * k
        self.energy += (energy - self.energy) * k
        return self.snapshot()

    def snapshot(self) -> dict:
        return {"motion": round(self.motion, 4), "density": round(self.density, 4), "energy": round(self.energy, 4)}


def decode_jpeg(data: bytes) -> np.ndarray:
    arr = np.frombuffer(data, dtype=np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("not a decodable image")
    return img
