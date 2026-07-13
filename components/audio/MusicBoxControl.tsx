"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";

const SOUNDTRACK_URL = "https://www.youtube.com/watch?v=p1fEV6QbCww";

export default function MusicBoxControl() {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useUIStore((s) => s.prefersReducedMotion);

  return (
    <div className="music-box-control fixed bottom-5 right-5 z-[110] flex flex-col items-end gap-3">
      <motion.div
        className={`music-box-panel guild-panel w-[min(23rem,calc(100vw-1.5rem))] p-4 ${open ? "visible pointer-events-auto" : "invisible pointer-events-none"}`}
        aria-hidden={!open}
        initial={false}
        animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.95 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
      >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)]">
                Field Guide Soundtrack
              </p>
              <p className="mt-2 text-sm text-[var(--color-ivory)]">Proof of a Hero</p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)]">
                Press play in the official YouTube player. Playback remains optional and user-controlled.
              </p>
            </div>
            <div className="mt-3 overflow-hidden rounded border border-[var(--color-brass-dark)] bg-black">
              <iframe
                className="aspect-video w-full"
                src="https://www.youtube-nocookie.com/embed/p1fEV6QbCww?rel=0"
                title="Proof of a Hero — official YouTube player"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                tabIndex={open ? 0 : -1}
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 text-[0.68rem]">
              <span className="text-[var(--color-text-muted)]">Streamed by YouTube · not hosted here</span>
              <a
                href={SOUNDTRACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                className="shrink-0 text-[var(--color-gold)] hover:text-[var(--color-gold-bright)]"
              >
                Open on YouTube ↗
              </a>
            </div>
      </motion.div>

      <button
        type="button"
        aria-label={open ? "Close portfolio soundtrack" : "Open portfolio soundtrack"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="music-box-toggle guild-button"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--color-gold-bright)" strokeWidth="1.4">
          <path d="M9 18V5l10-2v13" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="16" cy="16" r="3" />
        </svg>
      </button>
    </div>
  );
}
