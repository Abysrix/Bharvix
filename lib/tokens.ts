/**
 * BHARVIX DESIGN TOKENS
 * The single source of truth for JS-land. Mirrors tailwind.config.ts and globals.css.
 * Import these anywhere you need a raw value (Three.js, inline styles, canvas, motion).
 *
 * Rule: never hard-code a hex, duration, or ease in a component. Reference a token.
 */

/* ============================================================
 * COLOR
 * ============================================================ */
export const color = {
  /* The void — dark stage from which light emerges */
  void: {
    0: "#050508", // primary background
    1: "#0a0a12", // secondary surface
    2: "#0f0f1a", // tertiary surface
    3: "#14141f", // elevated surface
  },

  /* Signature spectrum — intelligence (violet/purple) → engineering (indigo) */
  violet: {
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6", // ★ THE Bharvix violet — the one color that is "us"
    600: "#7c3aed",
  },
  purple: {
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#4c1285",
  },
  indigo: {
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
  },

  /* Accents — semantic, rationed like seasoning */
  accent: {
    blue: "#3b82f6", // engineering
    pink: "#ec4899", // energy
    amber: "#f59e0b", // momentum
    cyan: "#06b6d4", // supporting
    emerald: "#10b981", // live / success status
  },

  /* Text — pure reserved for headlines; everything else muted */
  text: {
    pure: "#f8f8ff",
    primary: "rgba(248,248,255,0.90)",
    secondary: "rgba(248,248,255,0.50)",
    body: "rgba(248,248,255,0.38)",
    muted: "rgba(248,248,255,0.28)",
    faint: "rgba(248,248,255,0.15)",
  },

  /* Lines & glass */
  border: {
    hairline: "rgba(255,255,255,0.07)",
    hover: "rgba(255,255,255,0.14)",
    accent: "rgba(139,92,246,0.30)",
  },
  glass: {
    fill: "rgba(255,255,255,0.03)",
    fillHover: "rgba(255,255,255,0.06)",
  },
} as const;

/**
 * The text-opacity ladder — the discipline that makes the page read premium.
 * Use these levels for text; do not invent intermediate opacities.
 */
export const textLadder = {
  headline: 0.9,
  subhead: 0.5,
  body: 0.38,
  meta: 0.28,
  faint: 0.15,
} as const;

/* ============================================================
 * SPACING — 8px base rhythm
 * ============================================================ */
export const space = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "24px",
  6: "32px",
  7: "48px",
  8: "64px",
  9: "96px",
  10: "160px",
  /* Fluid section rhythm — top/bottom of every section */
  section: "clamp(5rem, 12vw, 10rem)",
  /* Container gutter */
  gutter: "clamp(1.5rem, 5vw, 4rem)",
  containerMax: "1400px",
} as const;

/* ============================================================
 * RADIUS — one consistent family, never mix arbitrary values
 * ============================================================ */
export const radius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "32px",
  full: "9999px",
} as const;

/* ============================================================
 * TYPOGRAPHY
 * ============================================================ */
export const font = {
  display: "var(--font-display)", // Syne 700–800 — headlines
  sans: "var(--font-sans)", // Plus Jakarta Sans 300–500 — body/UI
  mono: "var(--font-mono)", // Space Mono — labels, numbers, metadata
} as const;

/** Fluid display scale — [size, lineHeight, letterSpacing] */
export const typeScale = {
  display2xl: ["clamp(3.2rem, 8.5vw, 8.5rem)", "0.9", "-0.04em"],
  displayXl: ["clamp(3rem, 7vw, 7rem)", "0.95", "-0.04em"],
  displayLg: ["clamp(2.5rem, 5.5vw, 5.5rem)", "1", "-0.035em"],
  displayMd: ["clamp(2rem, 4vw, 3.5rem)", "1.05", "-0.02em"],
  displaySm: ["clamp(1.5rem, 3vw, 2.5rem)", "1.1", "-0.015em"],
  body: ["1rem", "1.6", "0"],
  small: ["0.875rem", "1.55", "0"],
  label: ["0.7rem", "1", "0.15em"], // uppercase mono
} as const;

/** The signature outline-text stroke (alternate with solid words in headlines) */
export const stroke = {
  white: "1.5px rgba(255,255,255,0.22)",
  whiteSoft: "1px rgba(255,255,255,0.12)",
  violet: "1.5px rgba(139,92,246,0.45)",
} as const;

/* ============================================================
 * SHADOWS & GLOWS
 * ============================================================ */
