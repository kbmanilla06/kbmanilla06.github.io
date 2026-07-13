"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { GUILD_ROUTES } from "@/lib/content/routes";
import { getAudioEngine } from "@/lib/audio/AudioEngine";
import { GuildEmblemIcon } from "./icons";

export default function QuestBookNav() {
  const pathname = usePathname();
  const mobileNavOpen = useUIStore((s) => s.mobileNavOpen);
  const setMobileNavOpen = useUIStore((s) => s.setMobileNavOpen);
  const prefersReducedMotion = useUIStore((s) => s.prefersReducedMotion);

  const playPageTurn = () => getAudioEngine().playSfx("pageTurn");

  return (
    <motion.nav
      className="quest-nav"
      aria-label="Guild navigation"
      initial={prefersReducedMotion ? false : { y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      <Link
        href="/"
        className="quest-nav-logo"
        onClick={() => {
          playPageTurn();
          setMobileNavOpen(false);
        }}
      >
        <GuildEmblemIcon width={16} height={16} aria-hidden="true" stroke="var(--color-gold-bright)" />
        K.B. Manilla
        <span className="quest-nav-rank">HR 47</span>
      </Link>

      <div className="quest-nav-tabs desktop">
        {GUILD_ROUTES.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`quest-nav-tab ${route.cta ? "cta" : ""}`}
            aria-current={pathname === route.href ? "page" : undefined}
            onClick={playPageTurn}
          >
            {route.label}
          </Link>
        ))}
      </div>

      <button
        type="button"
        className="quest-nav-toggle"
        aria-label="Toggle navigation"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span
          style={{
            transform: mobileNavOpen ? "translateY(6px) rotate(45deg)" : undefined,
          }}
        />
        <span style={{ opacity: mobileNavOpen ? 0 : 1 }} />
        <span
          style={{
            transform: mobileNavOpen ? "translateY(-6px) rotate(-45deg)" : undefined,
          }}
        />
      </button>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            className="quest-nav-mobile-panel"
            initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.28, ease: [0.34, 1.2, 0.4, 1] }}
          >
            {GUILD_ROUTES.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                aria-current={pathname === route.href ? "page" : undefined}
                onClick={() => {
                  playPageTurn();
                  setMobileNavOpen(false);
                }}
              >
                {route.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
