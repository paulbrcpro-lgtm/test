import { interpolate } from "remotion";

type Props = {
  x: number;
  y: number;
  frame: number;
  appearFrame: number;
  label?: string;
};

export const ParisMarker: React.FC<Props> = ({
  x,
  y,
  frame,
  appearFrame,
  label = "PARIS",
}) => {
  const opacity = interpolate(
    frame,
    [appearFrame, appearFrame + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const elapsed = Math.max(0, frame - appearFrame);
  const pulse = 0.55 + Math.sin(elapsed / 7) * 0.35;
  const haloScale = 1 + Math.sin(elapsed / 9) * 0.25;

  const ringProgress = interpolate(
    frame,
    [appearFrame + 4, appearFrame + 48],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const ringRadius = 10 + ringProgress * 120;
  const ringOpacity = (1 - ringProgress) * 0.6;

  return (
    <svg
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <g transform={`translate(${x} ${y})`} opacity={opacity}>
        <circle
          r={90 * haloScale}
          fill="#ff2438"
          opacity={0.12 * pulse}
          style={{ filter: "blur(14px)" }}
        />
        <circle
          r={38 * haloScale}
          fill="#ff3248"
          opacity={0.45 * pulse}
          style={{ filter: "blur(5px)" }}
        />
        <circle
          r={ringRadius}
          fill="none"
          stroke="#ff4a5c"
          strokeWidth={1.5}
          opacity={ringOpacity}
        />
        <circle r={9} fill="#ff3448" opacity={0.95} />
        <circle r={3.5} fill="#fff" />
        <text
          x={16}
          y={6}
          fill="#ffd7dc"
          fontSize={18}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          letterSpacing={3}
          style={{
            filter: "drop-shadow(0 0 6px rgba(255,60,80,0.7))",
          }}
        >
          {label}
        </text>
      </g>
    </svg>
  );
};
