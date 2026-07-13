export type ArmoryCategory = "Weapons" | "Armor Sets" | "Hunter Arts" | "Specialized Tools";

export interface Skill {
  name: string;
  category: ArmoryCategory;
  description: string;
}

export const SKILLS: Skill[] = [
  {
    name: "Python",
    category: "Weapons",
    description: "Primary language across ML, data, and security projects.",
  },
  {
    name: "SQL",
    category: "Weapons",
    description: "Querying and shaping data for analysis and prediction work.",
  },
  {
    name: "Flutter & React",
    category: "Armor Sets",
    description: "Cross-platform and web app frameworks for interface work.",
  },
  {
    name: "Dart & Kotlin",
    category: "Armor Sets",
    description: "Mobile-first languages backing Flutter and native builds.",
  },
  {
    name: "Machine Learning",
    category: "Hunter Arts",
    description: "Applied across intrusion detection, NLP, and churn prediction quests.",
  },
  {
    name: "HTML / CSS",
    category: "Specialized Tools",
    description: "Foundational tools for structuring and styling the web.",
  },
];

export const ARMORY_CATEGORIES: { category: ArmoryCategory; blurb: string }[] = [
  { category: "Weapons", blurb: "Primary programming languages" },
  { category: "Armor Sets", blurb: "Frameworks for building interfaces" },
  { category: "Hunter Arts", blurb: "Applied AI & machine learning" },
  { category: "Specialized Tools", blurb: "Core web fundamentals" },
];
