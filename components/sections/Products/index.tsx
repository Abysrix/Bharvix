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
    <section id="products" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom relative">
        {/* Section header */}
        <div className="mb-16">
          <motion.span
            className="label text-violet-400/60 mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Portfolio
          </motion.span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="overflow-hidden">
              <motion.h2
                className="font-display font-bold text-white"
                style={{
                  fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)",
                  lineHeight: "1",
                  letterSpacing: "-0.04em",
                }}
                initial={{ y: "105%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                Products that
                <br />
                <span className="text-gradient-purple">matter.</span>
              </motion.h2>
            </div>

            <motion.p
              className="text-white/30 text-sm leading-relaxed max-w-xs md:text-right"
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

        {/* Featured: Unipost */}
        <UnipostShowcase />

        {/* Divider with label */}
        <motion.div
          className="flex items-center gap-4 my-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex-1 h-px bg-white/[0.05]" />
          <span className="label text-white/20">Coming Next</span>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </motion.div>

        {/* Coming soon products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {comingSoonProducts.map((product, i) => (
            <ProductCard key={product.name} {...product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
