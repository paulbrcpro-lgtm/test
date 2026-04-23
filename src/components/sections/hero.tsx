"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="container mx-auto">
        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          Conseil Google Ads · Tracking server-side · Consent Mode v2
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="mt-6 max-w-4xl text-display-2xl text-ink-900"
        >
          Vos campagnes Google Ads{" "}
          <span className="relative inline-block">
            <span className="relative z-10">méritent une donnée</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="absolute inset-x-0 bottom-1 h-[8px] bg-gold md:h-[10px]"
              aria-hidden="true"
            />
          </span>{" "}
          que Google a envie d&apos;optimiser.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-600 md:text-xl"
        >
          Tracking server-side, Consent Mode v2, enhanced et offline conversions,
          liaison CRM propre. Je construis l&apos;infrastructure de mesure qui
          nourrit correctement Smart Bidding — et je la branche à vos campagnes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button asChild variant="primary" size="lg">
            <Link href="/contact">
              Demander un audit gratuit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="link" size="lg">
            <Link href="/services">Voir les services</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid gap-8 border-t border-ink-200 pt-10 sm:grid-cols-3"
        >
          <HeroStat value="3,4×" label="ROAS moyen constaté après remise à plat du tracking" />
          <HeroStat value="−42 %" label="de CPA sur les campagnes Max Perf avec enhanced conversions" />
          <HeroStat value="100 %" label="conformité Consent Mode v2 avant date limite" />
        </motion.div>
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="number-display text-5xl text-ink-900 md:text-6xl">{value}</p>
      <p className="mt-3 max-w-xs text-sm text-ink-500 leading-relaxed">{label}</p>
    </div>
  );
}
