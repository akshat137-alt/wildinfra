"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Ring, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import type { Group, Mesh } from "three";

function TranslateStage() {
  const meshRef = useRef<Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.4;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.7}
          emissive="#0284c7"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

function ExposeStage() {
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.4;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group>
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.3, 0.03, 16, 80]} />
          <meshStandardMaterial color="#34d399" emissive="#059669" emissiveIntensity={0.8} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.9, 0.02, 16, 60]} />
          <meshStandardMaterial color="#6ee7b7" emissive="#10b981" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

function ExecuteStage() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.6;
  });

  const lines = [
    [[-1.5, -0.5, 0], [1.5, 0.5, 0]],
    [[-1.5, 0.5, 0.4], [1.5, -0.5, -0.4]],
    [[-1.5, 0, -0.5], [1.5, 0, 0.5]],
  ] as const;

  return (
    <group ref={groupRef}>
      {lines.map((pts, i) => (
        <Line key={i} points={pts as unknown as [number, number, number][]} color="#818cf8" lineWidth={2} />
      ))}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 2.8, 16]} />
        <meshStandardMaterial color="#6366f1" wireframe transparent opacity={0.5} emissive="#4338ca" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

export function PipelineScene({ activeStage }: { activeStage: number }) {
  return (
    <div className="h-[320px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-950 to-black shadow-2xl sm:h-[400px]">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#030712"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 4]} intensity={1.2} />
        <pointLight position={[-3, -2, -2]} intensity={0.8} color="#38bdf8" />

        <Stars radius={30} depth={20} count={600} factor={2} fade />

        {activeStage === 0 && <TranslateStage />}
        {activeStage === 1 && <ExposeStage />}
        {activeStage === 2 && <ExecuteStage />}
      </Canvas>
    </div>
  );
}
