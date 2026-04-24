import { AbsoluteFill } from "remotion";

export const DotGrid: React.FC = () => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <pattern
            id="dotgrid"
            width={46}
            height={46}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={1} cy={1} r={1} fill="#1b2a3f" opacity={0.55} />
          </pattern>
          <pattern
            id="linegrid"
            width={230}
            height={230}
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 230 0 L 0 0 0 230"
              fill="none"
              stroke="#0f1a2a"
              strokeWidth={1}
              opacity={0.7}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#linegrid)" />
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>
    </AbsoluteFill>
  );
};
