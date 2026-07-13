import { create } from "zustand";
import { persist } from "zustand/middleware";
import { detectPerformanceTier, type PerformanceTier } from "@/lib/performance/tier";

interface PerformanceState {
  autoTier: PerformanceTier;
  manualLowFi: boolean | null; // null = follow autoTier
  detected: boolean;
  detect: () => void;
  setManualLowFi: (value: boolean | null) => void;
  /** Effective tier after applying the manual override, if any. */
  tier: () => PerformanceTier;
}

export const usePerformanceStore = create<PerformanceState>()(
  persist(
    (set, get) => ({
      autoTier: "high",
      manualLowFi: null,
      detected: false,
      detect: () => {
        if (get().detected) return;
        set({ autoTier: detectPerformanceTier(), detected: true });
      },
      setManualLowFi: (value) => set({ manualLowFi: value }),
      tier: () => {
        const { manualLowFi, autoTier } = get();
        if (manualLowFi === true) return "low";
        if (manualLowFi === false) return "high";
        return autoTier;
      },
    }),
    {
      name: "guild-performance",
      partialize: (state) => ({ manualLowFi: state.manualLowFi }),
    }
  )
);
