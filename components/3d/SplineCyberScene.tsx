"use client";

import { useEffect, useRef } from "react";

const SPLINE_PREVIEW_URL =
  "https://app.spline.design/file/8f4b578c-3e0d-47d5-98bd-04e61d7d32fe?view=preview";

export default function SplineCyberScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;

    const paint = () => {
      frame = 0;
      scene.style.setProperty("--model-x", `${targetX.toFixed(2)}px`);
      scene.style.setProperty("--model-y", `${targetY.toFixed(2)}px`);
    };

    const trackPointer = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 14;
      targetY = (event.clientY / window.innerHeight - 0.5) * 10;
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", trackPointer, { passive: true });
    return () => {
      window.removeEventListener("pointermove", trackPointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={sceneRef} className="spline-cyber-scene" aria-hidden="true">
      <iframe
        src={SPLINE_PREVIEW_URL}
        title="Decorative CyberMannequin 3D scene"
        loading="eager"
        allow="autoplay"
        referrerPolicy="strict-origin-when-cross-origin"
        tabIndex={-1}
        aria-hidden="true"
      />
      <p className="spline-cyber-hint">
        <span /> Passive 3D visual
      </p>
    </div>
  );
}
