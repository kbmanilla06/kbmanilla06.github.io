"use client";

import { useEffect } from "react";
import GuildButton from "@/components/ui/GuildButton";
import { PROFILE } from "@/lib/content/profile";
import { useUIStore } from "@/store/uiStore";

const PROOF_POINTS = [
  "717 automated tests",
  "4 server-enforced roles",
  "3× Dean’s List",
] as const;

export default function LandingSequence() {
  const completeLanding = useUIStore((state) => state.completeLanding);

  useEffect(() => {
    completeLanding();
  }, [completeLanding]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="hero-copy-shade absolute inset-0" />
      <div
        className="absolute inset-x-0 bottom-0 h-[42%]"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-ink) 92%)" }}
      />

      <div className="hero-recruiter-copy absolute inset-x-0 bottom-10 px-6 sm:bottom-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="hero-eyebrow">{PROFILE.guildCardSubtitle}</p>
            <h1 className="mt-3 text-4xl leading-tight text-[var(--color-gold-bright)] sm:text-5xl lg:text-6xl">
              {PROFILE.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg font-semibold leading-snug text-[var(--color-ivory)] sm:text-xl">
              {PROFILE.headline}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
              {PROFILE.tagline}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Portfolio highlights">
              {PROOF_POINTS.map((proof) => (
                <li key={proof} className="hero-proof-chip">
                  {proof}
                </li>
              ))}
            </ul>

            <div className="hero-cta-row pointer-events-auto mt-6 flex flex-wrap gap-3">
              <GuildButton href="/projects/timeforge" variant="accent" brass>
                All in Time Case Study
              </GuildButton>
              <GuildButton href={PROFILE.resume} download="Khristopher_Ben_Manilla_Resume.pdf" brass>
                Download Résumé
              </GuildButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
