"use client";

import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const WORDS = [
  "BUILD",
  "OWN",
  "SCALE",
  "AI-NATIVE",
  "INDIA-FIRST",
  "VENTURE STUDIO",
  "CATEGORY DEFINING",
  "GENERATIONAL",
];

const SEPARATOR = "✦";

function MarqueeTrack({ direction = 1 }: { direction?: 1 | -1 }) {
  const items = [...WORDS, ...WORDS];

  return (
    <div className="flex items-center gap-8 pr-8">
      {items.map((word, i) => (
        <span key={i} className="flex items-center gap-8 shrink-0">
          <span
            className="font-display font-bold tracking-tight whitespace-nowrap select-none"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              color: i % 2 === 0 ? "rgba(255,255,255,0.12)" : "transparent",
              WebkitTextStroke: i % 2 !== 0 ? "1px rgba(255,255,255,0.12)" : "none",
            }}
          >
            {word}
          </span>
          <span className="text-violet-500/40 text-xl">{SEPARATOR}</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-8%", "0%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 overflow-hidden border-y border-white/[0.04]"
    >
      {/* Top gradient fade */}
      <div
        className="absolute inset-y-0 left-0 w-40 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #050508, transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-40 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #050508, transparent)" }}
      />

      {/* Row 1 */}
      <motion.div
        className="flex mb-6"
        style={{ x: x1 }}
      >
        <div
          className="marquee-track"
          style={{ animation: "marqueeLeft 40s linear infinite" }}
        >
          <MarqueeTrack direction={1} />
          <MarqueeTrack direction={1} />
        </div>
      </motion.div>

      {/* Row 2 — reversed */}
      <motion.div
        className="flex"
        style={{ x: x2 }}
      >
        <div
          className="marquee-track"
          style={{ animation: "marqueeLeft 55s linear infinite reverse" }}
        >
          <MarqueeTrack direction={-1} />
          <MarqueeTrack direction={-1} />
        </div>
      </motion.div>
    </section>
  );
}
