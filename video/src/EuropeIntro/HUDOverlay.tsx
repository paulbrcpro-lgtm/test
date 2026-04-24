import { interpolate } from "remotion";

const MONO =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Courier New', monospace";

const ORANGE = "#ff8a1f";
const ORANGE_DIM = "rgba(255, 138, 31, 0.55)";
const WHITE = "rgba(235, 240, 248, 0.92)";
const WHITE_DIM = "rgba(235, 240, 248, 0.42)";

type TopChunkProps = {
  label: string;
  children?: React.ReactNode;
  width?: number;
};

const TopChunk: React.FC<TopChunkProps> = ({ label, children, width }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 4,
      minWidth: width,
      padding: "4px 10px 6px",
      borderLeft: `1px solid ${WHITE_DIM}`,
      borderRight: `1px solid ${WHITE_DIM}`,
      borderTop: `1px solid ${WHITE_DIM}`,
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -1,
        left: 0,
        height: 6,
        width: 10,
        borderLeft: `1px solid ${ORANGE}`,
        borderTop: `1px solid ${ORANGE}`,
      }}
    />
    <span
      style={{
        fontSize: 9,
        letterSpacing: 2.4,
        color: WHITE_DIM,
        fontFamily: MONO,
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontSize: 12,
        color: WHITE,
        fontFamily: MONO,
        letterSpacing: 1.2,
      }}
    >
      {children}
    </span>
  </div>
);

const PillButton: React.FC<{ active?: boolean; children: React.ReactNode }> = ({
  active,
  children,
}) => (
  <div
    style={{
      padding: "5px 12px",
      fontSize: 11,
      letterSpacing: 2,
      color: active ? "#0c0c0c" : WHITE,
      background: active ? ORANGE : "transparent",
      border: `1px solid ${active ? ORANGE : WHITE_DIM}`,
      fontFamily: MONO,
      fontWeight: 600,
    }}
  >
    {children}
  </div>
);

const CornerBracket: React.FC<{ corner: "tl" | "tr" | "bl" | "br" }> = ({
  corner,
}) => {
  const size = 38;
  const common: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    borderColor: ORANGE,
  };
  const pos: React.CSSProperties =
    corner === "tl"
      ? { top: 18, left: 18, borderLeft: `2px solid ${ORANGE}`, borderTop: `2px solid ${ORANGE}` }
      : corner === "tr"
      ? { top: 18, right: 18, borderRight: `2px solid ${ORANGE}`, borderTop: `2px solid ${ORANGE}` }
      : corner === "bl"
      ? { bottom: 18, left: 18, borderLeft: `2px solid ${ORANGE}`, borderBottom: `2px solid ${ORANGE}` }
      : { bottom: 18, right: 18, borderRight: `2px solid ${ORANGE}`, borderBottom: `2px solid ${ORANGE}` };
  return <div style={{ ...common, ...pos }} />;
};

