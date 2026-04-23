import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  title: "Services — Audit, sGTM, Pilotage Ads",
  description:
    "Trois offres claires : audit tracking, mise en place server-side et pilotage mensuel. Pour les équipes qui veulent de la visibilité et pas des slides.",
};

const offers = [
  {
    badge: "01 · Diagnostic",
    name: "Audit Tracking",
    positioning: "Un diagnostic exploitable en 5 jours",
    price: "À partir de 2 900 €",
    priceSub: "Mission forfaitaire · livrable écrit",
    description:
      "Vous soupçonnez que votre tracking fuit mais vous n'avez pas de mesure. Je le quantifie et je pointe les trois leviers qui valent l'effort.",
    deliverables: [
      "Revue complète du conteneur GTM web (tags, triggers, variables)",
      "Analyse des écarts Ads ↔ GA4 ↔ CRM sur 90 jours glissants",
      "Audit CMP et conformité Consent Mode v2",
      "Cartographie des pertes de signal (ITP, ETP, bloqueurs, consent)",
      "Roadmap priorisée avec estimation d'impact business",
    ],
    cta: "Briefer un audit",
    highlight: false,
  },
  {
    badge: "02 · Build",
    name: "Mise en place server-side",
    positioning: "L'infrastructure de mesure, installée",
    price: "À partir de 8 500 €",
    priceSub: "Projet 4 à 8 semaines · livrable opérationnel",
    description:
      "Vous avez besoin d'un conteneur sGTM propre, branché aux bons outils, avec du consent qui marche et des conversions qui remontent. Je le fais.",
    deliverables: [
      "Déploiement sGTM sur Google Cloud Run ou Stape, sous-domaine first-party",
      "Migration des tags critiques vers le serveur (Ads, GA4, Meta CAPI)",
      "Enhanced conversions & offline conversions avec branchement CRM",
      "Intégration Consent Mode v2 mode avancé (CMP au choix)",
      "Documentation complète : schémas, variables, procédure de recette",
    ],
    cta: "Démarrer la mise en place",
    highlight: true,
  },
  {
    badge: "03 · Run",
    name: "Pilotage Ads + Mesure",
    positioning: "Un consultant intégré à votre équipe",
    price: "À partir de 3 200 € / mois",
    priceSub: "Engagement trimestriel · 2 à 4 jours par mois",
    description:
      "Vous voulez un expert qui tient le cap sur la durée : qualité du signal, stratégie d'enchères, itérations basées sur la donnée. Pas une agence, une personne.",
    deliverables: [
      "Rituel mensuel de revue stratégique (2h en visio)",
      "Pilotage Smart Bidding, stratégies d'enchères, structure de campagnes",
      "Maintenance et évolution du conteneur sGTM",
      "Dashboard Looker Studio tenu à jour (sources Ads, GA4, CRM)",
      "Veille sur les évolutions plateforme (Consent, AI-Max, IPM, etc.)",
    ],
    cta: "Démarrer le pilotage",
    highlight: false,
  },
];

