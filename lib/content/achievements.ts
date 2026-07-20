export interface Achievement {
  id: string;
  years: string;
  distinction: string;
  title: string;
  org: string;
  description: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "deans-list-three-years",
    years: "2023 – 2026",
    distinction: "Three Consecutive Academic Years",
    title: "Dean’s List Awardee",
    org: "Lyceum of the Philippines University – Cavite",
    description:
      "Recognized for sustained academic excellence throughout the first, second, and third years of the BS Computer Science program.",
  },
];
