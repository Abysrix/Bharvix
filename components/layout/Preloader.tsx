"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORD = "BHARVIX";

interface PreloaderProps {
  onComplete?: () => void;
}

/**
 * Preloader — a ritual, not a spinner (Design Bible §XII).
 * The wordmark starts as an outline; a solid fill WIPES across it left→right,
 * driven by the load percentage — the site's signature outline→solid move,
 * performed on entry. At 100% the curtain lifts to reveal the hero beneath.
 */
export default function Preloader({ onComplete }: PreloaderProps) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let timeoutId1: NodeJS.Timeout;
    let timeoutId2: NodeJS.Timeout;

    const DURATION = 1950; // ms to reach 100 — a deliberate, unhurried climb
    let lastTime = performance.now();
    let accumulatedTime = 0;

    const tick = (now: number) => {
      let dt = now - lastTime;
      lastTime = now;

      // Cap delta time per frame to prevent large skips during initial load lags
      if (dt > 33) {
        dt = 33;
      }

      accumulatedTime += dt;
      const t = Math.min(accumulatedTime / DURATION, 1);
      // easeInOutCubic for an organic, mechanical climb
      const eased =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setPct(Math.round(eased * 100));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        timeoutId1 = setTimeout(() => {
          setDone(true);
          timeoutId2 = setTimeout(() => onComplete?.(), 1000);
        }, 260);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader-curtain"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#050508" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            scale: 1.06,
            transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Grain */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Ambient glow that intensifies with progress */}
          <div
            className="absolute h-[600px] w-[600px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
              filter: "blur(50px)",
              opacity: 0.1 + (pct / 100) * 0.22,
              transform: `scale(${0.8 + (pct / 100) * 0.3})`,
            }}
          />

          {/* Wordmark — outline base + fill wipe */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            exit={{ y: -44, opacity: 0, scale: 0.97, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          >
            {/* Outline layer */}
            <span
              className="font-display font-bold select-none block"
              style={{
                fontSize: "clamp(2.8rem, 9vw, 7rem)",
                letterSpacing: "-0.04em",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.22)",
              }}
            >
              {WORD}
            </span>
            {/* Solid fill layer, clipped by progress */}
            <span
              className="font-display font-bold select-none block absolute inset-0 text-white"
              style={{
                fontSize: "clamp(2.8rem, 9vw, 7rem)",
                letterSpacing: "-0.04em",
                clipPath: `inset(0 ${100 - pct}% 0 0)`,
                textShadow: "0 0 40px rgba(139,92,246,0.5)",
              }}
            >
              {WORD}
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="mt-5 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Venture Studio · India
          </motion.p>

          {/* Counter (bottom corners) */}
          <div className="absolute bottom-8 left-0 right-0 flex items-end justify-between px-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
              Loading
            </span>
            <span className="font-display font-bold tabular-nums text-white/70"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", letterSpacing: "-0.03em" }}>
              {String(pct).padStart(3, "0")}
              <span className="text-white/25 text-base align-top ml-0.5">%</span>
            </span>
          </div>

          {/* Baseline progress line */}
          <div className="absolute bottom-0 left-0 h-px w-full bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
              style={{ width: `${pct}%`, boxShadow: "0 0 12px rgba(139,92,246,0.6)" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
