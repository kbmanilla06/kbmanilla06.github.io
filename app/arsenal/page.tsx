import type { Metadata } from "next";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import LeatherFrame from "@/components/ui/LeatherFrame";
import { EDUCATION, EXPERIENCE } from "@/lib/content/experience";
import { CERTIFICATIONS } from "@/lib/content/certifications";

export const metadata: Metadata = {
  title: "Experience & Education — Khristopher Ben Manilla",
  description: "Software engineering internship experience and Computer Science education.",
};

export default function ArsenalPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <RevealOnScroll>
        <p className="mb-3 text-sm uppercase tracking-wide text-[var(--color-gold)]">Career Record</p>
        <h2 className="text-3xl text-[var(--color-ivory)] sm:text-4xl">Experience &amp; education</h2>
      </RevealOnScroll>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <RevealOnScroll>
          <LeatherFrame className="h-full p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]">{EXPERIENCE.period}</p>
            <h3 className="mt-3 text-xl text-[var(--color-ivory)]">{EXPERIENCE.role}</h3>
            <p className="mt-1 text-sm text-[var(--color-brass-light)]">{EXPERIENCE.organization}</p>
            <p className="mt-5 text-sm leading-relaxed text-[var(--color-text-muted)]">{EXPERIENCE.summary}</p>
            <ul className="evidence-bullet-list mt-5">
              {EXPERIENCE.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </LeatherFrame>
        </RevealOnScroll>

        <RevealOnScroll delay={0.08}>
          <LeatherFrame className="h-full p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)]">{EDUCATION.period}</p>
            <h3 className="mt-3 text-xl text-[var(--color-ivory)]">{EDUCATION.degree}</h3>
            <p className="mt-3 text-sm text-[var(--color-brass-light)]">{EDUCATION.school}</p>
            <p className="mt-5 text-sm leading-relaxed text-[var(--color-text-muted)]">{EDUCATION.standing}</p>
          </LeatherFrame>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={0.12} className="mt-8">
        <div className="mb-5">
          <p className="text-sm uppercase tracking-wide text-[var(--color-gold)]">Additional Training</p>
          <h3 className="mt-2 text-2xl text-[var(--color-ivory)]">Certifications &amp; development</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {CERTIFICATIONS.map((certification) => (
            <LeatherFrame key={certification.title} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-base text-[var(--color-ivory)]">{certification.title}</h4>
                  <p className="mt-2 text-sm text-[var(--color-brass-light)]">{certification.issuer}</p>
                </div>
                <span className="shrink-0 text-xs text-[var(--color-gold)]">{certification.issued}</span>
              </div>
              <p className="mt-3 text-sm text-[var(--color-text-muted)]">{certification.credential}</p>
            </LeatherFrame>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-[var(--color-text-muted)]">
          Public credential links can be added when the individual badge URLs are available.
        </p>
      </RevealOnScroll>
    </div>
  );
}
