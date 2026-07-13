export interface Achievement {
  id: string;
  years: string;
  hunterRank: string;
  title: string;
  org: string;
  description: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "deans-list-1",
    years: "2023 – 2024",
    hunterRank: "Novice Hunter · 1st Year",
    title: "Dean's List Awardee",
    org: "Lyceum of the Philippines University – Cavite",
    description:
      "Awarded to students who demonstrate outstanding academic performance within the top percentile of their college for the academic year.",
  },
  {
    id: "deans-list-2",
    years: "2024 – 2025",
    hunterRank: "Apprentice Hunter · 2nd Year",
    title: "Dean's List Awardee",
    org: "Lyceum of the Philippines University – Cavite",
    description:
      "Consecutively recognized for sustained academic excellence, maintaining high standing across all subjects in the BS Computer Science program.",
  },
  {
    id: "deans-list-3",
    years: "2025 – 2026",
    hunterRank: "Adept Hunter · 3rd Year",
    title: "Dean's List Awardee",
    org: "Lyceum of the Philippines University – Cavite",
    description:
      "Recognized for a third consecutive academic year for sustained excellence and strong standing in the BS Computer Science program.",
  },
];
