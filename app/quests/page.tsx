import type { Metadata } from "next";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import QuestCard from "@/components/ui/QuestCard";
import { QUESTS } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects — Khristopher Ben Manilla",
  description: "Selected full-stack, machine-learning, and NLP projects with engineering evidence.",
};

export default function QuestsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <RevealOnScroll>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-sm uppercase tracking-wide text-[var(--color-gold)]">Selected Work</p>
            <h2 className="text-3xl text-[var(--color-ivory)] sm:text-4xl">Projects with proof</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">
              Each case study states the problem context, my contribution, collaboration model, and verifiable engineering output.
            </p>
          </div>
          <span className="font-decorative text-lg text-[var(--color-gold)]">
            {String(QUESTS.length).padStart(2, "0")} Documented Builds
          </span>
        </div>
      </RevealOnScroll>

      <div className="quest-project-grid grid gap-8 lg:grid-cols-2">
        {QUESTS.map((quest, i) => (
          <RevealOnScroll key={quest.slug} delay={i * 0.08}>
            <QuestCard quest={quest} />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
