import WdlButton from "@/components/ui/WdlButton";
import { PROFILE } from "@/lib/content/profile";

const PROOF_POINTS = [
  "717 automated tests",
  "4 server-enforced roles",
  "3× Dean’s List",
] as const;

export default function LandingSequence() {
  return (
    <div className="hero-copy">
      <p className="wdl-kicker">{PROFILE.portfolioSubtitle}</p>
      <h1 className="mt-5 text-4xl font-bold leading-tight text-[var(--wdl-text-primary)] sm:text-5xl lg:text-6xl">
        {PROFILE.name}
      </h1>
      <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-[var(--wdl-text-primary)] sm:text-xl">
        {PROFILE.headline}
      </p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--wdl-text-secondary)] sm:text-base">
        {PROFILE.tagline}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Portfolio highlights">
        {PROOF_POINTS.map((proof) => (
          <li key={proof} className="wdl-tag">
            {proof}
          </li>
        ))}
      </ul>

      <div className="hero-cta-row mt-6 flex flex-wrap gap-3">
        <WdlButton href="/projects/all-in-time" variant="accent">
          All in Time Case Study
        </WdlButton>
        <WdlButton href={PROFILE.resume} download="Khristopher_Ben_Manilla_Resume.pdf">
          Download Résumé
        </WdlButton>
      </div>
    </div>
  );
}
