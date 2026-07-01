"use client";

import { cn } from "@/lib/utils";

/**
 * Unipost dashboard mockup — the "product" shown in the showcase.
 * Pure SVG/DOM (no images) so it stays crisp at any scale and costs nothing
 * to load. Deliberately looks like a real premium SaaS dashboard.
 */

function Spark({ color, up = true }: { color: string; up?: boolean }) {
  const d = up
    ? "M0,18 C8,16 14,14 22,9 C30,4 38,8 48,3"
    : "M0,4 C8,7 14,6 22,11 C30,15 38,10 48,17";
  return (
    <svg width="48" height="22" viewBox="0 0 48 22" fill="none" className="overflow-visible">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx={48} cy={up ? 3 : 17} r="1.6" fill={color} />
    </svg>
  );
}

export default function DashboardMockup({ className }: { className?: string }) {
  const stats = [
    { label: "Followers", value: "12.4K", delta: "+2.3%", color: "#8b5cf6", up: true },
    { label: "Reach", value: "48.1K", delta: "+8.7%", color: "#6366f1", up: true },
    { label: "Eng. Rate", value: "5.2%", delta: "+0.4%", color: "#10b981", up: true },
  ];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
      style={{ background: "rgba(9,9,16,0.96)" }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-white/[0.05] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
        </div>
        <div className="mx-auto flex h-6 w-56 items-center justify-center rounded-md bg-white/[0.04]">
          <span className="font-mono text-[9px] text-white/25">app.unipost.in/dashboard</span>
        </div>
        <div className="w-8" />
      </div>

      <div className="grid grid-cols-[1fr] gap-5 p-5 sm:grid-cols-[180px_1fr]">
        {/* Sidebar */}
        <aside className="hidden flex-col gap-1 sm:flex">
          <div className="mb-3 flex items-center gap-2 px-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-600">
              <span className="h-2.5 w-2.5 rounded-sm bg-white/90" />
            </span>
            <span className="font-display text-sm font-bold text-white">Unipost</span>
          </div>
          {[
            { label: "Dashboard", active: true },
            { label: "Schedule", active: false },
            { label: "Analytics", active: false },
            { label: "Growth Coach", active: false },
            { label: "Audience", active: false },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs",
                item.active ? "bg-violet-500/12 text-white" : "text-white/35"
              )}
              style={item.active ? { border: "1px solid rgba(139,92,246,0.2)" } : undefined}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: item.active ? "#8b5cf6" : "rgba(255,255,255,0.2)" }}
              />
              {item.label}
            </div>
          ))}
        </aside>

        {/* Main */}
        <main className="min-w-0">
          {/* Greeting */}
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="mb-0.5 font-display text-sm font-semibold text-white">Good morning ✦</div>
              <div className="text-[11px] text-white/25">Here&apos;s your creator snapshot</div>
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.22)" }}
            >
              <span className="text-[10px]">★</span>
              <span className="text-[11px] font-medium text-violet-200">Creator Score 84</span>
            </div>
          </div>

          {/* Stat tiles */}
          <div className="mb-4 grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/[0.05] p-3"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="mb-1.5 text-[9px] uppercase tracking-wider text-white/30">{s.label}</div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-display text-lg font-bold text-white">{s.value}</div>
                    <div className="text-[9px]" style={{ color: s.color }}>{s.delta}</div>
                  </div>
                  <Spark color={s.color} up={s.up} />
                </div>
              </div>
            ))}
          </div>

          {/* Area chart */}
          <div className="mb-4 rounded-xl border border-white/[0.05] p-4" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-white/40">Audience Growth</span>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[9px] text-white/30">30 days</span>
                <span className="text-[10px] text-violet-400">+18.2%</span>
              </div>
            </div>
            <svg width="100%" height="70" viewBox="0 0 320 70" preserveAspectRatio="none">
              <defs>
                <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,58 C30,54 50,50 80,40 C110,30 130,36 160,26 C190,16 210,22 240,14 C270,7 290,12 320,5 L320,70 L0,70 Z"
                fill="url(#dashGrad)"
              />
              <path
                d="M0,58 C30,54 50,50 80,40 C110,30 130,36 160,26 C190,16 210,22 240,14 C270,7 290,12 320,5"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="1.75"
              />
            </svg>
          </div>

          {/* Bottom row: schedule + AI coach */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/[0.05] p-3" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="mb-2 text-[9px] uppercase tracking-wider text-white/30">Scheduled Today</div>
              <div className="flex flex-col gap-1.5">
                {["Instagram · 11:00", "LinkedIn · 14:30", "Twitter/X · 18:00"].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    <span className="text-[10px] text-white/40">{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-xl p-3"
              style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)" }}
            >
              <div className="mb-1 flex items-center gap-1.5">
                <span className="text-[10px]">✦</span>
                <span className="text-[9px] uppercase tracking-wider text-indigo-300/70">AI Growth Coach</span>
              </div>
              <p className="text-[10px] leading-relaxed text-white/45">
                Post reels between 6–8 PM this week — your reach peaks 34% higher then.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