const faq = [
  {
    q: "Quelle différence concrète entre client-side et server-side ?",
    a: "En client-side, les tags tournent dans le navigateur du visiteur. Ils sont soumis à ITP, ETP, aux bloqueurs de pub, et leurs cookies sont limités à 7 jours sur Safari. En server-side, un conteneur que vous contrôlez reçoit les événements et les renvoie aux plateformes. Avantages mesurables : signal plus fiable (+15 à +40 % de conversions remontées selon la stack), cookies first-party, durée de vie jusqu'à 2 ans, latence maîtrisée.",
  },
  {
    q: "Consent Mode v2, c'est obligatoire ?",
    a: "Pour tout annonceur qui diffuse des campagnes ciblant l'Espace économique européen et utilise les audiences Google, oui, depuis mars 2024. Sans Consent Mode v2 correctement implémenté, vous perdez l'accès à certaines fonctionnalités Ads (audiences similaires personnalisées, remarketing) et la modélisation des conversions ne fonctionne pas.",
  },
  {
    q: "sGTM, il faut Google Cloud ? C'est cher ?",
    a: "Deux options principales : Google Cloud Run (App Engine est déprécié pour cet usage) ou un fournisseur managé comme Stape. Sur Cloud Run, comptez 20 à 80 € / mois selon le volume de requêtes. Sur Stape, 30 à 120 € / mois selon le forfait. L'investissement est négligeable face au gain en qualité de signal et à la réduction de CPA qui en découle.",
  },
  {
    q: "Enhanced conversions, first-party data, CAPI : même combat ?",
    a: "Même principe — envoyer de la donnée hashée côté serveur — appliqué à trois plateformes. Enhanced conversions (Google Ads) améliore l'attribution des clics. First-party data est le concept général : données consenties collectées par vous, pas par un tiers. CAPI (Conversion API de Meta) est l'équivalent Meta, qui vit dans le même conteneur sGTM pour mutualiser les efforts.",
  },
  {
    q: "Offline conversions, quel usage pour un e-commerce ?",
    a: "Pour un e-commerce pur avec paiement en ligne, l'intérêt est limité — les conversions sont déjà online. Elles deviennent utiles pour : les retours clients (remonter la valeur nette), les ventes complémentaires par téléphone, les LTV à 30 ou 90 jours. Pour du B2B ou du lead-gen, c'est en revanche indispensable : elles permettent à Smart Bidding d'optimiser sur le revenu réel plutôt que sur les formulaires remplis.",
  },
  {
    q: "Combien de temps pour voir un impact sur les campagnes ?",
    a: "Compter 2 à 4 semaines pour que Smart Bidding ré-apprenne avec le nouveau signal. Les premiers gains sont souvent visibles dès la deuxième semaine (meilleure attribution, baisse du CPA mesuré). L'effet plein se matérialise sur 6 à 8 semaines, le temps que les campagnes accumulent assez de conversions propres.",
  },
  {
    q: "Vous travaillez avec des agences en place ?",
    a: "Oui, très régulièrement. Mon rôle est souvent complémentaire : l'agence gère les campagnes au quotidien, j'interviens sur l'infrastructure de mesure et le pilotage stratégique. Ça fonctionne bien quand les périmètres sont clairs dès le départ.",
  },
];

export default function ServicesPage() {
  return (
    <PageTransition>
      <section className="pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="container mx-auto">
          <Reveal>
            <p className="eyebrow-gold">Services</p>
            <h1 className="mt-4 max-w-4xl text-display-2xl text-ink-50">
              Trois façons de travailler ensemble.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-200 leading-relaxed">
              Un audit qui débloque, une mise en place qui structure, un
              pilotage qui tient dans le temps. Vous choisissez en fonction de
              l&apos;étape à laquelle vous vous trouvez.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <Stagger className="grid gap-5 lg:grid-cols-3">
            {offers.map((o) => (
              <StaggerItem key={o.name}>
                <article
                  className={
                    o.highlight
                      ? "relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/50 bg-gradient-to-b from-gold/5 to-ink-950/40 p-8 backdrop-blur-sm shadow-[0_0_60px_-20px_rgba(234,179,8,0.5)] md:p-10"
                      : "relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/40 p-8 backdrop-blur-sm md:p-10"
                  }
                >
                  {o.highlight && (
                    <div className="absolute right-4 top-4 rounded-full border border-gold/50 bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-gold">
                      Le plus demandé
                    </div>
                  )}
                  <p className="eyebrow-gold">{o.badge}</p>
                  <h2 className="mt-4 text-2xl font-bold text-ink-50">{o.name}</h2>
                  <p className="mt-2 text-sm text-ink-200">{o.positioning}</p>

                  <div className="mt-6 border-y border-ink-800 py-5">
                    <p className="number-display text-3xl text-ink-50">{o.price}</p>
                    <p className="mt-1 text-xs text-ink-300">{o.priceSub}</p>
                  </div>

                  <p className="mt-6 text-base text-ink-100 leading-relaxed">
                    {o.description}
                  </p>

                  <ul className="mt-6 space-y-3 flex-1">
                    {o.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3">
                        <Check
                          className="mt-[3px] h-4 w-4 shrink-0 text-gold"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-ink-100 leading-relaxed">
                          {d}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button
                      asChild
                      variant={o.highlight ? "primary" : "outline"}
                      size="md"
                      className="w-full"
                    >
                      <Link href="/contact">
                        {o.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="eyebrow-gold">FAQ technique</p>
                <h2 className="mt-4 text-display-lg text-ink-50">
                  Les questions qu&apos;on me pose au premier appel.
                </h2>
                <p className="mt-5 text-base text-ink-200 leading-relaxed">
                  Je garde cette liste à jour. Si votre question n&apos;y est
                  pas, elle aura sa réponse pendant l&apos;audit gratuit.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-ink-800 bg-ink-900/40 px-6 backdrop-blur-sm md:px-10">
                  <Accordion type="single" collapsible className="w-full">
                    {faq.map((item, i) => (
                      <AccordionItem key={item.q} value={`q-${i}`}>
                        <AccordionTrigger>{item.q}</AccordionTrigger>
                        <AccordionContent>{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
