import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function Cta() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-ink-800 bg-ink-950/60 p-10 backdrop-blur-sm md:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gold/30 blur-[120px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-500/20 blur-[120px]"
            />

            <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <p className="eyebrow-gold">Premier contact</p>
                <h2 className="mt-4 text-display-lg text-ink-50">
                  Un audit de 45 minutes pour voir où vous perdez du signal.
                </h2>
                <p className="mt-5 max-w-xl text-base text-ink-200 leading-relaxed">
                  Revue de votre stack actuelle (GTM, Ads, GA4, CMP), trois pertes
                  prioritaires, et une estimation de l&apos;impact business. Zéro
                  jargon inutile, un document que vous pouvez partager en interne.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Button asChild variant="primary" size="lg">
                  <Link href="/contact">
                    Réserver un créneau
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
