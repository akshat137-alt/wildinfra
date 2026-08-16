"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Line, OrbitControls, Sparkles } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import type { Group } from "three";

type NodeData = {
  id: string;
  name: string;
  pos: [number, number, number];
  color: string;
  type: string;
};

const nodes: NodeData[] = [
  { id: "parser", name: "Semantic Parser", pos: [0, 0.8, 0], color: "#38bdf8", type: "Core Engine" },
  { id: "ingest", name: "DOM Ingestion", pos: [-1.4, -0.2, 0.6], color: "#34d399", type: "Input Stream" },
  { id: "sandbox", name: "Stateless Mesh", pos: [1.4, -0.2, 0.6], color: "#818cf8", type: "Execution Sandbox" },
  { id: "protocol", name: "Protocol Exposer", pos: [0, -1.1, -0.4], color: "#f472b6", type: "API Protocol" },
  { id: "cache", name: "Intent Cache", pos: [-0.9, 0.6, -0.8], color: "#fbbf24", type: "Memory Tier" },
];

function InteractiveGraph() {
  const groupRef = useRef<Group>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });

  const links: [number, number][] = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 3],
    [2, 3],
  ];

  return (
    <group ref={groupRef}>
      {links.map(([a, b], i) => (
        <Line
          key={`l-${i}`}
          points={[nodes[a].pos, nodes[b].pos]}
          color="#334155"
          lineWidth={1.2}
          transparent
          opacity={0.6}
        />
      ))}

      {nodes.map((node) => {
        const isHovered = hoveredNode?.id === node.id;
        return (
          <group
            key={node.id}
            position={node.pos}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredNode(node);
            }}
            onPointerOut={() => setHoveredNode(null)}
          >
            <mesh>
              <sphereGeometry args={[isHovered ? 0.16 : 0.12, 32, 32]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isHovered ? 1 : 0.4}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Orbiting Ring */}
            <mesh rotation={[Math.PI / 4, 0, 0]}>
              <torusGeometry args={[isHovered ? 0.28 : 0.22, 0.008, 16, 40]} />
              <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.6} />
            </mesh>

            {/* Floating Label */}
            {isHovered && (
              <Html distanceFactor={10} position={[0, 0.35, 0]}>
                <div className="pointer-events-none rounded-lg border border-white/20 bg-black/90 px-3 py-1.5 backdrop-blur-md shadow-xl whitespace-nowrap">
                  <div className="font-mono text-[10px] font-bold tracking-wider text-sky-400 uppercase">
                    {node.type}
                  </div>
                  <div className="font-display text-xs font-semibold text-white">
                    {node.name}
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export function ArchitectureScene() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black sm:h-[420px]">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.4, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 4]} intensity={1.2} />
        <pointLight position={[-3, -2, -2]} intensity={0.8} color="#38bdf8" />
        <Sparkles count={80} scale={[8, 6, 8]} size={2} color="#38bdf8" />
        <InteractiveGraph />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}

