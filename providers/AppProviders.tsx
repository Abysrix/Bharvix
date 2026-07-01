"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import { registerGsap } from "@/lib/gsap";
import CustomCursor from "@/components/cursor/CustomCursor";

/**
 * AppProviders — the single client boundary that wires up global systems.
 * Mounted once in the root layout, wrapping all routes.
 *
 * Responsibilities:
 *   1. Lenis smooth scroll (drives the GSAP ticker → one master clock)
 *   2. GSAP plugin registration (idempotent)
 *   3. Custom cursor
 *
 * Add future global contexts (theme, auth session, feature flags, analytics)
 * here so pages never worry about provider order.
 */
export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lenis owns scroll position for the whole app.
  useLenis();

  // Register GSAP + ScrollTrigger exactly once.
  useEffect(() => {
    registerGsap();
  }, []);

  return (
    // NOTE: we intentionally do NOT use reducedMotion="user" here. It strips the
    // `y` transform from `animate` targets while leaving `initial` applied, which
    // permanently traps our curtain/mask headings (initial y:110%) outside their
    // overflow-hidden wrappers for reduced-motion users. Reduced motion is instead
    // honored explicitly where it matters most (WebGL, GSAP scrub/pin, cursor tilt,
    // count-up) via usePrefersReducedMotion — those degrade to static.
    <MotionConfig reducedMotion="never">
      <CustomCursor />
      {children}
    </MotionConfig>
  );
}
