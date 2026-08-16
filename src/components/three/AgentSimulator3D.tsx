"use client";

import { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Sparkles, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";
import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer, viewportOnce } from "@/lib/motion";

type ActionIntent = {
  id: string;
  name: string;
  command: string;
  latency: string;
  nodesTargeted: number;
  memorySaved: string;
  statusText: string;
};

const sampleIntents: ActionIntent[] = [
  {
    id: "nav",
    name: "01 / Checkout Navigation",
    command: "wildinfra.resolve_intent('checkout_flow', { autofill: true })",
    latency: "0.19ms",
    nodesTargeted: 6,
    memorySaved: "99.4%",
    statusText: "ACTION_GRAPH_GENERATED -> 12 INTENT NODES RESOLVED",
  },
  {
    id: "extract",
    name: "02 / Schema Extraction",
    command: "wildinfra.extract_matrix('pricing_table', { format: 'parquet' })",
    latency: "0.14ms",
    nodesTargeted: 12,
    memorySaved: "99.8%",
    statusText: "SEMANTIC_TRANSFORM -> 14,000 ROWS STRUCTURED",
  },
  {
    id: "parallel",
    name: "03 / 50K Session Mesh",
    command: "wildinfra.spawn_mesh({ count: 50000, region: 'global_anycast' })",
    latency: "0.36ms",
    nodesTargeted: 64,
    memorySaved: "99.9%",
    statusText: "MESH_SCALED -> 50,000 STATELESS SANDBOXES ACTIVE",
  },
  {
    id: "auth",
    name: "04 / Session Isolation",
    command: "wildinfra.isolate_session({ token_persist: 'zero_leak_sandbox' })",
    latency: "0.11ms",
    nodesTargeted: 4,
    memorySaved: "100%",
    statusText: "CRYPTOGRAPHIC_ISOLATION_VERIFIED",
  },
];

function SimulatorMeshCanvas({ activeIntent }: { activeIntent: ActionIntent }) {
  const meshGroupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!meshGroupRef.current) return;
    const t = state.clock.getElapsedTime();
    meshGroupRef.current.rotation.y = t * 0.4;
    meshGroupRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
  });

  return (
    <group ref={meshGroupRef}>
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.65}
          emissive="#0284c7"
          emissiveIntensity={0.9}
        />
      </mesh>

      <Float speed={2.5} floatIntensity={0.5}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.65, 0.02, 16, 80]} />
          <meshStandardMaterial color="#34d399" emissive="#059669" emissiveIntensity={1} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, 0.4, 0]}>
          <torusGeometry args={[1.35, 0.015, 16, 60]} />
          <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={0.8} />
        </mesh>
      </Float>

      <Sparkles count={120} scale={[7, 7, 7]} size={2.5} color="#38bdf8" />
    </group>
  );
}

export function AgentSimulator3D() {
  const [selectedIntent, setSelectedIntent] = useState<ActionIntent>(sampleIntents[0]);
  const [logs, setLogs] = useState<string[]>([
    "[0.00ms] SYSTEM_INIT: wildinfra.runtime.v1 initialized across 500B cluster",
    "[0.08ms] SOCKET_READY: anycast routing connected",
    "[0.19ms] INTENT_EXECUTE: wildinfra.resolve_intent('checkout_flow')",
    "[SUCCESS] 6 intent nodes dispatched in 0.19ms (0% pixel paint)",
  ]);

  const handleRunIntent = (intent: ActionIntent) => {
    setSelectedIntent(intent);
    setLogs((prev) => [
      `[+${intent.latency}] DISPATCH: ${intent.command}`,
      `[STATUS] ${intent.statusText}`,
      `[SAVINGS] Memory overhead reduced by ${intent.memorySaved}`,
      ...prev.slice(0, 4),
    ]);
  };

  return (
    <section className="border-t border-white/10 bg-[#020408] py-28 sm:py-36">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpItem} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono text-xs tracking-wider text-emerald-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live Interactive Runtime Demo
            </span>
            <h2 className="font-display mt-5 text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              Simulate intent execution in 3D.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              Test how WildInfra translates declarative AI intents into zero-paint action graphs in real time.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* 3D Canvas Box */}
            <div className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-black shadow-2xl lg:col-span-6 sm:h-[440px]">
              <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 4.2], fov: 45 }}
                gl={{ antialias: true, alpha: false }}
              >
                <color attach="background" args={["#020408"]} />
                <ambientLight intensity={0.6} />
                <directionalLight position={[3, 5, 3]} intensity={1.5} color="#ffffff" />
                <pointLight position={[3, 4, 3]} intensity={1.8} color="#00f0ff" />
                <pointLight position={[-3, -3, 2]} intensity={1.2} color="#34d399" />
                <Stars radius={25} depth={15} count={400} factor={2} fade />
                <SimulatorMeshCanvas activeIntent={selectedIntent} />
              </Canvas>

              <div className="glass-panel absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl px-4 py-2.5 font-mono text-xs text-slate-300">
                <span>LATENCY: <strong className="text-emerald-400">{selectedIntent.latency}</strong></span>
                <span>NODES: <strong className="text-sky-400">{selectedIntent.nodesTargeted} NODES</strong></span>
                <span className="hidden sm:inline">MEM SAVED: <strong className="text-indigo-300">{selectedIntent.memorySaved}</strong></span>
              </div>
            </div>

            {/* Controls & Terminal Logs */}
            <div className="space-y-6 lg:col-span-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs font-semibold text-slate-400 uppercase">
                  <span>Choose Action Intent</span>
                  <span className="text-sky-400">Click to execute</span>
                </div>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {sampleIntents.map((intent) => {
                    const isSelected = selectedIntent.id === intent.id;
                    return (
                      <button
                        key={intent.id}
                        type="button"
                        onClick={() => handleRunIntent(intent)}
                        className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                          isSelected
                            ? "border-sky-400 bg-sky-500/15 text-white shadow-[0_0_25px_rgba(56,189,248,0.25)] scale-[1.02]"
                            : "border-white/10 bg-slate-950/80 text-slate-400 hover:border-white/20 hover:text-white hover:bg-slate-900/80"
                        }`}
                      >
                        <div className="font-display text-sm font-bold text-white">{intent.name}</div>
                        <div className="mt-1 flex items-center justify-between font-mono text-[11px]">
                          <span className="text-sky-400">{intent.latency}</span>
                          <span className="text-emerald-400">{intent.memorySaved} Saved</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Terminal Box */}
              <div className="rounded-2xl border border-white/10 bg-black/95 p-6 font-mono text-xs shadow-2xl">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="flex items-center gap-2 text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    WILDINFRA TELEMETRY ENGINE
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">STABLE_V1</span>
                </div>
                <div className="space-y-2 text-slate-300">
                  {logs.map((log, idx) => (
                    <div key={idx} className={idx === 0 ? "text-emerald-400 font-semibold" : "text-slate-400"}>
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

