"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  accent: string;
  status: "live" | "coming-soon" | "beta";
  href?: string;
  index: number;
}

export default function ProductCard({
  name,
  tagline,
  description,
  tags,
  accent,
  status,
  href,
  index,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -8);
    setRotateY(((x - centerX) / centerX) * 8);
    setGlowX((x / rect.width) * 100);
    setGlowY((y / rect.height) * 100);
  };

  const onMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const statusConfig = {
    live: { label: "Live", color: "#10b981" },
    "coming-soon": { label: "Coming Soon", color: "#f59e0b" },
    beta: { label: "Beta", color: "#6366f1" },
  };

  const statusInfo = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      data-cursor-label={status === "live" ? "Open" : "Soon"}
      className="relative"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ duration: 0.15, ease: "linear" }}
        className="relative group glass-card rounded-2xl p-7 overflow-hidden h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Gradient glow following mouse */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${accent}15, transparent 60%)`,
          }}
        />

        {/* Top border glow */}
        <div
          className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to right, transparent, ${accent}60, transparent)`,
          }}
        />

        {/* Status badge */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase"
            style={{
              background: `${statusInfo.color}15`,
              border: `1px solid ${statusInfo.color}30`,
              color: statusInfo.color,
            }}
          >
            <span
              className="w-1 h-1 rounded-full animate-pulse"
              style={{ background: statusInfo.color }}
            />
            {statusInfo.label}
          </span>

          {href && status === "live" && (
            <motion.a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUpRight size={13} />
            </motion.a>
          )}
        </div>

        {/* Name */}
        <h3
          className="font-display font-bold text-white mb-2 leading-none"
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            letterSpacing: "-0.03em",
          }}
        >
          {name}
        </h3>

        {/* Tagline */}
        <p
          className="text-sm font-medium mb-4"
          style={{ color: `${accent}cc` }}
        >
          {tagline}
        </p>

        {/* Description */}
        <p className="text-white/35 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wide uppercase"
              style={{
                background: `${accent}0d`,
                border: `1px solid ${accent}20`,
                color: `${accent}80`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Blurred overlay for coming soon */}
        {status === "coming-soon" && (
          <div className="absolute inset-0 rounded-2xl flex items-center justify-center"
            style={{ backdropFilter: "blur(2px)", background: "rgba(5,5,8,0.4)" }}
          >
            <div className="text-center">
              <div className="text-white/20 text-3xl mb-2">◌</div>
              <span className="label text-white/30">In Development</span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
