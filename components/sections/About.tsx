"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const principles = [
  {
    number: "01",
    title: "We own what we build.",
    body: "Unlike agencies, we take equity. Our success is tied to the product's success — not a project timeline or an invoice.",
  },
  {
    number: "02",
    title: "We build for Bharat.",
    body: "Every product solves a real problem at real Indian scale — tier-2 cities, vernacular markets, digital-first businesses.",
  },
  {
    number: "03",
    title: "AI is the foundation.",
    body: "Not a feature. Not a buzzword. Every product in the portfolio has intelligence at its core — from day one.",
  },
];

const notTags = ["an agency", "a freelancer", "a SaaS shop"];

function Principle({
  number,
  title,
  body,
  index,
}: {
  number: string;
  title: string;
  body: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative border-l border-white/[0.07] pl-6 transition-colors duration-500 hover:border-violet-500/40"
    >
      <span className="absolute -left-px top-0 h-0 w-px bg-gradient-to-b from-violet-400 to-transparent transition-all duration-500 group-hover:h-full" />
      <span className="mb-3 block font-mono text-[11px] tracking-[0.2em] text-violet-400/50">
        {number}
      </span>
      <h3 className="mb-2 font-display text-xl font-semibold leading-snug text-white">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-white/40">{body}</p>
    </motion.div>
  );
}

export default function About() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });
  const tagsRef = useRef(null);
  const tagsInView = useInView(tagsRef, { once: true, margin: "-60px" });

  const line = (delay: number) => ({
    initial: { y: "110%" },
    animate: headInView ? { y: "0%" } : {},
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Faint editorial watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none font-display font-bold leading-none text-white/[0.015] lg:block"
        style={{ fontSize: "22rem", letterSpacing: "-0.05em" }}
      >
        STUDIO
      </span>

      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/4"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container-custom relative">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 block font-mono text-[11px] uppercase tracking-[0.2em] text-violet-400/60"
        >
          Who We Are
        </motion.span>

        {/* The reframe */}
        <div ref={headRef} className="mb-20 max-w-5xl">
          <div className="overflow-hidden py-[0.05em]">
            <motion.h2
              {...line(0)}
              className="font-display font-bold leading-[0.95] text-white"
              style={{ fontSize: "clamp(2.8rem, 6.5vw, 6.5rem)", letterSpacing: "-0.04em" }}
            >
              Not an agency.
            </motion.h2>
          </div>
          <div className="overflow-hidden py-[0.05em]">
            <motion.h2
              {...line(0.1)}
              className="font-display font-bold leading-[0.95] text-gradient-purple"
              style={{ fontSize: "clamp(2.8rem, 6.5vw, 6.5rem)", letterSpacing: "-0.04em" }}
            >
              A venture studio.
            </motion.h2>
          </div>
        </div>

        {/* Two-column editorial */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 text-base leading-relaxed text-white/50 md:text-lg"
            >
              We conceive ideas. Engineer products. Launch companies. Then scale
              them — all under one roof, with aligned incentives.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 text-sm leading-relaxed text-white/30"
            >
              We don&apos;t take briefs. We take bets — on problems worth
              solving, markets worth owning, and teams willing to go all in.
            </motion.p>

            {/* Struck tags → A studio */}
            <div ref={tagsRef} className="flex flex-wrap items-center gap-2.5">
              {notTags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={tagsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative rounded-full border border-white/[0.07] px-3.5 py-1.5 text-xs font-medium text-white/30"
                >
                  <span className="relative">
                    {tag}
                    <motion.span
                      className="absolute left-0 top-1/2 h-px bg-white/30"
                      initial={{ width: 0 }}
                      animate={tagsInView ? { width: "100%" } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </span>
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={tagsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                className="rounded-full border border-violet-500/40 bg-violet-600/10 px-3.5 py-1.5 text-xs font-semibold text-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
              >
                → A studio
              </motion.span>
            </div>
          </div>

          {/* Principles */}
          <div className="flex flex-col gap-10">
            {principles.map((p, i) => (
              <Principle key={p.number} {...p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
