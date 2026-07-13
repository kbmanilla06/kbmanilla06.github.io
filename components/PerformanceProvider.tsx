"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";
import { usePerformanceStore } from "@/store/performanceStore";

/**
 * Mounted once in the root layout. Hydrates prefers-reduced-motion and
 * the performance-tier heuristic on the client — both need `window`,
 * so they can't be read during SSR.
 */
export default function PerformanceProvider() {
  const hydrate = useUIStore((s) => s.hydrate);
  const detect = usePerformanceStore((s) => s.detect);

  useEffect(() => {
    hydrate();
    detect();
  }, [hydrate, detect]);

  return null;
}
