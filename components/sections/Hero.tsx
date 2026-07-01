"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

/** Headline broken into lines → words. `variant` styles the whole line. */
const LINES: { words: string[]; variant?: "solid" | "outline" | "gradient" }[] = [
  { words: ["Engineering"] },
  { words: ["the", "software"], variant: "outline" },
  { words: ["India", "can't"] },
  { words: ["live", "without."], variant: "gradient" },
];

const HEADLINE_TEXT = "Engineering the software India can't live without.";

interface HeroProps {
  /** Fires once the preloader curtain has lifted. */
  start?: boolean;
}

export default function Hero({ start = true }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Four depth layers move at different rates on scroll (Bible: parallax depth).
  const contentY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 70]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.12]);
  const eyebrowY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -60]);

  const reveal = start && !reduced;
  let wordIndex = 0;

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* ---------- BACKGROUND LAYERS ---------- */}
      {/* Drifting light sources */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ y: sceneY, scale: sceneScale }}
      >
        <motion.div
          className="absolute left-1/2 top-[38%] h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.28) 0%, rgba(139,92,246,0.14) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={reduced ? {} : { x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[18%] top-[62%] h-[420px] w-[420px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.16) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          animate={reduced ? {} : { x: [0, -30, 0], y: [0, 25, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[16%] top-[28%] h-[360px] w-[360px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
            filter: "blur(45px)",
          }}
          animate={reduced ? {} : { x: [0, 25, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Particle field — swapped for static glows under reduced motion */}
        {!reduced && (
          <div className="absolute inset-0">
            <HeroScene reduced={reduced} />
          </div>
        )}
      </motion.div>

      {/* Masked grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 75% 75% at 50% 45%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 75% at 50% 45%, black 30%, transparent 100%)",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 55%, rgba(5,5,8,0.7) 100%)",
        }}
      />

      {/* Engineered corner annotations (split coordinates = instrument HUD) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: start ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="pointer-events-none absolute inset-0 z-[4]"
      >
        <span className="absolute left-6 top-24 font-mono text-[10px] tracking-[0.2em] text-white/15 md:left-10">
          N 19.0760°
        </span>
        <span className="absolute right-6 top-24 font-mono text-[10px] tracking-[0.2em] text-white/15 md:right-10">
          E 72.8777°
        </span>
        <span className="absolute bottom-10 left-6 font-mono text-[10px] leading-relaxed tracking-[0.2em] text-white/15 md:left-10">
          VENTURE&nbsp;STUDIO
          <br />
          BHARAT&nbsp;·&nbsp;EST.&nbsp;2025
        </span>
      </motion.div>

      {/* ---------- CONTENT ---------- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-custom relative z-[10] flex flex-col items-center pb-24 pt-28 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          style={{ y: eyebrowY }}
          initial={{ opacity: 0, y: 16 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-9 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
            Venture Studio
          </span>
          <span className="text-white/15">/</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-violet-300/70">
            India
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          aria-label={HEADLINE_TEXT}
          className="mb-9 font-display font-bold text-white"
          style={{ fontSize: "clamp(3rem, 8.4vw, 8.4rem)", lineHeight: 0.94, letterSpacing: "-0.045em" }}
        >
          {LINES.map((line, li) => (
            <span key={li} aria-hidden className="block overflow-hidden py-[0.06em]">
              <span className="inline-flex flex-wrap justify-center gap-x-[0.24em]">
                {line.words.map((word) => {
                  const i = wordIndex++;
                  return (
                    <motion.span
                      key={i}
                      className={
                        line.variant === "gradient"
                          ? "inline-block text-gradient-purple"
                          : line.variant === "outline"
                          ? "inline-block text-stroke-white"
                          : "inline-block"
                      }
                      variants={{
                        hidden: { y: "115%", opacity: 0, filter: "blur(8px)" },
                        visible: { y: "0%", opacity: 1, filter: "blur(0px)" },
                      }}
                      initial="hidden"
                      animate={start ? "visible" : "hidden"}
                      transition={{
                        duration: 0.95,
                        delay: 0.1 + i * 0.065,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </span>
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="mb-11 max-w-xl text-balance text-base font-light leading-relaxed text-white/45 md:text-lg"
        >
          We build AI-native products solving real problems for creators,
          businesses and Bharat. We don&apos;t just write code — we engineer
          companies.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={start ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.86, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#products"
            data-cursor-label="View"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">Explore Products</span>
            <ArrowUpRight
              size={15}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>

          <a
            href="#about"
            data-cursor-label="Story"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
          >
            <span>Our Story</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: start ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-[10] flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
          Scroll
        </span>
        <div className="relative h-10 w-px overflow-hidden bg-white/10">
          {!reduced && (
            <motion.span
              className="absolute left-0 top-0 h-4 w-px bg-gradient-to-b from-violet-400 to-transparent"
              animate={{ y: ["-100%", "250%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
        <ArrowDown size={12} className="text-white/25" />
      </motion.div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-40"
        style={{ background: "linear-gradient(to top, #050508 0%, transparent 100%)" }}
      />
    </section>
  );
}
