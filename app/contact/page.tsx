import type { Metadata } from "next";
import { CodeXml, Mail, Network } from "lucide-react";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import ContactForm from "@/components/sections/ContactForm";
import { PROFILE } from "@/lib/content/profile";

export const metadata: Metadata = {
  title: "Contact — Khristopher Ben Manilla",
  description: "Contact Khristopher Ben Manilla about software engineering opportunities.",
};

const CONTACT_LINKS = [
  { label: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: Mail, external: false },
  { label: "LinkedIn profile", href: PROFILE.linkedin, icon: Network, external: true },
  { label: "GitHub profile", href: PROFILE.github, icon: CodeXml, external: true },
] as const;

export default function ContactPage() {
  return (
    <div className="page-shell">
      <div className="contact-layout">
        <RevealOnScroll>
          <p className="wdl-kicker">Contact</p>
          <h2 className="section-title">Let&rsquo;s discuss the work.</h2>
          <p className="section-intro">I am open to software engineering, full-stack, AI/ML, and application-security opportunities. Email is the fastest way to reach me.</p>
          <div className="contact-links">
            {CONTACT_LINKS.map(({ label, href, icon: Icon, external }) => (
              <a key={href} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
                <Icon aria-hidden="true" /><span>{label}</span><span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}><ContactForm /></RevealOnScroll>
      </div>
    </div>
  );
}
