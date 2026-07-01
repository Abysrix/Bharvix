"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Bharvix GlassCard — the canonical card (Design Bible §VIII).
 * Faint fill, hairline border, 20px blur. On hover: border brightens,
 * a mouse-tracked radial glow appears, subtle 3D tilt (≤8°), top light line.
 * Cards acknowledge the cursor.
 */

interface GlassCardProps {
  children: React.ReactNode;
  accent?: string; // hex, drives the hover glow + top line
  tilt?: boolean;
  glow?: boolean;
  className?: string;
  cursorLabel?: string;
  as?: "div" | "article";
}

export default function GlassCard({
  children,
  accent = "#8b5cf6",
  tilt = true,
  glow = true,
  className,
  cursorLabel,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rx: 0, ry: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (tilt) {
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      setTransform({
        rx: ((y - cy) / cy) * -8,
        ry: ((x - cx) / cx) * 8,
      });
    }
    if (glow) {
      setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    }
  };

  const onMouseLeave = () => setTransform({ rx: 0, ry: 0 });

  return (
    <div style={{ perspective: "1000px" }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        animate={{ rotateX: transform.rx, rotateY: transform.ry }}
        transition={{ type: "spring", stiffness: 150, damping: 18, mass: 0.6 }}
        data-cursor-label={cursorLabel}
        className={cn(
          "relative group h-full rounded-2xl p-7 overflow-hidden",
          "bg-white/[0.03] border border-white/[0.07] backdrop-blur-xl",
          "hover:border-white/[0.14] transition-colors duration-500"
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Mouse-tracked radial glow */}
        {glow && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${accent}15, transparent 60%)`,
            }}
          />
        )}

        {/* Top light line */}
        <div
          className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to right, transparent, ${accent}60, transparent)`,
          }}
        />

        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  );
}
