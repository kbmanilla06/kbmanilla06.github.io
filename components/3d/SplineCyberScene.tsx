"use client";

import { useEffect, useRef, useState } from "react";


interface SplineCyberSceneProps {
  prefersReducedMotion: boolean;
}

const SPLINE_SCENE_URL =
  "https://prod.spline.design/KgzfdRK1PwHJHAXO/scene.splinecode";

export default function SplineCyberScene({
  prefersReducedMotion,
}: SplineCyberSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  // 1. Cursor follow translation (only when reduced motion is disabled)
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || prefersReducedMotion) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;

    const paint = () => {
      frame = 0;
      scene.style.setProperty("--model-x", `${targetX.toFixed(2)}px`);
      scene.style.setProperty("--model-y", `${targetY.toFixed(2)}px`);
    };

    const trackPointer = (event: PointerEvent) => {
      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;

      targetX = normalizedX * 56;
      targetY = normalizedY * 40;
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", trackPointer, { passive: true });
    return () => {
      window.removeEventListener("pointermove", trackPointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  // 2. IntersectionObserver to toggle interactivity (only when Hero section is visible)
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) {
      // Fallback: if no #home, default to active
      setIsInteractive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInteractive(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // 3. Remove watermark & set canvas tabindex inside shadow DOM
  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    let attempts = 0;

    const cleanShadowDom = () => {
      attempts++;
      const viewer = container.querySelector("spline-viewer");
      if (viewer && viewer.shadowRoot) {
        // Hiding the #logo watermark
        const logo = viewer.shadowRoot.querySelector("#logo");
        if (logo) {
          (logo as HTMLElement).style.display = "none";
          clearInterval(logoInterval);
        }

        // Make canvas unfocusable via keyboard tab navigation
        const canvas = viewer.shadowRoot.querySelector("canvas");
        if (canvas) {
          canvas.setAttribute("tabindex", "-1");
        }
      }

      // Stop searching after 50 attempts (~5 seconds) to prevent infinite loops
      if (attempts > 50) {
        clearInterval(logoInterval);
      }
    };

    const logoInterval = setInterval(cleanShadowDom, 100);
    return () => clearInterval(logoInterval);
  }, []);

  return (
    <div
      ref={sceneRef}
      className={`spline-cyber-scene ${isInteractive ? "is-interactive" : ""}`}
      aria-hidden="true"
    >
      <spline-viewer
        url={SPLINE_SCENE_URL}
        loading="eager"
        aria-label="Interactive 3D Droid model"
        role="img"
        tabIndex={-1}
      />
    </div>
  );
}
