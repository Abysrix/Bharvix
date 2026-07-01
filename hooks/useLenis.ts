"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function useLenis() {
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // Heavier, more cinematic glide — a longer settle reads as "expensive".
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.8,
      syncTouch: true,
    });

    lenisInstance = lenis;

    // Register with GSAP ScrollTrigger if present
    const setupGsap = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time: number) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } catch {
        // GSAP not available, use native RAF
        const raf = (time: number) => {
          lenis.raf(time);
          rafIdRef.current = requestAnimationFrame(raf);
        };
        rafIdRef.current = requestAnimationFrame(raf);
      }
    };

    setupGsap();

    return () => {
      lenis.destroy();
      lenisInstance = null;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);
}

export function useScrollVelocity(callback: (velocity: number) => void) {
  useEffect(() => {
    const lenis = lenisInstance;
    if (!lenis) return;

    const onScroll = ({ velocity }: { velocity: number }) => {
      callback(velocity);
    };

    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [callback]);
}
