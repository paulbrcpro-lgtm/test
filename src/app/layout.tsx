import type { Metadata } from "next";
import "./globals.css";
import { Analytics, AnalyticsNoScript } from "@/components/analytics/analytics";
import { ConsentBanner } from "@/components/analytics/consent-banner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuroraBackground } from "@/components/motion/aurora-background";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <Analytics />
      </head>
      <body className="relative flex min-h-full flex-col bg-surface text-ink-50">
        <AuroraBackground />
        <AnalyticsNoScript />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
