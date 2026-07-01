"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLenis } from "@/hooks/useLenis";
import { useMagnetic } from "@/hooks/useMagnetic";
import { mainNav } from "@/config/site";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { scrollY, scrollYProgress } = useScroll();

  const cta = useMagnetic<HTMLAnchorElement>({ strength: 0.35 });

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  const links = mainNav.filter((l) => l.enabled && l.href.startsWith("#"));

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setActive(href);
    const target = document.querySelector(href);
    if (!target) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -120, duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-5 px-4"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className={cn(
          "relative flex items-center rounded-full border transition-colors duration-500",
          scrolled
            ? "border-white/[0.09] bg-black/60 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            : "border-white/[0.06] bg-white/[0.02]"
        )}
        style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        animate={{ padding: scrolled ? "6px" : "8px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* top highlight */}
        <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => scrollTo(e, "#top")}
          className="group mr-1 flex items-center gap-2 rounded-full px-3 py-1.5"
        >
          <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-violet-500 to-indigo-600">
            <span className="h-1.5 w-1.5 rounded-sm bg-white/90 transition-transform duration-500 group-hover:rotate-45" />
          </span>
          <span className="font-display text-sm font-bold tracking-wide text-white/90">
            Bharvix
          </span>
        </a>

        <span className="mx-1 h-4 w-px bg-white/10" />

        {/* Links */}
        <div className="flex items-center">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className={cn(
                "group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                active === link.href ? "text-white" : "text-white/50 hover:text-white/90"
              )}
            >
              {active === link.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.08]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </div>

        <span className="mx-1 h-4 w-px bg-white/10" />

        {/* Magnetic CTA */}
        <motion.a
          ref={cta.ref}
          href="#contact"
          onClick={(e) => scrollTo(e, "#contact")}
          data-cursor-label="Talk"
          style={{ x: cta.x, y: cta.y }}
          {...cta.bind}
          className="group ml-1 flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-600/15 px-4 py-2 text-sm font-medium text-violet-200 transition-colors duration-300 hover:border-violet-500/50 hover:bg-violet-600/25 hover:text-white"
        >
          <span>Let&apos;s Talk</span>
          <ArrowUpRight
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </motion.a>

        {/* Scroll progress */}
        <motion.span
          className="pointer-events-none absolute -bottom-px left-6 right-6 h-px origin-left bg-gradient-to-r from-transparent via-violet-500/70 to-transparent"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.div>
    </motion.nav>
  );
}
