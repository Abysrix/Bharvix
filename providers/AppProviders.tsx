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
    // reducedMotion="user" makes every Framer animation honor the OS setting
    // automatically — transforms collapse, opacity stays — so sections don't
    // each re-implement reduced-motion guards.
    <MotionConfig reducedMotion="user">
      <CustomCursor />
      {children}
    </MotionConfig>
  );
}
