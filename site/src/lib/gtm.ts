export type ConsentState = {
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  analytics_storage: "granted" | "denied";
  functionality_storage: "granted" | "denied";
  personalization_storage: "granted" | "denied";
  security_storage: "granted" | "denied";
};

export const CONSENT_COOKIE = "gads_consent";
export const CONSENT_VERSION = 1;

export const DEFAULT_DENIED: ConsentState = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "denied",
  personalization_storage: "denied",
  security_storage: "granted",
};

export const FULL_GRANT: ConsentState = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
  functionality_storage: "granted",
  personalization_storage: "granted",
  security_storage: "granted",
};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

export function pushDataLayer(event: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

export function updateConsent(state: ConsentState) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args as unknown as Record<string, unknown>);
    };
  window.gtag("consent", "update", state);
}

export function readConsentCookie(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!match) return null;
  try {
    const raw = decodeURIComponent(match.split("=")[1]);
    const parsed = JSON.parse(raw) as { v: number; s: ConsentState };
    if (parsed.v !== CONSENT_VERSION) return null;
    return parsed.s;
  } catch {
    return null;
  }
}

export function writeConsentCookie(state: ConsentState) {
  if (typeof document === "undefined") return;
  const payload = encodeURIComponent(
    JSON.stringify({ v: CONSENT_VERSION, s: state }),
  );
  const sixMonths = 60 * 60 * 24 * 180;
  document.cookie = `${CONSENT_COOKIE}=${payload}; path=/; max-age=${sixMonths}; SameSite=Lax`;
}
