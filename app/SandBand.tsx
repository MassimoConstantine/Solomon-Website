"use client";

import { useEffect, useRef } from "react";

// A section divider in the hero's own material: a band of grains gathered at
// the centre, thinning toward the ends so it never reaches the edge of the
// page. A few escape the gathering and drift outward, fading as they go.
//
// Same ink, same idea as the sand: nothing here loops on a scale a reader can
// see, and it sleeps while off screen.
export default function SandBand() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The band occupies the middle SPAN of the width; density falls off as a
    // gaussian inside it, so the ends dissolve rather than stop.
    const SPAN = 0.62;
    const ESCAPEES = 0.06;

    let w = 0;
    let h = 0;
    let raf = 0;
    let awake = true;
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let pv = new Float32Array(0);
    let pa = new Float32Array(0);
    let free = new Uint8Array(0);

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (!w) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const n = Math.round(w * 1.1);
      px = new Float32Array(n);
      py = new Float32Array(n);
      pv = new Float32Array(n);
      pa = new Float32Array(n);
      free = new Uint8Array(n);

      const half = (w * SPAN) / 2;
      for (let i = 0; i < n; i++) {
        // sum of three uniforms — grains crowd the middle of the band
        const g = (Math.random() + Math.random() + Math.random()) / 3 - 0.5;
        px[i] = w / 2 + g * 2 * half;
        py[i] = h / 2 + ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * h;
        const escapes = Math.random() < ESCAPEES;
        free[i] = escapes ? 1 : 0;
        pv[i] = escapes
          ? (px[i] < w / 2 ? -1 : 1) * (0.06 + Math.random() * 0.14)
          : (Math.random() - 0.5) * 0.06;
        pa[i] = 0.25 + Math.random() * 0.5;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const half = (w * SPAN) / 2;
      for (let i = 0; i < px.length; i++) {
        px[i] += pv[i];

        if (free[i]) {
          // an escapee runs out toward the edge, then is reborn in the gathering
          if (px[i] < -4 || px[i] > w + 4) {
            const g = (Math.random() + Math.random() + Math.random()) / 3 - 0.5;
            px[i] = w / 2 + g * 2 * half * 0.6;
            pv[i] = (px[i] < w / 2 ? -1 : 1) * (0.06 + Math.random() * 0.14);
          }
        } else {
          // gravity: the band pulls its own grains back toward the middle
          const off = (px[i] - w / 2) / half;
          pv[i] -= off * 0.00035;
          pv[i] *= 0.995;
        }

        // fade with distance from the centre, so the band has no hard end
        const d = Math.abs(px[i] - w / 2) / half;
        const fall = Math.exp(-d * d * 1.9);
        ctx.globalAlpha = pa[i] * fall;
        ctx.fillStyle = "#0F0F0F";
        ctx.fillRect(px[i], py[i], 1, 1);
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      draw();
      raf = window.requestAnimationFrame(loop);
    };

    // Off screen, the loop stops outright rather than idling. Six of these
    // running a no-op rAF each was real work for no picture.
    const start = () => {
      if (raf || reduce) return;
      raf = window.requestAnimationFrame(loop);
    };
    const stop = () => {
      if (!raf) return;
      window.cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([e]) => {
      awake = e.isIntersecting;
      if (awake) start();
      else stop();
    });
    io.observe(canvas);

    // Firefox fires resize continuously while a window is dragged; each one
    // here reallocates five typed arrays, so it is debounced.
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        size();
        if (awake) draw();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    size();
    draw();

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
      stop();
    };
  }, []);

  return <canvas className="sand-band" ref={ref} aria-hidden="true" />;
}
