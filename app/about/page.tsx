import type { Metadata } from "next";
import GuildPanel from "@/components/ui/GuildPanel";
import EngravedIcon from "@/components/ui/EngravedIcon";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import { GuildEmblemIcon, SwordIcon } from "@/components/ui/icons";
import { PROFILE } from "@/lib/content/profile";
import { SKILLS } from "@/lib/content/skills";

export const metadata: Metadata = {
  title: "Hunter Profile — Khristopher Ben Manilla",
  description: "Guild Card and Hunter Profile of Khristopher Ben Manilla.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <div className="grid gap-12 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
        <RevealOnScroll>
          <p className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-wide text-[var(--color-gold)]">
            <EngravedIcon>
              <GuildEmblemIcon />
            </EngravedIcon>
            Hunter Profile
          </p>
          <h1 className="text-3xl sm:text-4xl text-[var(--color-ivory)]">
            Forging ideas into
            <br />
            real quests.
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <GuildPanel className="space-y-5">
            {PROFILE.bio.map((paragraph) => (
              <p key={paragraph} className="text-[var(--color-text-muted)]">
                {paragraph}
              </p>
            ))}

            <div>
              <p className="section-label mb-4 inline-flex items-center gap-2 text-sm uppercase tracking-wide text-[var(--color-gold)]">
                <EngravedIcon>
                  <SwordIcon />
                </EngravedIcon>
                Weapon Loadout
              </p>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {SKILLS.map((skill) => (
                  <li
                    key={skill.name}
                    className="rounded border border-[var(--color-brass-dark)] bg-[var(--color-charcoal)] px-3 py-2 text-center text-sm text-[var(--color-ivory)]"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </GuildPanel>
        </RevealOnScroll>
      </div>
    </div>
  );
}
