"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  GoogleAdsLogo,
  GtmLogo,
  Ga4Logo,
  MetaLogo,
  SalesforceLogo,
  ConsentModeLogo,
} from "@/components/brand/logos";

const orbitLogos = [
  { Logo: GoogleAdsLogo, label: "Google Ads", angle: 0 },
  { Logo: GtmLogo, label: "GTM server", angle: 60 },
  { Logo: Ga4Logo, label: "GA4", angle: 120 },
  { Logo: MetaLogo, label: "Meta CAPI", angle: 180 },
  { Logo: SalesforceLogo, label: "CRM", angle: 240 },
  { Logo: ConsentModeLogo, label: "Consent v2", angle: 300 },
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-ink-800 bg-ink-900/60 px-4 py-1.5 backdrop-blur-xl"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
              <span className="eyebrow-gold">Disponible pour 2 missions en {new Date().getFullYear()}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="mt-8 text-display-2xl text-ink-50"
            >
              Vos campagnes Google Ads{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10 bg-gradient-to-b from-gold-300 to-gold bg-clip-text text-transparent">
                  méritent mieux
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                  className="absolute inset-x-0 -bottom-1 h-[3px] bg-gradient-to-r from-gold/0 via-gold to-gold/0"
                  aria-hidden="true"
                />
              </span>
              <br />
              qu&apos;un pixel qui fuit.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-200 md:text-xl"
            >
              Tracking server-side, Consent Mode v2, enhanced et offline
              conversions, liaison CRM propre. Je construis l&apos;infrastructure
              de mesure qui nourrit correctement Smart Bidding — et je la branche
              à vos campagnes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Button asChild variant="primary" size="lg">
                <Link href="/contact">
                  Audit gratuit
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">
                  <Sparkles className="h-4 w-4" />
                  Voir les services
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 flex items-center gap-4"
            >
              <p className="eyebrow shrink-0">Spécialisé sur</p>
              <div className="flex items-center gap-3">
                <GoogleAdsLogo size={22} className="opacity-80" />
                <GtmLogo size={22} className="opacity-80" />
                <Ga4Logo size={22} className="opacity-80" />
                <MetaLogo size={22} className="opacity-80" />
                <SalesforceLogo size={22} className="opacity-80" />
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto aspect-square w-full max-w-md"
            >
              <OrbitVisual orbitLogos={orbitLogos} reduceMotion={!!reduceMotion} />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-24 grid gap-8 border-t border-ink-800 pt-10 sm:grid-cols-3"
        >
          <HeroStat value="3,4×" label="ROAS moyen constaté après remise à plat du tracking" />
          <HeroStat value="−42 %" label="de CPA sur les campagnes Max Perf avec enhanced conversions" />
          <HeroStat value="100 %" label="conformité Consent Mode v2 sur les stacks auditées" />
        </motion.div>
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="number-display bg-gradient-to-b from-ink-50 to-ink-200 bg-clip-text text-5xl text-transparent md:text-6xl">
        {value}
      </p>
      <p className="mt-3 max-w-xs text-sm text-ink-200 leading-relaxed">{label}</p>
    </div>
  );
}

function OrbitVisual({
  orbitLogos,
  reduceMotion,
}: {
  orbitLogos: { Logo: (p: { size?: number; className?: string }) => React.JSX.Element; label: string; angle: number }[];
  reduceMotion: boolean;
}) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />

      <motion.div
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <div className="absolute inset-[12%] rounded-full border border-dashed border-ink-700" />
        <div className="absolute inset-[24%] rounded-full border border-dashed border-ink-700/70" />
        <div className="absolute inset-[36%] rounded-full border border-dashed border-ink-700/50" />
      </motion.div>

      <motion.div
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {orbitLogos.map(({ Logo, label, angle }, i) => {
          const radius = 42;
          const rad = (angle * Math.PI) / 180;
          const x = 50 + Math.cos(rad) * radius;
          const y = 50 + Math.sin(rad) * radius;
          return (
            <motion.div
              key={label}
              animate={reduceMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl border border-ink-700 bg-ink-900/80 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]"
                title={label}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Logo size={26} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-700 shadow-[0_0_60px_-10px_rgba(234,179,8,0.6)]">
          <span className="absolute inset-0 rounded-full bg-gold/40 blur-xl animate-pulse" aria-hidden="true" />
          <span className="relative font-sans text-3xl font-black text-ink-950">S</span>
        </div>
      </div>
    </div>
  );
}
