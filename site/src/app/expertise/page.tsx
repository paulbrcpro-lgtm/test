import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { PageTransition } from "@/components/motion/page-transition";
import { SgtmDiagram } from "@/components/sections/sgtm-diagram";

export const metadata: Metadata = {
  title: "Expertise — Stack, architecture et cas clients",
  description:
    "La stack technique, l'architecture d'un conteneur sGTM, et trois cas clients chiffrés. L'expertise qui sous-tend chaque mission.",
};

const stack = [
  {
    category: "Tracking & mesure",
    items: [
      "Google Tag Manager web & server",
      "Google Cloud Run, Stape",
      "GA4 (Measurement Protocol)",
      "Meta Conversions API",
      "Server-side Pixel & event-matching",
    ],
  },
  {
    category: "Campagnes Ads",
    items: [
      "Google Ads (Search, Perf Max, Demand Gen)",
      "Smart Bidding, Target CPA / ROAS",
      "Enhanced conversions & offline conversions",
      "Ads API, Ads Data Manager",
      "Meta Ads, LinkedIn Ads (stratégie)",
    ],
  },
  {
    category: "Consent & conformité",
    items: [
      "Consent Mode v2 (mode basique & avancé)",
      "Didomi, Axeptio, OneTrust, custom CMP",
      "Anonymisation IP, URL passthrough",
      "Conformité RGPD, recommandations CNIL",
      "Documentation pour DPO",
    ],
  },
  {
    category: "Données & pilotage",
    items: [
      "BigQuery (export GA4, Ads Data Hub)",
      "Looker Studio (dashboards clients)",
      "Salesforce, HubSpot, Pipedrive",
      "Zapier, Make, n8n (branchement CRM)",
      "SQL, dbt (modélisation simple)",
    ],
  },
];

const credentials = [
  { value: "7 ans", label: "d'exercice sur Google Ads" },
  { value: "> 60", label: "missions de tracking menées" },
  { value: "9M€+", label: "de budget media piloté sur 12 mois" },
  { value: "3 fois", label: "reconnu Google Partner Premier" },
];

const principles = [
  {
    title: "Le signal d'abord, la campagne ensuite",
    body: "Une stratégie d'enchères sur données pourries ne tient pas, quelles que soient vos compétences Ads. On fiabilise la mesure, puis on optimise.",
  },
  {
    title: "First-party, hashé, server-side",
    body: "C'est la trajectoire imposée par les navigateurs et les régulateurs. Les acteurs qui l'anticipent aujourd'hui récupèrent le signal que les autres perdent.",
  },
  {
    title: "Consent, pas contournement",
    body: "Le Consent Mode v2 mode avancé permet de rester conforme et de préserver la modélisation Google. C'est toujours préférable à un dark pattern qui se retourne contre la marque.",
  },
  {
    title: "Mesurable, documenté, transmissible",
    body: "Chaque implémentation est livrée avec sa documentation : schémas, variables, procédure de recette. Votre équipe doit pouvoir reprendre la main sans moi.",
  },
];

export default function ExpertisePage() {
  return (
    <PageTransition>
      <section className="pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="container mx-auto">
          <Reveal>
            <p className="eyebrow">Expertise</p>
            <h1 className="mt-4 max-w-4xl text-display-2xl text-ink-900">
              La technique qui rend les campagnes rentables.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-600 leading-relaxed">
              Sept ans à opérer sur Google Ads, dont cinq concentrés sur le
              tracking server-side. Voici la stack, l&apos;architecture de
              référence, et trois missions récentes qui illustrent le type de
              travail.
            </p>
          </Reveal>

          <Stagger className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((c) => (
              <StaggerItem key={c.label}>
                <p className="number-display text-5xl text-ink-900">{c.value}</p>
                <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                  {c.label}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-ink-50">
        <div className="container mx-auto">
          <Reveal>
            <p className="eyebrow">Architecture de référence</p>
            <h2 className="mt-4 max-w-3xl text-display-xl text-ink-900">
              À quoi ressemble un conteneur sGTM propre.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-ink-600 leading-relaxed">
              Flux des données utilisateur du navigateur jusqu&apos;aux
              plateformes, en passant par un conteneur server-side que vous
              contrôlez et par votre CRM.
            </p>
          </Reveal>

          <div className="mt-16 border border-ink-200 bg-background p-6 md:p-12">
            <SgtmDiagram />
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div>
                <p className="eyebrow">1 · Collecte</p>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">
                  Le GTM web transmet les événements au conteneur sGTM hébergé
                  sur un sous-domaine first-party, après vérification des
                  signaux de consentement.
                </p>
              </div>
              <div>
                <p className="eyebrow">2 · Enrichissement</p>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">
                  Le CRM pousse les données offline (valeur de deal, étape du
                  funnel, LTV) vers le conteneur pour que la conversion finale
                  soit attribuée correctement.
                </p>
              </div>
              <div>
                <p className="eyebrow">3 · Diffusion</p>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">
                  Les données hashées et enrichies sont routées vers Ads, GA4,
                  Meta et Ads API. Smart Bidding optimise sur un signal fiable.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto">
          <Reveal>
            <p className="eyebrow">Stack technique</p>
            <h2 className="mt-4 max-w-3xl text-display-xl text-ink-900">
              Les outils avec lesquels je travaille au quotidien.
            </h2>
          </Reveal>

          <Stagger className="mt-16 grid gap-px bg-ink-200 md:grid-cols-2">
            {stack.map((s) => (
              <StaggerItem key={s.category} className="bg-background p-8 md:p-10">
                <h3 className="text-lg font-bold text-ink-900">{s.category}</h3>
                <ul className="mt-5 space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="text-sm text-ink-700 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-ink-900 text-ink-50">
        <div className="container mx-auto">
          <Reveal>
            <p className="eyebrow text-gold-400">Principes de travail</p>
            <h2 className="mt-4 max-w-3xl text-display-xl text-ink-50">
              Quatre règles qui guident chaque décision technique.
            </h2>
          </Reveal>

          <Stagger className="mt-16 grid gap-10 md:grid-cols-2">
            {principles.map((p) => (
              <StaggerItem key={p.title}>
                <h3 className="text-xl font-bold text-ink-50">{p.title}</h3>
                <p className="mt-3 max-w-md text-base text-ink-300 leading-relaxed">
                  {p.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto">
          <Reveal>
            <div className="border border-ink-200 p-10 md:p-16">
              <div className="grid gap-10 md:grid-cols-12 md:items-center">
                <div className="md:col-span-8">
                  <h2 className="text-display-lg text-ink-900">
                    Un point d&apos;entrée simple : 45 minutes de diagnostic.
                  </h2>
                  <p className="mt-5 max-w-xl text-base text-ink-600 leading-relaxed">
                    On regarde ensemble votre stack actuelle. Si je peux vous
                    aider, on parle de mission. Sinon, je vous oriente vers
                    quelqu&apos;un de plus pertinent.
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <Button asChild variant="primary" size="lg">
                    <Link href="/contact">
                      Demander l&apos;audit
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
