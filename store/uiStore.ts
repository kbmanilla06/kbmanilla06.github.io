import { create } from "zustand";

interface UIState {
  prefersReducedMotion: boolean;
  mobileNavOpen: boolean;
  hydrated: boolean;
  hydrate: () => void;
  setMobileNavOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  prefersReducedMotion: false,
  mobileNavOpen: false,
  hydrated: false,
  hydrate: () => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    set({ prefersReducedMotion: reduced, hydrated: true });
  },
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
}));
