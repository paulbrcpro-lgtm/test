import { AlertTriangle, Link2Off, Shield, HelpCircle } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const symptoms = [
  {
    Icon: AlertTriangle,
    title: "Les conversions ne remontent plus comme avant",
    body: "ITP, ETP, bloqueurs de scripts, navigateurs privés. Votre pixel client-side perd entre 15 et 40 % du signal, et Smart Bidding optimise sur un sous-ensemble biaisé.",
  },
  {
    Icon: Shield,
    title: "Consent Mode v2 est flou dans votre stack",
    body: "Vous avez mis une bannière mais les tags se déclenchent quand même. Ou ils ne se déclenchent plus du tout. Ou Ads Data Manager vous signale un manque de signaux.",
  },
  {
    Icon: Link2Off,
    title: "Vos leads CRM ne reviennent pas dans Ads",
    body: "Le MQL vient d'Ads mais Google ne le sait pas. Pas d'enhanced conversions for leads, pas d'offline conversions, pas de valeur par étape du funnel. Résultat : le modèle optimise sur le formulaire rempli, pas sur le revenu.",
  },
  {
    Icon: HelpCircle,
    title: "Vous doutez de ce qu'il faut vraiment mesurer",
    body: "Vue de la conversion directe vs. contribution assistée, modèle d'attribution data-driven vs. position-based, deduplication Ads ↔ GA4. Personne dans l'équipe n'a le temps ni l'envie de trancher.",
  },
];

export function Problem() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto">
        <Reveal>
          <p className="eyebrow-gold">Le problème</p>
          <h2 className="mt-4 max-w-3xl text-display-xl text-ink-50">
            Smart Bidding n&apos;est pas magique. Il optimise sur les données que
            vous lui envoyez.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-ink-200 leading-relaxed">
            Si ces données sont partielles, tardives ou biaisées, il rentabilise
            les mauvaises audiences. Reconnaissez-vous l&apos;un de ces
            symptômes ?
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-5 md:grid-cols-2">
          {symptoms.map((s) => (
            <StaggerItem key={s.title}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/40 p-8 backdrop-blur-sm transition-colors hover:border-ink-700 md:p-10">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-700 bg-ink-950 text-gold">
                    <s.Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-ink-50">{s.title}</h3>
                  <p className="mt-4 text-base text-ink-200 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
