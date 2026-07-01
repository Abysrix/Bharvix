"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function MagneticButton({
  href,
  external,
  variant,
  cursorLabel,
  children,
}: {
  href: string;
  external?: boolean;
  variant: "primary" | "secondary";
  cursorLabel: string;
  children: React.ReactNode;
}) {
  const m = useMagnetic<HTMLAnchorElement>({ strength: 0.4 });
  return (
    <motion.a
      ref={m.ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-cursor-label={cursorLabel}
      style={{ x: m.x, y: m.y }}
      {...m.bind}
      className={
        variant === "primary"
          ? "group flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]"
          : "group flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white/75 backdrop-blur-sm transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
      }
    >
      {variant === "secondary" && <Mail size={14} />}
      {children}
      {variant === "primary" && (
        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </motion.a>
  );
}

export default function CTA() {
  const reduced = usePrefersReducedMotion();
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.08]"
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.09) 50%, rgba(236,72,153,0.07) 100%)" }}
          />
          <div
            aria-hidden
            className="absolute -left-24 -top-24 h-96 w-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)", filter: "blur(60px)" }}
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)", filter: "blur(60px)" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          <div ref={headRef} className="relative px-8 py-16 text-center md:px-20 md:py-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-4 py-2"
            >
              <span className="h-1 w-1 animate-pulse rounded-full bg-violet-400" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300/70">Join the Journey</span>
            </motion.div>

            {[
              { t: "Ready to build", cls: "text-white" },
              { t: "something great?", cls: "text-stroke-white" },
            ].map((l, i) => (
              <div key={l.t} className="overflow-hidden py-[0.02em]">
                <motion.h2
                  initial={{ y: reduced ? "0%" : "110%" }}
                  animate={headInView ? { y: "0%" } : undefined}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-display font-bold leading-[0.95] ${l.cls}`}
                  style={{ fontSize: "clamp(2.6rem, 6.5vw, 6.5rem)", letterSpacing: "-0.04em" }}
                >
                  {l.t}
                </motion.h2>
              </div>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mx-auto mb-10 mt-8 max-w-md text-base leading-relaxed text-white/40"
            >
              A founder with a problem, an investor who sees the vision, or an
              engineer who wants to build — we want to talk.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <MagneticButton href="https://unipost.in" external variant="primary" cursorLabel="View">
                Explore Products
              </MagneticButton>
              <MagneticButton href="mailto:hello@bharvix.com" variant="secondary" cursorLabel="Email">
                Contact Bharvix
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
