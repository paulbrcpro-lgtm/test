import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { geoGraticule, geoMercator, geoPath } from "d3-geo";
import { countryFeatures } from "./data";
import { DotGrid } from "./DotGrid";
import { ParisMarker } from "./ParisMarker";
import { HUDOverlay } from "./HUDOverlay";

const PARIS: [number, number] = [2.3522, 48.8566];
const EUROPE_CENTER: [number, number] = [14, 54];
const ORANGE = "#ff8a1f";

export const EuropeIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  const driftEnd = Math.round(durationInFrames * 0.22);
  const pushEnd = Math.round(durationInFrames * 0.9);

  const drift = interpolate(frame, [0, driftEnd], [0, 1], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const push = interpolate(frame, [driftEnd, pushEnd], [0, 1], {
    easing: Easing.bezier(0.55, 0.05, 0.25, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const t = drift * 0.08 + push * 0.92;

  const scale = interpolate(t, [0, 1], [950, 5200]);
  const cx = interpolate(t, [0, 1], [EUROPE_CENTER[0], PARIS[0]]);
  const cy = interpolate(t, [0, 1], [EUROPE_CENTER[1], PARIS[1]]);

  const projection = geoMercator()
    .center([cx, cy])
    .scale(scale)
    .translate([width / 2, height / 2]);

  const pathGen = geoPath(projection);
  const parisPoint = projection(PARIS) ?? [width / 2, height / 2];

  // Vue plus top-down pour le style tactique (moins de biais qu'avant)
  const tiltX = interpolate(t, [0, 1], [22, 8]);
  const tiltY = interpolate(t, [0, 1], [-8, 2]);
  const tiltZ = interpolate(t, [0, 1], [-1.5, 0]);
  const orbitY = Math.sin(frame / 80) * 1.0;
  const orbitX = Math.cos(frame / 95) * 0.5;

  const strokeWidth = interpolate(t, [0, 1], [1.6, 1.2]);
  const coreWidth = interpolate(t, [0, 1], [0.8, 0.6]);

  const introFade = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const appearFrame = Math.round(durationInFrames * 0.65);

  // Graticule (grille lat/lon) - densité 10°
  const graticule = geoGraticule().step([10, 10]);
  const graticulePath = pathGen(graticule()) ?? "";

  // Cercles de "coverage" superposés à des positions fixes
  const coverageCircles = [
    { lon: -5, lat: 42, r: 60 }, // Espagne
    { lon: 11, lat: 46, r: 45 }, // Alpes
  ];

  return (
    <AbsoluteFill style={{ background: "#0a0a0a" }}>
      <DotGrid />

      <AbsoluteFill
        style={{
          perspective: "2400px",
          perspectiveOrigin: "50% 50%",
          opacity: introFade,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            transform: `rotateX(${tiltX + orbitX}deg) rotateY(${tiltY + orbitY}deg) rotateZ(${tiltZ}deg)`,
          }}
        >
          <svg
            width={width}
            height={height}
            style={{ position: "absolute", inset: 0 }}
          >
            <defs>
              <filter
                id="soft-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="1.8" result="b1" />
                <feMerge>
                  <feMergeNode in="b1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <pattern
                id="hatch"
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width="6" height="6" fill="rgba(20,20,20,0.35)" />
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="6"
                  stroke="rgba(140,150,160,0.08)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            {/* Graticule fin en arrière-plan */}
            <path
              d={graticulePath}
              fill="none"
              stroke="rgba(140,150,160,0.18)"
              strokeWidth={0.5}
            />

            {/* Remplissage pays - texture hachurée subtile */}
            <g>
              {countryFeatures.map((f, i) => {
                const d = pathGen(f);
                if (!d) return null;
                return (
                  <path
                    key={`fill-${(f.id as string | number | undefined) ?? i}`}
                    d={d}
                    fill="url(#hatch)"
                    stroke="none"
                  />
                );
              })}
            </g>

            {/* Trait principal */}
            <g filter="url(#soft-glow)">
              {countryFeatures.map((f, i) => {
                const d = pathGen(f);
                if (!d) return null;
                return (
                  <path
                    key={`stroke-${(f.id as string | number | undefined) ?? i}`}
                    d={d}
                    fill="none"
                    stroke="rgba(220,225,235,0.85)"
                    strokeWidth={strokeWidth}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                );
              })}
            </g>

            {/* Cœur net */}
            <g>
              {countryFeatures.map((f, i) => {
                const d = pathGen(f);
                if (!d) return null;
                return (
                  <path
                    key={`core-${(f.id as string | number | undefined) ?? i}`}
                    d={d}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={coreWidth}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    opacity={0.75}
                  />
                );
              })}
            </g>

            {/* Cercles coverage secondaires */}
            {coverageCircles.map((c, idx) => {
              const pos = projection([c.lon, c.lat]);
              if (!pos) return null;
              const pulsePhase = (frame / 40 + idx * 0.5) % 1;
              return (
                <g key={idx} transform={`translate(${pos[0]} ${pos[1]})`}>
                  <circle
                    r={c.r}
                    fill="none"
                    stroke={ORANGE}
                    strokeWidth={1.2}
                    opacity={0.35}
                    strokeDasharray="4 3"
                  />
                  <circle
                    r={c.r + pulsePhase * 30}
                    fill="none"
                    stroke={ORANGE}
                    strokeWidth={0.8}
                    opacity={(1 - pulsePhase) * 0.3}
                  />
                  <circle r={3} fill={ORANGE} opacity={0.8} />
                </g>
              );
            })}
          </svg>

          <ParisMarker
            x={parisPoint[0]}
            y={parisPoint[1]}
            frame={frame}
            appearFrame={appearFrame}
          />
        </div>
      </AbsoluteFill>

      {/* Vignette douce */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 85% 70% at center, transparent 0%, transparent 50%, rgba(0,0,0,0.55) 88%, #000 100%)",
        }}
      />

      {/* HUD tactique par-dessus tout */}
      <HUDOverlay frame={frame} />
    </AbsoluteFill>
  );
};
