export interface Certification {
  title: string;
  issuer: string;
  issued: string;
  credential: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    issued: "May 2026",
    credential: "Credly digital badge",
  },
  {
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    issued: "February 2026",
    credential: "Credly digital badge",
  },
  {
    title: "Python Essentials 1 & 2",
    issuer: "Cisco Networking Academy",
    issued: "January & June 2024",
    credential: "Credly digital badges",
  },
  {
    title: "IoT Bootcamp",
    issuer: "ACube Technologies Inc.",
    issued: "Completed",
    credential: "Certificate of participation",
  },
];
