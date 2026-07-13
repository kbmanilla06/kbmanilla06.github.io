import type { Metadata } from "next";
import Image from "next/image";
import GuildButton from "@/components/ui/GuildButton";
import GuildPanel from "@/components/ui/GuildPanel";
import LeatherFrame from "@/components/ui/LeatherFrame";
import { QUESTS } from "@/lib/content/projects";

const TIMEFORGE = QUESTS.find((project) => project.slug === "timeforge")!;

export const metadata: Metadata = {
  title: "TimeForge Engineering Case Study",
  description:
    "Architecture, security, testing, and delivery decisions behind the TimeForge workforce management platform.",
};

const METRICS = [
  { value: "717", label: "automated tests" },
  { value: "4", label: "server-enforced roles" },
  { value: "80", label: "documented commits" },
  { value: "7", label: "insight capabilities" },
] as const;

const MODULES = [
  "Time entries and approval workflows",
  "KPI cycles and performance records",
  "Payroll preparation and reporting",
  "Employee onboarding and document handling",
  "Role-aware dashboards and audit history",
  "Deterministic workforce insight summaries",
] as const;

const SECURITY_CONTROLS = [
  "Authorization policies and role middleware enforce access on the server.",
  "Authentication endpoints are rate-limited and designed to resist account enumeration.",
  "Sensitive attachments use protected storage and authenticated delivery paths.",
  "Validation, audit records, and role-specific tests cover high-risk workflows.",
] as const;

const DECISIONS = [
  {
    title: "Server authorization over UI-only restrictions",
    detail:
      "The interface adapts to each role, but Laravel policies and middleware remain the source of truth so direct API requests cannot bypass access rules.",
  },
  {
    title: "Deterministic insights before external AI dependency",
    detail:
      "The current insight layer produces explainable results locally. This kept sensitive workforce data out of third-party model calls while preserving a clean path to a future provider.",
  },
  {
    title: "Operational documentation as part of delivery",
    detail:
      "Setup, QA, database, deployment, backup, and role-based user guides were treated as product work—not post-project cleanup.",
  },
] as const;

export default function TimeForgeCaseStudyPage() {
  return (
    <article className="case-study mx-auto max-w-6xl px-6 py-12 sm:py-20">
      <header className="case-study-hero">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-[var(--color-gold)]">Flagship Case Study · 2026</p>
          <h1 className="mt-4 text-4xl leading-tight text-[var(--color-gold-bright)] sm:text-5xl">TimeForge</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--color-ivory)]">
            A secure workforce operations platform built from stakeholder requirements into a documented, testable full-stack MVP.
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-[var(--color-text-muted)]">{TIMEFORGE.summary}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <GuildButton href={TIMEFORGE.repoUrl} external variant="accent" brass>
              Review Repository
            </GuildButton>
            <GuildButton href="/#quests" brass>Back to Projects</GuildButton>
          </div>
        </div>

        <div className="case-study-preview relative mt-10 aspect-[16/9] overflow-hidden border border-[var(--color-brass-dark)] bg-[var(--color-iron)]">
          <Image
            src={TIMEFORGE.image}
            alt="TimeForge authentication interface"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="object-cover"
          />
        </div>
      </header>

      <section className="case-study-metrics" aria-label="Project evidence">
        {METRICS.map((metric) => (
          <div key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className="case-study-section grid gap-6 lg:grid-cols-2">
        <GuildPanel>
          <p className="case-study-label">Problem &amp; Context</p>
          <h2>A broad operational workflow needed one reliable system.</h2>
          <p>
            StartupLab Business Center &amp; AI Consulting Services OPC needed a platform covering workforce records, time tracking, approvals, performance, payroll preparation, reporting, and onboarding. The main engineering challenge was turning a large requirements document into coherent workflows without weakening authorization or traceability.
          </p>
        </GuildPanel>
        <GuildPanel>
          <p className="case-study-label">My Contribution</p>
          <h2>Full-stack implementation and technical delivery.</h2>
          <p>
            I owned architecture, implementation, security controls, automated testing, documentation, and technical handoff. The work was stakeholder-led and AI-assisted; engineering judgment, review, validation, and delivery remained my responsibility.
          </p>
        </GuildPanel>
      </section>

      <section className="case-study-section">
        <p className="case-study-label">Product Scope</p>
        <h2>Connected modules instead of isolated demos</h2>
        <div className="case-study-module-grid">
          {MODULES.map((module) => <LeatherFrame key={module} className="p-5">{module}</LeatherFrame>)}
        </div>
      </section>

      <section className="case-study-section">
        <p className="case-study-label">Architecture</p>
        <h2>A typed frontend, policy-driven API, and relational data layer</h2>
        <div className="architecture-flow" role="img" aria-label="React TypeScript frontend connects to a Laravel REST API, which connects to PostgreSQL and protected file storage">
          <div><span>Interface</span><strong>React + TypeScript</strong><small>Vite SPA · role-aware UX</small></div>
          <i aria-hidden="true">→</i>
          <div><span>Application</span><strong>Laravel REST API</strong><small>Policies · validation · services</small></div>
          <i aria-hidden="true">→</i>
          <div><span>Data</span><strong>PostgreSQL + Storage</strong><small>Relational records · protected files</small></div>
        </div>
        <p className="case-study-note">
          Docker Compose supports local services; GitHub Actions runs frontend and backend validation on repository changes.
        </p>
      </section>

      <section className="case-study-section grid gap-6 lg:grid-cols-2">
        <LeatherFrame className="p-6 sm:p-8">
          <p className="case-study-label">Security</p>
          <h2>Authorization is enforced beyond the interface</h2>
          <ul className="evidence-bullet-list mt-5">
            {SECURITY_CONTROLS.map((control) => <li key={control}>{control}</li>)}
          </ul>
        </LeatherFrame>
        <LeatherFrame className="p-6 sm:p-8">
          <p className="case-study-label">Testing Strategy</p>
          <h2>Behavior, permissions, and regressions</h2>
          <p>
            The backend suite contains 370 unit and feature tests covering domain workflows, validation, and authorization. The frontend contains 347 component and interaction tests. Together, 717 automated tests act as delivery gates for the highest-risk behavior.
          </p>
        </LeatherFrame>
      </section>

      <section className="case-study-section">
        <p className="case-study-label">Engineering Decisions</p>
        <h2>Tradeoffs made for security, explainability, and delivery</h2>
        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {DECISIONS.map((decision) => (
            <GuildPanel key={decision.title} className="h-full">
              <h3 className="text-lg text-[var(--color-ivory)]">{decision.title}</h3>
              <p className="mt-4">{decision.detail}</p>
            </GuildPanel>
          ))}
        </div>
      </section>

      <section className="case-study-section">
        <LeatherFrame className="p-6 sm:p-8">
          <p className="case-study-label">Current Maturity &amp; Next Steps</p>
          <h2>An honest boundary around the MVP</h2>
          <p>
            The current build is designed for one organization, uses deterministic local insights, and does not yet include multi-tenancy, external-model integration, or malware scanning for uploads. The next production-hardening steps are queued background processing, stronger file scanning, broader observability, and validated multi-organization isolation if the product scope expands.
          </p>
        </LeatherFrame>
      </section>
    </article>
  );
}
