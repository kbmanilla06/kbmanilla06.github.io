"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Award, BriefcaseBusiness, Code2, Layers3, Mail, Menu, UserRound, X } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { PORTFOLIO_ROUTES } from "@/lib/content/routes";

const NAV_ICONS: Record<string, React.ReactNode> = {
  quests: <Layers3 />,
  about: <UserRound />,
  armory: <Code2 />,
  arsenal: <BriefcaseBusiness />,
  trophies: <Award />,
  contact: <Mail />,
};

export default function PortfolioNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const mobileNavOpen = useUIStore((state) => state.mobileNavOpen);
  const setMobileNavOpen = useUIStore((state) => state.setMobileNavOpen);
  const prefersReducedMotion = useUIStore((state) => state.prefersReducedMotion);

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["home", ...PORTFOLIO_ROUTES.map(({ sectionId }) => sectionId)];
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

  const sectionHref = (sectionId: string) => pathname === "/" ? `#${sectionId}` : `/#${sectionId}`;
  const closeAndSelect = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileNavOpen(false);
  };

  return (
    <motion.nav
      className="quest-nav"
      aria-label="Primary navigation"
      initial={prefersReducedMotion ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={sectionHref("home")} className="quest-nav-logo" onClick={() => closeAndSelect("home")}>
        <span className="quest-nav-logo-mark" aria-hidden="true">KM</span>
        <span className="quest-nav-title">
          <strong>Khristopher Ben Manilla</strong>
          <span>Software Engineering Portfolio</span>
        </span>
      </Link>

      <div className="quest-nav-tabs desktop">
        {PORTFOLIO_ROUTES.map((route) => (
          <Link
            key={route.href}
            href={sectionHref(route.sectionId)}
            className={`quest-nav-tab ${route.cta ? "cta" : ""}`}
            aria-current={pathname === "/" && activeSection === route.sectionId ? "location" : undefined}
            onClick={() => closeAndSelect(route.sectionId)}
          >
            <span className="quest-nav-tab-icon" aria-hidden="true">{NAV_ICONS[route.sectionId]}</span>
            <span>{route.label}</span>
          </Link>
        ))}
      </div>

      <button
        type="button"
        className="quest-nav-toggle"
        aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        {mobileNavOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            className="quest-nav-mobile-panel"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.12 }}
          >
            {PORTFOLIO_ROUTES.map((route) => (
              <Link
                key={route.href}
                href={sectionHref(route.sectionId)}
                aria-current={pathname === "/" && activeSection === route.sectionId ? "location" : undefined}
                onClick={() => closeAndSelect(route.sectionId)}
              >
                <span className="quest-nav-mobile-icon" aria-hidden="true">{NAV_ICONS[route.sectionId]}</span>
                {route.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
