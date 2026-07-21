import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DirectionalLink from "@/components/ui/DirectionalLink";
import { PROJECTS } from "@/lib/content/projects";

const PROJECT = PROJECTS.find((project) => project.slug === "aegis")!;

export const metadata: Metadata = {
  title: "AegisAI NIDPS Security Engineering Case Study",
  description:
    "Architecture, safety boundaries, testing, and engineering evidence for the synthetic-only AegisAI network intrusion detection platform.",
};

const METRICS = [
  { value: "264", label: "backend tests passed" },
  { value: "7", label: "frontend tests passed" },
  { value: "39 + 7", label: "feature + provenance columns" },
  { value: "4", label: "offline input formats" },
] as const;

const CAPABILITIES = [
  { title: "Identity & authorization", body: "Opaque server-side sessions, RBAC, CSRF and Origin enforcement, throttling, rotation, revocation, and audit foundations." },
  { title: "Defensive ingestion", body: "Strict canonical JSONL, Zeek connection, Suricata EVE, and offline PCAP/PCAPNG boundaries with hostile-input controls." },
  { title: "Deterministic detection", body: "Versioned rules, event-time windows, stable fingerprints, evidence provenance, suppression, review guidance, and audit behavior." },
  { title: "Synthetic ML evidence", body: "A versioned 39-feature contract, group/time-aware splits, bounded baseline comparison, sealed-test evidence, and offline-only scoring." },
  { title: "Analyst workflow", body: "Alerts, incidents, monitoring, feedback, aggregate reports, evidence integrity, and controlled retention policies." },
  { title: "Simulated prevention", body: "Policy previews are constrained to simulation and cannot modify firewalls, packets, sockets, hosts, or network state." },
] as const;

const DECISIONS = [
  {
    title: "The API is the trust boundary",
    body: "The React dashboard is never treated as authorization. Sensitive writes pass through server-side permission, CSRF/Origin, validation, and audit controls.",
  },
  {
    title: "Evidence before performance claims",
    body: "Artifacts are versioned and hash-bound, but synthetic results are never presented as real-network accuracy, zero-day detection, or production readiness.",
  },
  {
    title: "Prevention stays reversible",
    body: "The prevention adapter records a simulation result only. The enforcement zone is deliberately absent, preventing the demo from changing host or network state.",
  },
] as const;

const VERIFIED_LINKS = [
  { label: "Repository", href: PROJECT.repoUrl },
  { label: "Architecture overview", href: `${PROJECT.repoUrl}/blob/main/docs/portfolio/ARCHITECTURE_OVERVIEW.md` },
  { label: "Threat model", href: `${PROJECT.repoUrl}/blob/main/docs/threat-model/THREAT_MODEL.md` },
  { label: "Claims review", href: `${PROJECT.repoUrl}/blob/main/docs/portfolio/CLAIMS_REVIEW.md` },
  { label: "Evidence index", href: `${PROJECT.repoUrl}/blob/main/docs/portfolio/EVIDENCE_INDEX.md` },
] as const;

