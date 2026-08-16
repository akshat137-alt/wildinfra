"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, Line, Sparkles, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Group, Mesh } from "three";

function PhotonBeam({
  start,
  end,
  speed = 1.2,
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
    progress.current = (progress.current + delta * speed * 0.7) % 1;
    const p = progress.current;
    meshRef.current.position.set(
      THREE.MathUtils.lerp(start[0], end[0], p),
      THREE.MathUtils.lerp(start[1], end[1], p),
      THREE.MathUtils.lerp(start[2], end[2], p)
    );
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.045, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function HyperCore() {
  const innerSphereRef = useRef<Mesh>(null);
  const outerGeodesicRef = useRef<Mesh>(null);
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);
  const ring3Ref = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y = -t * 0.3;
      innerSphereRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
    if (outerGeodesicRef.current) {
      outerGeodesicRef.current.rotation.y = t * 0.2;
      outerGeodesicRef.current.rotation.z = t * 0.1;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.25;
      ring1Ref.current.rotation.x = Math.PI / 2.3 + Math.sin(t * 0.1) * 0.08;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.35;
      ring2Ref.current.rotation.z = Math.PI / 3 + Math.cos(t * 0.15) * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.4;
      ring3Ref.current.rotation.y = Math.PI / 4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
      <group position={[1.4, 0.25, 0]}>
        {/* Glowing Center Nucleus */}
        <mesh>
          <sphereGeometry args={[0.48, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={1.2}
            roughness={0.05}
          />
        </mesh>

        {/* Inner Octahedron Lattice */}
        <mesh ref={innerSphereRef}>
          <octahedronGeometry args={[0.95, 2]} />
          <meshStandardMaterial
            color="#00f0ff"
            wireframe
            transparent
            opacity={0.65}
            emissive="#0284c7"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Outer Geodesic Sphere */}
        <mesh ref={outerGeodesicRef}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.3}
            emissive="#38bdf8"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Triple Concentric Cyber Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.05, 0.018, 16, 120]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={1}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        <mesh ref={ring2Ref}>
          <torusGeometry args={[1.75, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#059669"
            emissiveIntensity={0.9}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        <mesh ref={ring3Ref}>
          <torusGeometry args={[1.35, 0.009, 16, 80]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#4f46e5"
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

function GlobalMeshNetwork() {
  const groupRef = useRef<Group>(null);

  const { positions, links, photonBeams } = useMemo(() => {
    const count = 42;
    const positions: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const radius = 1.7 + (i % 7) * 0.4;
      const y = Math.sin(i * 0.8) * 1.5 + ((i % 5) - 2) * 0.25;
      positions.push([
        Math.cos(theta) * radius + 1.4,
        y + 0.25,
        Math.sin(theta) * radius * 0.9,
      ]);
    }

    const links: [number, number][] = [];
    const photonBeams: { start: [number, number, number]; end: [number, number, number]; speed: number; color: string }[] = [];

    for (let i = 0; i < count; i++) {
      const next = (i + 1) % count;
      const cross = (i + 6) % count;
      links.push([i, next]);
      links.push([i, cross]);

      if (i % 2 === 0) {
        photonBeams.push({
          start: positions[i],
          end: positions[next],
          speed: 1.1 + (i % 3) * 0.4,
          color: i % 4 === 0 ? "#00f0ff" : i % 6 === 0 ? "#34d399" : "#38bdf8",
        });
      }
    }

    return { positions, links, photonBeams };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.07;
  });

  return (
    <group ref={groupRef}>
      {links.map(([a, b], i) => (
        <Line
          key={`l-${i}`}
          points={[positions[a], positions[b]]}
          color={i % 3 === 0 ? "#38bdf8" : i % 5 === 0 ? "#34d399" : "#334155"}
          lineWidth={i % 3 === 0 ? 1.6 : 0.9}
          transparent
          opacity={i % 3 === 0 ? 0.7 : 0.25}
        />
      ))}

      {positions.map((pos, i) => (
        <mesh key={`n-${i}`} position={pos}>
          <sphereGeometry args={[i % 5 === 0 ? 0.075 : 0.045, 16, 16]} />
          <meshStandardMaterial
            color={i % 5 === 0 ? "#00f0ff" : "#cbd5e1"}
            emissive={i % 5 === 0 ? "#0284c7" : "#475569"}
            emissiveIntensity={i % 5 === 0 ? 1.2 : 0.4}
            roughness={0.15}
            metalness={0.85}
          />
        </mesh>
      ))}

      {photonBeams.map((p, i) => (
        <PhotonBeam key={`pb-${i}`} start={p.start} end={p.end} speed={p.speed} color={p.color} />
      ))}
    </group>
  );
}

function SceneRig() {
  const rigRef = useRef<Group>(null);

  useFrame((state) => {
    if (!rigRef.current) return;
    const targetX = state.pointer.x * 0.45;
    const targetY = state.pointer.y * 0.35;
    rigRef.current.rotation.y = THREE.MathUtils.lerp(
      rigRef.current.rotation.y,
      targetX * 0.6,
      0.05
    );
    rigRef.current.rotation.x = THREE.MathUtils.lerp(
      rigRef.current.rotation.x,
      -targetY * 0.45,
      0.05
    );
  });

  return (
    <group ref={rigRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 9, 5]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-4, 4, -2]} intensity={1.2} color="#00f0ff" />
      <pointLight position={[4, -3, 3]} intensity={1} color="#818cf8" />
      <pointLight position={[1.4, 0.25, 0]} intensity={2} color="#38bdf8" distance={6} />

      <HyperCore />
      <GlobalMeshNetwork />

      <Sparkles
        count={220}
        scale={[14, 9, 14]}
        size={3}
        speed={0.5}
        color="#38bdf8"
      />

      <Stars
        radius={55}
        depth={45}
        count={2000}
        factor={3.5}
        saturation={0}
        fade
        speed={0.5}
      />

      <Grid
        position={[0, -2.4, 0]}
        args={[36, 36]}
        cellSize={0.5}
        cellThickness={0.8}
        cellColor="#0f172a"
        sectionSize={2.5}
        sectionThickness={1.4}
        sectionColor="#0284c7"
        fadeDistance={20}
        fadeStrength={1.3}
        infiniteGrid
      />
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#020408]">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.8, 5.8], fov: 42, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#020408"]} />
        <fog attach="fog" args={["#020408", 8, 24]} />
        <SceneRig />
      </Canvas>

      {/* Modern gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020408] via-[#020408]/85 to-transparent lg:via-[#020408]/50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#020408] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020408]/95 to-transparent" />
    </div>
  );
}


