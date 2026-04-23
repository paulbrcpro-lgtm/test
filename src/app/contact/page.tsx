import type { Metadata } from "next";
import { Mail, Clock, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { PageTransition } from "@/components/motion/page-transition";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — Demander un audit gratuit",
  description:
    "45 minutes pour diagnostiquer votre stack de tracking et pointer trois leviers d'amélioration chiffrés. Sans engagement.",
};

const reassurance = [
  {
    icon: Clock,
    title: "Réponse sous 24 heures",
    body: "Je lis chaque demande personnellement. Si elle colle, on cale un créneau rapidement.",
  },
  {
    icon: ShieldCheck,
    title: "Confidentialité",
    body: "Les informations partagées restent entre nous. Aucun log tiers, aucun partage commercial.",
  },
  {
    icon: Mail,
    title: "Contact direct",
    body: siteConfig.email,
  },
];

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="pt-16 pb-12 md:pt-20">
        <div className="container mx-auto">
          <Reveal>
            <p className="eyebrow-gold">Contact</p>
            <h1 className="mt-4 max-w-3xl text-display-2xl text-ink-50">
              Un diagnostic honnête en 45 minutes.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-200 leading-relaxed">
              Remplissez le formulaire ci-dessous. Je reviens vers vous avec un
              créneau et une préparation sommaire pour qu&apos;on ne perde pas
              le temps d&apos;une présentation générique.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <div className="space-y-8">
                  {reassurance.map((r) => (
                    <div key={r.title} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink-700 bg-ink-900/60 text-gold backdrop-blur-sm">
                        <r.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-ink-50">
                          {r.title}
                        </h3>
                        <p className="mt-1 text-sm text-ink-200 leading-relaxed">
                          {r.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-12 border-t border-ink-800 pt-10">
                  <p className="eyebrow-gold">Ce que vous recevez</p>
                  <ul className="mt-4 space-y-3 text-sm text-ink-100 leading-relaxed">
                    <li>— Un diagnostic écrit de votre stack actuelle (4 à 6 pages).</li>
                    <li>— Les trois pertes de signal prioritaires, chiffrées.</li>
                    <li>— Une estimation d&apos;impact business si elles sont traitées.</li>
                    <li>
                      — Une recommandation claire : mission avec moi, avec
                      quelqu&apos;un d&apos;autre, ou en interne.
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-7">
              <Reveal delay={0.1}>
                <div className="relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/40 p-8 backdrop-blur-sm md:p-10">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gold/20 blur-[100px]"
                  />
                  <div className="relative">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
