/**
 * Repository-verified tech stack.
 *
 * Every technology below is confirmed by a dependency manifest, configuration,
 * import, schema, or CI workflow in either this portfolio repository or an
 * accessible featured-project repository — not from résumé, profession, or prose.
 *
 * Evidence sources:
 * - Portfolio (this repo): package.json, next.config.ts, postcss (Tailwind v4),
 *   app/globals.css, component imports, app/actions/contact.ts, lib/email/*.
 * - All in Time (github.com/kbmanilla06/All-in-Time): backend/composer.json,
 *   frontend/package.json, docker-compose.yml, .github/workflows/ci.yml.
 * - Customer Churn Prediction (github.com/kbmanilla06/customer-churn-prediction):
 *   requirements.txt.
 * - NLTKBot (github.com/Jassim3nidad/NLTKBot): requirements.txt.
 * - AegisAI NIDPS (github.com/kbmanilla06/AegisAI-NIDPS): pyproject.toml,
 *   apps/dashboard/package.json, docker-compose.yml, .github/workflows/ci.yml.
 */

export type TechIconKey =
  | "frontend"
  | "backend"
  | "database"
  | "ai"
  | "testing"
  | "devops"
  | "design"
  | "integrations";

export interface TechCategory {
  name: string;
  iconKey: TechIconKey;
  /** Where these technologies are verified in the repositories. */
  evidence: string;
  technologies: string[];
}

export const TECH_STACK: TechCategory[] = [
  {
    name: "Frontend",
    iconKey: "frontend",
    evidence: "This portfolio (Next.js) and the All in Time & AegisAI dashboards (React + Vite).",
    technologies: ["Next.js", "React", "TypeScript", "Vite", "Tailwind CSS", "React Router", "Recharts"],
  },
  {
    name: "Backend",
    iconKey: "backend",
    evidence: "All in Time (Laravel / PHP), AegisAI (FastAPI + Celery), NLTKBot (Flask).",
    technologies: ["Laravel", "PHP", "FastAPI", "Flask", "Node.js", "Celery"],
  },
  {
    name: "Database & Storage",
    iconKey: "database",
    evidence: "PostgreSQL and Redis in All in Time and AegisAI; SQLAlchemy and Alembic in AegisAI.",
    technologies: ["PostgreSQL", "Redis", "SQLAlchemy", "Alembic"],
  },
  {
    name: "AI, ML & Data",
    iconKey: "ai",
    evidence: "Customer Churn Prediction (scikit-learn, XGBoost, SHAP, Streamlit) and NLTKBot (NLTK).",
    technologies: ["Python", "scikit-learn", "XGBoost", "imbalanced-learn", "NLTK", "Streamlit", "SHAP"],
  },
  {
    name: "Testing & Quality",
    iconKey: "testing",
    evidence: "PHPUnit and Vitest in All in Time, pytest in AegisAI, ESLint and Ruff across the codebases.",
    technologies: ["PHPUnit", "Vitest", "Testing Library", "pytest", "ESLint", "Ruff"],
  },
  {
    name: "DevOps & Deployment",
    iconKey: "devops",
    evidence: "Docker Compose and GitHub Actions CI in All in Time and AegisAI; Vercel-hosted portfolio.",
    technologies: ["Docker", "GitHub Actions", "Vercel", "Git"],
  },
  {
    name: "Design & 3D",
    iconKey: "design",
    evidence: "Interactive 3D hero (Spline) with Framer Motion and GSAP motion in this portfolio.",
    technologies: ["Spline", "Framer Motion", "GSAP", "Lucide"],
  },
  {
    name: "Integrations & State",
    iconKey: "integrations",
    evidence: "Contact delivery via Resend / Nodemailer with Zod validation and Zustand state; Sentry monitoring in featured projects.",
    technologies: ["Resend", "Nodemailer", "Sentry", "Zod", "Zustand"],
  },
];
