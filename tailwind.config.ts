import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#050508",
          secondary: "#0a0a12",
          tertiary: "#0f0f1a",
        },
        purple: {
          950: "#1a0533",
          900: "#2d0963",
          800: "#4c1285",
          700: "#6b21a8",
          600: "#9333ea",
          500: "#a855f7",
          400: "#c084fc",
          300: "#d8b4fe",
          200: "#e9d5ff",
          100: "#f3e8ff",
        },
        violet: {
          600: "#7c3aed",
          500: "#8b5cf6",
          400: "#a78bfa",
        },
        indigo: {
          600: "#4f46e5",
          500: "#6366f1",
          400: "#818cf8",
        },
        zinc: {
          950: "#09090b",
          900: "#18181b",
          800: "#27272a",
          700: "#3f3f46",
          600: "#52525b",
          500: "#71717a",
          400: "#a1a1aa",
          300: "#d4d4d8",
          200: "#e4e4e7",
          100: "#f4f4f5",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(4rem, 10vw, 9rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(3rem, 7vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 2s linear infinite",
        "marquee-left": "marqueeLeft 30s linear infinite",
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marqueeLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.8" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glow-purple": "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
        "glow-indigo": "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        noise: "url('/noise.svg')",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(139, 92, 246, 0.2)",
        "glow-md": "0 0 40px rgba(139, 92, 246, 0.25)",
        "glow-lg": "0 0 80px rgba(139, 92, 246, 0.3)",
        "glow-xl": "0 0 120px rgba(139, 92, 246, 0.35)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
