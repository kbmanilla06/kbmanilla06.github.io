import type { Metadata } from "next";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import GuildReceptionForm from "@/components/sections/GuildReceptionForm";
import EngravedIcon from "@/components/ui/EngravedIcon";
import { MailIcon, LinkedInIcon, GitHubIcon } from "@/components/ui/icons";
import { PROFILE } from "@/lib/content/profile";

export const metadata: Metadata = {
  title: "Guild Reception — Khristopher Ben Manilla",
  description: "Send a quest request to Khristopher Ben Manilla.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <div className="grid gap-12 sm:grid-cols-2">
        <RevealOnScroll>
          <p className="mb-3 text-sm uppercase tracking-wide text-[var(--color-gold)]">
            Post a Request
          </p>
          <h1 className="text-3xl sm:text-4xl text-[var(--color-ivory)]">
            Form a hunting
            <br />
            party.
          </h1>
          <p className="mt-4 max-w-md text-sm text-[var(--color-text-muted)]">
            Open to internships, freelance projects, and interesting
            collaborations. Send a request and I&rsquo;ll answer the call.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="flex items-center gap-3 text-sm text-[var(--color-ivory)] hover:text-[var(--color-gold-bright)]"
            >
              <EngravedIcon>
                <MailIcon />
              </EngravedIcon>
              {PROFILE.email}
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-[var(--color-ivory)] hover:text-[var(--color-gold-bright)]"
            >
              <EngravedIcon>
                <LinkedInIcon />
              </EngravedIcon>
              linkedin.com/in/khristopher-ben-manilla
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-[var(--color-ivory)] hover:text-[var(--color-gold-bright)]"
            >
              <EngravedIcon>
                <GitHubIcon />
              </EngravedIcon>
              github.com/kbmanilla06
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <GuildReceptionForm />
        </RevealOnScroll>
      </div>
    </div>
  );
}
