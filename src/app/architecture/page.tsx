import type { Metadata } from "next";
import { ArchitectureView } from "@/components/ArchitectureView";

export const metadata: Metadata = {
  title: "Architecture - WildInfra",
  description: "Technical architecture specifications for WildInfra 500B agent execution layer.",
};

export default function ArchitecturePage() {
  return <ArchitectureView />;
}


