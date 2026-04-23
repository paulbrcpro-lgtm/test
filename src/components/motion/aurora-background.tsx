"use client";

export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-surface" />

      <div className="absolute -top-1/3 -left-1/4 h-[80vh] w-[80vh] rounded-full bg-gold/20 blur-[120px] animate-aurora-1 motion-reduce:animate-none" />
      <div className="absolute top-1/4 -right-1/4 h-[70vh] w-[70vh] rounded-full bg-amber-500/10 blur-[140px] animate-aurora-2 motion-reduce:animate-none" />
      <div className="absolute -bottom-1/3 left-1/3 h-[75vh] w-[75vh] rounded-full bg-orange-600/10 blur-[130px] animate-aurora-3 motion-reduce:animate-none" />

      <div className="absolute inset-0 grid-overlay opacity-40 mask-fade-bottom" />

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent" />
    </div>
  );
}
