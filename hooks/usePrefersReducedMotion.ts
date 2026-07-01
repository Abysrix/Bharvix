"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * True when the user has requested reduced motion. Every animation surface
 * (Framer variants, GSAP timelines, R3F frame loops) must consult this and
 * degrade gracefully — the site stays beautiful and legible without movement.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
