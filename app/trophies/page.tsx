import type { Metadata } from "next";
import { Award } from "lucide-react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import WdlPanel from "@/components/ui/WdlPanel";
import SectionIndex from "@/components/ui/SectionIndex";
import { ACHIEVEMENTS } from "@/lib/content/achievements";

export const metadata: Metadata = {
  title: "Academic Honors — Khristopher Ben Manilla",
  description: "Academic honors earned by Khristopher Ben Manilla.",
};

export default function TrophiesPage({ standalone = true }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const SubHeading = standalone ? "h2" : "h3";
  return (
    <div className="page-shell page-shell-narrow">
      <RevealOnScroll>
        <p className="wdl-kicker">Academic recognition</p>
        <SectionIndex n={5} />
        <Heading className="section-title">Academic honors</Heading>
      </RevealOnScroll>
      <div className="achievement-list">
        {ACHIEVEMENTS.map((achievement, index) => (
          <RevealOnScroll key={achievement.id} delay={index * 0.08}>
            <WdlPanel as="article" className="achievement-card">
              <div className="achievement-icon"><Award aria-hidden="true" /></div>
              <div>
                <div className="achievement-meta"><span>{achievement.years}</span><span className="wdl-tag">{achievement.distinction}</span></div>
                <SubHeading><SectionIndex n={index + 1} className="wdl-index-inline" />{achievement.title}</SubHeading>
                <p className="achievement-org">{achievement.org}</p>
                <p>{achievement.description}</p>
              </div>
            </WdlPanel>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
