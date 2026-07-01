"use client";

import { cn } from "@/lib/utils";

/**
 * Unipost mobile mockup — a floating phone that pairs with the dashboard in the
 * showcase. Circular Creator Score ring is the focal element.
 */

const SCORE = 84;

export default function PhoneMockup({ className }: { className?: string }) {
  const R = 34;
  const circumference = 2 * Math.PI * R;
  const offset = circumference * (1 - SCORE / 100);

  return (
    <div
      className={cn(
        "relative w-[230px] overflow-hidden rounded-[2.4rem] border border-white/[0.1] p-2 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)]",
        className
      )}
      style={{ background: "linear-gradient(160deg, #16161f 0%, #0a0a12 100%)" }}
    >
      {/* Screen */}
      <div className="relative overflow-hidden rounded-[2rem]" style={{ background: "#080810" }}>
        {/* Notch */}
        <div className="absolute left-1/2 top-2 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-black/80" />

        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pb-1 pt-3">
          <span className="font-mono text-[8px] text-white/40">9:41</span>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <span className="h-1.5 w-2.5 rounded-sm bg-white/40" />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <span className="font-display text-sm font-bold text-white">Unipost</span>
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600" />
        </div>

        {/* Creator Score ring */}
        <div className="mx-4 mb-3 rounded-2xl p-4" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.16)" }}>
          <div className="flex items-center gap-4">
            <div className="relative flex h-[84px] w-[84px] items-center justify-center">
              <svg width="84" height="84" className="-rotate-90">
                <circle cx="42" cy="42" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                <circle
                  cx="42"
                  cy="42"
                  r={R}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  style={{ filter: "drop-shadow(0 0 6px rgba(139,92,246,0.6))" }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-display text-xl font-bold text-white">{SCORE}</span>
                <span className="text-[7px] uppercase tracking-wider text-white/30">Score</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-1 text-[10px] font-medium text-white">Creator Score</div>
              <div className="mb-2 text-[8px] leading-relaxed text-white/35">Up 6 points this week</div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: `${SCORE}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Next post card */}
        <div className="mx-4 mb-3 rounded-2xl border border-white/[0.05] p-3" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[8px] uppercase tracking-wider text-white/30">Next Post</span>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[7px] text-emerald-400">Scheduled</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500/40 to-indigo-600/40" />
            <div className="flex-1">
              <div className="mb-0.5 h-1.5 w-full rounded-full bg-white/10" />
              <div className="h-1.5 w-2/3 rounded-full bg-white/[0.06]" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="text-[8px] text-white/30">Instagram</span>
            <span className="text-[8px] text-white/20">·</span>
            <span className="text-[8px] text-violet-300/70">Today 11:00 AM</span>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex items-center justify-around border-t border-white/[0.05] px-4 py-3">
          {["◇", "◈", "✦", "◉"].map((ic, i) => (
            <span key={i} className="text-sm" style={{ color: i === 0 ? "#8b5cf6" : "rgba(255,255,255,0.25)" }}>
              {ic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
