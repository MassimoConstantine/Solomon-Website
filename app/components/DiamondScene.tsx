"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Diamond() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  // Octagonal "table-cut" diamond silhouette via LatheGeometry rotated 8x.
  // Flat top (table) and flat bottom, trapezoidal crown/pavilion facets.
  const geometry = useMemo(() => {
    const points: THREE.Vector2[] = [
      new THREE.Vector2(0.0, 1.0),
      new THREE.Vector2(0.45, 1.0),   // flat top edge
      new THREE.Vector2(1.0, 0.35),   // crown to girdle
      new THREE.Vector2(1.0, 0.25),   // girdle band
      new THREE.Vector2(0.6, -0.65),  // pavilion narrows
      new THREE.Vector2(0.35, -1.0),  // flat bottom edge
      new THREE.Vector2(0.0, -1.0),
    ];
    const geom = new THREE.LatheGeometry(points, 8); // 8-fold facets
    geom.computeVertexNormals();
    return geom;
  }, []);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Slow autonomous Y-axis spin.
    mesh.rotation.y += delta * 0.12;

    // Gentle mouse parallax — small tilt on X.
    const targetX = -mouse.y * 0.08;
    mesh.rotation.x += (targetX - mesh.rotation.x) * 0.05;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={1.6}>
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.35}
        roughness={0.08}
        clearcoat={1}
        clearcoatRoughness={0.02}
        envMapIntensity={3.2}
        flatShading
      />
    </mesh>
  );
}

function ColoredRays() {
  const rays = useMemo(
    () => [
      { color: "#ff3838", angle: -0.36 },
      { color: "#ffb838", angle: -0.18 },
      { color: "#46d666", angle: 0 },
      { color: "#3884ff", angle: 0.18 },
      { color: "#a85cff", angle: 0.36 },
    ],
    []
  );

  return (
    <group position={[0, -2.6, 0]}>
      {rays.map((r, i) => (
        <mesh key={i} rotation={[0, 0, r.angle]} position={[0, -1.8, 0]}>
          <coneGeometry args={[0.05, 4.5, 12]} />
          <meshBasicMaterial color={r.color} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

export default function DiamondScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.6], fov: 32 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#0e0e0e"]} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} />
      <directionalLight position={[-5, 3, -2]} intensity={0.9} color="#bcd0ff" />
      <pointLight position={[0, 5, 3]} intensity={1.2} />
      <pointLight position={[-3, -2, 4]} intensity={0.6} color="#ffe1b0" />

      <Diamond />
      <ColoredRays />

      <Environment preset="city" />
    </Canvas>
  );
}
