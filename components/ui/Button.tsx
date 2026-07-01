"use client";

import { useRef, useState, forwardRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Bharvix Button — two tiers only (Design Bible §VIII).
 *  - primary:   solid white on black. The single strongest CTA per view.
 *  - secondary: glass. Faint fill, hairline border.
 *  - ghost:     text-only with underline sweep.
 *
 * Magnetic on hover; arrow slides out-and-up; soft glow. Never more than one
 * primary in a single eyeful.
 */

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  magnetic?: boolean;
  external?: boolean;
  cursorLabel?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-sm",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-white text-black font-semibold hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.18)]",
  secondary:
    "border border-white/[0.12] bg-white/[0.04] text-white/70 font-medium hover:border-white/25 hover:text-white hover:bg-white/[0.08] backdrop-blur-sm",
  ghost:
    "text-white/60 font-medium hover:text-white link-underline",
};

const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  {
    children,
    href,
    variant = "primary",
    size = "lg",
    arrow = false,
    magnetic = true,
    external = false,
    cursorLabel,
    className,
    onClick,
  },
  _ref
) {
  const localRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !localRef.current) return;
    const rect = localRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
    setOffset({ x, y });
  };

  const onMouseLeave = () => setOffset({ x: 0, y: 0 });

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowUpRight
          size={14}
          className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  const classes = cn(
    "group relative inline-flex items-center gap-2 rounded-full overflow-hidden transition-all duration-300",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const motionProps = {
    ref: localRef as React.RefObject<HTMLAnchorElement & HTMLButtonElement>,
    className: classes,
    onMouseMove,
    onMouseLeave,
    onClick,
    animate: { x: offset.x, y: offset.y },
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
    ...(cursorLabel ? { "data-cursor-label": cursorLabel } : {}),
  };

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps} type="button">
      {content}
    </motion.button>
  );
});

export default Button;
