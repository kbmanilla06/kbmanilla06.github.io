import type { Metadata } from "next";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import WdlCard from "@/components/ui/WdlCard";
import SectionIndex from "@/components/ui/SectionIndex";
import { EDUCATION, EXPERIENCE } from "@/lib/content/experience";
import { CERTIFICATIONS } from "@/lib/content/certifications";

export const metadata: Metadata = {
  title: "Experience & Education — Khristopher Ben Manilla",
  description: "Software engineering internship experience and Computer Science education.",
};

export default function ArsenalPage() {
  return (
    <div className="page-shell">
      <RevealOnScroll><p className="wdl-kicker">Career record</p><SectionIndex n={4} /><h2 className="section-title">Experience &amp; education</h2></RevealOnScroll>
      <div className="career-grid">
        <RevealOnScroll>
          <WdlCard className="career-card h-full">
            <BriefcaseBusiness aria-hidden="true" />
            <p className="wdl-kicker">{EXPERIENCE.period}</p>
            <h3>{EXPERIENCE.role}</h3>
            <p className="career-org">{EXPERIENCE.organization}</p>
            <p>{EXPERIENCE.summary}</p>
            <ul className="evidence-bullet-list">{EXPERIENCE.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
          </WdlCard>
        </RevealOnScroll>
        <RevealOnScroll delay={0.08}>
          <WdlCard className="career-card h-full">
            <GraduationCap aria-hidden="true" />
            <p className="wdl-kicker">{EDUCATION.period}</p>
            <h3>{EDUCATION.degree}</h3>
            <p className="career-org">{EDUCATION.school}</p>
            <p>{EDUCATION.standing}</p>
          </WdlCard>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={0.12} className="certification-section">
        <p className="wdl-kicker">Additional training</p>
        <h3>Certifications &amp; development</h3>
        <div className="certification-grid">
          {CERTIFICATIONS.map((certification, index) => (
            <WdlCard key={certification.title} className="certification-card">
              <div><h4><SectionIndex n={index + 1} className="wdl-index-inline" />{certification.title}</h4><span>{certification.issued}</span></div>
              <p>{certification.issuer}</p>
              <small>{certification.credential}</small>
            </WdlCard>
          ))}
        </div>
        <p className="section-note">Public credential links can be added when the individual badge URLs are available.</p>
      </RevealOnScroll>
    </div>
  );
}
