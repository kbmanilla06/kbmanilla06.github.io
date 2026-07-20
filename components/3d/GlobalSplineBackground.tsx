"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useUIStore } from "@/store/uiStore";

const SplineCyberScene = dynamic(() => import("./SplineCyberScene"), {
  ssr: false,
});

export default function GlobalSplineBackground() {
  const [ready, setReady] = useState(false);
  const prefersReducedMotion = useUIStore((state) => state.prefersReducedMotion);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="global-spline-background" aria-hidden="true">
      {ready && <SplineCyberScene prefersReducedMotion={prefersReducedMotion} />}
      <div className="global-spline-scrim" />
    </div>
  );
}
