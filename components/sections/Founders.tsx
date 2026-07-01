"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTilt } from "@/hooks/useTilt";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Founder = {
  name: string;
  role: string;
  initial: string;
  philosophy: string;
  skills: string[];
  gradient: string;
  accent: string;
  link: string;
};

const founders: Founder[] = [
  {
    name: "Devansh Tiwari",
    role: "Founder",
    initial: "DT",
    philosophy:
      "India doesn't need more copies of Silicon Valley ideas. It needs products born from Indian problems, built with Indian ambition.",
    skills: ["Product Strategy", "Venture Building", "AI Systems", "Growth"],
    gradient: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
    accent: "#8b5cf6",
    link: "https://twitter.com/bharvix",
  },
  {
    name: "Harshit Kumar",
    role: "Co-Founder",
    initial: "HK",
    philosophy:
      "The best products aren't built — they're engineered. Every architectural decision is a product decision.",
    skills: ["Full-Stack", "System Design", "Infrastructure", "AI/ML"],
    gradient: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
    accent: "#6366f1",
    link: "https://twitter.com/bharvix",
  },
];

const floatTags = [
  { top: "12%", left: "-6%" },
  { top: "42%", right: "-8%" },
  { bottom: "16%", left: "-5%" },
  { top: "68%", right: "-6%" },
];

function FounderCard({ founder, index }: { founder: Founder; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const tilt = useTilt<HTMLDivElement>({ max: 6 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Portrait */}
      <div className="relative mb-6" style={{ perspective: "1000px" }}>
        {/* Floating skill tags */}
        {founder.skills.map((skill, i) => (
          <motion.span
            key={skill}
            aria-hidden
            className="absolute z-20 hidden rounded-full border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-[10px] tracking-wide backdrop-blur-md md:block"
            style={{ ...floatTags[i], color: hovered ? founder.accent : "rgba(255,255,255,0.4)" }}
            animate={{
              y: hovered ? [0, -6, 0] : 0,
              opacity: hovered ? 1 : 0.55,
              borderColor: hovered ? `${founder.accent}40` : "rgba(255,255,255,0.1)",
            }}
            transition={{ duration: 2.4, repeat: hovered ? Infinity : 0, delay: i * 0.2, ease: "easeInOut" }}
          >
            {skill}
          </motion.span>
        ))}

        <div
          ref={tilt.ref}
          {...tilt.bind}
          data-cursor-label="Profile"
          className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/[0.08]"
          style={{
            transform: `rotateX(${tilt.rotate.x}deg) rotateY(${tilt.rotate.y}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Gradient light — grayscale → colour on hover */}
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{
              background: founder.gradient,
              filter: hovered ? "grayscale(0) saturate(1.1)" : "grayscale(0.85) brightness(0.7)",
            }}
          />
          {/* Layered glows for depth */}
          <div
            className="absolute -right-1/4 -top-1/4 h-2/3 w-2/3 rounded-full opacity-60"
            style={{ background: `radial-gradient(circle, ${founder.accent}55 0%, transparent 70%)`, filter: "blur(30px)" }}
          />
          {/* Grain */}
          <div className="noise-overlay absolute inset-0 opacity-30" />
          {/* Vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />

          {/* Big initial */}
          <span
            className="absolute inset-0 flex items-center justify-center font-display font-bold text-white/90 select-none"
            style={{ fontSize: "clamp(6rem, 14vw, 12rem)", letterSpacing: "-0.04em", textShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
          >
            {founder.initial}
          </span>

          {/* Link chip */}
          <a
            href={founder.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/60 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:text-white"
          >
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
            {founder.name}
          </h3>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-violet-400/60">
            {founder.role}
          </p>
        </div>
      </div>
      <blockquote className="mt-4 border-l-2 border-violet-500/20 pl-4 text-sm italic leading-relaxed text-white/40">
        &ldquo;{founder.philosophy}&rdquo;
      </blockquote>
    </motion.div>
  );
}

export default function Founders() {
  const reduced = usePrefersReducedMotion();
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });
  return (
    <section id="founders" className="section-padding relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 70% at 50% 40%, rgba(139,92,246,0.04) 0%, transparent 70%)" }}
      />

      <div className="container-custom relative">
        <div ref={headRef} className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : undefined}
            className="mb-4 block font-mono text-[11px] uppercase tracking-[0.2em] text-violet-400/60"
          >
            The Team
          </motion.span>

          {[
            { t: "Built by founders.", cls: "text-white" },
            { t: "Owned by builders.", cls: "text-stroke-violet" },
          ].map((l, i) => (
            <div key={l.t} className="overflow-hidden py-[0.03em]">
              <motion.h2
                initial={{ y: reduced ? "0%" : "110%" }}
                animate={headInView ? { y: "0%" } : undefined}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`font-display font-bold leading-none ${l.cls}`}
                style={{ fontSize: "clamp(2.4rem, 5.2vw, 5.2rem)", letterSpacing: "-0.04em" }}
              >
                {l.t}
              </motion.h2>
            </div>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-white/30"
          >
            We don&apos;t run a studio from a boardroom. We sit in the same
            trenches as the products we build.
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-8">
          {founders.map((f, i) => (
            <FounderCard key={f.name} founder={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
