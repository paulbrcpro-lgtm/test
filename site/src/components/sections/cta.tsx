import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function Cta() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto">
        <Reveal>
          <div className="border border-ink-200 bg-background p-10 md:p-16">
            <div className="grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <p className="eyebrow">Premier contact</p>
                <h2 className="mt-4 text-display-lg text-ink-900">
                  Un audit de 45 minutes pour voir où vous perdez du signal.
                </h2>
                <p className="mt-5 max-w-xl text-base text-ink-600 leading-relaxed">
                  Revue de votre stack actuelle (GTM, Ads, GA4, CMP), trois pertes
                  prioritaires, et une estimation de l&apos;impact business. Zéro
                  jargon inutile, un document que vous pouvez partager en interne.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Button asChild variant="gold" size="lg">
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
