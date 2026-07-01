"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Stat = {
  target: number | null;
  symbol?: string;
  format: (n: number) => string;
  label: string;
  desc: string;
  color: string;
};

const stats: Stat[] = [
  {
    target: 3,
    format: (n) => String(Math.round(n)).padStart(2, "0"),
    label: "Products",
    desc: "In the studio — AI-native by design",
    color: "#8b5cf6",
  },
  {
    target: 100,
    format: (n) => `${Math.round(n)}%`,
    label: "AI-Native",
    desc: "Intelligence at the core, not bolted on",
    color: "#6366f1",
  },
  {
    target: 2025,
    format: (n) => String(Math.round(n)),
    label: "Founded",
    desc: "Built for the next decade of Bharat",
    color: "#3b82f6",
  },
  {
    target: null,
    symbol: "∞",
    format: () => "∞",
    label: "Reusable Engine",
    desc: "One shared infrastructure, every product",
    color: "#ec4899",
  },
];

const pills = ["Founder-led", "India-first", "AI-native", "Equity-aligned", "Category-defining"];

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const value = useCountUp(stat.target ?? 0, { active: inView, duration: 1600 });
  const display = stat.target === null ? stat.symbol! : stat.format(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 backdrop-blur-xl transition-colors duration-500 hover:border-white/[0.12]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${stat.color}22 0%, transparent 70%)`, filter: "blur(20px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-16 w-16 opacity-40"
        style={{ background: `radial-gradient(circle at top left, ${stat.color}22, transparent 70%)` }}
      />

      <div
        className="mb-2 font-display font-bold tabular-nums"
        style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          color: stat.color,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          filter: `drop-shadow(0 0 20px ${stat.color}45)`,
        }}
      >
        {display}
      </div>
      <h3 className="mb-1 font-display text-base font-semibold text-white">{stat.label}</h3>
      <p className="text-xs leading-relaxed text-white/30">{stat.desc}</p>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(to right, transparent, ${stat.color}70, transparent)` }}
      />
    </motion.div>
  );
}

export default function Ambition() {
  const reduced = usePrefersReducedMotion();
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });
  return (
    <section className="section-padding relative">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, #050508 0%, #080810 50%, #050508 100%)" }}
      />

      <div className="container-custom relative">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div ref={headRef}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={headInView ? { opacity: 1 } : undefined}
              className="mb-4 block font-mono text-[11px] uppercase tracking-[0.2em] text-violet-400/60"
            >
              Our Ambition
            </motion.span>
            <div className="overflow-hidden py-[0.04em]">
              <motion.h2
                initial={{ y: reduced ? "0%" : "110%" }}
                animate={headInView ? { y: "0%" } : undefined}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold text-white"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)", lineHeight: 1, letterSpacing: "-0.035em" }}
              >
                What we stand for.
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-xs text-sm leading-relaxed text-white/30 md:text-right"
          >
            Numbers never tell the whole story. But they tell enough.
          </motion.p>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-xs font-medium tracking-wide text-white/25"
            >
              {pill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
