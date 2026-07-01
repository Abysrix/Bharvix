"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, viewportOnce, withDelay } from "@/lib/motion";

/**
 * Reveal — the reusable "animate in on scroll" wrapper.
 * Framer Motion organization: components never hand-roll scroll reveals; they
 * wrap content in <Reveal> (or a preset variant). One place to tune timing,
 * one place to honor reduced motion.
 *
 *   <Reveal><h2>…</h2></Reveal>
 *   <Reveal variant={curtainLine} delay={0.2} as="section">…</Reveal>
 */
interface RevealProps {
  children: React.ReactNode;
  variant?: Variants;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "span" | "li" | "article";
  once?: boolean;
}

export default function Reveal({
  children,
  variant = fadeUp,
  delay = 0,
  className,
  as = "div",
  once = true,
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={delay ? withDelay(variant, delay) : variant}
      initial="hidden"
      whileInView="show"
      viewport={once ? viewportOnce : { once: false, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
