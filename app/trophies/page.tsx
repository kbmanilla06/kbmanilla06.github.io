import type { Metadata } from "next";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import GuildPanel from "@/components/ui/GuildPanel";
import { ACHIEVEMENTS } from "@/lib/content/achievements";

export const metadata: Metadata = {
  title: "Academic Honors — Khristopher Ben Manilla",
  description: "Academic honors earned by Khristopher Ben Manilla.",
};

export default function TrophiesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <RevealOnScroll>
        <p className="mb-3 text-sm uppercase tracking-wide text-[var(--color-gold)]">
          Academic Recognition
        </p>
        <h2 className="text-3xl text-[var(--color-ivory)] sm:text-4xl">Academic honors</h2>
      </RevealOnScroll>

      <div className="mt-12 space-y-6">
        {ACHIEVEMENTS.map((achievement, i) => (
          <RevealOnScroll key={achievement.id} delay={i * 0.08}>
            <GuildPanel className="grid gap-4 sm:grid-cols-[1fr_2px_2.5fr] sm:items-center">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-[var(--color-text-muted)]">{achievement.years}</span>
                <span className="w-fit rounded border border-[var(--color-brass-dark)] bg-[var(--color-charcoal)] px-2 py-1 text-xs text-[var(--color-gold)]">
                  {achievement.hunterRank}
                </span>
              </div>
              <div className="hidden h-full bg-[var(--color-brass-dark)] sm:block" />
              <div>
                <p className="font-decorative text-3xl text-[var(--color-gold)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-1 text-xl text-[var(--color-ivory)]">{achievement.title}</h2>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{achievement.org}</p>
                <p className="mt-3 text-sm text-[var(--color-text-muted)]">{achievement.description}</p>
              </div>
            </GuildPanel>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
