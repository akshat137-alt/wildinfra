"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, Line, Sparkles, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Group, Mesh } from "three";

function DataPacket({
  start,
  end,
  speed = 1,
  color = "#38bdf8",
}: {
  start: [number, number, number];
  end: [number, number, number];
  speed?: number;
  color?: string;
}) {
  const meshRef = useRef<Mesh>(null);
  const progress = useRef(Math.random());

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    progress.current = (progress.current + delta * speed * 0.5) % 1;
    const p = progress.current;
    meshRef.current.position.set(
      THREE.MathUtils.lerp(start[0], end[0], p),
      THREE.MathUtils.lerp(start[1], end[1], p),
      THREE.MathUtils.lerp(start[2], end[2], p)
    );
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.035, 12, 12]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function PlanetaryCore() {
  const outerCoreRef = useRef<Mesh>(null);
  const innerCoreRef = useRef<Mesh>(null);
  const haloRingRef = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerCoreRef.current) {
      outerCoreRef.current.rotation.y = t * 0.15;
      outerCoreRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = -t * 0.25;
      innerCoreRef.current.rotation.z = t * 0.08;
    }
    if (haloRingRef.current) {
      haloRingRef.current.rotation.z = t * 0.2;
      haloRingRef.current.rotation.x = Math.PI / 2.3 + Math.sin(t * 0.15) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={[1.2, 0.2, 0]}>
        <mesh ref={innerCoreRef}>
          <icosahedronGeometry args={[0.85, 2]} />
          <meshStandardMaterial
            color="#0ea5e9"
            wireframe
            transparent
            opacity={0.4}
            emissive="#0284c7"
            emissiveIntensity={0.6}
          />
        </mesh>

        <mesh ref={outerCoreRef}>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.2}
            emissive="#38bdf8"
            emissiveIntensity={0.3}
          />
        </mesh>

        <mesh ref={haloRingRef}>
          <torusGeometry args={[1.9, 0.015, 16, 120]} />
          <meshStandardMaterial
            color="#f4f4f5"
            emissive="#38bdf8"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={1}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

function AgentNetwork() {
  const groupRef = useRef<Group>(null);

  const { positions, links, packetPaths } = useMemo(() => {
    const count = 36;
    const positions: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const radius = 1.6 + (i % 6) * 0.4;
      const y = Math.sin(i * 0.85) * 1.3 + ((i % 4) - 1.5) * 0.3;
      positions.push([
        Math.cos(theta) * radius + 1.2,
        y + 0.2,
        Math.sin(theta) * radius * 0.85,
      ]);
    }

    const links: [number, number][] = [];
    const packetPaths: { start: [number, number, number]; end: [number, number, number]; speed: number }[] = [];

    for (let i = 0; i < count; i++) {
      const next = (i + 1) % count;
      const cross = (i + 5) % count;
      links.push([i, next]);
      links.push([i, cross]);

      if (i % 3 === 0) {
        packetPaths.push({
          start: positions[i],
          end: positions[next],
          speed: 0.8 + (i % 4) * 0.3,
        });
      }
    }

    return { positions, links, packetPaths };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.08;
  });

  return (
    <group ref={groupRef}>
      {links.map(([a, b], i) => (
        <Line
          key={`link-${i}`}
          points={[positions[a], positions[b]]}
          color={i % 4 === 0 ? "#38bdf8" : "#475569"}
          lineWidth={i % 4 === 0 ? 1.5 : 0.8}
          transparent
          opacity={i % 4 === 0 ? 0.65 : 0.3}
        />
      ))}

      {positions.map((pos, i) => (
        <mesh key={`node-${i}`} position={pos}>
          <sphereGeometry args={[i % 6 === 0 ? 0.065 : 0.04, 16, 16]} />
          <meshStandardMaterial
            color={i % 6 === 0 ? "#38bdf8" : "#e2e8f0"}
            emissive={i % 6 === 0 ? "#0284c7" : "#64748b"}
            emissiveIntensity={i % 6 === 0 ? 0.9 : 0.3}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}

      {packetPaths.map((p, i) => (
        <DataPacket key={`pkt-${i}`} start={p.start} end={p.end} speed={p.speed} />
      ))}
    </group>
  );
}

function SceneRig() {
  const cameraGroupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!cameraGroupRef.current) return;
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.3;
    cameraGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      cameraGroupRef.current.rotation.y,
      targetX * 0.5,
      0.05
    );
    cameraGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      cameraGroupRef.current.rotation.x,
      -targetY * 0.4,
      0.05
    );
  });

  return (
    <group ref={cameraGroupRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 4]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-4, 3, -2]} intensity={0.8} color="#38bdf8" />
      <pointLight position={[3, -2, 2]} intensity={0.6} color="#818cf8" />

      <PlanetaryCore />
      <AgentNetwork />

      <Sparkles
        count={150}
        scale={[12, 8, 12]}
        size={2.5}
        speed={0.4}
        color="#38bdf8"
      />

      <Stars
        radius={50}
        depth={40}
        count={1500}
        factor={3}
        saturation={0}
        fade
        speed={0.4}
      />

      <Grid
        position={[0, -2.2, 0]}
        args={[30, 30]}
        cellSize={0.5}
        cellThickness={0.8}
        cellColor="#1e293b"
        sectionSize={2.5}
        sectionThickness={1.2}
        sectionColor="#0284c7"
        fadeDistance={18}
        fadeStrength={1.2}
        infiniteGrid
      />
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 bg-black">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.8, 5.5], fov: 42, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#020408"]} />
        <fog attach="fog" args={["#020408", 7, 22]} />
        <SceneRig />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent lg:via-black/50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/90 to-transparent" />
    </div>
  );
}

