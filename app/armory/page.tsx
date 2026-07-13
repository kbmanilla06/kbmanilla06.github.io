import type { Metadata } from "next";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import LeatherFrame from "@/components/ui/LeatherFrame";
import EngravedIcon from "@/components/ui/EngravedIcon";
import { GuildEmblemIcon, ShieldIcon, SwordIcon, TentIcon } from "@/components/ui/icons";
import { SKILLS, type ArmoryCategory } from "@/lib/content/skills";

export const metadata: Metadata = {
  title: "Armory — Khristopher Ben Manilla",
  description: "Equipment loadout and tech stack of Khristopher Ben Manilla, presented as a Hunter's Guild armory.",
};

const CATEGORY_ICONS: Record<ArmoryCategory, React.ReactNode> = {
  Weapons: <SwordIcon />,
  "Armor Sets": <ShieldIcon />,
  "Hunter Arts": <GuildEmblemIcon />,
  "Specialized Tools": <TentIcon />,
};

const HUNTER_STATUS = [
  { label: "Current Rank", value: "BSCS Student", tone: "gold" },
  { label: "Primary Focus", value: "Cybersecurity", tone: "green" },
  { label: "Secondary Art", value: "AI & Machine Learning", tone: "blue" },
  { label: "Current Quest", value: "Internship", tone: "red" },
] as const;

const FIELD_TRAITS = ["Secure systems", "ML workflows", "Interface craft", "Data analysis"];

export default function ArmoryPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <RevealOnScroll>
        <p className="mb-3 text-sm uppercase tracking-wide text-[var(--color-gold)]">
          Equipment &amp; Status
        </p>
        <h1 className="text-3xl sm:text-4xl text-[var(--color-ivory)]">Active Loadout</h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-text-muted)]">
          Project-backed tools arranged like a field equipment screen. Markers
          show how central each tool is to the current loadout, not a mastery score.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.08} className="mt-12">
        <div className="armory-console">
          <section className="armory-loadout" aria-labelledby="equipment-skills-title">
            <header className="armory-console-heading">
              <span className="armory-heading-icon">
                <SwordIcon />
              </span>
              <h2 id="equipment-skills-title">Equipment Skills</h2>
              <span>{String(SKILLS.length).padStart(2, "0")} equipped</span>
            </header>

            <div className="armory-skill-list">
              {SKILLS.map((skill) => (
                <article className="armory-skill-row" key={skill.name}>
                  <div className="armory-skill-icon">
                    <EngravedIcon>{CATEGORY_ICONS[skill.category]}</EngravedIcon>
                  </div>
                  <div className="armory-skill-copy">
                    <div className="armory-skill-titleline">
                      <h3>{skill.name}</h3>
                      <span>{skill.loadoutStatus}</span>
                    </div>
                    <p>{skill.description}</p>
                    <div
                      className="armory-usage-marks"
                      role="img"
                      aria-label={`${skill.name}: ${skill.loadoutStatus} usage in the current loadout`}
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} className={index < skill.usageMarks ? "filled" : ""} />
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="armory-status" aria-labelledby="hunter-status-title">
            <header className="armory-console-heading">
              <span className="armory-heading-icon">
                <ShieldIcon />
              </span>
              <h2 id="hunter-status-title">Hunter Status</h2>
            </header>

            <LeatherFrame className="armory-status-card">
              <p className="armory-status-name">Khristopher Ben Manilla</p>
              <div className="armory-rank-line">
                <span>HR</span>
                <div><i /></div>
                <strong>47</strong>
              </div>

              <dl className="armory-status-list">
                {HUNTER_STATUS.map((item) => (
                  <div key={item.label}>
                    <dt><i className={`tone-${item.tone}`} />{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="armory-traits">
                <h3>Field Traits</h3>
                <ul>
                  {FIELD_TRAITS.map((trait, index) => (
                    <li key={trait}><span>{String(index + 1).padStart(2, "0")}</span>{trait}</li>
                  ))}
                </ul>
              </div>
            </LeatherFrame>
          </aside>
        </div>
      </RevealOnScroll>
    </div>
  );
}
