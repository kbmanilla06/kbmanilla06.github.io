"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useUIStore } from "@/store/uiStore";

const SplineCyberScene = dynamic(() => import("./SplineCyberScene"), {
  ssr: false,
});

export default function HeroSceneLoader() {
  const [showModel, setShowModel] = useState(false);
  const prefersReducedMotion = useUIStore((state) => state.prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setTimeout(() => setShowModel(true), 700);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <div className="hero-visual w-full" aria-hidden="true">
      <div className="hero-grid" />
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />
      {showModel && (
        <div className="hero-model-stage">
          <SplineCyberScene />
        </div>
      )}
    </div>
  );
}
