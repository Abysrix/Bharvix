"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const LINES: { text: string; outline?: boolean }[] = [
  { text: "We're not building" },
  { text: "software.", outline: true },
  { text: "We're engineering" },
  { text: "India's next generation" },
  { text: "of products.", outline: true },
];

export default function Vision() {
  const ref = useRef<HTMLElement>(null);
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.7, 0.95], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.4], [0.96, 1]);
  const glow = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section ref={ref} className="relative flex items-center justify-center overflow-hidden py-40 md:py-64">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </motion.div>

      <motion.div style={{ opacity, scale }} className="container-custom relative text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12 inline-flex items-center gap-2 rounded-full border border-white/[0.06] px-4 py-2"
        >
          <span className="h-1 w-1 animate-pulse rounded-full bg-violet-400/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">The Long View</span>
        </motion.div>

        <h2 ref={headRef} className="mx-auto max-w-5xl">
          {LINES.map((ln, i) => (
            <span key={ln.text} className="block overflow-hidden py-[0.02em] leading-[1.04]">
              <motion.span
                initial={{ y: reduced ? "0%" : "110%" }}
                animate={headInView ? { y: "0%" } : undefined}
                transition={{ duration: 1.1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={
                  ln.outline
                    ? "inline-block font-display font-bold text-stroke-white"
                    : "inline-block font-display font-bold text-white"
                }
                style={{ fontSize: "clamp(2.6rem, 6vw, 6.5rem)", letterSpacing: "-0.04em" }}
              >
                {ln.text}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mx-auto mt-12 max-w-lg text-base leading-relaxed text-white/20"
        >
          Every line of code, every product, every company — points toward the
          same north star.
        </motion.p>
      </motion.div>
    </section>
  );
}
