import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Benchmarks } from "@/components/Benchmarks";
import { UseCases } from "@/components/UseCases";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ArchitectureDiagram />
      <Benchmarks />
      <UseCases />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}




