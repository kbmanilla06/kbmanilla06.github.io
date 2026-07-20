"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import type { Application } from "@splinetool/runtime";

/**
 * Exported Spline runtime scene (not the community/editor page URL).
 * Source: https://app.spline.design/community/file/bcc9e075-7b80-40cf-8dc9-9c5d521655a6
 */
const SPLINE_SCENE_URL = "https://prod.spline.design/KgzfdRK1PwHJHAXO/scene.splinecode";

// Zoom is expressed as a camera zoom multiplier. The base value (~2x the scene's
// default framing) is chosen per breakpoint so the Droid reads as a primary hero
// element without clipping or forcing horizontal overflow on small screens.
const ZOOM_MIN = 1;
const ZOOM_MAX = 3.4;
const ZOOM_STEP = 0.35;

function baseZoomForWidth(width: number): number {
  if (width <= 640) return 1.35; // mobile — clearly larger than before, no horizontal overflow
  if (width <= 1023) return 1.45; // tablet
  return 1.6; // desktop — ~2x the scene's default framing, full model visible
}

/**
 * Interactive Droid model, rendered with @splinetool/runtime onto a transparent
 * canvas so it blends directly into the hero (no card, border, or frame).
 *
 * Interaction: the scene keeps its native OrbitControls for pointer/touch
 * drag-to-rotate. Native wheel/pinch camera zoom is disabled so the mouse wheel
 * always scrolls the page and single-finger touch always scrolls; zoom is handled
 * by the discreet in/out/reset controls. `touch-action: pan-y` (see .hero-model in
 * globals.css) lets vertical swipes scroll while horizontal drags rotate. No
 * overlays, stopPropagation/preventDefault, or global wheel/touch listeners are
 * used, so page scrolling is never trapped.
 */
export default function HeroModel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<Application | null>(null);
  const baseZoomRef = useRef(1.6);
  const zoomRef = useRef(1.6);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let app: Application | null = null;

    (async () => {
      try {
        const { Application } = await import("@splinetool/runtime");
        if (disposed) return;
        app = new Application(canvas);
        appRef.current = app;
        await app.load(SPLINE_SCENE_URL);
        if (disposed) return;

        // Transparent scene background so the canvas blends into the hero.
        app.setBackgroundColor("transparent");

        // Keep drag-to-rotate; disable native zoom/pan so the page keeps scrolling.
        const controls = app.controls as { enableZoom?: boolean; enablePan?: boolean } | undefined;
        if (controls) {
          controls.enableZoom = false;
          controls.enablePan = false;
        }

        const base = baseZoomForWidth(window.innerWidth);
        baseZoomRef.current = base;
        zoomRef.current = base;
        app.setZoom(base);
        setStatus("ready");
      } catch {
        if (!disposed) setStatus("error");
      }
    })();

    return () => {
      disposed = true;
      try {
        app?.dispose();
      } catch {
        /* no-op */
      }
      appRef.current = null;
    };
  }, []);

  // Re-frame the model when the viewport crosses a breakpoint, unless the user
  // has manually zoomed away from the base.
  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const app = appRef.current;
        if (!app) return;
        const nextBase = baseZoomForWidth(window.innerWidth);
        const wasAtBase = Math.abs(zoomRef.current - baseZoomRef.current) < 0.001;
        baseZoomRef.current = nextBase;
        if (wasAtBase) {
          zoomRef.current = nextBase;
          app.setZoom(nextBase);
        }
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const applyZoom = useCallback((next: number) => {
    const app = appRef.current;
    if (!app) return;
    const clamped = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next));
    zoomRef.current = clamped;
    app.setZoom(clamped);
  }, []);

  return (
    <div
      className={`hero-model ${status === "ready" ? "is-ready" : ""}`}
      role="img"
      aria-label="Interactive 3D Droid model. Click or press and drag to rotate it; use the on-screen controls to zoom."
    >
      <div className="hero-model-glow" aria-hidden="true" />
      <canvas ref={canvasRef} className="hero-model-canvas" tabIndex={-1} aria-hidden="true" />

      {status === "error" && (
        <p className="hero-model-fallback">3D model unavailable in this browser.</p>
      )}

      <div className="hero-model-zoom" role="group" aria-label="Zoom 3D model">
        <button type="button" onClick={() => applyZoom(zoomRef.current + ZOOM_STEP)} aria-label="Zoom in">
          <Plus aria-hidden="true" />
        </button>
        <button type="button" onClick={() => applyZoom(baseZoomRef.current)} aria-label="Reset zoom">
          <RotateCcw aria-hidden="true" />
        </button>
        <button type="button" onClick={() => applyZoom(zoomRef.current - ZOOM_STEP)} aria-label="Zoom out">
          <Minus aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
