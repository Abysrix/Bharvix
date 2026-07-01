"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, BarChart3, Calendar, TrendingUp, Star } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "AI picks the best time to post based on your audience's behaviour — across Instagram, LinkedIn, X and more.",
    color: "#8b5cf6",
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    description:
      "Understand what's actually working. Engagement, reach, and growth — broken down to the post level.",
    color: "#6366f1",
  },
  {
    icon: TrendingUp,
    title: "Growth Coach",
    description:
      "Your AI growth partner. Gives actionable, weekly recommendations to grow your audience faster.",
    color: "#3b82f6",
  },
  {
    icon: Star,
    title: "Creator Score",
    description:
      "A single score that measures your social authority across platforms. Track improvement over time.",
    color: "#ec4899",
  },
];

function MockDashboard() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-white/[0.07]"
      style={{ background: "rgba(10, 10, 18, 0.95)" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-4">
          <div className="w-40 h-5 rounded-md bg-white/[0.04] flex items-center justify-center mx-auto">
            <span className="text-white/20 font-mono text-[9px]">app.unipost.in</span>
          </div>
        </div>
        <div className="w-12" />
      </div>

      {/* Dashboard content */}
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-white font-display font-semibold text-sm mb-0.5">Good morning ✦</div>
            <div className="text-white/25 text-xs">Here&apos;s your creator snapshot</div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)" }}>
            <Star size={10} className="text-violet-400" />
            <span className="text-violet-300 text-xs font-medium">Score: 84</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Followers", value: "12.4K", change: "+2.3%" },
            { label: "Reach", value: "48.1K", change: "+8.7%" },
            { label: "Eng. Rate", value: "5.2%", change: "+0.4%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3 border border-white/[0.05]"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="text-white/30 text-[9px] mb-1 uppercase tracking-wider">{stat.label}</div>
              <div className="text-white font-display font-bold text-base">{stat.value}</div>
              <div className="text-green-400 text-[9px] mt-0.5">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Mini chart */}
        <div className="rounded-xl border border-white/[0.05] p-3 mb-4"
          style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/40 text-[10px] uppercase tracking-wider">Growth Trend</span>
            <span className="text-violet-400 text-[10px]">7 days</span>
          </div>
          {/* SVG chart */}
          <svg width="100%" height="40" viewBox="0 0 200 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,32 C20,30 40,28 60,22 C80,16 100,20 120,14 C140,8 160,12 180,6 L200,4 L200,40 L0,40Z"
              fill="url(#chartGrad)" />
            <path d="M0,32 C20,30 40,28 60,22 C80,16 100,20 120,14 C140,8 160,12 180,6 L200,4"
              fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Scheduled posts */}
        <div className="text-white/25 text-[9px] uppercase tracking-wider mb-2">Scheduled Today</div>
        <div className="flex flex-col gap-1.5">
          {["Instagram • 11:00 AM", "LinkedIn • 2:30 PM", "Twitter/X • 6:00 PM"].map((post) => (
            <div key={post} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span className="text-white/40 text-[10px]">{post}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UnipostShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <div
      ref={sectionRef}
      className="relative rounded-3xl overflow-hidden border border-white/[0.06] mb-6"
      style={{ background: "rgba(8, 8, 15, 0.8)" }}
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
        {/* Left: Info */}
        <div className="flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase"
                style={{
                  background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  color: "#10b981",
                }}
              >
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
              <span className="label text-white/20">Featured Product</span>
            </div>

            <div className="overflow-hidden mb-1">
              <motion.h2
                className="font-display font-bold text-white"
                style={{
                  fontSize: "clamp(3rem, 6vw, 5.5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
                initial={{ y: "105%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                Unipost
              </motion.h2>
            </div>

            <motion.p
              className="text-violet-400/70 font-medium text-base mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Schedule. Analyse. Grow.
            </motion.p>

            <motion.p
              className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              India&apos;s most intelligent social media co-pilot. Unipost helps
              creators and businesses grow their audience smarter — with AI at
              the centre.
            </motion.p>

            {/* Feature list */}
            <div className="flex flex-col gap-4 mb-10">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.7 }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: `${feature.color}15`,
                      border: `1px solid ${feature.color}25`,
                    }}
                  >
                    <feature.icon size={14} style={{ color: feature.color }} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium mb-0.5">{feature.title}</div>
                    <div className="text-white/30 text-xs leading-relaxed">{feature.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <a
              href="https://unipost.in"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="Open"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              Open Unipost
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.div>
        </div>

        {/* Right: Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="animate-float"
        >
          <MockDashboard />
        </motion.div>
      </div>
    </div>
  );
}
