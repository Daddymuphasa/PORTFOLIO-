"use client";

import { useEffect, useState } from "react";

const slides = [
  ["/astronomy.jpg", "Astronomy EP original cover art"],
  ["/astronomy-orbit.png", "Astronomy EP astronaut overlooking Earth"],
  ["/astronomy-window.png", "Astronomy EP astronaut at the spacecraft window"],
];

export default function AstronomySlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  return <div className="astronomy-slideshow" aria-label="Astronomy EP artwork slideshow">
    {slides.map(([src, alt], index) => <img key={src} src={src} alt={alt} className={index === active ? "is-active" : ""} />)}
    <div className="astronomy-slide-controls">
      {slides.map(([src], index) => <button key={src} type="button" onClick={() => setActive(index)} className={index === active ? "is-active" : ""} aria-label={`Show artwork ${index + 1}`} />)}
    </div>
  </div>;
}
