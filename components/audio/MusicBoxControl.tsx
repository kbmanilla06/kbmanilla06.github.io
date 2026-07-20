"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Music2, X } from "lucide-react";
import { useUIStore } from "@/store/uiStore";

const SOUNDTRACK_URL = "https://www.youtube.com/watch?v=p1fEV6QbCww";

export default function MusicBoxControl() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const prefersReducedMotion = useUIStore((state) => state.prefersReducedMotion);
  return (
    <div className="music-control">
      <motion.div className={`music-panel ${open ? "visible" : "hidden"}`} aria-hidden={!open} initial={false} animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={{ duration: prefersReducedMotion ? 0 : 0.12 }}>
        <div className="music-panel-heading">
          <div><p className="wdl-kicker">Optional audio</p><h2>Portfolio soundtrack</h2></div>
          <button type="button" aria-label="Close soundtrack" onClick={() => setOpen(false)}><X aria-hidden="true" /></button>
        </div>
        <p>Playback is optional and remains under your control through the embedded YouTube player.</p>
        {hasOpened && <div className="music-embed"><iframe className="aspect-video w-full" src="https://www.youtube-nocookie.com/embed/p1fEV6QbCww?rel=0" title="Optional portfolio soundtrack player" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen tabIndex={open ? 0 : -1} /></div>}
        <a href={SOUNDTRACK_URL} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>Open on YouTube <ExternalLink aria-hidden="true" /></a>
      </motion.div>
      <button type="button" className="music-toggle" aria-label={open ? "Close portfolio soundtrack" : "Open portfolio soundtrack"} aria-expanded={open} onClick={() => { setHasOpened(true); setOpen((value) => !value); }}>
        {open ? <X aria-hidden="true" /> : <Music2 aria-hidden="true" />}
      </button>
    </div>
  );
}
