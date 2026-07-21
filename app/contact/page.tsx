import type { Metadata } from "next";
import { CodeXml, Mail, Network } from "lucide-react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import ContactForm from "@/components/sections/ContactForm";
import DirectionalLink from "@/components/ui/DirectionalLink";
import SectionIndex from "@/components/ui/SectionIndex";
import { PROFILE } from "@/lib/content/profile";

export const metadata: Metadata = {
  title: "Contact — Khristopher Ben Manilla",
  description: "Contact Khristopher Ben Manilla about software engineering opportunities.",
};

const CONTACT_LINKS = [
  { label: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: <Mail />, external: false },
  { label: "LinkedIn profile", href: PROFILE.linkedin, icon: <Network />, external: true },
  { label: "GitHub profile", href: PROFILE.github, icon: <CodeXml />, external: true },
];

export default function ContactPage() {
  return (
    <div className="page-shell">
      <div className="contact-layout">
        <RevealOnScroll>
          <p className="wdl-kicker">Contact</p>
          <SectionIndex n={6} />
          <h2 className="section-title">Let&rsquo;s discuss the work.</h2>
          <p className="section-intro">I am open to software engineering, full-stack, AI/ML, and application-security opportunities. Email is the fastest way to reach me.</p>
          <div className="contact-links">
            {CONTACT_LINKS.map(({ label, href, icon, external }) => (
              <DirectionalLink key={href} href={href} external={external} icon={icon}>{label}</DirectionalLink>
            ))}
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}><ContactForm /></RevealOnScroll>
      </div>
    </div>
  );
}
