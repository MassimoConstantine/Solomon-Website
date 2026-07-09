"use client";

import { useEffect, useRef } from "react";

type Three = typeof import("three");

const SIDES = 7;
const R = 0.96; // stone circumradius (world units)
const STONE_Y = 0.26; // stone center height — keeps the ray fan inside the frame
// Step-cut rings from girdle rim to table rim, as fractions of R.
// Each ring steps inward and forward, mirrored on the back — the nested
// heptagons of the original artwork.
const RINGS = [
  { r: 1.0, z: 0.115 },
  { r: 0.8, z: 0.175 },
  { r: 0.615, z: 0.225 },
  { r: 0.45, z: 0.262 },
  { r: 0.3, z: 0.288 },
  { r: 0.175, z: 0.3 },
];
// Spectral fan leaving the culet; angle is radians from straight down,
// negative = left, matching the artwork's red→blue spread.
const RAYS = [
  { color: 0xff3326, angle: -0.4, len: 1.5 },
  { color: 0xff9420, angle: -0.2, len: 1.62 },
  { color: 0xffd84d, angle: -0.01, len: 1.68 },
  { color: 0x35d435, angle: 0.18, len: 1.62 },
  { color: 0x2f7bff, angle: 0.38, len: 1.5 },
];

function buildStoneGeometry(THREE: Three) {
  const pos: number[] = [];
  const tri = (a: number[], b: number[], c: number[]) =>
    pos.push(...a, ...b, ...c);
  const quad = (a: number[], b: number[], c: number[], d: number[]) => {
    tri(a, b, c);
    tri(a, c, d);
  };
  const pt = (r: number, k: number, z: number) => {
    const a = Math.PI / 2 + (k * 2 * Math.PI) / SIDES; // vertex up
    return [r * R * Math.cos(a), r * R * Math.sin(a), z * R];
  };
  const m = (p: number[]) => [p[0], p[1], -p[2]]; // mirror front → back

  for (let k = 0; k < SIDES; k++) {
    const g = RINGS[0].z;
    quad(pt(1, k + 1, g), pt(1, k, g), pt(1, k, -g), pt(1, k + 1, -g));

    for (let i = 0; i < RINGS.length - 1; i++) {
      const a = pt(RINGS[i].r, k, RINGS[i].z);
      const b = pt(RINGS[i].r, k + 1, RINGS[i].z);
      const c = pt(RINGS[i + 1].r, k + 1, RINGS[i + 1].z);
      const d = pt(RINGS[i + 1].r, k, RINGS[i + 1].z);
      quad(a, b, c, d);
      quad(m(a), m(d), m(c), m(b));
    }

    const last = RINGS[RINGS.length - 1];
    const o = [0, 0, last.z * R];
    tri(o, pt(last.r, k, last.z), pt(last.r, k + 1, last.z));
    tri(m(o), m(pt(last.r, k + 1, last.z)), m(pt(last.r, k, last.z)));
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.computeVertexNormals(); // non-indexed → flat facet normals
  return geo;
}

// Thin additive quad strip that fades out along its length; brightness lives
// in the vertex colors so material.color can scale the whole beam per-frame.
function buildBeam(
  THREE: Three,
  color: number,
  len: number,
  w0: number,
  w1: number
) {
  const rows = [
    { y: 0, w: w0, b: 1 },
    { y: -len * 0.45, w: w0 + (w1 - w0) * 0.45, b: 0.85 },
    { y: -len, w: w1, b: 0 },
  ];
  const c = new THREE.Color(color);
  const pos: number[] = [];
  const col: number[] = [];
  rows.forEach((row) => {
    pos.push(-row.w / 2, row.y, 0, row.w / 2, row.y, 0);
    col.push(c.r * row.b, c.g * row.b, c.b * row.b);
    col.push(c.r * row.b, c.g * row.b, c.b * row.b);
  });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  geo.setIndex([0, 2, 3, 0, 3, 1, 2, 4, 5, 2, 5, 3]);
  const mat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  return new THREE.Mesh(geo, mat);
}

// Jewelry-studio environment painted to an equirect canvas: a bright dome
// fading to a dark floor lights every facet with a smooth gradient, and
// soft white/black streaks give neighboring facets distinct flashes —
// a uniform room environment renders the stone flat gray.
function buildEnvTexture(THREE: Three) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 512;
  const g = c.getContext("2d")!;
  // bright dome that stays light through the horizon band — face-on facets
  // reflect the horizon behind the camera, so that band carries the look
  const dome = g.createLinearGradient(0, 0, 0, 512);
  // the stone refracts this dome, so it needs range to look like a stone at all
  // — but the floor is mid-grey, not black, which is what keeps it pale
  dome.addColorStop(0, "#ffffff");
  dome.addColorStop(0.4, "#e6e6e6");
  dome.addColorStop(0.6, "#9e9e9e");
  dome.addColorStop(1, "#4c4c4c");
  g.fillStyle = dome;
  g.fillRect(0, 0, 1024, 512);
  const rnd = (n: number) => {
    const x = Math.sin(n * 127.1) * 43758.5453;
    return x - Math.floor(x);
  };
  for (let i = 0; i < 30; i++) {
    const w = 30 + rnd(i + 67) * 120;
    const bright = rnd(i + 13) > 0.4;
    // dark streaks are grey rather than black — they give neighbouring facets
    // distinct flashes without stamping hard black wedges across them
    const col = bright ? "255,255,255" : "55,55,55";
    const alpha = bright ? 0.4 + rnd(i + 7) * 0.6 : 0.2 + rnd(i + 7) * 0.3;
    g.save();
    g.translate(rnd(i) * 1024, 120 + rnd(i + 31) * 190);
    g.rotate((rnd(i + 99) - 0.5) * 1.6);
    const streak = g.createLinearGradient(-w / 2, 0, w / 2, 0);
    streak.addColorStop(0, `rgba(${col},0)`);
    streak.addColorStop(0.5, `rgba(${col},${alpha})`);
    streak.addColorStop(1, `rgba(${col},0)`);
    g.fillStyle = streak;
    g.fillRect(-w / 2, -350, w, 700);
    g.restore();
  }
  // hot spots along the horizon for sharp white facet flashes
  for (let i = 0; i < 8; i++) {
    const r = 30 + rnd(i + 55) * 50;
    const x = rnd(i + 200) * 1024;
    const y = 210 + rnd(i + 230) * 90;
    const spot = g.createRadialGradient(x, y, 0, x, y, r);
    spot.addColorStop(0, "rgba(255,255,255,0.95)");
    spot.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = spot;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Four-point star glint drawn to a small canvas — the sparkle where the
// thread meets the stone and where the spectrum leaves the culet.
function glintTexture(THREE: Three) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  g.globalCompositeOperation = "lighter";
  const core = g.createRadialGradient(64, 64, 0, 64, 64, 18);
  core.addColorStop(0, "rgba(255,255,255,1)");
  core.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = core;
  g.beginPath();
  g.arc(64, 64, 18, 0, Math.PI * 2);
  g.fill();
  const spike = (len: number, half: number, rot: number) => {
    g.save();
    g.translate(64, 64);
    g.rotate(rot);
    const lg = g.createLinearGradient(-len, 0, len, 0);
    lg.addColorStop(0, "rgba(255,255,255,0)");
    lg.addColorStop(0.5, "rgba(255,255,255,0.95)");
    lg.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = lg;
    g.fillRect(-len, -half, len * 2, half * 2);
    g.restore();
  };
  spike(62, 1.3, 0);
  spike(62, 1.3, Math.PI / 2);
  spike(34, 1, Math.PI / 4);
  spike(34, 1, -Math.PI / 4);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function HeroDiamond() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId = 0;
    let cleanup: (() => void) | undefined;
    let disposed = false;

    import("three").then((THREE) => {
      if (disposed) return;

      const renderer = (() => {
        try {
          return new THREE.WebGLRenderer({ canvas, antialias: true });
        } catch {
          return null; // no WebGL — the fallback image underneath stays visible
        }
      })();
      if (!renderer) return;

      const sz = () => ({ w: canvas.clientWidth, h: canvas.clientHeight });
      let { w, h } = sz();
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
      renderer.setClearColor(0x0e0e0e, 1);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.38;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 50);
      camera.position.set(0, 0, 4.8);

      const pmrem = new THREE.PMREMGenerator(renderer);
      const srcTex = buildEnvTexture(THREE);
      const envTex = pmrem.fromEquirectangular(srcTex).texture;
      srcTex.dispose();
      scene.environment = envTex;
      pmrem.dispose();

      // tilt (hover lean) wraps pendant (drag spin) so the two don't fight
      const tilt = new THREE.Group();
      tilt.position.y = STONE_Y;
      scene.add(tilt);
      const pendant = new THREE.Group();
      tilt.add(pendant);

      const stoneGeo = buildStoneGeometry(THREE);
      const stoneMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        // keep the surface sharp — roughness on a transmissive material blurs
        // the refracted image and the stone reads as flat frosted grey
        roughness: 0.04,
        transmission: 1,
        // thin + low IOR keeps it see-through: less path length to tint the
        // transmitted light, less refraction folding the interior into a core
        thickness: 0.45,
        ior: 1.52,
        // no dispersion / iridescence — both split white light into the green
        // and purple fringes that broke the even, colourless look
        attenuationColor: 0xffffff,
        attenuationDistance: 4,
        envMapIntensity: 2.2,
        specularIntensity: 1,
      });
      const stone = new THREE.Mesh(stoneGeo, stoneMat);
      pendant.add(stone);

      const edgeGeo = new THREE.EdgesGeometry(stoneGeo, 5);
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.22,
      });
      pendant.add(new THREE.LineSegments(edgeGeo, edgeMat));

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
      dirLight.position.set(2.5, 4, 3);
      scene.add(dirLight);
      // sparkle light that orbits the stone while hovered
      const orbit = new THREE.PointLight(0xffffff, 0, 0, 2);
      scene.add(orbit);

      const thread = buildBeam(THREE, 0xffffff, 1.2, 0.005, 0.005);
      thread.geometry.rotateZ(Math.PI); // point it upward from the top vertex
      thread.position.set(0, STONE_Y + R, 0);
      scene.add(thread);

      const apothem = Math.cos(Math.PI / SIDES) * R;
      const culetY = STONE_Y - apothem;
      const rays = RAYS.map((spec) => {
        const beam = buildBeam(THREE, spec.color, spec.len, 0.006, 0.05);
        beam.rotation.z = spec.angle;
        beam.position.set(0, culetY + 0.01, -0.02);
        scene.add(beam);
        return beam;
      });

      const glintMap = glintTexture(THREE);
      const makeGlint = (x: number, y: number, z: number, s: number) => {
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: glintMap,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            depthTest: false,
            toneMapped: false,
          })
        );
        sprite.position.set(x, y, z);
        sprite.scale.setScalar(s);
        scene.add(sprite);
        return sprite;
      };
      const topGlint = makeGlint(0, STONE_Y + R, 0.18, 0.34);
      const culetGlint = makeGlint(0, culetY, 0.15, 0.17);

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // ---- interaction state ----
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      let dragging = false;
      let lastX = 0;
      let lastT = 0;
      let vel = 0; // px/ms, smoothed; carries the spin after release
      let rotY = 0;
      let hovTarget = 0;
      let hoverT = 0;
      let hoverNX = 0;
      let hoverNY = 0;
      let idleAmp = reduceMotion ? 0 : 1;
      let visible = true;
      let ready = false;

      const onPointerDown = (e: PointerEvent) => {
        dragging = true;
        lastX = e.clientX;
        lastT = performance.now();
        vel = 0;
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = "grabbing";
      };
      const onPointerMove = (e: PointerEvent) => {
        if (dragging) {
          const now = performance.now();
          const dx = e.clientX - lastX;
          rotY += dx * 0.006;
          vel = 0.6 * vel + 0.4 * (dx / Math.max(8, now - lastT));
          lastX = e.clientX;
          lastT = now;
          return;
        }
        const rect = canvas.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObject(stone, false).length > 0;
        hovTarget = hit ? 1 : 0;
        hoverNX = pointer.x;
        hoverNY = pointer.y;
        canvas.style.cursor = hit ? "grab" : "";
      };
      const endDrag = () => {
        dragging = false;
        canvas.style.cursor = "";
      };
      const onPointerLeave = () => {
        hovTarget = 0;
      };

      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerup", endDrag);
      canvas.addEventListener("pointercancel", endDrag);
      canvas.addEventListener("pointerleave", onPointerLeave);

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(canvas);

      let t = 0;
      let last = performance.now();

      const tick = () => {
        animId = requestAnimationFrame(tick);
        const now = performance.now();
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        if (!visible) return;
        t += dt;

        if (!dragging && vel !== 0) {
          rotY += vel * dt * 1000 * 0.006;
          vel *= Math.exp(-dt * 2.2);
          if (Math.abs(vel) < 0.0001) vel = 0;
        }

        hoverT += (hovTarget - hoverT) * Math.min(1, dt * 5);

        // gentle idle twist on the thread, fading out while interacted with
        const interacting = dragging || hovTarget > 0 || Math.abs(vel) > 0.02;
        idleAmp +=
          ((interacting || reduceMotion ? 0 : 1) - idleAmp) *
          Math.min(1, dt * 1.2);
        const sway = Math.sin(t * 0.35) * 0.16 * idleAmp;

        pendant.rotation.y = rotY + sway + hoverT * hoverNX * 0.1;
        const tiltX = hoverT * -(hoverNY - 0.16) * 0.12;
        tilt.rotation.x += (tiltX - tilt.rotation.x) * Math.min(1, dt * 4);

        stoneMat.envMapIntensity = 2.2 + 0.8 * hoverT;
        edgeMat.opacity = 0.22 + 0.12 * hoverT;
        orbit.intensity = reduceMotion ? 0 : 90 * hoverT;
        orbit.position.set(
          Math.cos(t * 1.6) * 2.4,
          0.8 + Math.sin(t * 1.1) * 1.3,
          2.0
        );

        // rays shimmer, brighten on hover, and flare while the stone spins
        const flare = 1 + Math.min(0.7, Math.abs(vel) * 1.5);
        rays.forEach((beam, i) => {
          const shimmer = reduceMotion
            ? 1
            : 0.86 + 0.14 * Math.sin(t * 1.2 + i * 1.7);
          (beam.material as InstanceType<typeof THREE.MeshBasicMaterial>).color.setScalar(
            shimmer * (1 + 0.5 * hoverT) * flare
          );
        });

        const pulse = reduceMotion ? 1 : 1 + 0.13 * Math.sin(t * 2.2);
        topGlint.scale.setScalar(0.34 * pulse * (1 + 0.3 * hoverT));
        culetGlint.scale.setScalar(
          0.17 *
            (reduceMotion ? 1 : 1 + 0.1 * Math.sin(t * 3.1 + 1)) *
            (1 + 0.5 * hoverT)
        );

        renderer.render(scene, camera);
        if (!ready) {
          ready = true;
          canvas.classList.add("ready");
        }
      };

      const onResize = () => {
        ({ w, h } = sz());
        renderer!.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);
      tick();

      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", onResize);
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", endDrag);
        canvas.removeEventListener("pointercancel", endDrag);
        canvas.removeEventListener("pointerleave", onPointerLeave);
        io.disconnect();
        scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
            obj.geometry.dispose();
            (obj.material as InstanceType<typeof THREE.Material>).dispose();
          }
          if (obj instanceof THREE.Sprite) obj.material.dispose();
        });
        glintMap.dispose();
        envTex.dispose();
        renderer!.dispose();
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className="diamond-stage">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/solomon-fractal.png" alt="Solomon" />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
