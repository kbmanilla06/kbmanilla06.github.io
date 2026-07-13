import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Cinzel, Cinzel_Decorative, Inter } from "next/font/google";
import "./globals.css";
import AudioProvider from "@/components/audio/AudioProvider";
import PerformanceProvider from "@/components/PerformanceProvider";
import QuestBookNav from "@/components/ui/QuestBookNav";
import GuildFooter from "@/components/sections/GuildFooter";
import { SITE_URL } from "@/lib/site";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Khristopher Ben Manilla — Hunter's Guild",
    template: "%s | Khristopher Ben Manilla",
  },
  description:
    "Guild Card of Khristopher Ben Manilla — software engineer, AI engineer, and cybersecurity hunter. Explore completed quests, armory, and trophies.",
  authors: [{ name: "Khristopher Ben Manilla", url: SITE_URL }],
  creator: "Khristopher Ben Manilla",
  keywords: [
    "Khristopher Ben Manilla",
    "software developer",
    "cybersecurity",
    "machine learning",
    "AI engineer",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Khristopher Ben Manilla — Hunter's Guild",
    title: "Khristopher Ben Manilla — Hunter's Guild",
    description:
      "Software, AI, and cybersecurity work presented as a Hunter's Guild portfolio.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Khristopher Ben Manilla — Hunter's Guild Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khristopher Ben Manilla — Hunter's Guild",
    description: "Software, AI, and cybersecurity portfolio.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#14100c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${cinzelDecorative.variable} ${inter.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <PerformanceProvider />
        <AudioProvider />
        <QuestBookNav />
        <main id="main-content">{children}</main>
        <GuildFooter />
        <Analytics />
      </body>
    </html>
  );
}
