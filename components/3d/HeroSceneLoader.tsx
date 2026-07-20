"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
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
    <div className="hero-camp-backdrop w-full" aria-hidden="true">
      <Image
        src="/pictures/hunter-camp.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-camp-image object-cover"
      />
      {showModel && (
        <div className="hero-model-stage">
          <SplineCyberScene />
        </div>
      )}
      <div className="hero-camp-light" />
      <div className="hero-camp-haze" />
      <div className="hero-camp-dust" />
      <div className="hero-camp-vignette" />
    </div>
  );
}
