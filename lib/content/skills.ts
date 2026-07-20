export type EngineeringCategory = "Frontend" | "Backend" | "Data" | "Security" | "AI & ML" | "Quality" | "Platform";

export interface Skill {
  name: string;
  category: EngineeringCategory;
  description: string;
  loadoutStatus: "Primary" | "Active" | "Supporting";
  proof: string;
}

export const SKILLS: Skill[] = [
  {
    name: "TypeScript & React",
    category: "Frontend",
    description: "Production-style SPA architecture, typed UI workflows, state, routing, charts, and component testing.",
    loadoutStatus: "Primary",
    proof: "All in Time frontend · 347 automated tests",
  },
  {
    name: "Laravel & PHP",
    category: "Backend",
    description: "REST APIs, policies, middleware, validation, authentication, reporting, and background-ready services.",
    loadoutStatus: "Primary",
    proof: "All in Time backend · 370 automated tests",
  },
  {
    name: "PostgreSQL & SQL",
    category: "Data",
    description: "Relational schema design, migrations, reporting queries, data integrity, and production configuration.",
    loadoutStatus: "Active",
    proof: "All in Time schema and Supabase-hosted PostgreSQL",
  },
  {
    name: "Application Security",
    category: "Security",
    description: "Server-enforced RBAC, rate limiting, protected files, anti-enumeration flows, and auditability.",
    loadoutStatus: "Active",
    proof: "All in Time authorization and security controls",
  },
  {
    name: "Python & Machine Learning",
    category: "AI & ML",
    description: "Reproducible preprocessing, model comparison, imbalance handling, evaluation, and interactive analysis.",
    loadoutStatus: "Primary",
    proof: "Customer Churn Prediction and NLTKBot",
  },
  {
    name: "Automated Testing",
    category: "Quality",
    description: "Unit, integration, authorization, and component tests used as delivery gates rather than afterthoughts.",
    loadoutStatus: "Primary",
    proof: "717 automated tests across All in Time",
  },
  {
    name: "Docker & CI",
    category: "Platform",
    description: "Containerized environments, automated checks, deployment preparation, and operational runbooks.",
    loadoutStatus: "Active",
    proof: "Docker Compose and GitHub Actions in All in Time",
  },
  {
    name: "Next.js & Web UX",
    category: "Frontend",
    description: "Responsive interfaces, server actions, validation, accessible interaction, animation, and performance-aware media.",
    loadoutStatus: "Active",
    proof: "This portfolio and production Vercel delivery",
  },
];
