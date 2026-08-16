import { Hero } from "@/components/Hero";
import { Benchmarks } from "@/components/Benchmarks";
import { Features } from "@/components/Features";
import { ArchitectureFlow } from "@/components/ArchitectureFlow";
import { Playground } from "@/components/Playground";
import { Boundaries } from "@/components/Boundaries";

export default function Home() {
  return (
    <>
      <Hero />
      <Benchmarks />
      <Features />
      <ArchitectureFlow />
      <Playground />
      <Boundaries />
    </>
  );
}


