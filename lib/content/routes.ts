export interface GuildRoute {
  href: string;
  label: string;
  cta?: boolean;
}

export const GUILD_ROUTES: GuildRoute[] = [
  { href: "/quests", label: "Quests" },
  { href: "/about", label: "Guild Card" },
  { href: "/armory", label: "Armory" },
  { href: "/trophies", label: "Trophies" },
  { href: "/arsenal", label: "Arsenal" },
  { href: "/contact", label: "Send Request", cta: true },
];
