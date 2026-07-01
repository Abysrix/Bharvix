"use client";

import { useEffect, useState } from "react";

/**
 * Returns true after the first client render. Use to guard client-only UI
 * (cursor, WebGL, portals) and avoid hydration mismatches.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
