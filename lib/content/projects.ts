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
  status: "Cleared";
  summary: string;
  featured?: boolean;
}

export const QUESTS: Quest[] = [
  {
    slug: "intrusion-detection-system",
    questNumber: "Quest 01",
    rank: "HR Rank",
    title: "Intrusion Detection System",
    category: "Cybersecurity",
    year: "2025",
    image: "/pictures/ids.png",
    tags: ["Security", "Intrusion", "Detection"],
    repoUrl: "https://github.com/Mart271/ML-Enhanced-Intrusion-Detection",
    status: "Cleared",
    summary:
      "A machine-learning-enhanced intrusion detection system built to track down anomalous network activity and flag threats before they escalate.",
    featured: true,
  },
  {
    slug: "natural-language-toolkit",
    questNumber: "Quest 02",
    rank: "",
    title: "Natural Language Toolkit",
    category: "Web",
    year: "2026",
    image: "/pictures/nltk.png",
    tags: ["NLP", "Machine Learning"],
    repoUrl: "https://github.com/Jassim3nidad/NLTKBot",
    status: "Cleared",
    summary:
      "An NLP-driven bot built on the Natural Language Toolkit, applying text processing and classification to real conversational input.",
  },
  {
    slug: "customer-churn-prediction",
    questNumber: "Quest 03",
    rank: "",
    title: "Customer Churn Prediction",
    category: "Data Analyst",
    year: "2026",
    image: "/pictures/churn.png",
    tags: ["Machine Learning", "Python"],
    repoUrl: "https://github.com/kbmanilla06/customer-churn-prediction",
    status: "Cleared",
    summary:
      "A predictive model trained to identify customers likely to churn, turning raw usage data into an early-warning signal.",
  },
];
