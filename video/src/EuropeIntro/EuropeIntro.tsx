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

  const pushEnd = Math.round(durationInFrames * 0.78);
  const t = interpolate(frame, [0, pushEnd], [0, 1], {
    easing: Easing.bezier(0.42, 0, 0.18, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(t, [0, 1], [950, 5800]);
  const cx = interpolate(t, [0, 1], [EUROPE_CENTER[0], PARIS[0]]);
  const cy = interpolate(t, [0, 1], [EUROPE_CENTER[1], PARIS[1]]);

  const projection = geoMercator()
    .center([cx, cy])
    .scale(scale)
    .translate([width / 2, height / 2]);

  const pathGen = geoPath(projection);
  const parisPoint = projection(PARIS) ?? [width / 2, height / 2];

  const tiltDeg = interpolate(t, [0, 1], [22, 12]);
  const strokeWidth = interpolate(t, [0, 1], [1.0, 0.75]);

  const introFade = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const appearFrame = Math.round(durationInFrames * 0.62);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 55%, #0a1626 0%, #050a15 55%, #01030a 100%)",
      }}
    >
      <DotGrid />

      <AbsoluteFill
        style={{
          perspective: "2600px",
          perspectiveOrigin: "50% 48%",
          opacity: introFade,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            transform: `rotateX(${tiltDeg}deg)`,
          }}
        >
          <svg
            width={width}
            height={height}
            style={{ position: "absolute", inset: 0 }}
          >
            <defs>
              <filter
                id="line-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="2.2" result="blur1" />
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="0.6"
                  result="blur2"
                />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#line-glow)">
              {countryFeatures.map((f, i) => {
                const d = pathGen(f);
                if (!d) return null;
                return (
                  <path
                    key={(f.id as string | number | undefined) ?? i}
                    d={d}
                    fill="rgba(120,180,255,0.03)"
                    stroke="rgba(235,245,255,0.92)"
                    strokeWidth={strokeWidth}
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
            "radial-gradient(ellipse 70% 55% at center, transparent 0%, transparent 38%, rgba(2,5,12,0.55) 75%, rgba(0,0,0,0.92) 100%)",
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
