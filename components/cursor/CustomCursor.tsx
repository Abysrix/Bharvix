"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Custom cursor — the connective tissue of the whole site (Design Bible §VIII).
 *  · Dot: near-instant, mix-blend-difference so it reads on any background.
 *  · Ring: trails with spring physics, grows on interactive elements, and
 *    reveals a contextual label ("View" / "Open" / "Story") over marked elements.
 *  · Presses give tactile feedback. Hidden on touch devices (native cursor).
 */
export default function CustomCursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const [enabled, setEnabled] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [label, setLabel] = useState<string | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot: fast + tight. Ring: soft + trailing.
  const dotX = useSpring(mouseX, { stiffness: 1600, damping: 60, mass: 0.3 });
  const dotY = useSpring(mouseY, { stiffness: 1600, damping: 60, mass: 0.3 });
  const ringX = useSpring(mouseX, { stiffness: 220, damping: 26, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 220, damping: 26, mass: 0.6 });

  useEffect(() => {
    setEnabled(finePointer);
  }, [finePointer]);

  const resolveTarget = useCallback((el: HTMLElement | null) => {
    if (!el) {
      setIsPointer(false);
      setLabel(null);
      return;
    }
    const interactiveEl = el.closest(
      "a, button, [role='button'], [data-cursor='pointer']"
    ) as HTMLElement | null;
    const labelEl = el.closest("[data-cursor-label]") as HTMLElement | null;
    setIsPointer(Boolean(interactiveEl));
    setLabel(labelEl?.getAttribute("data-cursor-label") ?? null);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (hidden) setHidden(false);
      resolveTarget(e.target as HTMLElement);
    };
    const onDown = () => setIsDown(true);
    const onUp = () => setIsDown(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, hidden, mouseX, mouseY, resolveTarget]);

  if (!enabled) return null;

  const ringScale = label ? 2.6 : isPointer ? 1.9 : isDown ? 0.8 : 1;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hidden ? 0 : 1, scale: isPointer ? 0 : isDown ? 0.6 : 1 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-white" />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hidden ? 0 : 1, scale: ringScale }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border transition-colors duration-300"
          style={{
            borderColor: isPointer
              ? "rgba(139,92,246,0.8)"
              : "rgba(255,255,255,0.35)",
            backgroundColor: label ? "rgba(139,92,246,0.16)" : "transparent",
            backdropFilter: label ? "blur(2px)" : "none",
          }}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="select-none whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.2em] text-white/80"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
