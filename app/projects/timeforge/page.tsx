import type { Metadata } from "next";
import Image from "next/image";
import WdlButton from "@/components/ui/WdlButton";
import WdlPanel from "@/components/ui/WdlPanel";
import WdlCard from "@/components/ui/WdlCard";
import { PROJECTS } from "@/lib/content/projects";

const ALL_IN_TIME = PROJECTS.find((project) => project.slug === "timeforge")!;

export const metadata: Metadata = {
  title: "All in Time Engineering Case Study",
  description:
    "Architecture, security, testing, and delivery decisions behind the All in Time workforce management platform.",
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

const WORKFLOW_GALLERY = [
  {
    src: "/pictures/timeforge-dashboard.png",
    alt: "All in Time workforce dashboard with attendance and payroll summaries",
    title: "Workforce dashboard",
    caption: "Department filters, attendance totals, payroll summary, and utilization reporting in one role-aware view.",
  },
  {
    src: "/pictures/timeforge-timesheet-review.png",
    alt: "All in Time supervisor timesheet review and approval controls",
    title: "Supervisor approval workflow",
    caption: "Expanded employee records expose pending entries, comments, approval, rejection, and revision requests.",
  },
  {
    src: "/pictures/timeforge-payroll.png",
    alt: "All in Time payroll preparation table and export controls",
    title: "Payroll preparation",
    caption: "Approved, pending, rejected, attendance, and estimated-payroll data can be reviewed before export.",
  },
  {
    src: "/pictures/timeforge-audit-log.png",
    alt: "All in Time read-only audit log showing a successful login event",
    title: "Audit trail",
    caption: "Sensitive actions are recorded with time, actor, action, subject, and metadata for traceability.",
  },
] as const;

const VERIFIED_LINKS = [
  { label: "Passing CI run", href: "https://github.com/kbmanilla06/All-in-Time/actions/runs/29262050052" },
  { label: "Backend test suite", href: "https://github.com/kbmanilla06/All-in-Time/tree/main/backend/tests" },
  { label: "Frontend tests", href: "https://github.com/kbmanilla06/All-in-Time/tree/main/frontend/src" },
  { label: "Architecture decisions", href: "https://github.com/kbmanilla06/All-in-Time/blob/main/docs/DECISIONS.md" },
  { label: "Deployment runbook", href: "https://github.com/kbmanilla06/All-in-Time/blob/main/docs/DEPLOYMENT.md" },
] as const;

export default function AllInTimeCaseStudyPage() {
  return (
    <article className="case-study mx-auto max-w-6xl px-6 py-12 sm:py-20">
      <header className="case-study-hero">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-[var(--wdl-text-muted)]">Flagship Case Study · 2026</p>
          <h1 className="mt-4 text-4xl leading-tight text-[var(--wdl-text-primary)] sm:text-5xl">All in Time</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--wdl-text-primary)]">
            A secure workforce operations platform built from stakeholder requirements into a documented, testable full-stack MVP.
          </p>
          <p className="mt-4 max-w-3xl leading-relaxed text-[var(--wdl-text-secondary)]">{ALL_IN_TIME.summary}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <WdlButton href={ALL_IN_TIME.repoUrl} external variant="accent" >
              Review Repository
            </WdlButton>
            <WdlButton href="/#quests" >Back to Projects</WdlButton>
          </div>
        </div>

        <div className="case-study-preview relative mt-10 aspect-[16/9] overflow-hidden border border-[var(--wdl-border-strong)] bg-[var(--wdl-surface-base)]">
          <Image
            src={ALL_IN_TIME.image}
            alt="All in Time authentication interface"
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
        <WdlPanel>
          <p className="case-study-label">Problem &amp; Context</p>
          <h2>A broad operational workflow needed one reliable system.</h2>
          <p>
            StartupLab Business Center &amp; AI Consulting Services OPC needed a platform covering workforce records, time tracking, approvals, performance, payroll preparation, reporting, and onboarding. The main engineering challenge was turning a large requirements document into coherent workflows without weakening authorization or traceability.
          </p>
        </WdlPanel>
        <WdlPanel>
          <p className="case-study-label">My Contribution</p>
          <h2>Full-stack implementation and technical delivery.</h2>
          <p>
            I owned architecture, implementation, security controls, automated testing, documentation, and technical handoff. The work was stakeholder-led and AI-assisted; engineering judgment, review, validation, and delivery remained my responsibility.
          </p>
        </WdlPanel>
      </section>

      <section className="case-study-section">
        <p className="case-study-label">Product Scope</p>
        <h2>Connected modules instead of isolated demos</h2>
        <div className="case-study-module-grid">
          {MODULES.map((module) => <WdlCard key={module} className="p-5">{module}</WdlCard>)}
        </div>
      </section>

      <section className="case-study-section">
        <p className="case-study-label">Working Product</p>
        <h2>Verified workflows, not concept mockups</h2>
        <p>
          These screens were captured from a locally seeded build using the administrator and supervisor workflows. The demo dataset contains six users across four roles, two departments, and two active projects.
        </p>
        <div className="case-study-gallery">
          {WORKFLOW_GALLERY.map((item) => (
            <figure key={item.src}>
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--wdl-surface-base)]">
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <figcaption>
                <strong>{item.title}</strong>
                <span>{item.caption}</span>
              </figcaption>
            </figure>
          ))}
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
        <WdlCard className="p-6 sm:p-8">
          <p className="case-study-label">Security</p>
          <h2>Authorization is enforced beyond the interface</h2>
          <ul className="evidence-bullet-list mt-5">
            {SECURITY_CONTROLS.map((control) => <li key={control}>{control}</li>)}
          </ul>
        </WdlCard>
        <WdlCard className="p-6 sm:p-8">
          <p className="case-study-label">Testing Strategy</p>
          <h2>Behavior, permissions, and regressions</h2>
          <p>
            The backend suite contains 370 unit and feature tests covering domain workflows, validation, and authorization. The frontend contains 347 component and interaction tests. Together, 717 automated tests act as delivery gates for the highest-risk behavior.
          </p>
        </WdlCard>
      </section>

      <section className="case-study-section">
        <p className="case-study-label">Engineering Decisions</p>
        <h2>Tradeoffs made for security, explainability, and delivery</h2>
        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {DECISIONS.map((decision) => (
            <WdlPanel key={decision.title} className="h-full">
              <h3 className="text-lg text-[var(--wdl-text-primary)]">{decision.title}</h3>
              <p className="mt-4">{decision.detail}</p>
            </WdlPanel>
          ))}
        </div>
      </section>

      <section className="case-study-section">
        <WdlCard className="p-6 sm:p-8">
          <p className="case-study-label">Current Maturity &amp; Next Steps</p>
          <h2>An honest boundary around the MVP</h2>
          <p>
            The current build is designed for one organization, uses deterministic local insights, and does not yet include multi-tenancy, external-model integration, or malware scanning for uploads. The next production-hardening steps are queued background processing, stronger file scanning, broader observability, and validated multi-organization isolation if the product scope expands.
          </p>
        </WdlCard>
      </section>

      <section className="case-study-section">
        <p className="case-study-label">Verification</p>
        <h2>Inspect the implementation evidence directly</h2>
        <p>Repository links lead to the exact test, CI, architecture, and operations evidence behind the claims above.</p>
        <div className="case-study-link-grid">
          {VERIFIED_LINKS.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}<span aria-hidden="true"> ↗</span>
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
