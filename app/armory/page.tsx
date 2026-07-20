import type { Metadata } from "next";
import { BrainCircuit, Code2, Container, Database, Monitor, ServerCog, ShieldCheck, TestTube2 } from "lucide-react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import { SKILLS } from "@/lib/content/skills";

export const metadata: Metadata = {
  title: "Technical Skills — Khristopher Ben Manilla",
  description: "Technical skills backed by projects, testing, and production delivery.",
};

const SKILL_ICONS: Record<string, React.ReactNode> = {
  "TypeScript & React": <Code2 />,
  "Laravel & PHP": <ServerCog />,
  "PostgreSQL & SQL": <Database />,
  "Application Security": <ShieldCheck />,
  "Python & Machine Learning": <BrainCircuit />,
  "Automated Testing": <TestTube2 />,
  "Docker & CI": <Container />,
  "Next.js & Web UX": <Monitor />,
};

const PROFILE_STATUS = [
  { label: "Academic standing", value: "Fourth-Year BSCS" },
  { label: "Primary focus", value: "Full-Stack Engineering" },
  { label: "Supporting focus", value: "Secure AI / ML" },
  { label: "Current work", value: "Internship Delivery" },
] as const;

const STRENGTHS = ["Evidence-led decisions", "Automated validation", "Secure by default", "Stakeholder translation"];

export default function ArmoryPage() {
  return (
    <div className="page-shell">
      <RevealOnScroll>
        <p className="wdl-kicker">Technical profile</p>
        <h2 className="section-title">Skills backed by shipped work</h2>
        <p className="section-intro">Every capability below points to project evidence, automated tests, or delivered product work.</p>
      </RevealOnScroll>

      <div className="skills-layout">
        <RevealOnScroll className="skills-list">
          <div className="skills-list-header">
            <div><p className="wdl-kicker">Capabilities</p><h3>Technical skills</h3></div>
            <span className="wdl-tag">{String(SKILLS.length).padStart(2, "0")} documented</span>
          </div>
          {SKILLS.map((skill) => (
            <article className="skill-row" key={skill.name}>
              <div className="skill-icon" aria-hidden="true">{SKILL_ICONS[skill.name]}</div>
              <div>
                <div className="skill-heading"><h3>{skill.name}</h3><span>{skill.loadoutStatus}</span></div>
                <p>{skill.description}</p>
                <p className="skill-proof">Evidence: {skill.proof}</p>
              </div>
            </article>
          ))}
        </RevealOnScroll>

        <RevealOnScroll delay={0.08}>
          <aside className="profile-panel" aria-label="Engineering profile">
            <p className="wdl-kicker">Engineering profile</p>
            <h3>Khristopher Ben Manilla</h3>
            <dl>
              {PROFILE_STATUS.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
            </dl>
            <div className="strength-list">
              <h4>Professional strengths</h4>
              <ul>{STRENGTHS.map((strength) => <li key={strength}>{strength}</li>)}</ul>
            </div>
          </aside>
        </RevealOnScroll>
      </div>
    </div>
  );
}
