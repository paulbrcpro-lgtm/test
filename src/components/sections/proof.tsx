import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const cases = [
  {
    vertical: "E-commerce beauté",
    budget: "60 k€/mois",
    problem:
      "Perte estimée à 28 % du signal de conversion après Safari 17. Smart Bidding sous-performait malgré un budget stable.",
    action:
      "Migration complète vers sGTM sur sous-domaine first-party. Deduplication client/server. Enhanced conversions pour les retours clients.",
    result: [
      { metric: "+34 %", label: "de conversions remontées" },
      { metric: "−22 %", label: "de CPA sur Performance Max" },
    ],
  },
  {
    vertical: "SaaS B2B",
    budget: "22 k€/mois",
    problem:
      "Leads remontés en Ads comme équivalents. Google optimisait autant un auto-entrepreneur qu'un DAF mid-market.",
    action:
      "Scoring lead CRM exporté via offline conversions avec valeur. Branchement Salesforce → Ads API. Audiences similaires recalibrées sur les deals fermés.",
    result: [
      { metric: "3,4×", label: "de ROAS sur acquisition" },
      { metric: "−40 %", label: "de leads non-qualifiés" },
    ],
  },
  {
    vertical: "Marketplace services",
    budget: "45 k€/mois",
    problem:
      "Consent Mode v1 bloquait 100 % des conversions des utilisateurs non-consentants. Perte d'environ 35 % du volume.",
    action:
      "Passage en Consent Mode v2 mode avancé. Modélisation Google récupérée. CMP Didomi auditée et simplifiée (taux d'opt-in +12 pts).",
    result: [
      { metric: "+29 %", label: "de conversions comptabilisées" },
      { metric: "+18 pts", label: "de taux d'opt-in CMP" },
    ],
  },
];

export function Proof() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto">
        <Reveal>
          <p className="eyebrow-gold">Preuves</p>
          <h2 className="mt-4 max-w-3xl text-display-xl text-ink-50">
            Trois missions récentes, trois angles différents.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-ink-200 leading-relaxed">
            Chaque mission commence par un audit chiffré et se termine par un
            dashboard qui montre l&apos;écart avant/après. Les chiffres ci-dessous
            sont mesurés dans GA4 et Ads, pas déclarés.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-5 md:grid-cols-3">
          {cases.map((c) => (
            <StaggerItem key={c.vertical}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-ink-800 bg-gradient-to-b from-ink-900/80 to-ink-950/40 p-8 backdrop-blur-sm transition-all hover:border-gold/50 hover:shadow-[0_0_40px_-10px_rgba(234,179,8,0.35)] md:p-10">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow-gold">{c.vertical}</p>
                  <span className="rounded-full border border-ink-700 bg-ink-950/80 px-2.5 py-0.5 font-mono text-[10px] text-ink-200">
                    {c.budget}
                  </span>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-300">
                      Contexte
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-100">
                      {c.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-300">
                      Action
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-100">
                      {c.action}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-ink-800 pt-6">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gold">
                    Résultats
                  </p>
                  <ul className="mt-4 space-y-3">
                    {c.result.map((r) => (
                      <li key={r.label} className="flex items-baseline gap-3">
                        <span className="number-display text-2xl text-ink-50 md:text-3xl">
                          {r.metric}
                        </span>
                        <span className="text-sm text-ink-200">{r.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
