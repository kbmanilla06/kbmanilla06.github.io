export interface GuildRoute {
  href: string;
  sectionId: string;
  label: string;
  cta?: boolean;
}

export const GUILD_ROUTES: GuildRoute[] = [
  { href: "/quests", sectionId: "quests", label: "Quests" },
  { href: "/about", sectionId: "about", label: "Guild Card" },
  { href: "/armory", sectionId: "armory", label: "Armory" },
  { href: "/trophies", sectionId: "trophies", label: "Trophies" },
  { href: "/arsenal", sectionId: "arsenal", label: "Arsenal" },
  { href: "/contact", sectionId: "contact", label: "Send Request", cta: true },
];
