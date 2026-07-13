import type { Metadata } from "next";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import LeatherFrame from "@/components/ui/LeatherFrame";
import EngravedIcon from "@/components/ui/EngravedIcon";
import { SwordIcon, TentIcon, ShieldIcon } from "@/components/ui/icons";
import { SERVICES } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Arsenal — Khristopher Ben Manilla",
  description: "Hunting arts and services offered by Khristopher Ben Manilla.",
};

const ICONS: Record<string, React.ReactNode> = {
  "equipment-forging": <SwordIcon />,
  "base-camp-construction": <TentIcon />,
  "monster-tracking-defense": <ShieldIcon />,
};

export default function ArsenalPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <RevealOnScroll>
        <p className="mb-3 text-sm uppercase tracking-wide text-[var(--color-gold)]">
          Hunting Arts
        </p>
        <h1 className="text-3xl sm:text-4xl text-[var(--color-ivory)]">Arsenal</h1>
      </RevealOnScroll>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {SERVICES.map((service, i) => (
          <RevealOnScroll key={service.id} delay={i * 0.08}>
            <LeatherFrame className="flex h-full flex-col gap-4 p-6">
              <p className="font-decorative text-3xl text-[var(--color-gold)]">{service.num}</p>
              <div className="text-3xl text-[var(--color-gold-bright)]">
                <EngravedIcon>{ICONS[service.id]}</EngravedIcon>
              </div>
              <h2 className="text-lg text-[var(--color-ivory)]">{service.title}</h2>
              <p className="text-sm text-[var(--color-text-muted)]">{service.description}</p>
            </LeatherFrame>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
