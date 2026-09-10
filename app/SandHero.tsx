"use client";

import { useEffect, useRef } from "react";
import { SAND_SCRIPT } from "./hero-sand.script";

// Sand on the critical line. The page itself is the hero: white paper, dark
// grains, nothing written on it. The artifact's script is lifted in as-is so
// the cursor reaches the canvas and the lamp wanders on its own; it sizes to
// the viewport, so the section is exactly one screen.
export default function SandHero() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || canvas.dataset.started) return;
    canvas.dataset.started = "1";
    const script = document.createElement("script");
    script.textContent = SAND_SCRIPT;
    canvas.after(script);
  }, []);

  return (
    <section className="hero-sand" aria-label="Sand on the critical line">
      <canvas id="c" ref={ref} />
    </section>
  );
}
