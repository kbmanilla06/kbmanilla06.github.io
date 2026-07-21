"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";

/**
 * Mounted once in the root layout. Hydrates prefers-reduced-motion on the
 * client — it needs `window`, so it can't be read during SSR.
 */
export default function PerformanceProvider() {
  const hydrate = useUIStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}
