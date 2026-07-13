export interface Quest {
  slug: string;
  questNumber: string;
  rank: string;
  title: string;
  category: string;
  year: string;
  image: string;
  tags: string[];
  repoUrl: string;
  caseStudyUrl?: string;
  status: "Flagship" | "Completed" | "Team Project";
  summary: string;
  context: string;
  role: string;
  collaboration: string;
  evidence: string[];
  featured?: boolean;
}

export const QUESTS: Quest[] = [
  {
    slug: "timeforge",
    questNumber: "Project 01",
    rank: "Flagship Build",
    title: "TimeForge",
    category: "Full-Stack Workforce SaaS",
    year: "2026",
    image: "/pictures/timeforge-landing.png",
    tags: ["React", "TypeScript", "Laravel", "PostgreSQL", "Security"],
    repoUrl: "https://github.com/kbmanilla06/TimeForge",
    caseStudyUrl: "/projects/timeforge",
    status: "Flagship",
    summary:
      "A workforce performance platform combining time tracking, approval workflows, KPIs, payroll preparation, reporting, onboarding, and auditable AI insights.",
    context:
      "Built from stakeholder requirements for StartupLab Business Center & AI Consulting Services OPC as an internship project.",
    role:
      "Full-stack implementation, architecture, security controls, test strategy, documentation, and technical delivery.",
    collaboration:
      "Stakeholder-led and AI-assisted; engineering decisions, review, validation, and delivery owned by me.",
    evidence: [
      "717 automated backend and frontend tests",
      "Four roles enforced server-side with policies and middleware",
      "80-commit, sprint-documented delivery history",
      "PostgreSQL, Docker, GitHub Actions, backup and deployment runbooks",
    ],
    featured: true,
  },
  {
    slug: "customer-churn-prediction",
    questNumber: "Project 02",
    rank: "",
    title: "Customer Churn Prediction",
    category: "Applied Machine Learning",
    year: "2026",
    image: "/pictures/churn.png",
    tags: ["Python", "Scikit-learn", "XGBoost", "Streamlit"],
    repoUrl: "https://github.com/kbmanilla06/customer-churn-prediction",
    caseStudyUrl: "/projects/customer-churn-prediction",
    status: "Completed",
    summary:
      "An end-to-end ML pipeline and Streamlit dashboard for identifying telecom customers at risk of churn.",
    context:
      "Individual portfolio project using a reproducible synthetic telecom dataset and three-model comparison workflow.",
    role: "Designed and implemented the data generation, preprocessing, training, evaluation, and dashboard flow.",
    collaboration: "Individual project.",
    evidence: [
      "Reproduced on 5,000 records with a 21.8% positive class",
      "Random Forest held-out F1 0.557 and ROC-AUC 0.807",
      "SMOTE runs inside each cross-validation training fold",
    ],
  },
  {
    slug: "natural-language-toolkit",
    questNumber: "Project 03",
    rank: "",
    title: "NLTKBot",
    category: "Natural Language Processing",
    year: "2026",
    image: "/pictures/nltk.png",
    tags: ["Python", "NLTK", "Flask", "NLP"],
    repoUrl: "https://github.com/Jassim3nidad/NLTKBot",
    status: "Team Project",
    summary:
      "A pattern-matching chatbot combining preprocessing, fuzzy matching, sentiment analysis, keyword extraction, and a Flask API.",
    context: "Four-person academic project for Natural Language Processing at LPU Cavite.",
    role: "Team member contributing to the chatbot implementation, integration, testing, and project delivery.",
    collaboration: "Four-person team; repository maintained by Jassim Trinidad.",
    evidence: [
      "Thirty-eight intents with four-pass matching",
      "VADER sentiment, POS tagging, and lemmatization",
      "Flask REST API with web and CLI interfaces",
    ],
  },
];
