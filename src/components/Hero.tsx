import { HeroBackground } from "@/components/hero/HeroBackground";
import { HeroContent } from "@/components/hero/HeroContent";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackground />
      <div className="mx-auto flex w-full max-w-5xl flex-col px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-32 lg:pt-40">
        <HeroContent />
      </div>
    </section>
  );
}
