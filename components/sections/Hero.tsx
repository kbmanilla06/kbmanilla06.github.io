import WdlButton from "@/components/ui/WdlButton";
import { PROFILE } from "@/lib/content/profile";

const PROOF_POINTS = [
  { label: "Automated tests", value: "717" },
  { label: "Server-enforced roles", value: "4" },
  { label: "Dean's List honors", value: "3×" },
] as const;

/**
 * WDL "Institutional" hero variant (03-wdl-components.md §Hero): eyebrow,
 * headline (Hero role), one descriptor line, metadata row, and up to one
 * primary + secondary action. Typography-only — no media, no decorative
 * background beyond the token-driven fine-grid layer.
 */
export default function Hero() {
  return (
    <div className="hero-copy">
      <p className="hero-eyebrow">{PROFILE.portfolioSubtitle}</p>
      <h1 className="hero-heading">{PROFILE.name}</h1>
      <p className="hero-descriptor">{PROFILE.headline}</p>
      <p className="hero-supporting">{PROFILE.tagline}</p>

      <dl className="hero-metadata" aria-label="Portfolio highlights">
        {PROOF_POINTS.map((point) => (
          <div key={point.label}>
            <dt>{point.label}</dt>
            <dd>{point.value}</dd>
          </div>
        ))}
      </dl>

      <div className="hero-actions">
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