export default function AegisCaseStudyPage() {
  return (
    <article className="wdl-case-study">
      <header className="wdl-case-hero">
        <div className="wdl-case-copy">
          <p className="wdl-eyebrow"><span aria-hidden="true" /> Portfolio-ready synthetic-only milestone</p>
          <h1>AegisAI NIDPS</h1>
          <p className="wdl-lede">
            A defensive network intrusion-detection platform that turns authorized offline telemetry into traceable detections, analyst evidence, and simulation-only prevention decisions.
          </p>
          <p className="wdl-supporting">{PROJECT.summary}</p>
          <div className="wdl-action-row">
            <a className="wdl-button wdl-button-primary" href={PROJECT.repoUrl} target="_blank" rel="noopener noreferrer">
              Review repository <span aria-hidden="true">↗</span>
            </a>
            <Link className="wdl-button wdl-button-secondary" href="/#quests">Back to projects</Link>
          </div>
        </div>

        <div className="wdl-preview">
          <div className="wdl-preview-bar">
            <span><i aria-hidden="true" /> System evidence</span>
            <strong>Simulation only</strong>
          </div>
          <div className="wdl-preview-media">
            <Image src={PROJECT.image} alt="AegisAI synthetic network defense dashboard overview" fill priority sizes="(max-width: 1024px) 100vw, 720px" className="object-cover" />
          </div>
        </div>
      </header>

      <section className="wdl-metric-grid" aria-label="Verified project evidence">
        {METRICS.map((metric) => (
          <div key={metric.label} className="wdl-metric">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className="wdl-section wdl-two-column">
        <div>
          <p className="wdl-section-label">Engineering objective</p>
          <h2>Demonstrate security judgment, not offensive spectacle.</h2>
        </div>
        <div className="wdl-prose">
          <p>
            AegisAI was built as inspectable defensive software: untrusted inputs are normalized, authorization remains server-side, evidence carries provenance, and claims are limited to what the repository can prove.
          </p>
          <p>
            The portfolio milestone covers the IDS plus simulated-IPS path through Sprint 9 and post-MVP gates P1–P5, with a reproducible local ARM64 Docker Compose workflow and passing hosted CI.
          </p>
        </div>
      </section>

      <section className="wdl-section">
        <p className="wdl-section-label">Implemented capability</p>
        <h2>One connected defensive platform</h2>
        <div className="wdl-capability-grid">
          {CAPABILITIES.map((capability, index) => (
            <article key={capability.title} className="wdl-card">
              <span className="wdl-card-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{capability.title}</h3>
              <p>{capability.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wdl-section">
        <p className="wdl-section-label">Trust boundaries</p>
        <h2>Authorization and evidence stay explicit</h2>
        <div className="wdl-flow" role="img" aria-label="Authorized offline input passes through FastAPI validation and RBAC, Celery normalization and detection, PostgreSQL evidence, analyst review, and a simulation-only prevention adapter">
          <div><span>01 · Input</span><strong>Authorized offline telemetry</strong><small>Synthetic fixtures · Zeek · Suricata · PCAP</small></div>
          <i aria-hidden="true">→</i>
          <div><span>02 · Trust boundary</span><strong>FastAPI + RBAC</strong><small>Validate · authorize · audit · retain</small></div>
          <i aria-hidden="true">→</i>
          <div><span>03 · Evidence</span><strong>Detection + PostgreSQL</strong><small>Normalize · fingerprint · preserve provenance</small></div>
          <i aria-hidden="true">→</i>
          <div><span>04 · Outcome</span><strong>Analyst review</strong><small>Simulation preview · no enforcement</small></div>
        </div>
      </section>

      <section className="wdl-section">
        <p className="wdl-section-label">Engineering decisions</p>
        <h2>Tradeoffs that protect trust</h2>
        <div className="wdl-decision-grid">
          {DECISIONS.map((decision) => (
            <article key={decision.title} className="wdl-card">
              <h3>{decision.title}</h3>
              <p>{decision.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wdl-boundary" aria-labelledby="aegis-boundary-title">
        <div>
          <p className="wdl-section-label">Honest capability boundary</p>
          <h2 id="aegis-boundary-title">Synthetic demo only</h2>
        </div>
        <p>
          No real dataset, live packet capture, public-network deployment, online inference, automatic blocking, or real prevention is present. The accepted evidence demonstrates software contracts and reproducibility; it does not measure real-world detection performance or production readiness.
        </p>
      </section>

      <section className="wdl-section">
        <p className="wdl-section-label">Verification</p>
        <h2>Inspect the evidence directly</h2>
        <div className="wdl-link-grid">
          {VERIFIED_LINKS.map((link) => (
            <DirectionalLink key={link.href} href={link.href} external>{link.label}</DirectionalLink>
          ))}
        </div>
      </section>
    </article>
  );
}
