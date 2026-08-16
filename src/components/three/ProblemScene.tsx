"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function FragmentedDOMGrid() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.08;
  });

  const domBlocks: [number, number, number][] = [
    [-1.8, 0.8, -0.4],
    [-0.8, -0.6, 0.6],
    [0.2, 0.9, -0.8],
    [1.4, -0.7, 0.3],
    [1.8, 0.6, -0.2],
    [-1.2, -0.9, -0.5],
  ];

  return (
    <group ref={groupRef}>
      {domBlocks.map((pos, i) => (
        <Float key={i} speed={1.8 + i * 0.2} rotationIntensity={0.4} floatIntensity={0.5}>
          <mesh position={pos}>
            <boxGeometry args={[0.55 + (i % 3) * 0.2, 0.35 + (i % 2) * 0.15, 0.3]} />
            <meshStandardMaterial
              color="#ef4444"
              wireframe
              transparent
              opacity={0.35}
              emissive="#991b1b"
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>
      ))}

      {/* Streamlined Agent Vector Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.7, 0.01, 16, 80]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

export function ProblemScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 4, 3]} intensity={1} color="#f87171" />
        <pointLight position={[-3, -3, 2]} intensity={0.8} color="#38bdf8" />
        <FragmentedDOMGrid />
      </Canvas>
    </div>
  );
}
