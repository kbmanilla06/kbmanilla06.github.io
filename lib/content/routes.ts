export interface PortfolioRoute {
  href: string;
  sectionId: string;
  label: string;
  cta?: boolean;
}

export const PORTFOLIO_ROUTES: PortfolioRoute[] = [
  { href: "/quests", sectionId: "quests", label: "Projects" },
  { href: "/about", sectionId: "about", label: "Profile" },
  { href: "/armory", sectionId: "armory", label: "Skills" },
  { href: "/arsenal", sectionId: "arsenal", label: "Experience" },
  { href: "/trophies", sectionId: "trophies", label: "Honors" },
  { href: "/contact", sectionId: "contact", label: "Contact", cta: true },
];
