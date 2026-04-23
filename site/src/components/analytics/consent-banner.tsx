"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  type ConsentState,
  DEFAULT_DENIED,
  FULL_GRANT,
  readConsentCookie,
  updateConsent,
  writeConsentCookie,
} from "@/lib/gtm";

type Category = "analytics" | "ads";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [prefs, setPrefs] = useState<Record<Category, boolean>>({
    analytics: false,
    ads: false,
  });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const existing = readConsentCookie();
    if (!existing) {
      setVisible(true);
    } else {
      updateConsent(existing);
    }
  }, []);

  const persist = (state: ConsentState) => {
    writeConsentCookie(state);
    updateConsent(state);
    setVisible(false);
  };

  const acceptAll = () => persist(FULL_GRANT);
  const rejectAll = () => persist(DEFAULT_DENIED);
  const saveCustom = () => {
    persist({
      ...DEFAULT_DENIED,
      analytics_storage: prefs.analytics ? "granted" : "denied",
      ad_storage: prefs.ads ? "granted" : "denied",
      ad_user_data: prefs.ads ? "granted" : "denied",
      ad_personalization: prefs.ads ? "granted" : "denied",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-labelledby="consent-title"
          aria-describedby="consent-desc"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl border border-ink-200 bg-background shadow-xl md:inset-x-auto md:right-6 md:bottom-6"
        >
          <div className="p-6 md:p-8">
            <p className="eyebrow mb-3">Cookies & consentement</p>
            <h2 id="consent-title" className="text-xl font-bold text-ink-900">
              Vos données, vos choix
            </h2>
            <p id="consent-desc" className="mt-3 text-sm text-ink-600 leading-relaxed">
              Ce site utilise des cookies pour mesurer l&apos;audience et, si vous
              l&apos;acceptez, optimiser la pertinence des campagnes publicitaires
              (Consent Mode v2). Vous pouvez accepter, refuser, ou personnaliser finement.
              Aucun signal publicitaire n&apos;est envoyé sans votre accord explicite.
            </p>

            {customize && (
              <div className="mt-6 space-y-4 border-t border-ink-200 pt-5">
                <CategoryRow
                  id="analytics"
                  label="Mesure d'audience"
                  desc="Google Analytics 4, anonymisation IP. Nous permet de savoir ce qui intéresse les visiteurs."
                  checked={prefs.analytics}
                  onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
                />
                <CategoryRow
                  id="ads"
                  label="Publicité & remarketing"
                  desc="Google Ads, Meta. Permet de mesurer les conversions et de diffuser des annonces pertinentes."
                  checked={prefs.ads}
                  onChange={(v) => setPrefs((p) => ({ ...p, ads: v }))}
                />
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {!customize ? (
                <>
                  <Button variant="primary" size="sm" onClick={acceptAll}>
                    Tout accepter
                  </Button>
                  <Button variant="outline" size="sm" onClick={rejectAll}>
                    Tout refuser
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCustomize(true)}
                  >
                    Personnaliser
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="primary" size="sm" onClick={saveCustom}>
                    Enregistrer mes choix
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setCustomize(false)}>
                    Retour
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CategoryRow({
  id,
  label,
  desc,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-4 text-left"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 accent-ink-900"
      />
      <span className="flex-1">
        <span className="block text-sm font-semibold text-ink-900">{label}</span>
        <span className="mt-1 block text-xs text-ink-500 leading-relaxed">
          {desc}
        </span>
      </span>
    </label>
  );
}
