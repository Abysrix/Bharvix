"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const stages = [
  { label: "Problem", icon: "◈", color: "#8b5cf6", body: "Find a real, painful problem worth solving at scale." },
  { label: "Research", icon: "◉", color: "#7c6cf6", body: "Deep market research, user interviews, opportunity sizing." },
  { label: "Build", icon: "◆", color: "#6366f1", body: "Ship fast, ship smart. Engineering with precision." },
  { label: "Launch", icon: "◎", color: "#4f7bf1", body: "Strategic go-to-market with distribution baked in." },
  { label: "Learn", icon: "◐", color: "#3b82f6", body: "Obsess over data. Talk to users. Iterate relentlessly." },
  { label: "Improve", icon: "◑", color: "#6d6ff0", body: "Every cycle makes the product measurably stronger." },
  { label: "Scale", icon: "❖", color: "#a855f7", body: "Grow the base. Expand to new markets and segments." },
  { label: "Repeat", icon: "↺", color: "#ec4899", body: "Apply the learnings to the next category-defining product." },
];

function Stage({ stage, index }: { stage: (typeof stages)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-start gap-6 pb-11 last:pb-0"
    >
      {/* Node */}
      <motion.div
        className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border"
        style={{ borderColor: `${stage.color}40`, background: "#070710" }}
        animate={
          inView
            ? { boxShadow: [`0 0 0 ${stage.color}00`, `0 0 22px ${stage.color}55`, `0 0 8px ${stage.color}22`] }
            : {}
        }
        transition={{ duration: 1.4, delay: index * 0.05 }}
      >
        <span style={{ color: stage.color, fontSize: "1.1rem" }}>{stage.icon}</span>
      </motion.div>

      <div className="pt-1.5">
        <div className="mb-1.5 flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.15em]" style={{ color: `${stage.color}90` }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-lg font-bold text-white">{stage.label}</h3>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-white/35">{stage.body}</p>
      </div>
    </motion.div>
  );
}

export default function StudioModel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const { scrollYProgress: railProgress } = useScroll({
    target: railRef,
    offset: ["start center", "end center"],
  });
  const fill = useSpring(railProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const headProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const reduced = usePrefersReducedMotion();
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 55% 75% at 50% 50%, rgba(139,92,246,0.04) 0%, transparent 70%)" }}
      />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Sticky heading */}
          <div ref={headRef} className="lg:sticky lg:top-32">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-6 block font-mono text-[11px] uppercase tracking-[0.2em] text-violet-400/60"
            >
              The Studio Model
            </motion.span>

            {["How ideas", "become", "companies."].map((ln, i) => (
              <div key={ln} className="overflow-hidden py-[0.04em]">
                <motion.h2
                  initial={{ y: reduced ? "0%" : "110%" }}
                  animate={headInView ? { y: "0%" } : undefined}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={
                    i === 1
                      ? "font-display font-bold leading-none text-stroke-violet"
                      : "font-display font-bold leading-none text-white"
                  }
                  style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)", letterSpacing: "-0.035em" }}
                >
                  {ln}
                </motion.h2>
              </div>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 max-w-sm text-sm leading-relaxed text-white/35"
            >
              A structured but adaptive loop. Every sprint tightens the product;
              every launch expands the market; every learning compounds.
            </motion.p>

            <div className="mt-12 flex items-center gap-3">
              <div className="h-px w-28 overflow-hidden rounded-full bg-white/[0.08]">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-violet-500 to-indigo-500"
                  style={{ scaleX: headProgress }}
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
                Progress
              </span>
            </div>
          </div>

          {/* Pipeline */}
          <div ref={railRef} className="relative">
            {/* Track + scroll fill (aligned to node centers at left-6) */}
            <div className="absolute bottom-6 left-6 top-6 w-px -translate-x-1/2 bg-white/[0.06]" />
            <motion.div
              className="absolute left-6 top-6 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-violet-500 via-indigo-500 to-pink-500"
              style={{ bottom: 24, scaleY: fill }}
            />
            {stages.map((stage, i) => (
              <Stage key={stage.label} stage={stage} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
