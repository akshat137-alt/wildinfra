"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer, viewportOnce } from "@/lib/motion";

type UseCase = {
  id: string;
  title: string;
  command: string;
  code: string;
  response: string;
  latency: string;
  memory: string;
};

const useCases: UseCase[] = [
  {
    id: "checkout",
    title: "E-Commerce Checkout",
    command: "session.executeIntent({ intent: 'CHECKOUT_FLOW', autofill: true })",
    code: `const session = await wildinfra.spawnSession("https://store.example.com/cart");
const result = await session.executeIntent({
  intent: "CHECKOUT_FLOW",
  shippingTier: "EXPRESS",
  paymentMethod: "VAULT_TOKEN_4992"
});`,
    response: `{
  "status": "COMPLETED",
  "order_id": "ord_99a812bf",
  "total_charged": "$129.00",
  "steps_navigated": 3,
  "execution_time_ms": 14.8,
  "memory_used_kb": 1240,
  "pixels_rendered": 0
}`,
    latency: "14.8ms",
    memory: "1.2MB",
  },
  {
    id: "extract",
    title: "Table Data Extraction",
    command: "session.extractSchema({ selector: 'pricing_matrix', format: 'json' })",
    code: `const session = await wildinfra.spawnSession("https://cloud.vendor.com/pricing");
const matrix = await session.extractMatrix({
  target: "EC2_EQUIVALENT_PRICING",
  schema: { tier: "string", vcpu: "int", hourlyPrice: "float" }
});`,
    response: `{
  "status": "SUCCESS",
  "rows_extracted": 1420,
  "schema_confidence": 0.999,
  "data_preview": [
    { "tier": "c6i.large", "vcpu": 2, "hourlyPrice": 0.085 },
    { "tier": "c6i.2xlarge", "vcpu": 8, "hourlyPrice": 0.340 }
  ],
  "latency_ms": 6.2
}`,
    latency: "6.2ms",
    memory: "0.9MB",
  },
  {
    id: "auth",
    title: "Multi-Step Form Automation",
    command: "session.fillForm({ formId: 'kyc_verification', fields: userPayload })",
    code: `const session = await wildinfra.spawnSession("https://portal.bank.com/onboard");
await session.fillForm({
  fields: { legal_name: "Acme Corp", tax_id: "XX-XXXXXXX" },
  submitOnComplete: true
});`,
    response: `{
  "status": "KYC_SUBMITTED",
  "form_token": "tok_991823a",
  "confirmation_hash": "0x7f9a12c8e3",
  "validation_errors": 0,
  "latency_ms": 11.4
}`,
    latency: "11.4ms",
    memory: "1.1MB",
  },
];

export function Playground() {
  const [activeCase, setActiveCase] = useState<UseCase>(useCases[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [executed, setExecuted] = useState(true);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setExecuted(true);
    }, 400);
  };

  return (
    <section id="playground" className="border-t border-white/[0.08] bg-[#020408] py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpItem} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 font-mono text-xs text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Interactive API Sandbox
            </span>
            <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Test semantic execution in real time.
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-400">
              Select an agent workflow below and trigger a simulated session dispatch.
            </p>
          </motion.div>

          {/* Playground Container */}
          <div className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-black/60 p-4">
              <div className="flex items-center gap-2">
                {useCases.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setActiveCase(c);
                      handleRun();
                    }}
                    className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                      activeCase.id === c.id
                        ? "bg-white/15 text-white font-semibold"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleRun}
                disabled={isRunning}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-4 py-1.5 font-mono text-xs font-semibold text-black transition-colors disabled:opacity-50"
              >
                {isRunning ? "Executing..." : "▶ Run Intent"}
              </button>
            </div>

            {/* Editor & Response Stream */}
            <div className="grid grid-cols-1 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08] lg:grid-cols-12 font-mono text-xs">
              {/* SDK Request Code */}
              <div className="p-6 lg:col-span-6 bg-black/30 overflow-x-auto">
                <div className="text-zinc-500 mb-3 uppercase text-[10px] tracking-wider">
                  Agent SDK Dispatch Code
                </div>
                <pre className="text-zinc-300 leading-relaxed">
                  <code>{activeCase.code}</code>
                </pre>
              </div>

              {/* JSON Response Stream */}
              <div className="p-6 lg:col-span-6 bg-black/60 overflow-x-auto">
                <div className="flex items-center justify-between text-zinc-500 mb-3 uppercase text-[10px] tracking-wider">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Runtime Response Stream
                  </span>
                  <span className="text-emerald-400 font-semibold">{activeCase.latency}</span>
                </div>

                <pre className="text-zinc-200 text-[11px] leading-relaxed">
                  <code>{activeCase.response}</code>
                </pre>

                <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 text-[11px] text-zinc-400">
                  <span>Memory overhead: <strong className="text-white">{activeCase.memory}</strong></span>
                  <span>Isolation: <strong className="text-emerald-400">Cryptographic Ephemeral</strong></span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
