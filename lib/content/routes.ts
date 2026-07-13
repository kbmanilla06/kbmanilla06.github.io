export interface GuildRoute {
  href: string;
  sectionId: string;
  label: string;
  cta?: boolean;
}

export const GUILD_ROUTES: GuildRoute[] = [
  { href: "/quests", sectionId: "quests", label: "Projects" },
  { href: "/about", sectionId: "about", label: "Profile" },
  { href: "/armory", sectionId: "armory", label: "Skills" },
  { href: "/arsenal", sectionId: "arsenal", label: "Experience" },
  { href: "/trophies", sectionId: "trophies", label: "Honors" },
  { href: "/contact", sectionId: "contact", label: "Contact", cta: true },
];
