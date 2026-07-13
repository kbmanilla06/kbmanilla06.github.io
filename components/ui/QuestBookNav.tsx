"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { GUILD_ROUTES } from "@/lib/content/routes";
import { getAudioEngine } from "@/lib/audio/AudioEngine";
import {
  GuildEmblemIcon,
  MailIcon,
  ShieldIcon,
  SwordIcon,
  TentIcon,
} from "./icons";

const NAV_ICONS: Record<string, React.ReactNode> = {
  quests: <SwordIcon />,
  about: <GuildEmblemIcon />,
  armory: <ShieldIcon />,
  trophies: <GuildEmblemIcon />,
  arsenal: <TentIcon />,
  contact: <MailIcon />,
};

export default function QuestBookNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const mobileNavOpen = useUIStore((s) => s.mobileNavOpen);
  const setMobileNavOpen = useUIStore((s) => s.setMobileNavOpen);
  const prefersReducedMotion = useUIStore((s) => s.prefersReducedMotion);

  const playPageTurn = () => getAudioEngine().playSfx("pageTurn");

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["home", ...GUILD_ROUTES.map(({ sectionId }) => sectionId)];
    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = "home";

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (section && section.offsetTop <= marker) current = sectionId;
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname]);

  const sectionHref = (sectionId: string) =>
    pathname === "/" ? `#${sectionId}` : `/#${sectionId}`;

  return (
    <motion.nav
      className="quest-nav"
      aria-label="Guild navigation"
      initial={prefersReducedMotion ? false : { y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      <Link
        href={sectionHref("home")}
        className="quest-nav-logo"
        onClick={() => {
          playPageTurn();
          setActiveSection("home");
          setMobileNavOpen(false);
        }}
      >
        <span className="quest-nav-logo-emblem" aria-hidden="true">
          <GuildEmblemIcon />
        </span>
        <span className="quest-nav-title">
          <span>Hunter&rsquo;s Field Guide</span>
          <strong>K.B. Manilla</strong>
        </span>
        <span className="quest-nav-rank">4TH YEAR</span>
      </Link>

      <div className="quest-nav-tabs desktop">
        {GUILD_ROUTES.map((route) => (
          <Link
            key={route.href}
            href={sectionHref(route.sectionId)}
            className={`quest-nav-tab ${route.cta ? "cta" : ""}`}
            aria-current={
              pathname === "/" && activeSection === route.sectionId ? "location" : undefined
            }
            onClick={() => {
              playPageTurn();
              setActiveSection(route.sectionId);
            }}
          >
            <span className="quest-nav-tab-icon" aria-hidden="true">
              {NAV_ICONS[route.sectionId]}
            </span>
            <span className="quest-nav-tab-label">{route.label}</span>
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
                href={sectionHref(route.sectionId)}
                aria-current={
                  pathname === "/" && activeSection === route.sectionId
                    ? "location"
                    : undefined
                }
                onClick={() => {
                  playPageTurn();
                  setActiveSection(route.sectionId);
                  setMobileNavOpen(false);
                }}
              >
                <span className="quest-nav-mobile-icon" aria-hidden="true">
                  {NAV_ICONS[route.sectionId]}
                </span>
                {route.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
