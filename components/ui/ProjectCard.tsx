import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Project } from "@/lib/content/projects";
import WdlButton from "./WdlButton";

export default function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className={`project-card ${project.featured ? "project-card-featured" : ""}`}>
      <div className="project-card-image">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes={project.featured ? "(max-width: 1024px) 100vw, 72vw" : "(max-width: 768px) 100vw, 50vw"}
          className="object-cover"
        />
        <span className="project-status"><CheckCircle2 aria-hidden="true" />{project.status}</span>
      </div>
      <div className="project-card-body">
        <div className="project-card-heading">
          <p className="wdl-kicker">{project.projectNumber}{project.rank ? ` · ${project.rank}` : ""}</p>
          <Heading>{project.title}</Heading>
          <p>{project.category} · {project.year}</p>
        </div>
        <p className="project-summary">{project.summary}</p>
        <dl className="project-evidence-meta">
          {!project.featured && <div><dt>Context</dt><dd>{project.context}</dd></div>}
          <div><dt>My role</dt><dd>{project.role}</dd></div>
          <div><dt>Collaboration</dt><dd>{project.collaboration}</dd></div>
        </dl>
        <div>
          <p className="wdl-kicker">Engineering evidence</p>
          <ul className="project-evidence-list">{project.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="project-tags">{project.tags.map((tag) => <span key={tag} className="wdl-tag">{tag}</span>)}</div>
        <div className="project-actions">
          {project.caseStudyUrl && <WdlButton href={project.caseStudyUrl} variant="accent">Read case study</WdlButton>}
          <WdlButton href={project.repoUrl} external icon={<ArrowUpRight />}>Repository</WdlButton>
        </div>
      </div>
    </article>
  );
}
