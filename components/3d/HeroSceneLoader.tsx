"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#0d0906]">
      <p className="text-sm text-[var(--color-text-muted)]">Lighting the campfire…</p>
    </div>
  ),
});

export default function HeroSceneLoader() {
  return (
    <div className="h-[100svh] w-full" aria-hidden="true">
      <HeroScene />
    </div>
  );
}
