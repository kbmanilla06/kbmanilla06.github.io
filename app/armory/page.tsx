import type { Metadata } from "next";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import LeatherFrame from "@/components/ui/LeatherFrame";
import { SKILLS, ARMORY_CATEGORIES } from "@/lib/content/skills";

export const metadata: Metadata = {
  title: "Armory — Khristopher Ben Manilla",
  description: "Equipment loadout and tech stack of Khristopher Ben Manilla, presented as a Hunter's Guild armory.",
};

export default function ArmoryPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <RevealOnScroll>
        <h1 className="text-3xl sm:text-4xl text-[var(--color-ivory)]">Armory</h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-text-muted)]">
          A project-backed equipment loadout, organized by discipline. Each tool
          here has a role in the work shown across the completed quests.
        </p>
      </RevealOnScroll>

      <div className="mt-12 space-y-12">
        {ARMORY_CATEGORIES.map(({ category, blurb }, catIndex) => {
          const skillsInCategory = SKILLS.filter((s) => s.category === category);
          if (skillsInCategory.length === 0) return null;

          return (
            <RevealOnScroll key={category} delay={catIndex * 0.05}>
              <section>
                <div className="mb-4 flex items-baseline justify-between">
                  <h2 className="text-xl text-[var(--color-gold-bright)]">{category}</h2>
                  <span className="text-xs text-[var(--color-text-muted)]">{blurb}</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {skillsInCategory.map((skill) => (
                    <LeatherFrame key={skill.name} className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-[var(--color-ivory)]">{skill.name}</h3>
                          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-xs uppercase tracking-wide text-[var(--color-gold)]">
                        Field tested
                      </p>
                    </LeatherFrame>
                  ))}
                </div>
              </section>
            </RevealOnScroll>
          );
        })}
      </div>
    </div>
  );
}
