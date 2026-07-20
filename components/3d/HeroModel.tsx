"use client";

import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/store/uiStore";

/**
 * Exported Spline runtime scene (not the community/editor page URL).
 * Source: https://app.spline.design/community/file/bcc9e075-7b80-40cf-8dc9-9c5d521655a6
 */
const SPLINE_SCENE_URL = "https://prod.spline.design/KgzfdRK1PwHJHAXO/scene.splinecode";

/**
 * Interactive Droid model constrained to the hero. The Spline scene keeps its
 * native OrbitControls: pointer/touch drag rotates the model. The container uses
 * `touch-action: pan-y` (see .hero-model in globals.css) so vertical swipes still
 * scroll the page on touch devices, while horizontal drags rotate the model.
 *
 * No cursor-follow, overlays, stopPropagation/preventDefault, or global wheel/touch
 * listeners are used, so page scrolling is never trapped.
 */
export default function HeroModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useUIStore((state) => state.prefersReducedMotion);
  const [mounted, setMounted] = useState(false);

  // Defer mounting the heavy viewer until after first paint so the hero copy is
  // interactive immediately and there is no layout shift (the container reserves space).
  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  // Hide the Spline watermark and keep the canvas out of the keyboard tab order.
  useEffect(() => {
    if (!mounted) return;
    const container = containerRef.current;
    if (!container) return;

    let attempts = 0;
    const interval = window.setInterval(() => {
      attempts += 1;
      const viewer = container.querySelector("spline-viewer");
      if (viewer && viewer.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector<HTMLElement>("#logo");
        if (logo) logo.style.display = "none";
        const canvas = viewer.shadowRoot.querySelector("canvas");
        if (canvas) canvas.setAttribute("tabindex", "-1");
        if (logo) window.clearInterval(interval);
      }
      if (attempts > 50) window.clearInterval(interval);
    }, 100);

    return () => window.clearInterval(interval);
  }, [mounted]);

  return (
    <div
      ref={containerRef}
      className="hero-model"
      role="img"
      aria-label="Interactive 3D Droid model. Click or press and drag to rotate it."
    >
      {mounted && (
        <spline-viewer
          url={SPLINE_SCENE_URL}
          loading={prefersReducedMotion ? "lazy" : "eager"}
          tabIndex={-1}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
