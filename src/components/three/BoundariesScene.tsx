"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function LegacyVisualStack() {
  const meshRef = useRef<Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    meshRef.current.rotation.y = t * 0.2;
  });

  return (
    <group position={[-1.2, 0, 0]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#f87171" wireframe transparent opacity={0.4} emissive="#dc2626" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function SemanticVectorRuntime() {
  const groupRef = useRef<Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.4;
  });

  return (
    <group position={[1.2, 0, 0]} ref={groupRef}>
      <Float speed={2} floatIntensity={0.5}>
        <mesh>
          <icosahedronGeometry args={[0.75, 1]} />
          <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.8} emissive="#0284c7" emissiveIntensity={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.05, 0.015, 16, 60]} />
          <meshStandardMaterial color="#34d399" emissive="#059669" emissiveIntensity={0.8} />
        </mesh>
      </Float>
    </group>
  );
}

export function BoundariesScene() {
  return (
    <div className="h-[260px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black sm:h-[320px]">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#020408"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 3]} intensity={1.2} />
        <pointLight position={[-3, 0, 2]} intensity={0.8} color="#ef4444" />
        <pointLight position={[3, 0, 2]} intensity={0.8} color="#38bdf8" />
        <LegacyVisualStack />
        <SemanticVectorRuntime />
      </Canvas>
    </div>
  );
}
