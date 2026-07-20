"use client";

import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";

/**
 * Per-route transition wrapper. Deliberately separate from app/layout.tsx:
 * template.tsx remounts on every navigation (what gives each route its own
 * enter animation), while layout.tsx stays mounted across navigations.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useUIStore((s) => s.prefersReducedMotion);

  if (prefersReducedMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
