import type { Metadata } from "next";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import QuestCard from "@/components/ui/QuestCard";
import { QUESTS } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Completed Quests — Khristopher Ben Manilla",
  description: "Completed quests and projects by Khristopher Ben Manilla.",
};

export default function QuestsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <RevealOnScroll>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl text-[var(--color-ivory)]">Completed Quests</h1>
          <span className="font-decorative text-lg text-[var(--color-gold)]">
            {String(QUESTS.length).padStart(2, "0")} Quests Cleared
          </span>
        </div>
      </RevealOnScroll>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {QUESTS.map((quest, i) => (
          <RevealOnScroll key={quest.slug} delay={i * 0.08}>
            <QuestCard quest={quest} />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