const BottomRuler: React.FC<{ frame: number }> = ({ frame }) => {
  const ticks = 60;
  const scanX = ((frame * 6) % 900) - 30;
  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        bottom: 86,
        height: 22,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        fontFamily: MONO,
      }}
    >
      {Array.from({ length: ticks }).map((_, i) => {
        const isMajor = i % 5 === 0;
        return (
          <div
            key={i}
            style={{
              width: 1,
              height: isMajor ? 16 : 8,
              background: isMajor ? WHITE : WHITE_DIM,
              opacity: isMajor ? 0.85 : 0.5,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: `${scanX}px`,
          bottom: -4,
          width: 2,
          height: 24,
          background: ORANGE,
          boxShadow: `0 0 8px ${ORANGE}`,
        }}
      />
    </div>
  );
};

const DataReadout: React.FC<{ label: string; value: string; unit?: string }> = ({
  label,
  value,
  unit,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
      fontFamily: MONO,
      position: "relative",
      padding: "4px 14px",
    }}
  >
    <svg width="42" height="42" style={{ position: "absolute", top: -6 }}>
      <circle cx="21" cy="21" r="17" fill="none" stroke={WHITE_DIM} strokeWidth="1" />
      <path
        d="M 21 4 A 17 17 0 0 1 36 18"
        fill="none"
        stroke={ORANGE}
        strokeWidth="2"
      />
    </svg>
    <div style={{ height: 42 }} />
    <span style={{ fontSize: 14, color: WHITE, letterSpacing: 1 }}>{value}</span>
    <span style={{ fontSize: 9, color: WHITE_DIM, letterSpacing: 2 }}>
      {label}
      {unit ? ` ${unit}` : ""}
    </span>
  </div>
);

export const HUDOverlay: React.FC<{ frame: number }> = ({ frame }) => {
  const intro = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blink = Math.sin(frame / 6) > 0 ? 1 : 0.4;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        color: WHITE,
        opacity: intro,
      }}
    >
      <CornerBracket corner="tl" />
      <CornerBracket corner="tr" />
      <CornerBracket corner="bl" />
      <CornerBracket corner="br" />

      {/* Top-left cluster */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 60,
          display: "flex",
          gap: 6,
          alignItems: "stretch",
        }}
      >
        <TopChunk label="COORDINATES" width={120}>
          ALPHA 26 13
        </TopChunk>
        <TopChunk label="STAT" width={80}>
          ALPHA 23 73
        </TopChunk>
      </div>

      {/* Top-center label boxes */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 6,
          alignItems: "center",
        }}
      >
        <PillButton>SAIN</PillButton>
        <PillButton active>ERG</PillButton>
        <PillButton>SSFA</PillButton>
        <PillButton>SDF</PillButton>
      </div>

      <div
        style={{
          position: "absolute",
          top: 74,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 4,
          fontFamily: MONO,
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              background: i === 1 ? ORANGE : WHITE_DIM,
              borderRadius: "50%",
            }}
          />
        ))}
      </div>

      {/* Top-right cluster */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 60,
          display: "flex",
          gap: 6,
          flexDirection: "row-reverse",
        }}
      >
        <TopChunk label="COORDINATES" width={110}>
          48° 51′ N<br />
          2° 21′ E
        </TopChunk>
        <div
          style={{
            padding: "6px 12px",
            border: `1px solid ${WHITE_DIM}`,
            display: "flex",
            gap: 10,
            alignItems: "center",
            fontFamily: MONO,
          }}
        >
          <span
            style={{
              fontSize: 10,
              color: blink ? ORANGE : WHITE_DIM,
              letterSpacing: 2,
            }}
          >
            ● ACTIVE
          </span>
          <span style={{ fontSize: 10, color: WHITE_DIM, letterSpacing: 2 }}>
            ○ PASSIVE
          </span>
        </div>
        <TopChunk label="COORDINATES" width={120}>
          CH-SEINE
          <br />
          CODE:148-01-PARIS
        </TopChunk>
      </div>

      {/* FG-05 tag */}
      <div
        style={{
          position: "absolute",
          top: 110,
          right: 60,
          padding: "8px 16px",
          border: `1px solid ${ORANGE}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: MONO,
          background: "rgba(255,138,31,0.06)",
        }}
      >
        <span style={{ color: ORANGE, fontSize: 14 }}>▶</span>
        <span style={{ fontSize: 15, color: WHITE, letterSpacing: 3 }}>
          FG-05
        </span>
      </div>

      {/* Top-left side label */}
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 60,
          fontSize: 10,
          color: WHITE_DIM,
          letterSpacing: 3,
          fontFamily: MONO,
        }}
      >
        CONTROL
      </div>

      {/* Bottom ruler */}
      <BottomRuler frame={frame} />

      {/* Bottom data readouts */}
      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 18,
          alignItems: "flex-end",
        }}
      >
        <DataReadout label="CO2" value="712" />
        <DataReadout label="LAT" value="48.85" />
        <DataReadout label="LONG" value="2.35" />
        <DataReadout label="SIGNAL" value="1057" />
        <DataReadout label="ALTITUDE" value="1347" unit="M" />
      </div>

      {/* Switch indicator bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: 60,
          display: "flex",
          gap: 8,
          alignItems: "center",
          fontFamily: MONO,
        }}
      >
        <span style={{ fontSize: 10, color: WHITE_DIM, letterSpacing: 3 }}>
          SWITCH
        </span>
        <div
          style={{
            width: 10,
            height: 10,
            background: ORANGE,
            boxShadow: `0 0 6px ${ORANGE_DIM}`,
          }}
        />
      </div>

      {/* OpenStreetMap credit */}
      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: 60,
          fontSize: 9,
          color: WHITE_DIM,
          letterSpacing: 2,
          fontFamily: MONO,
        }}
      >
        © EUROPEAN CARTOGRAPHY CONTRIBUTORS
      </div>

      {/* Coverage label */}
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 120,
          fontSize: 11,
          color: WHITE,
          letterSpacing: 4,
          fontFamily: MONO,
        }}
      >
        COVERAGE
      </div>
    </div>
  );
};
