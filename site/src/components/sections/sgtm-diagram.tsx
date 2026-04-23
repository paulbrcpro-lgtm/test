"use client";

import { motion, useReducedMotion } from "motion/react";

export function SgtmDiagram() {
  const reduceMotion = useReducedMotion();
  const pathAnim = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: {
      duration: reduceMotion ? 0 : 1.2,
      delay: reduceMotion ? 0 : delay,
      ease: "easeInOut" as const,
    },
  });

  const boxAnim = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.5, delay: reduceMotion ? 0 : delay },
  });

  return (
    <figure className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 1040 520"
        className="mx-auto w-full max-w-5xl"
        role="img"
        aria-label="Schéma du flux de données entre le navigateur, le conteneur server-side GTM, les plateformes Ads et le CRM."
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#334155" />
          </marker>
          <marker
            id="arrow-gold"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#CA8A04" />
          </marker>
        </defs>

        {/* Browser */}
        <motion.g {...boxAnim(0)}>
          <rect x="40" y="60" width="220" height="120" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.5" />
          <text x="60" y="90" fill="#0F172A" fontFamily="Satoshi, sans-serif" fontSize="16" fontWeight="700">
            Navigateur
          </text>
          <text x="60" y="112" fill="#475569" fontFamily="JetBrains Mono, monospace" fontSize="11">
            GTM web (client)
          </text>
          <text x="60" y="132" fill="#475569" fontFamily="JetBrains Mono, monospace" fontSize="11">
            Consent Mode v2
          </text>
          <text x="60" y="152" fill="#475569" fontFamily="JetBrains Mono, monospace" fontSize="11">
            dataLayer events
          </text>
        </motion.g>

        {/* sGTM */}
        <motion.g {...boxAnim(0.2)}>
          <rect x="400" y="60" width="240" height="120" fill="#0F172A" stroke="#0F172A" strokeWidth="1.5" />
          <text x="420" y="90" fill="#F8FAFC" fontFamily="Satoshi, sans-serif" fontSize="16" fontWeight="700">
            Conteneur sGTM
          </text>
          <text x="420" y="112" fill="#CA8A04" fontFamily="JetBrains Mono, monospace" fontSize="11">
            tag.votre-domaine.fr
          </text>
          <text x="420" y="132" fill="#CBD5E1" fontFamily="JetBrains Mono, monospace" fontSize="11">
            Cloud Run / Stape
          </text>
          <text x="420" y="152" fill="#CBD5E1" fontFamily="JetBrains Mono, monospace" fontSize="11">
            Hash SHA-256 user data
          </text>
        </motion.g>

        {/* CRM */}
        <motion.g {...boxAnim(0.3)}>
          <rect x="40" y="340" width="220" height="120" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.5" />
          <text x="60" y="370" fill="#0F172A" fontFamily="Satoshi, sans-serif" fontSize="16" fontWeight="700">
            CRM / Backend
          </text>
          <text x="60" y="392" fill="#475569" fontFamily="JetBrains Mono, monospace" fontSize="11">
            Salesforce / HubSpot
          </text>
          <text x="60" y="412" fill="#475569" fontFamily="JetBrains Mono, monospace" fontSize="11">
            Offline conversions
          </text>
          <text x="60" y="432" fill="#475569" fontFamily="JetBrains Mono, monospace" fontSize="11">
            LTV, scoring, closes
          </text>
        </motion.g>

        {/* Destinations */}
        <motion.g {...boxAnim(0.4)}>
          <rect x="780" y="30" width="220" height="90" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.5" />
          <text x="800" y="58" fill="#0F172A" fontFamily="Satoshi, sans-serif" fontSize="15" fontWeight="700">
            Google Ads
          </text>
          <text x="800" y="80" fill="#475569" fontFamily="JetBrains Mono, monospace" fontSize="11">
            Enhanced conversions
          </text>
          <text x="800" y="100" fill="#475569" fontFamily="JetBrains Mono, monospace" fontSize="11">
            gclid + user data
          </text>
        </motion.g>

        <motion.g {...boxAnim(0.5)}>
          <rect x="780" y="140" width="220" height="90" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.5" />
          <text x="800" y="168" fill="#0F172A" fontFamily="Satoshi, sans-serif" fontSize="15" fontWeight="700">
            GA4
          </text>
          <text x="800" y="190" fill="#475569" fontFamily="JetBrains Mono, monospace" fontSize="11">
            Measurement Protocol
          </text>
          <text x="800" y="210" fill="#475569" fontFamily="JetBrains Mono, monospace" fontSize="11">
            server-side events
          </text>
        </motion.g>

        <motion.g {...boxAnim(0.6)}>
          <rect x="780" y="250" width="220" height="90" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.5" />
          <text x="800" y="278" fill="#0F172A" fontFamily="Satoshi, sans-serif" fontSize="15" fontWeight="700">
            Meta CAPI
          </text>
          <text x="800" y="300" fill="#475569" fontFamily="JetBrains Mono, monospace" fontSize="11">
            Conversions API
          </text>
          <text x="800" y="320" fill="#475569" fontFamily="JetBrains Mono, monospace" fontSize="11">
            hashed user data
          </text>
        </motion.g>

        <motion.g {...boxAnim(0.7)}>
          <rect x="780" y="360" width="220" height="90" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.5" />
          <text x="800" y="388" fill="#0F172A" fontFamily="Satoshi, sans-serif" fontSize="15" fontWeight="700">
            Ads API
          </text>
          <text x="800" y="410" fill="#475569" fontFamily="JetBrains Mono, monospace" fontSize="11">
            Offline conversions
          </text>
          <text x="800" y="430" fill="#475569" fontFamily="JetBrains Mono, monospace" fontSize="11">
            CRM → Ads upload
          </text>
        </motion.g>

        {/* Connections */}
        <motion.path
          d="M 260 120 L 400 120"
          fill="none"
          stroke="#334155"
          strokeWidth="1.5"
          markerEnd="url(#arrow)"
          {...pathAnim(0.3)}
        />
        <motion.path
          d="M 260 400 L 330 400 L 330 180 Q 330 140 380 140 L 400 140"
          fill="none"
          stroke="#334155"
          strokeWidth="1.5"
          markerEnd="url(#arrow)"
          {...pathAnim(0.5)}
        />
        <motion.path
          d="M 640 100 Q 700 100 720 85 L 780 75"
          fill="none"
          stroke="#CA8A04"
          strokeWidth="1.75"
          markerEnd="url(#arrow-gold)"
          {...pathAnim(0.7)}
        />
        <motion.path
          d="M 640 125 Q 710 150 770 180 L 780 185"
          fill="none"
          stroke="#CA8A04"
          strokeWidth="1.75"
          markerEnd="url(#arrow-gold)"
          {...pathAnim(0.8)}
        />
        <motion.path
          d="M 640 150 Q 720 220 770 285 L 780 290"
          fill="none"
          stroke="#CA8A04"
          strokeWidth="1.75"
          markerEnd="url(#arrow-gold)"
          {...pathAnim(0.9)}
        />
        <motion.path
          d="M 640 170 Q 720 280 770 395 L 780 400"
          fill="none"
          stroke="#CA8A04"
          strokeWidth="1.75"
          markerEnd="url(#arrow-gold)"
          {...pathAnim(1)}
        />
      </svg>
      <figcaption className="mt-6 text-center text-xs font-mono uppercase tracking-wider text-ink-500">
        Flux typique — données first-party, hashées, routées server-side
      </figcaption>
    </figure>
  );
}
