"use client";

import { brandLogos } from "@/components/brand/logos";

export function LogoCloud() {
  const duplicated = [...brandLogos, ...brandLogos];
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent"
      />
      <div className="flex w-max animate-marquee motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-4">
        {duplicated.map(({ name, Component }, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center gap-3 px-8"
            title={name}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ink-800 bg-ink-900/60">
              <Component size={22} />
            </div>
            <span className="whitespace-nowrap font-mono text-xs uppercase tracking-wider text-ink-300">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
