"use client";

import { useEffect, useRef } from "react";

export default function GeometryOfTruth() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let cleanup: (() => void) | undefined;

    import("three").then((THREE) => {
      const sz = () => ({ w: canvas.clientWidth, h: canvas.clientHeight });
      let { w, h } = sz();

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
      renderer.setClearColor(0xffffff, 1);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
      camera.position.set(0, 0.5, 9.5);
      camera.lookAt(0, 0, 0);

      const world = new THREE.Group();
      scene.add(world);

      function makePanel(positionX: number, shape: "sphere" | "cube") {
        const panel = new THREE.Group();
        panel.position.x = positionX;

        const outerEdges = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.BoxGeometry(2, 2, 2)),
          new THREE.LineBasicMaterial({ color: 0x111111 })
        );
        panel.add(outerEdges);

        const cornerGeo = new THREE.SphereGeometry(0.06, 16, 12);
        const cornerMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
        for (let x = -1; x <= 1; x += 2)
          for (let y = -1; y <= 1; y += 2)
            for (let z = -1; z <= 1; z += 2) {
              const c = new THREE.Mesh(cornerGeo, cornerMat);
              c.position.set(x, y, z);
              panel.add(c);
            }

        const innerGroup = new THREE.Group();
        panel.add(innerGroup);

        if (shape === "sphere") {
          const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(1, 96, 64),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
          );
          const wire = new THREE.LineSegments(
            new THREE.WireframeGeometry(new THREE.SphereGeometry(1, 36, 24)),
            new THREE.LineBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.18 })
          );
          innerGroup.add(mesh);
          innerGroup.add(wire);
        } else {
          const s = 0.998;
          const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(2 * s, 2 * s, 2 * s),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
          );
          const wire = new THREE.LineSegments(
            new THREE.WireframeGeometry(new THREE.BoxGeometry(2 * s, 2 * s, 2 * s, 8, 8, 8)),
            new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.22 })
          );
          innerGroup.add(mesh);
          innerGroup.add(wire);
        }

        return { panel, innerGroup };
      }

      const left = makePanel(-1.8, "sphere");
      const right = makePanel(1.8, "cube");
      world.add(left.panel);
      world.add(right.panel);

      let t = 0;
      let last = performance.now();

      function tick() {
        animId = requestAnimationFrame(tick);
        const now = performance.now();
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        t += dt;

        world.rotation.y = t * 0.12;
        world.rotation.x = 0.18 + Math.sin(t * 0.06) * 0.04;

        const cycleP = (t % 14) / 14;
        let scale: number;
        if (cycleP < 0.4) {
          const p = cycleP / 0.4;
          const e = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
          scale = 0.04 + e * 0.96;
        } else if (cycleP < 0.55) {
          scale = 1;
        } else if (cycleP < 0.95) {
          const p = (cycleP - 0.55) / 0.4;
          const e = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
          scale = 1 - e * 0.96;
        } else {
          scale = 0.04;
        }

        left.innerGroup.scale.setScalar(scale);
        right.innerGroup.scale.setScalar(scale);

        renderer.render(scene, camera);
      }

      const onResize = () => {
        const s = sz();
        renderer.setSize(s.w, s.h, false);
        camera.aspect = s.w / s.h;
        camera.updateProjectionMatrix();
      };

      window.addEventListener("resize", onResize);
      tick();

      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
      };
    });

    return () => cleanup?.();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="geometry-canvas"
      style={{ display: "block", width: "100%" }}
      aria-label="Two 3D diagrams. A wireframe cube represents the bounded domain of truth. On the left, a sphere (AI) grows inside it but cannot fill the corners. On the right, a cube (our system) grows inside it and fills it completely."
    />
  );
}
