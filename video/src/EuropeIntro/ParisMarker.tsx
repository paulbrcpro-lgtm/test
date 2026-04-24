import { interpolate } from "remotion";

type Props = {
  x: number;
  y: number;
  frame: number;
  appearFrame: number;
};

const ORANGE = "#ff8a1f";
const ORANGE_BRIGHT = "#ffb04d";

export const ParisMarker: React.FC<Props> = ({
  x,
  y,
  frame,
  appearFrame,
}) => {
  const opacity = interpolate(
    frame,
    [appearFrame, appearFrame + 22],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const elapsed = Math.max(0, frame - appearFrame);
  const pulse = 0.65 + Math.sin(elapsed / 8) * 0.3;
  const rotate = (elapsed * 0.6) % 360;

  const rings = [0, 1, 2];

  return (
    <svg
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <g transform={`translate(${x} ${y})`} opacity={opacity}>
        {/* Halo diffus orange */}
        <circle
          r={130 * pulse}
          fill={ORANGE}
          opacity={0.08 * pulse}
          style={{ filter: "blur(22px)" }}
        />

        {/* Ondes expansives */}
        {rings.map((i) => {
          const progress = ((elapsed + i * 24) / 72) % 1;
          const r = 40 + progress * 160;
          const op = (1 - progress) * 0.55;
          return (
            <circle
              key={i}
              r={r}
              fill="none"
              stroke={ORANGE}
              strokeWidth={1.5}
              opacity={op}
            />
          );
        })}

        {/* Anneau principal épais - rotatif */}
        <g transform={`rotate(${rotate})`}>
          <circle
            r={58}
            fill="none"
            stroke={ORANGE}
            strokeWidth={6}
            strokeDasharray="36 10 4 10"
            opacity={0.9}
          />
        </g>

        {/* Anneau fin interne */}
        <circle
          r={38}
          fill="none"
          stroke={ORANGE_BRIGHT}
          strokeWidth={1.5}
          strokeDasharray="4 4"
          opacity={0.9}
        />

        {/* Crosshair */}
        <line x1={-80} y1={0} x2={-16} y2={0} stroke={ORANGE} strokeWidth={1.5} opacity={0.85} />
        <line x1={16} y1={0} x2={80} y2={0} stroke={ORANGE} strokeWidth={1.5} opacity={0.85} />
        <line x1={0} y1={-80} x2={0} y2={-16} stroke={ORANGE} strokeWidth={1.5} opacity={0.85} />
        <line x1={0} y1={16} x2={0} y2={80} stroke={ORANGE} strokeWidth={1.5} opacity={0.85} />

        {/* Petits marqueurs cardinaux */}
        {[0, 90, 180, 270].map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <polygon
              points="0,-68 -4,-60 4,-60"
              fill={ORANGE}
              opacity={0.9}
            />
          </g>
        ))}

        {/* Point central */}
        <circle r={5} fill={ORANGE} />
        <circle r={2} fill="#fff" />

        {/* Label PARIS */}
        <g transform="translate(72, -42)">
          <rect
            x={0}
            y={-12}
            width={74}
            height={22}
            fill="rgba(15,15,15,0.85)"
            stroke={ORANGE}
            strokeWidth={1}
          />
          <text
            x={8}
            y={3}
            fill={ORANGE_BRIGHT}
            fontSize={12}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            letterSpacing={3}
          >
            TARGET
          </text>
        </g>
        <line
          x1={62}
          y1={-32}
          x2={72}
          y2={-42}
          stroke={ORANGE}
          strokeWidth={1}
          opacity={0.8}
        />
      </g>
    </svg>
  );
};
