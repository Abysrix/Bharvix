"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, BarChart3, TrendingUp, Star, ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { useMounted } from "@/hooks/useMounted";
import { useBreakpoint } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTilt } from "@/hooks/useTilt";
import DashboardMockup from "./mockups/DashboardMockup";
import PhoneMockup from "./mockups/PhoneMockup";

type Feature = {
  icon: typeof Calendar;
  title: string;
  body: string;
  color: string;
  pos: string;
  side: 1 | -1;
};

const features: Feature[] = [
  { icon: Calendar, title: "Smart Scheduling", body: "AI posts at each platform's peak time.", color: "#8b5cf6", pos: "left-[2%] top-[15%]", side: -1 },
  { icon: BarChart3, title: "Deep Analytics", body: "Post-level reach, engagement & growth.", color: "#6366f1", pos: "left-[1%] top-[47%]", side: -1 },
  { icon: TrendingUp, title: "Growth Coach", body: "Weekly AI moves to grow faster.", color: "#3b82f6", pos: "right-[2%] top-[14%]", side: 1 },
  { icon: Star, title: "Creator Score", body: "One number for your social authority.", color: "#ec4899", pos: "right-[2%] top-[46%]", side: 1 },
];

/* ------------------------------------------------------------------ *
 * Cursor-reactive feature callout (tilts toward the pointer)
 * ------------------------------------------------------------------ */
