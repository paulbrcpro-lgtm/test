import Link from "next/link";
import { nav, siteConfig } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-ink-200 bg-background">
      <div className="container mx-auto py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-3">Signal, pas bruit</p>
            <h2 className="text-2xl font-bold text-ink-900">
              {siteConfig.name}
            </h2>
            <p className="mt-4 max-w-md text-sm text-ink-600 leading-relaxed">
              Conseil Google Ads et infrastructure de tracking server-side pour
              les équipes marketing qui refusent de piloter à l&apos;aveugle.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Navigation</p>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-700 hover:text-ink-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-ink-700 hover:text-ink-900 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-ink-700 hover:text-ink-900 transition-colors"
                >
                  Demander un audit gratuit
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink-200 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-ink-500">
            © {year} {siteConfig.name}. Tous droits réservés.
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-ink-400">
            Next.js · GTM server-side · Consent Mode v2
          </p>
        </div>
      </div>
    </footer>
  );
}
