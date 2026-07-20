import type { Metadata } from "next";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import ProjectCard from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects — Khristopher Ben Manilla",
  description: "Selected full-stack, cybersecurity, machine-learning, and NLP projects with engineering evidence.",
};

export default function QuestsPage() {
  return (
    <div className="page-shell">
      <RevealOnScroll>
        <div className="section-heading-row">
          <div><p className="wdl-kicker">Selected work</p><h2 className="section-title">Projects with proof</h2></div>
          <span className="wdl-tag">{String(PROJECTS.length).padStart(2, "0")} documented builds</span>
        </div>
        <p className="section-intro">Each case study states the problem context, my contribution, collaboration model, and verifiable engineering output.</p>
      </RevealOnScroll>
      <div className="project-grid">
        {PROJECTS.map((project, index) => (
          <RevealOnScroll key={project.slug} delay={index * 0.06}><ProjectCard project={project} /></RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
