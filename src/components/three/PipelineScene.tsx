"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Sparkles, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import type { Group, Mesh } from "three";

function TranslateStage() {
  const meshRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.35;
      meshRef.current.rotation.y = t * 0.45;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.5;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.5}>
      <group>
        <mesh ref={coreRef}>
          <dodecahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial
            color="#00f0ff"
            wireframe
            emissive="#0284c7"
            emissiveIntensity={1}
          />
        </mesh>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.6}
            emissive="#0284c7"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

function ExposeStage() {
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);
  const ring3Ref = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.35;
    if (ring2Ref.current) ring2Ref.current.rotation.x = -t * 0.4;
    if (ring3Ref.current) ring3Ref.current.rotation.y = t * 0.3;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.4}>
      <group>
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.4, 0.035, 16, 80]} />
          <meshStandardMaterial color="#34d399" emissive="#059669" emissiveIntensity={0.9} metalness={0.8} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.0, 0.025, 16, 60]} />
          <meshStandardMaterial color="#6ee7b7" emissive="#10b981" emissiveIntensity={0.7} metalness={0.8} />
        </mesh>
        <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[0.6, 0.02, 16, 40]} />
          <meshStandardMaterial color="#a7f3d0" emissive="#34d399" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

function ExecuteStage() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });

  const lines = [
    [[-1.8, -0.6, 0], [1.8, 0.6, 0]],
    [[-1.8, 0.6, 0.5], [1.8, -0.6, -0.5]],
    [[-1.8, 0, -0.6], [1.8, 0, 0.6]],
  ] as const;

  return (
    <group ref={groupRef}>
      {lines.map((pts, i) => (
        <Line key={i} points={pts as unknown as [number, number, number][]} color="#818cf8" lineWidth={2.5} />
      ))}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 3.2, 16]} />
        <meshStandardMaterial color="#6366f1" wireframe transparent opacity={0.6} emissive="#4338ca" emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
}

export function PipelineScene({ activeStage }: { activeStage: number }) {
  return (
    <div className="relative h-[340px] w-full overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-[#020408] shadow-[0_0_40px_rgba(0,0,0,0.8)] sm:h-[420px]">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#030712"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 4]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-3, -2, -2]} intensity={1} color="#38bdf8" />
        <pointLight position={[3, 2, 2]} intensity={1} color="#34d399" />

        <Sparkles count={70} scale={[6, 5, 6]} size={2} color="#38bdf8" />
        <Stars radius={25} depth={15} count={500} factor={2} fade />

        {activeStage === 0 && <TranslateStage />}
        {activeStage === 1 && <ExposeStage />}
        {activeStage === 2 && <ExecuteStage />}
      </Canvas>
    </div>
  );
}

