import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Method } from "@/components/sections/method";
import { Proof } from "@/components/sections/proof";
import { Cta } from "@/components/sections/cta";
import { PageTransition } from "@/components/motion/page-transition";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Problem />
      <Method />
      <Proof />
      <Cta />
    </PageTransition>
  );
}
