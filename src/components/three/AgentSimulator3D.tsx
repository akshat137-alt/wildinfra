"use client";

import { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer, viewportOnce } from "@/lib/motion";

type ActionIntent = {
  id: string;
  name: string;
  command: string;
  latency: string;
  nodesTargeted: number;
};

const sampleIntents: ActionIntent[] = [
  {
    id: "nav",
    name: "Semantic Navigation",
    command: "wildinfra.navigate('checkout_flow')",
    latency: "0.24ms",
    nodesTargeted: 4,
  },
  {
    id: "extract",
    name: "Structured Table Parse",
    command: "wildinfra.extract_schema('price_matrix')",
    latency: "0.18ms",
    nodesTargeted: 8,
  },
  {
    id: "parallel",
    name: "10K Parallel Sessions",
    command: "wildinfra.spawn_session_mesh(count=10000)",
    latency: "0.38ms",
    nodesTargeted: 16,
  },
];

function SimulatorMeshCanvas({ activeIntent }: { activeIntent: ActionIntent }) {
  const meshGroupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!meshGroupRef.current) return;
    const t = state.clock.getElapsedTime();
    meshGroupRef.current.rotation.y = t * 0.3;
    meshGroupRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
  });

  return (
    <group ref={meshGroupRef}>
      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.6}
          emissive="#0284c7"
          emissiveIntensity={0.8}
        />
      </mesh>

      <Float speed={3} floatIntensity={0.6}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.5, 0.02, 16, 60]} />
          <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={0.9} />
        </mesh>
      </Float>

      <Sparkles count={100} scale={[6, 6, 6]} size={3} color="#38bdf8" />
    </group>
  );
}

export function AgentSimulator3D() {
  const [selectedIntent, setSelectedIntent] = useState<ActionIntent>(sampleIntents[0]);
  const [logs, setLogs] = useState<string[]>([
    "[0.00ms] INITIALIZED wildinfra.v1 runtime",
    "[0.12ms] AGENT_SESSION_READY id=sess_99a8f",
  ]);

  const handleRunIntent = (intent: ActionIntent) => {
    setSelectedIntent(intent);
    setLogs((prev) => [
      `[+${intent.latency}] EXECUTE: ${intent.command}`,
      `[SUCCESS] ${intent.nodesTargeted} nodes dispatched`,
      ...prev.slice(0, 4),
    ]);
  };

  return (
    <section className="border-t border-white/10 bg-black py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpItem} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-emerald-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live Interactive Playground
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              Simulate intent execution in 3D space.
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              Test how WildInfra translates high-level agent intents into zero-paint action graph dispatches.
            </p>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* 3D Canvas Box */}
            <div className="relative h-[340px] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 lg:col-span-6 sm:h-[400px]">
              <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 4], fov: 45 }}
                gl={{ antialias: true, alpha: false }}
              >
                <color attach="background" args={["#030712"]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[3, 4, 3]} intensity={1.5} color="#38bdf8" />
                <SimulatorMeshCanvas activeIntent={selectedIntent} />
              </Canvas>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg border border-white/10 bg-black/80 px-4 py-2 backdrop-blur-md font-mono text-xs text-zinc-400">
                <span>LATENCY: <strong className="text-emerald-400">{selectedIntent.latency}</strong></span>
                <span>NODES: <strong className="text-sky-400">{selectedIntent.nodesTargeted} NODES</strong></span>
              </div>
            </div>

            {/* Controls & Terminal Logs */}
            <div className="space-y-6 lg:col-span-6">
              <div className="space-y-3">
                <div className="font-mono text-xs font-semibold text-zinc-400 uppercase">Select Agent Intent</div>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {sampleIntents.map((intent) => {
                    const isSelected = selectedIntent.id === intent.id;
                    return (
                      <button
                        key={intent.id}
                        type="button"
                        onClick={() => handleRunIntent(intent)}
                        className={`rounded-xl border px-4 py-3 text-left transition-all ${
                          isSelected
                            ? "border-sky-500 bg-sky-500/10 text-white shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                            : "border-white/10 bg-zinc-950 text-zinc-400 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <div className="font-display text-xs font-semibold">{intent.name}</div>
                        <div className="mt-1 font-mono text-[10px] text-sky-400">{intent.latency}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Terminal Box */}
              <div className="rounded-2xl border border-white/10 bg-black/90 p-5 font-mono text-xs">
                <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-zinc-500">RUNTIME EXECUTION LOG</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="space-y-2 text-zinc-300">
                  {logs.map((log, idx) => (
                    <div key={idx} className={idx === 0 ? "text-emerald-400 font-semibold" : "text-zinc-400"}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
