/**
 * BHARVIX MOTION PRESETS
 * Reusable Framer Motion variants. Import these instead of writing inline variants.
 * Mandate from the Design Bible: reusable animations, no duplicated motion code.
 *
 * House rules baked in:
 *  - Ease out ([0.16,1,0.3,1]) unless a preset says otherwise
 *  - 600–1100ms reveals
 *  - Only transform & opacity animate
 *  - Reveal once (see `viewportOnce`)
 */

import type { Variants } from "framer-motion";
import { ease, duration, stagger } from "./tokens";

/* ------------------------------------------------------------------
 * Viewport defaults — reveal a single time, slightly before fully in view
 * ------------------------------------------------------------------ */
export const viewportOnce = { once: true, margin: "-80px" } as const;
export const viewportEager = { once: true, margin: "-40px" } as const;

/* ------------------------------------------------------------------
 * FADE + RISE — the everyday entrance
 * ------------------------------------------------------------------ */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.expo },
  },
};

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.expo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.base, ease: ease.expo } },
};

/* ------------------------------------------------------------------
 * CURTAIN REVEAL — the signature text entrance.
 * Wrap the element in a container with `overflow-hidden`, apply this to the child.
 * ------------------------------------------------------------------ */
export const curtainLine: Variants = {
  hidden: { y: "105%" },
  show: {
    y: "0%",
    transition: { duration: duration.cinematic, ease: ease.expo },
  },
};

/** Clip-path variant of the curtain (masks from the bottom up) */
export const curtainClip: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0, y: 20 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.expo },
  },
};

/* ------------------------------------------------------------------
 * BLUR IN — for logo letters / focal reveals
 * ------------------------------------------------------------------ */
export const blurIn: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: ease.expo },
  },
};

/* ------------------------------------------------------------------
 * SCALE IN — for cards / stat panels
 * ------------------------------------------------------------------ */
export const scaleIn: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: duration.slow, ease: ease.expo },
  },
};

/* ------------------------------------------------------------------
 * DIRECTIONAL SLIDES
 * ------------------------------------------------------------------ */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: duration.slow, ease: ease.expo } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: duration.slow, ease: ease.expo } },
};

/* ------------------------------------------------------------------
 * STAGGER CONTAINER — choreograph children, never dump them
 * ------------------------------------------------------------------ */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger.base,
      delayChildren: 0.1,
    },
  },
};

/** Build a custom stagger container when you need different timing */
export function makeStagger(
  staggerChildren: number = stagger.base,
  delayChildren: number = 0.1
): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren, delayChildren } },
  };
}

/* ------------------------------------------------------------------
 * DELAY HELPER — add a delay to any transition without rewriting the variant
 * ------------------------------------------------------------------ */
export function withDelay(variant: Variants, delay: number): Variants {
  const show = variant.show as Record<string, unknown>;
  const transition = (show?.transition as Record<string, unknown>) ?? {};
  return {
    ...variant,
    show: { ...show, transition: { ...transition, delay } },
  };
}

/* ------------------------------------------------------------------
 * HOVER / TAP presets for interactive primitives
 * ------------------------------------------------------------------ */
export const hoverLift = {
  whileHover: { y: -2, transition: { duration: 0.3, ease: ease.expo } },
  whileTap: { scale: 0.98 },
} as const;

export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
} as const;

/* ------------------------------------------------------------------
 * Convenience: standard "reveal on scroll" prop bundle.
 * Spread onto a motion element: <motion.div {...reveal(fadeUp)} />
 * ------------------------------------------------------------------ */
export function reveal(variant: Variants = fadeUp, delay = 0) {
  return {
    variants: delay ? withDelay(variant, delay) : variant,
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: viewportOnce,
  };
}
