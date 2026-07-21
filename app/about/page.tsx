import type { Metadata } from "next";
import { MapPin, Radio, UserRound } from "lucide-react";
import WdlPanel from "@/components/ui/WdlPanel";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import SectionIndex from "@/components/ui/SectionIndex";
import { PROFILE } from "@/lib/content/profile";

export const metadata: Metadata = {
  title: "Professional Profile — Khristopher Ben Manilla",
  description: "Professional profile of full-stack software engineer Khristopher Ben Manilla.",
};

const PROFILE_FACTS = [
  { label: "Location", value: PROFILE.location, icon: MapPin },
  { label: "Status", value: PROFILE.rank, icon: UserRound },
  { label: "Availability", value: PROFILE.availability, icon: Radio },
] as const;

export default function AboutPage() {
  return (
    <div className="page-shell">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)]">
        <RevealOnScroll>
          <p className="wdl-kicker">Professional profile</p>
          <SectionIndex n={2} />
          <h2 className="section-title">Product-minded engineering, backed by validation.</h2>
          <div className="profile-facts">
            {PROFILE_FACTS.map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <Icon aria-hidden="true" />
                <dl><div><dt>{label}</dt><dd>{value}</dd></div></dl>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <WdlPanel className="space-y-5">
            {PROFILE.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </WdlPanel>
        </RevealOnScroll>
      </div>
    </div>
  );
}
