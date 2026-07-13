export type ArmoryCategory = "Weapons" | "Armor Sets" | "Hunter Arts" | "Specialized Tools";

export interface Skill {
  name: string;
  category: ArmoryCategory;
  description: string;
  loadoutStatus: "Primary" | "Active" | "Supporting";
  usageMarks: number;
}

export const SKILLS: Skill[] = [
  {
    name: "Python",
    category: "Weapons",
    description: "Primary language across ML, data, and security projects.",
    loadoutStatus: "Primary",
    usageMarks: 5,
  },
  {
    name: "SQL",
    category: "Weapons",
    description: "Querying and shaping data for analysis and prediction work.",
    loadoutStatus: "Active",
    usageMarks: 3,
  },
  {
    name: "Flutter & React",
    category: "Armor Sets",
    description: "Cross-platform and web app frameworks for interface work.",
    loadoutStatus: "Active",
    usageMarks: 4,
  },
  {
    name: "Dart & Kotlin",
    category: "Armor Sets",
    description: "Mobile-first languages backing Flutter and native builds.",
    loadoutStatus: "Supporting",
    usageMarks: 2,
  },
  {
    name: "Machine Learning",
    category: "Hunter Arts",
    description: "Applied across intrusion detection, NLP, and churn prediction quests.",
    loadoutStatus: "Primary",
    usageMarks: 5,
  },
  {
    name: "HTML / CSS",
    category: "Specialized Tools",
    description: "Foundational tools for structuring and styling the web.",
    loadoutStatus: "Active",
    usageMarks: 4,
  },
];

export const ARMORY_CATEGORIES: { category: ArmoryCategory; blurb: string }[] = [
  { category: "Weapons", blurb: "Primary programming languages" },
  { category: "Armor Sets", blurb: "Frameworks for building interfaces" },
  { category: "Hunter Arts", blurb: "Applied AI & machine learning" },
  { category: "Specialized Tools", blurb: "Core web fundamentals" },
];
