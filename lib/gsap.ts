/**
 * GSAP — centralized registration & configuration.
 * Import `{ gsap, ScrollTrigger }` from here, NEVER from "gsap" directly in
 * components. This guarantees plugins are registered exactly once and gives us
 * a single place to tune defaults, add plugins, or swap the scroll proxy.
 *
 * Ownership boundary (see ARCHITECTURE.md §Animations):
 *   GSAP owns → scroll-scrubbed timelines, pinning, parallax tied to scroll.
 *   It does NOT own → component enter/exit or gestures (that's Framer Motion).
 *
 * Lenis drives the GSAP ticker (see hooks/useLenis.ts), so ScrollTrigger stays
 * in sync with smooth scroll. There is one master clock.
 */

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  // House defaults — match the Design System motion tokens.
  gsap.defaults({ ease: "power3.out", duration: 0.9 });

  // Honor reduced motion globally: collapse durations for users who opt out.
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) {
    gsap.globalTimeline.timeScale(200); // effectively instant
    ScrollTrigger.config({ ignoreMobileResize: true });
  }

  registered = true;
}

/** Call in a cleanup to kill all triggers created by a route/section. */
export function killScrollTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

export { gsap, ScrollTrigger };
