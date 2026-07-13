import { create } from "zustand";

export type LandingStage =
  | "black"
  | "gate"
  | "campfire"
  | "hunter"
  | "fog"
  | "title"
  | "nav"
  | "done";

interface UIState {
  prefersReducedMotion: boolean;
  landingComplete: boolean;
  landingStage: LandingStage;
  mobileNavOpen: boolean;
  hydrated: boolean;
  hydrate: () => void;
  setLandingStage: (stage: LandingStage) => void;
  completeLanding: () => void;
  setMobileNavOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  prefersReducedMotion: false,
  landingComplete: false,
  landingStage: "black",
  mobileNavOpen: false,
  hydrated: false,
  hydrate: () => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Every visitor still needs one gesture to unlock the AudioContext
    // (browser autoplay policy), so the gate always shows — reduced
    // motion only cuts the multi-stage GSAP timeline short after it.
    set({ prefersReducedMotion: reduced, hydrated: true });
  },
  setLandingStage: (stage) => set({ landingStage: stage }),
  completeLanding: () => set({ landingStage: "done", landingComplete: true }),
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
}));
