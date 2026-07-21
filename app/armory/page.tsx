import type { Metadata } from "next";
import { BrainCircuit, Code2, Container, Database, Server, Shapes, TestTube2, Workflow } from "lucide-react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import SectionIndex from "@/components/ui/SectionIndex";
import { TECH_STACK, type TechIconKey } from "@/lib/content/skills";

export const metadata: Metadata = {
  title: "Tech Stack — Khristopher Ben Manilla",
  description: "The frameworks, libraries, and tools verified in this portfolio and its featured project repositories.",
};

const CATEGORY_ICONS: Record<TechIconKey, React.ReactNode> = {
  frontend: <Code2 />,
  backend: <Server />,
  database: <Database />,
  ai: <BrainCircuit />,
  testing: <TestTube2 />,
  devops: <Container />,
  design: <Shapes />,
  integrations: <Workflow />,
};

const PROFILE_STATUS = [
  { label: "Academic standing", value: "Fourth-Year BSCS" },
  { label: "Primary focus", value: "Full-Stack Engineering" },
  { label: "Supporting focus", value: "Secure AI / ML" },
  { label: "Current work", value: "Internship Delivery" },
] as const;

const STRENGTHS = ["Evidence-led decisions", "Automated validation", "Secure by default", "Stakeholder translation"];

const TECH_COUNT = TECH_STACK.reduce((total, category) => total + category.technologies.length, 0);

export default function ArmoryPage({ standalone = true }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const SubHeading = standalone ? "h2" : "h3";
  const SubSubHeading = standalone ? "h3" : "h4";
  return (
    <div className="page-shell">
      <RevealOnScroll>
        <p className="wdl-kicker">Tech stack</p>
        <SectionIndex n={3} />
        <Heading className="section-title">Tools verified in the work</Heading>
        <p className="section-intro">
          Every technology below is confirmed in this portfolio&rsquo;s repository or in the public repositories of the featured
          projects — through dependency manifests, configuration, imports, or CI workflows.
        </p>
      </RevealOnScroll>

      <div className="skills-layout">
        <RevealOnScroll className="skills-list">
          <div className="skills-list-header">
            <div><p className="wdl-kicker">Repository-verified</p><SubHeading>Technology stack</SubHeading></div>
            <span className="wdl-tag">{TECH_COUNT} technologies</span>
          </div>
          {TECH_STACK.map((category, index) => (
            <article className="skill-row" key={category.name}>
              <div className="skill-icon" aria-hidden="true">{CATEGORY_ICONS[category.iconKey]}</div>
              <div>
                <div className="skill-heading"><SubHeading><SectionIndex n={index + 1} className="skill-heading-index" />{category.name}</SubHeading><span>{category.technologies.length} tools</span></div>
                <ul className="tech-tags" aria-label={`${category.name} technologies`}>
                  {category.technologies.map((tech) => <li key={tech} className="wdl-tag">{tech}</li>)}
                </ul>
                <p className="skill-proof">Evidence: {category.evidence}</p>
              </div>
            </article>
          ))}
        </RevealOnScroll>

        <RevealOnScroll delay={0.08}>
          <aside className="profile-panel" aria-label="Engineering profile">
            <p className="wdl-kicker">Engineering profile</p>
            <SubHeading>Khristopher Ben Manilla</SubHeading>
            <dl>
              {PROFILE_STATUS.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
            </dl>
            <div className="strength-list">
              <SubSubHeading>Professional strengths</SubSubHeading>
              <ul>{STRENGTHS.map((strength) => <li key={strength}>{strength}</li>)}</ul>
            </div>
          </aside>
        </RevealOnScroll>
      </div>
    </div>
  );
}
