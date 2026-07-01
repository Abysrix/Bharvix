import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export const EASES = {
  expo: [0.16, 1, 0.3, 1],
  quart: [0.76, 0, 0.24, 1],
  back: [0.34, 1.56, 0.64, 1],
  soft: [0.25, 0.8, 0.25, 1],
} as const;

export const DURATIONS = {
  fast: 0.4,
  normal: 0.6,
  slow: 0.8,
  cinematic: 1.2,
} as const;

export function staggerChildren(
  count: number,
  baseDelay: number = 0,
  staggerAmount: number = 0.08
) {
  return Array.from({ length: count }, (_, i) => baseDelay + i * staggerAmount);
}
