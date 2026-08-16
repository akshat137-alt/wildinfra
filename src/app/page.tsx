import { Architecture } from "@/components/Architecture";
import { Boundaries } from "@/components/Boundaries";
import { CoreFunctions } from "@/components/CoreFunctions";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { AgentSimulator3D } from "@/components/three/AgentSimulator3D";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <CoreFunctions />
      <Architecture />
      <AgentSimulator3D />
      <Boundaries />
    </>
  );
}

