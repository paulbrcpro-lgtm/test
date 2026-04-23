import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const symptoms = [
  {
    title: "Les conversions ne remontent plus comme avant",
    body: "ITP, ETP, bloqueurs de scripts, navigateurs privés. Votre pixel client-side perd entre 15 et 40 % du signal, et Smart Bidding optimise sur un sous-ensemble biaisé.",
  },
  {
    title: "Consent Mode v2 est flou dans votre stack",
    body: "Vous avez mis une bannière mais les tags se déclenchent quand même. Ou ils ne se déclenchent plus du tout. Ou Ads Data Manager vous signale un manque de signaux.",
  },
  {
    title: "Vos leads CRM ne reviennent pas dans Ads",
    body: "Le MQL vient d'Ads mais Google ne le sait pas. Pas d'enhanced conversions for leads, pas d'offline conversions, pas de valeur par étape du funnel. Résultat : le modèle optimise sur le formulaire rempli, pas sur le revenu.",
  },
  {
    title: "Vous doutez de ce qu'il faut vraiment mesurer",
    body: "Vue de la conversion directe vs. contribution assistée, modèle d'attribution data-driven vs. position-based, deduplication Ads ↔ GA4. Personne dans l'équipe n'a le temps ni l'envie de trancher.",
  },
];

export function Problem() {
  return (
    <section className="py-24 md:py-32 bg-ink-50">
      <div className="container mx-auto">
        <Reveal>
          <p className="eyebrow">Le problème</p>
          <h2 className="mt-4 max-w-3xl text-display-xl text-ink-900">
            Smart Bidding n&apos;est pas magique. Il optimise sur les données que
            vous lui envoyez.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-ink-600 leading-relaxed">
            Si ces données sont partielles, tardives ou biaisées, il rentabilise
            les mauvaises audiences. Reconnaissez-vous l&apos;un de ces
            symptômes ?
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-px bg-ink-200 md:grid-cols-2">
          {symptoms.map((s) => (
            <StaggerItem key={s.title} className="bg-ink-50 p-8 md:p-10">
              <h3 className="text-xl font-bold text-ink-900">{s.title}</h3>
              <p className="mt-4 text-base text-ink-600 leading-relaxed">
                {s.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