function FeatureCallout({ feature }: { feature: Feature }) {
  const tilt = useTilt<HTMLDivElement>({ max: 10 });
  const Icon = feature.icon;
  return (
    <div
      ref={tilt.ref}
      {...tilt.bind}
      data-cursor="pointer"
      className="w-[190px] rounded-2xl border border-white/[0.08] bg-black/50 p-4 backdrop-blur-xl transition-colors duration-300 hover:border-white/20"
      style={{
        transform: `rotateX(${tilt.rotate.x}deg) rotateY(${tilt.rotate.y}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: `0 20px 50px -20px ${feature.color}30`,
      }}
    >
      <div
        className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg"
        style={{ background: `${feature.color}18`, border: `1px solid ${feature.color}30` }}
      >
        <Icon size={14} style={{ color: feature.color }} />
      </div>
      <div className="mb-1 text-sm font-semibold text-white">{feature.title}</div>
      <p className="text-[11px] leading-relaxed text-white/40">{feature.body}</p>
      {/* connector dot */}
      <span
        className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${feature.side === -1 ? "-right-1" : "-left-1"}`}
        style={{ background: feature.color, boxShadow: `0 0 10px ${feature.color}` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * PINNED REVEAL — Apple-keynote scroll experience (desktop / xl+)
 * ------------------------------------------------------------------ */
function PinnedReveal() {
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Dashboard mouse-follow highlight (its "reacts to cursor")
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  useEffect(() => {
    registerGsap();
    if (!stageRef.current) return;

    const ctx = gsap.context(() => {
      const feats = featureRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(titleRef.current, { opacity: 0, y: 120, scale: 1.12 });
      gsap.set(glowRef.current, { opacity: 0.12, scale: 0.6 });
      gsap.set(dashRef.current, {
        opacity: 0,
        scale: 0.5,
        rotationX: 45,
        yPercent: 16,
        transformPerspective: 1200,
        transformOrigin: "50% 60%",
      });
      gsap.set(phoneRef.current, {
        opacity: 0,
        x: 160,
        y: 50,
        rotationY: -26,
        scale: 0.85,
        transformPerspective: 1000,
      });
      feats.forEach((f, i) => gsap.set(f, { opacity: 0, y: 30, x: features[i].side * 55 }));
      gsap.set(ctaRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=3200",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(hintRef.current, { opacity: 0, duration: 0.8 }, 0)
        .to(titleRef.current, { opacity: 1, y: 0, scale: 1, duration: 2 }, 0)
        .to(glowRef.current, { opacity: 0.5, scale: 1, duration: 7 }, 0)
        .to(dashRef.current, { opacity: 1, scale: 0.82, rotationX: 18, yPercent: 6, duration: 2.4 }, 0.8)
        .to(dashRef.current, { scale: 1, rotationX: 0, yPercent: 0, duration: 2.4 }, 3.4)
        .to(phoneRef.current, { opacity: 1, x: 0, y: 0, rotationY: -12, scale: 1, duration: 2 }, 4.6)
        .to(feats, { opacity: 1, x: 0, y: 0, duration: 1.6, stagger: 0.45 }, 4.9)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 1.5 }, 6.6);
    }, stageRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  const onDashMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlow({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100, on: true });
  };

  return (
    <div
      ref={stageRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          ref={glowRef}
          className="h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(99,102,241,0.15) 40%, transparent 70%)", filter: "blur(50px)" }}
        />
      </div>

      {/* Title */}
      <div className="pointer-events-none absolute left-1/2 top-[7%] -translate-x-1/2 text-center">
        <div ref={titleRef}>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-3 py-1">
            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400/80">Featured · Live</span>
          </div>
          <h2 className="font-display font-bold leading-none text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.04em" }}>
            Unipost
          </h2>
          <p className="mt-2 font-medium text-violet-300/70" style={{ fontSize: "clamp(0.8rem, 1.1vw, 1rem)" }}>
            Schedule. Analyse. Grow.
          </p>
        </div>
      </div>

      {/* Dashboard (flex-centered; GSAP owns its transform) */}
      <div ref={dashRef} className="w-[min(58vw,800px)]">
        <div
          className="animate-float-slow"
          onMouseMove={onDashMove}
          onMouseLeave={() => setGlow((g) => ({ ...g, on: false }))}
          data-cursor-label="Explore"
        >
          <div className="relative">
            <DashboardMockup />
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
              style={{
                opacity: glow.on ? 1 : 0,
                background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.06), transparent 55%)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="absolute bottom-[7%] right-[6%]">
        <div ref={phoneRef}>
          <div className="animate-float">
            <PhoneMockup />
          </div>
        </div>
      </div>

      {/* Feature callouts */}
      {features.map((f, i) => (
        <div key={f.title} className={`absolute ${f.pos}`} style={{ perspective: "800px" }}>
          <div
            ref={(el) => {
              featureRefs.current[i] = el;
            }}
          >
            <FeatureCallout feature={f} />
          </div>
        </div>
      ))}

      {/* CTA */}
      <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2">
        <div ref={ctaRef} className="flex flex-col items-center gap-2">
          <a
            href="https://unipost.in"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-label="Open"
            className="group flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]"
          >
            Open Unipost
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <span className="font-mono text-[10px] tracking-wider text-white/25">unipost.in</span>
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={hintRef} className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Scroll to unveil ↓</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * STATIC FALLBACK — mobile & reduced-motion (clean, no pin)
 * ------------------------------------------------------------------ */
function StaticShowcase() {
  return (
    <div className="container-custom">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] p-6 sm:p-10" style={{ background: "rgba(8,8,15,0.8)" }}>
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)", filter: "blur(60px)" }}
        />

        <div className="relative mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-3 py-1">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400/80">Featured · Live</span>
          </div>
          <h2 className="font-display font-bold text-white" style={{ fontSize: "clamp(2.5rem, 9vw, 3.5rem)", letterSpacing: "-0.04em" }}>
            Unipost
          </h2>
          <p className="mt-2 font-medium text-violet-300/70">Schedule. Analyse. Grow.</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/40">
            India&apos;s most intelligent social media co-pilot. Grow your
            audience smarter — with AI at the centre.
          </p>
        </div>

        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 44, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <DashboardMockup />
        </motion.div>

        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6 }}
                className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}>
                  <Icon size={14} style={{ color: f.color }} />
                </div>
                <div>
                  <div className="mb-0.5 text-sm font-semibold text-white">{f.title}</div>
                  <p className="text-[11px] leading-relaxed text-white/40">{f.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <a
          href="https://unipost.in"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          Open Unipost
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Orchestrator — pinned on xl + fine-motion, static otherwise
 * ------------------------------------------------------------------ */
export default function UnipostShowcase() {
  const mounted = useMounted();
  const isXl = useBreakpoint("xl");
  const reduced = usePrefersReducedMotion();
  const pinned = mounted && isXl && !reduced;

  return pinned ? <PinnedReveal /> : <StaticShowcase />;
}
