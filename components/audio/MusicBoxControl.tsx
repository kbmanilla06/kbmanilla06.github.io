"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAudioStore } from "@/store/audioStore";
import { useUIStore } from "@/store/uiStore";
import VolumeDial from "./VolumeDial";

export default function MusicBoxControl() {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useUIStore((s) => s.prefersReducedMotion);

  const musicVolume = useAudioStore((s) => s.musicVolume);
  const ambienceVolume = useAudioStore((s) => s.ambienceVolume);
  const musicMuted = useAudioStore((s) => s.musicMuted);
  const ambienceMuted = useAudioStore((s) => s.ambienceMuted);
  const setMusicVolume = useAudioStore((s) => s.setMusicVolume);
  const setAmbienceVolume = useAudioStore((s) => s.setAmbienceVolume);
  const toggleMusicMuted = useAudioStore((s) => s.toggleMusicMuted);
  const toggleAmbienceMuted = useAudioStore((s) => s.toggleAmbienceMuted);

  return (
    <div className="music-box-control fixed bottom-5 right-5 z-[110] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            className="music-box-panel guild-panel flex items-center gap-5 px-5 py-4"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
          >
            <div className="flex flex-col items-center gap-2">
              <VolumeDial label="Music" value={musicMuted ? 0 : musicVolume} onChange={setMusicVolume} />
              <button
                type="button"
                className="text-[0.65rem] text-[var(--color-text-muted)] hover:text-[var(--color-gold-bright)]"
                onClick={toggleMusicMuted}
              >
                {musicMuted ? "Unmute" : "Mute"}
              </button>
            </div>
            <div className="flex flex-col items-center gap-2">
              <VolumeDial
                label="Ambience"
                value={ambienceMuted ? 0 : ambienceVolume}
                onChange={setAmbienceVolume}
              />
              <button
                type="button"
                className="text-[0.65rem] text-[var(--color-text-muted)] hover:text-[var(--color-gold-bright)]"
                onClick={toggleAmbienceMuted}
              >
                {ambienceMuted ? "Unmute" : "Mute"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label={open ? "Close guild music box" : "Open guild music box"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="music-box-toggle guild-button"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--color-gold-bright)" strokeWidth="1.4">
          {musicMuted ? (
            <path d="M3 9v6h4l5 5V4L7 9H3zM18 9l4 4m0-4l-4 4" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path
              d="M3 9v6h4l5 5V4L7 9H3zM16 8a4 4 0 010 8M18.5 5.5a8 8 0 010 13"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </button>
    </div>
  );
}