export const shadow = {
  glowSm: "0 0 20px rgba(139,92,246,0.20)",
  glowMd: "0 0 40px rgba(139,92,246,0.25)",
  glowLg: "0 0 80px rgba(139,92,246,0.30)",
  glowXl: "0 0 120px rgba(139,92,246,0.35)",
  glass: "0 8px 32px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.06)",
  elevation: "0 20px 60px rgba(0,0,0,0.5)",
  whiteGlow: "0 0 40px rgba(255,255,255,0.15)",
} as const;

/* ============================================================
 * GRADIENTS — color is radial light, never linear banners
 * ============================================================ */
export const gradient = {
  /* Radial light sources (for background glows) */
  glowViolet: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
  glowIndigo: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
  glowPink: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
  glowBlue: "radial-gradient(circle, rgba(59,130,246,0.20) 0%, transparent 70%)",
  heroCore:
    "radial-gradient(circle, rgba(99,102,241,0.30) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)",

  /* Text gradients (clip to text) */
  textPurple: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 40%, #6366f1 100%)",
  textAurora: "linear-gradient(135deg, #c084fc 0%, #818cf8 50%, #60a5fa 100%)",
  textWarm: "linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ec4899 100%)",

  /* CTA multi-stop wash (the one place accents intentionally blend) */
  ctaWash:
    "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 50%, rgba(236,72,153,0.06) 100%)",
} as const;

/* ============================================================
 * MOTION PRIMITIVES (raw values — see lib/motion.ts for variants)
 * ============================================================ */
export const ease = {
  /** House curve — confident deceleration into place. Default for nearly everything. */
  expo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Sharp in-out — for pinned / scrubbed reveals */
  quart: [0.76, 0, 0.24, 1] as [number, number, number, number],
  /** Subtle overshoot — magnetic elements ONLY, never playful UI */
  back: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  /** Gentle general-purpose */
  soft: [0.25, 0.8, 0.25, 1] as [number, number, number, number],
} as const;

export const duration = {
  fast: 0.4,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.2,
} as const;

/** Stagger steps between choreographed children */
export const stagger = {
  tight: 0.06,
  base: 0.08,
  loose: 0.12,
} as const;

/** Spring presets (Framer). Cursor dot is stiff/instant; ring is soft/trailing. */
export const spring = {
  cursorDot: { stiffness: 3000, damping: 80 },
  cursorRing: { stiffness: 200, damping: 30 },
  magnetic: { stiffness: 300, damping: 30 },
  nav: { type: "spring", bounce: 0.2, duration: 0.4 },
} as const;

/* ============================================================
 * GLASS — the canonical recipe
 * ============================================================ */
export const glass = {
  background: color.glass.fill,
  border: `1px solid ${color.border.hairline}`,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
} as const;

export const glassHover = {
  background: color.glass.fillHover,
  borderColor: color.border.hover,
} as const;

/* ============================================================
 * NOISE — inline SVG turbulence (no network request)
 * ============================================================ */
export const noise = {
  /** ~3.5% grain — the film stock the whole site is shot on (global overlay) */
  url: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
  /** Denser grain for the preloader / focal moments */
  urlDense: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
  opacity: 0.035,
} as const;

/* ============================================================
 * BACKGROUND — grid + spots
 * ============================================================ */
export const background = {
  /** Faint engineering grid, 80px, meant to be masked at edges */
  grid: {
    image:
      "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
    size: "80px 80px",
    mask: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
  },
} as const;

/* ============================================================
 * ICONS — Lucide, consistent weight
 * ============================================================ */
export const icon = {
  library: "lucide-react",
  strokeWidth: 1.75, // 1.5 for large, 2 for tiny; 1.75 default
  size: {
    xs: 10,
    sm: 13,
    base: 14,
    md: 16,
    lg: 20,
  },
} as const;

/* ============================================================
 * Z-INDEX SCALE — keep layering intentional
 * ============================================================ */
export const z = {
  base: 0,
  grid: 2,
  content: 10,
  nav: 100,
  cursorRing: 9998,
  cursorDot: 9999,
  noise: 9997,
  preloader: 9999,
} as const;

export const tokens = {
  color,
  textLadder,
  space,
  radius,
  font,
  typeScale,
  stroke,
  shadow,
  gradient,
  ease,
  duration,
  stagger,
  spring,
  glass,
  glassHover,
  noise,
  background,
  icon,
  z,
} as const;

export default tokens;
