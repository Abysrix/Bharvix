"use client";

import { motion } from "framer-motion";
import UnipostShowcase from "./UnipostShowcase";
import ProductCard from "./ProductCard";

const comingSoonProducts = [
  {
    name: "Zuppy",
    tagline: "Hyperlocal business intelligence.",
    description:
      "Giving local businesses the analytics and automation tools that only enterprises could previously afford.",
    tags: ["Local Business", "AI Analytics", "Automation"],
    accent: "#f59e0b",
    status: "coming-soon" as const,
  },
  {
    name: "Jarvis",
    tagline: "Your AI chief of staff.",
    description:
      "An intelligent operations layer for founders and teams — managing tasks, meetings, priorities and decisions.",
    tags: ["Productivity", "AI Assistant", "Founders"],
    accent: "#06b6d4",
    status: "coming-soon" as const,
  },
];

export default function Products() {
  return (
    // NOTE: no `overflow-hidden` here — it would break the GSAP-pinned stage
    // inside UnipostShowcase. Decorative bleed is clipped by an inner wrapper.
    <section id="products" className="section-padding relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 70%)" }}
        />
      </div>

      {/* Header */}
      <div className="container-custom relative mb-4">
        <motion.span
          className="mb-4 block font-mono text-[11px] uppercase tracking-[0.2em] text-violet-400/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Our Portfolio
        </motion.span>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="overflow-hidden py-[0.04em]">
            <motion.h2
              className="font-display font-bold text-white"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)", lineHeight: 1, letterSpacing: "-0.04em" }}
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Products that <span className="text-gradient-purple">matter.</span>
            </motion.h2>
          </div>

          <motion.p
            className="max-w-xs text-sm leading-relaxed text-white/30 md:text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Every product we ship is a bet we&apos;re making on India&apos;s
            digital future.
          </motion.p>
        </div>
      </div>

      {/* Featured: Unipost — full-bleed pinned reveal */}
      <UnipostShowcase />

      {/* Coming next */}
      <div className="container-custom relative">
        <motion.div
          className="my-10 flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="h-px flex-1 bg-white/[0.05]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">Coming Next</span>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {comingSoonProducts.map((product, i) => (
            <ProductCard key={product.name} {...product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
