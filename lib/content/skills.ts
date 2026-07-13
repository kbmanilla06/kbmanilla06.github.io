export type ArmoryCategory = "Weapons" | "Armor Sets" | "Hunter Arts" | "Specialized Tools";

export interface Skill {
  name: string;
  category: ArmoryCategory;
  description: string;
  loadoutStatus: "Primary" | "Active" | "Supporting";
  proof: string;
}

export const SKILLS: Skill[] = [
  {
    name: "TypeScript & React",
    category: "Weapons",
    description: "Production-style SPA architecture, typed UI workflows, state, routing, charts, and component testing.",
    loadoutStatus: "Primary",
    proof: "TimeForge frontend · 186 automated tests",
  },
  {
    name: "Laravel & PHP",
    category: "Weapons",
    description: "REST APIs, policies, middleware, validation, authentication, reporting, and background-ready services.",
    loadoutStatus: "Primary",
    proof: "TimeForge backend · 211 automated tests",
  },
  {
    name: "PostgreSQL & SQL",
    category: "Armor Sets",
    description: "Relational schema design, migrations, reporting queries, data integrity, and production configuration.",
    loadoutStatus: "Active",
    proof: "TimeForge schema and Supabase-hosted PostgreSQL",
  },
  {
    name: "Application Security",
    category: "Armor Sets",
    description: "Server-enforced RBAC, rate limiting, protected files, anti-enumeration flows, and auditability.",
    loadoutStatus: "Active",
    proof: "TimeForge authorization and security controls",
  },
  {
    name: "Python & Machine Learning",
    category: "Hunter Arts",
    description: "Reproducible preprocessing, model comparison, imbalance handling, evaluation, and interactive analysis.",
    loadoutStatus: "Primary",
    proof: "Customer Churn Prediction and NLTKBot",
  },
  {
    name: "Automated Testing",
    category: "Hunter Arts",
    description: "Unit, integration, authorization, and component tests used as delivery gates rather than afterthoughts.",
    loadoutStatus: "Primary",
    proof: "397 automated tests across TimeForge",
  },
  {
    name: "Docker & CI",
    category: "Specialized Tools",
    description: "Documented container environments, automated checks, deployment preparation, and operational runbooks.",
    loadoutStatus: "Active",
    proof: "Docker Compose and GitHub Actions in TimeForge",
  },
  {
    name: "Next.js & Web UX",
    category: "Specialized Tools",
    description: "Responsive interfaces, server actions, validation, accessible interaction, animation, and performance-aware media.",
    loadoutStatus: "Active",
    proof: "This portfolio and production Vercel delivery",
  },
];

export const ARMORY_CATEGORIES: { category: ArmoryCategory; blurb: string }[] = [
  { category: "Weapons", blurb: "Primary programming languages" },
  { category: "Armor Sets", blurb: "Frameworks for building interfaces" },
  { category: "Hunter Arts", blurb: "Applied AI & machine learning" },
  { category: "Specialized Tools", blurb: "Core web fundamentals" },
];
