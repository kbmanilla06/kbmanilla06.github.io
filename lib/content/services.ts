export interface Service {
  id: string;
  num: string;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    id: "equipment-forging",
    num: "01",
    title: "Equipment Forging",
    description:
      "Product design — end-to-end UX/UI, from research and wireframes to polished, developer-ready interfaces sharp enough for any hunt.",
  },
  {
    id: "base-camp-construction",
    num: "02",
    title: "Base Camp Construction",
    description:
      "Web development — fast, accessible, and maintainable applications built with modern tools, engineered to hold up under any hunt.",
  },
  {
    id: "monster-tracking-defense",
    num: "03",
    title: "Monster Tracking & Defense",
    description:
      "Cybersecurity — threat analysis, intrusion detection, and building secure systems grounded in real-world security principles.",
  },
];
