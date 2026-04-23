"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Ga4Logo,
  GoogleAdsLogo,
  GoogleCloudLogo,
  GtmLogo,
  MetaLogo,
  SalesforceLogo,
  StapeLogo,
  type BrandLogo,
} from "@/components/brand/logos";
import { Globe, Database } from "lucide-react";

type NodeDef = {
  id: string;
  label: string;
  sub?: string;
  position: { x: number; y: number };
  width: number;
  height: number;
  logos?: BrandLogo[];
  Icon?: (p: { className?: string }) => React.JSX.Element;
  tone?: "default" | "core";
};

const nodes: NodeDef[] = [
  {
    id: "browser",
    label: "Navigateur",
    sub: "dataLayer · Consent v2",
    position: { x: 40, y: 50 },
    width: 220,
    height: 110,
    Icon: (p) => <Globe {...p} aria-hidden="true" />,
  },
  {
    id: "crm",
    label: "CRM / Backend",
    sub: "Offline conv. · LTV · scoring",
    position: { x: 40, y: 310 },
    width: 220,
    height: 110,
    logos: [{ name: "Salesforce", Component: SalesforceLogo }],
    Icon: (p) => <Database {...p} aria-hidden="true" />,
  },
  {
    id: "sgtm",
    label: "Conteneur sGTM",
    sub: "tag.votre-domaine.fr · SHA-256",
    position: { x: 390, y: 175 },
    width: 260,
    height: 140,
    logos: [
      { name: "GTM", Component: GtmLogo },
      { name: "Google Cloud", Component: GoogleCloudLogo },
      { name: "Stape", Component: StapeLogo },
    ],
    tone: "core",
  },
  {
    id: "gads",
    label: "Google Ads",
    sub: "Enhanced conv.",
    position: { x: 780, y: 20 },
    width: 200,
    height: 90,
    logos: [{ name: "Google Ads", Component: GoogleAdsLogo }],
  },
  {
    id: "ga4",
    label: "GA4",
    sub: "Measurement Protocol",
    position: { x: 780, y: 140 },
    width: 200,
    height: 90,
    logos: [{ name: "GA4", Component: Ga4Logo }],
  },
  {
    id: "meta",
    label: "Meta CAPI",
    sub: "Conversion API",
    position: { x: 780, y: 260 },
    width: 200,
    height: 90,
    logos: [{ name: "Meta", Component: MetaLogo }],
  },
  {
    id: "adsapi",
    label: "Ads API",
    sub: "Offline conversions",
    position: { x: 780, y: 380 },
    width: 200,
    height: 90,
    logos: [{ name: "Google Ads", Component: GoogleAdsLogo }],
  },
];

type Edge = { from: string; to: string; dashed?: boolean; gold?: boolean; delay: number };

const edges: Edge[] = [
  { from: "browser", to: "sgtm", delay: 0.2 },
  { from: "crm", to: "sgtm", dashed: true, delay: 0.4 },
  { from: "sgtm", to: "gads", gold: true, delay: 0.7 },
  { from: "sgtm", to: "ga4", gold: true, delay: 0.85 },
  { from: "sgtm", to: "meta", gold: true, delay: 1.0 },
  { from: "sgtm", to: "adsapi", gold: true, delay: 1.15 },
];

export function SgtmDiagram() {
  const reduceMotion = useReducedMotion();
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <figure className="relative mx-auto w-full max-w-5xl overflow-x-auto">
      <div className="relative aspect-[1040/500] w-full min-w-[720px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(234,179,8,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(234,179,8,0.18) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(circle at center, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 80%)",
          }}
        />

        <svg
          viewBox="0 0 1040 500"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Flux de données entre le navigateur, le conteneur server-side GTM, les plateformes publicitaires et le CRM."
        >
          <defs>
            <marker
              id="arrow-gold"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L8,4 L0,8 z" fill="#EAB308" />
            </marker>
            <marker
              id="arrow-muted"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L8,4 L0,8 z" fill="#71717A" />
            </marker>
          </defs>

          {edges.map((e) => {
            const from = nodeMap[e.from];
            const to = nodeMap[e.to];
            const fromX = from.position.x + from.width;
            const fromY = from.position.y + from.height / 2;
            const toX = to.position.x;
            const toY = to.position.y + to.height / 2;
            const midX = (fromX + toX) / 2;
            const d = `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`;
            return (
              <motion.path
                key={`${e.from}-${e.to}`}
                d={d}
                fill="none"
                stroke={e.gold ? "#EAB308" : "#52525B"}
                strokeWidth={e.gold ? 1.75 : 1.25}
                strokeDasharray={e.dashed ? "4 4" : undefined}
                markerEnd={e.gold ? "url(#arrow-gold)" : "url(#arrow-muted)"}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: reduceMotion ? 0 : 1.2,
                  delay: reduceMotion ? 0 : e.delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </svg>

        {nodes.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : i * 0.08 }}
            className="absolute"
            style={{
              left: `${(n.position.x / 1040) * 100}%`,
              top: `${(n.position.y / 500) * 100}%`,
              width: `${(n.width / 1040) * 100}%`,
              height: `${(n.height / 500) * 100}%`,
            }}
          >
            <div
              className={
                n.tone === "core"
                  ? "relative flex h-full w-full flex-col justify-between rounded-xl border border-gold/40 bg-gradient-to-br from-gold/15 via-ink-900/80 to-ink-950/80 p-3 backdrop-blur-xl shadow-[0_0_60px_-15px_rgba(234,179,8,0.5)] md:p-4"
                  : "relative flex h-full w-full flex-col justify-between rounded-xl border border-ink-700 bg-ink-900/80 p-3 backdrop-blur-xl md:p-4"
              }
            >
              <div>
                <div className="flex items-center gap-2">
                  {n.Icon && <n.Icon className="h-3.5 w-3.5 text-gold md:h-4 md:w-4" />}
                  <p className={n.tone === "core" ? "text-xs font-bold text-ink-50 md:text-sm" : "text-[11px] font-bold text-ink-50 md:text-xs"}>
                    {n.label}
                  </p>
                </div>
                {n.sub && (
                  <p className="mt-1 font-mono text-[8px] text-ink-300 md:text-[10px]">{n.sub}</p>
                )}
              </div>
              {n.logos && n.logos.length > 0 && (
                <div className="flex items-center gap-1 md:gap-1.5">
                  {n.logos.map(({ name, Component }) => (
                    <div
                      key={name}
                      className="flex h-5 w-5 items-center justify-center rounded-md border border-ink-700 bg-ink-950 md:h-6 md:w-6"
                      title={name}
                    >
                      <Component size={12} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <figcaption className="mt-8 text-center font-mono text-xs uppercase tracking-wider text-ink-300">
        Données first-party · hashées SHA-256 · routées server-side
      </figcaption>
    </figure>
  );
}
