import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const cases = [
  {
    vertical: "E-commerce beauté — 60 k€/mois",
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
    vertical: "SaaS B2B — 22 k€/mois",
    problem:
      "Leads remontés en Ads comme équivalents. Google optimisait autant un auto-entrepreneur qu'un DAF mid-market.",
    action:
      "Scoring lead CRM exporté via offline conversions avec valeur. Branchement Salesforce → Ads API. Audiences similaires recalibrées sur les deals fermés.",
    result: [
      { metric: "3,4×", label: "de ROAS sur campagnes acquisition" },
      { metric: "−40 %", label: "de leads non-qualifiés" },
    ],
  },
  {
    vertical: "Marketplace services — 45 k€/mois",
    problem:
      "Consent Mode v1 bloquait 100 % des conversions des utilisateurs non-consentants. Perte d&apos;environ 35 % du volume.",
    action:
      "Passage en Consent Mode v2 mode avancé. Modélisation Google récupérée. CMP Didomi auditée et simplifiée (taux d&apos;opt-in +12 pts).",
    result: [
      { metric: "+29 %", label: "de conversions comptabilisées" },
      { metric: "+18 pts", label: "de taux d'opt-in CMP" },
    ],
  },
];

export function Proof() {
  return (
    <section className="py-24 md:py-32 bg-ink-900 text-ink-50">
      <div className="container mx-auto">
        <Reveal>
          <p className="eyebrow text-gold-400">Preuves</p>
          <h2 className="mt-4 max-w-3xl text-display-xl text-ink-50">
            Trois missions récentes, trois angles différents.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-ink-300 leading-relaxed">
            Chaque mission commence par un audit chiffré et se termine par un
            dashboard qui montre l&apos;écart avant/après. Les chiffres ci-dessous
            sont mesurés dans GA4 et Ads, pas déclarés.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-px bg-ink-700 md:grid-cols-3">
          {cases.map((c) => (
            <StaggerItem key={c.vertical} className="bg-ink-900 p-8 md:p-10">
              <p className="eyebrow text-gold-400">{c.vertical}</p>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                    Contexte
                  </p>
                  <p
                    className="mt-2 text-sm leading-relaxed text-ink-200"
                    dangerouslySetInnerHTML={{ __html: c.problem }}
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                    Action
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-200">
                    {c.action}
                  </p>
                </div>
                <div className="border-t border-ink-800 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                    Résultats
                  </p>
                  <ul className="mt-3 space-y-2">
                    {c.result.map((r) => (
                      <li key={r.label} className="flex items-baseline gap-3">
                        <span className="number-display text-2xl text-ink-50">
                          {r.metric}
                        </span>
                        <span className="text-sm text-ink-300">{r.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
