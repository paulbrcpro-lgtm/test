import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { geoMercator, geoPath } from "d3-geo";
import { countryFeatures } from "./data";
import { DotGrid } from "./DotGrid";
import { ParisMarker } from "./ParisMarker";

const PARIS: [number, number] = [2.3522, 48.8566];
const EUROPE_CENTER: [number, number] = [14, 54];

export const EuropeIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // Phase 1 (drift, 0-25%): la caméra flotte à peine, on admire l'Europe
  // Phase 2 (push, 25-90%): zoom cinématique vers Paris, easing doux
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

  // Combinaison : la phase drift couvre ~10 % de la course, la phase push les 90 % restants
  const t = drift * 0.08 + push * 0.92;

  const scale = interpolate(t, [0, 1], [900, 5400]);
  const cx = interpolate(t, [0, 1], [EUROPE_CENTER[0], PARIS[0]]);
  const cy = interpolate(t, [0, 1], [EUROPE_CENTER[1], PARIS[1]]);

  const projection = geoMercator()
    .center([cx, cy])
    .scale(scale)
    .translate([width / 2, height / 2]);

  const pathGen = geoPath(projection);
  const parisPoint = projection(PARIS) ?? [width / 2, height / 2];

  // Effet 3D biais : inclinaison X marquée, léger swivel Y et micro roulis Z
  const tiltX = interpolate(t, [0, 1], [34, 16]);
  const tiltY = interpolate(t, [0, 1], [-14, 5]);
  const tiltZ = interpolate(t, [0, 1], [-3.5, 0.5]);
  // Micro-dérive continue pour un rendu "drone"
  const orbitY = Math.sin(frame / 70) * 1.8;
  const orbitX = Math.cos(frame / 90) * 0.9;

  // Traits plus épais (style Micode) - core blanc + halo cyan
  const strokeWidth = interpolate(t, [0, 1], [2.6, 1.9]);
  const coreWidth = interpolate(t, [0, 1], [1.3, 0.9]);

  const introFade = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const appearFrame = Math.round(durationInFrames * 0.7);

  return (
    <AbsoluteFill
      style={{
        background: "#000000",
      }}
    >
      <DotGrid />

      <AbsoluteFill
        style={{
          perspective: "1900px",
          perspectiveOrigin: "50% 46%",
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
                id="cyan-glow"
                x="-80%"
                y="-80%"
                width="260%"
                height="260%"
              >
                <feGaussianBlur stdDeviation="8" result="bigBlur" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="midBlur" />
                <feMerge>
                  <feMergeNode in="bigBlur" />
                  <feMergeNode in="midBlur" />
                </feMerge>
              </filter>
              <filter
                id="core-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="0.6" result="coreBlur" />
                <feMerge>
                  <feMergeNode in="coreBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Couche 1 : halo cyan large et diffus */}
            <g filter="url(#cyan-glow)">
              {countryFeatures.map((f, i) => {
                const d = pathGen(f);
                if (!d) return null;
                return (
                  <path
                    key={`halo-${(f.id as string | number | undefined) ?? i}`}
                    d={d}
                    fill="none"
                    stroke="#2fd9ff"
                    strokeWidth={strokeWidth + 1.2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    opacity={0.85}
                  />
                );
              })}
            </g>
            {/* Couche 2 : trait principal blanc lumineux */}
            <g filter="url(#core-glow)">
              {countryFeatures.map((f, i) => {
                const d = pathGen(f);
                if (!d) return null;
                return (
                  <path
                    key={`stroke-${(f.id as string | number | undefined) ?? i}`}
                    d={d}
                    fill="rgba(10,30,60,0.35)"
                    stroke="rgba(220,240,255,0.55)"
                    strokeWidth={strokeWidth}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                );
              })}
            </g>
            {/* Couche 3 : cœur blanc éclatant très fin */}
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
                  />
                );
              })}
            </g>
          </svg>

          <ParisMarker
            x={parisPoint[0]}
            y={parisPoint[1]}
            frame={frame}
            appearFrame={appearFrame}
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 75% 60% at center, transparent 0%, transparent 45%, rgba(0,0,0,0.75) 85%, #000 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          pointerEvents: "none",
          backdropFilter: "blur(2px)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at center, transparent 55%, black 92%)",
          maskImage:
            "radial-gradient(ellipse 70% 55% at center, transparent 55%, black 92%)",
        }}
      />

      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
