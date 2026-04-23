import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    n: "01",
    title: "Audit de l'existant",
    body: "Revue du GTM web, des tags Ads, de la configuration GA4, de l'implémentation CMP et des écarts Ads ↔ GA4 ↔ CRM. Livrable : document de diagnostic chiffré avec les pertes de signal mesurées.",
  },
  {
    n: "02",
    title: "Stack server-side",
    body: "Déploiement d'un conteneur sGTM (Google Cloud Run ou Stape) sur sous-domaine first-party. Migration des tags critiques vers le serveur. Redondance client + server pour les périodes de transition.",
  },
  {
    n: "03",
    title: "Enhanced & offline conversions",
    body: "Remontée des conversions avec données utilisateur hashées (SHA-256) côté server. Branchement du CRM via Google Ads API ou connecteur Zapier/Make pour les conversions offline. Matching ratio visé : > 70 %.",
  },
  {
    n: "04",
    title: "Consent Mode v2",
    body: "Intégration d'une CMP (Didomi, Axeptio ou custom) avec signaux Ads et analytics propres. Mode avancé pour préserver la modélisation Google. Documentation des flux pour audit CNIL.",
  },
  {
    n: "05",
    title: "Pilotage & itération",
    body: "Mise en place d'un dashboard Looker Studio (sources GA4 + Ads + CRM). Rituel mensuel de revue : qualité du signal, évolution du CPA par source, recommandations d'ajustement de la stratégie d'enchères.",
  },
];

export function Method() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto">
        <Reveal>
          <p className="eyebrow">La méthode</p>
          <h2 className="mt-4 max-w-3xl text-display-xl text-ink-900">
            Cinq étapes, pas dix-huit.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-ink-600 leading-relaxed">
            Le tracking n&apos;est pas un projet qui se termine un jour — c&apos;est
            une infrastructure qui vit. Voici comment je la mets en place, puis
            comment on la tient dans le temps.
          </p>
        </Reveal>

        <ol className="mt-16 space-y-px bg-ink-200">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <li className="grid gap-6 bg-background p-8 md:grid-cols-12 md:gap-10 md:p-12">
                <div className="md:col-span-2">
                  <span className="number-display text-4xl text-gold md:text-5xl">
                    {s.n}
                  </span>
                </div>
                <div className="md:col-span-10">
                  <h3 className="text-2xl font-bold text-ink-900">{s.title}</h3>
                  <p className="mt-3 max-w-2xl text-base text-ink-600 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
