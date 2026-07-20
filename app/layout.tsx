import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import "./globals.css";
import AudioProvider from "@/components/audio/AudioProvider";
import PerformanceProvider from "@/components/PerformanceProvider";
import PortfolioNav from "@/components/ui/PortfolioNav";
import PortfolioFooter from "@/components/sections/PortfolioFooter";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Khristopher Ben Manilla — Full-Stack Software Engineer",
    template: "%s | Khristopher Ben Manilla",
  },
  description:
    "Fourth-year Computer Science student and software engineering intern building secure, AI-enabled full-stack applications with React, TypeScript, Laravel, Python, and PostgreSQL.",
  authors: [{ name: "Khristopher Ben Manilla", url: SITE_URL }],
  creator: "Khristopher Ben Manilla",
  keywords: [
    "Khristopher Ben Manilla",
    "software developer",
    "full-stack engineer",
    "React TypeScript Laravel",
    "application security",
    "machine learning",
    "AI engineer",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Khristopher Ben Manilla — Software Engineering Portfolio",
    title: "Khristopher Ben Manilla — Full-Stack Software Engineer",
    description:
      "Secure full-stack applications, automated testing, and practical AI/ML work—presented with verifiable engineering evidence.",
    images: [
      {
        url: "/og-wdl.svg",
        width: 1200,
        height: 630,
        alt: "Khristopher Ben Manilla — Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khristopher Ben Manilla — Full-Stack Software Engineer",
    description: "Secure full-stack applications, automated testing, and practical AI/ML work.",
    images: ["/og-wdl.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <PerformanceProvider />
        <AudioProvider />
        <PortfolioNav />
        <main id="main-content">{children}</main>
        <PortfolioFooter />
        <Analytics />
      </body>
    </html>
  );
}
