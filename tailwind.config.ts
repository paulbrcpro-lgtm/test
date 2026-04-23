import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#FAFAF9",
          50: "#FAFAF9",
          100: "#E4E4E7",
          200: "#A1A1AA",
          300: "#71717A",
          400: "#52525B",
          500: "#3F3F46",
          600: "#27272A",
          700: "#1F1F23",
          800: "#18181B",
          900: "#0F0F11",
          950: "#09090B",
        },
        gold: {
          DEFAULT: "#EAB308",
          50: "#FEFCE8",
          100: "#FEF9C3",
          200: "#FEF08A",
          300: "#FDE047",
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
          800: "#854D0E",
          900: "#713F12",
        },
        surface: "#09090B",
        "surface-2": "#111114",
        "surface-3": "#18181B",
        border: "#1F1F23",
        muted: "#A1A1AA",
      },
      fontFamily: {
        sans: ["Satoshi", "system-ui", "sans-serif"],
        body: ["General Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 6.5vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "display-xl": ["clamp(2.5rem, 5vw, 4.25rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        prose: "65ch",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "aurora-1": "aurora-1 22s ease-in-out infinite",
        "aurora-2": "aurora-2 28s ease-in-out infinite",
        "aurora-3": "aurora-3 24s ease-in-out infinite",
        "marquee": "marquee 45s linear infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "aurora-1": {
          "0%, 100%": { transform: "translate3d(-20%, -10%, 0) scale(1)" },
          "50%": { transform: "translate3d(10%, 15%, 0) scale(1.15)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate3d(20%, 15%, 0) scale(1.05)" },
          "50%": { transform: "translate3d(-15%, -10%, 0) scale(0.95)" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate3d(0%, 20%, 0) scale(0.9)" },
          "50%": { transform: "translate3d(-20%, -15%, 0) scale(1.1)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
