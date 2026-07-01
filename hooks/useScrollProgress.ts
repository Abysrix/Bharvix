"use client";

import { useScroll, useSpring, type MotionValue } from "framer-motion";
import type { RefObject } from "react";

/**
 * Smoothed scroll progress (0→1). Without a target, tracks the whole page
 * (good for a top progress bar). With a target ref + offset, tracks that
 * element through the viewport (good for section-scoped reveals/parallax).
 */
export function useScrollProgress(
  target?: RefObject<HTMLElement>,
  offset: ["start end", "end start"] | ["start start", "end end"] = [
    "start end",
    "end start",
  ]
): { progress: MotionValue<number>; smooth: MotionValue<number> } {
  const { scrollYProgress } = useScroll(
    target ? { target, offset } : undefined
  );
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return { progress: scrollYProgress, smooth };
}
