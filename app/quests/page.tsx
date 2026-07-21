import type { Metadata } from "next";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionIndex from "@/components/ui/SectionIndex";
import { PROJECTS } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects — Khristopher Ben Manilla",
  description: "Selected full-stack, cybersecurity, machine-learning, and NLP projects with engineering evidence.",
};

export default function QuestsPage({ standalone = true }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <div className="page-shell">
      <RevealOnScroll className="section-rail">
        <div className="section-heading-row">
          <div><p className="wdl-kicker">Selected work</p><SectionIndex n={1} /><Heading className="section-title">Projects with proof</Heading></div>
          <span className="wdl-tag">{String(PROJECTS.length).padStart(2, "0")} documented builds</span>
        </div>
        <p className="section-intro">Each case study states the problem context, my contribution, collaboration model, and verifiable engineering output.</p>
      </RevealOnScroll>
      <div className="project-grid">
        {PROJECTS.map((project, index) => (
          <RevealOnScroll key={project.slug} delay={index * 0.06}>
            <ProjectCard project={project} headingLevel={standalone ? "h2" : "h3"} />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
