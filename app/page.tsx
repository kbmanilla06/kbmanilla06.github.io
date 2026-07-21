import Hero from "@/components/sections/Hero";
import QuestsPage from "@/app/quests/page";
import AboutPage from "@/app/about/page";
import ArmoryPage from "@/app/armory/page";
import TrophiesPage from "@/app/trophies/page";
import ArsenalPage from "@/app/arsenal/page";
import ContactPage from "@/app/contact/page";

export default function Home() {
  return (
    <div>
      <section id="home" className="portfolio-section hero-section" aria-label="Introduction">
        <div className="hero-background" aria-hidden="true" />
        <Hero />
      </section>
      <section id="quests" className="portfolio-section" aria-label="Selected projects">
        <QuestsPage />
      </section>
      <section id="about" className="portfolio-section" aria-label="Professional profile">
        <AboutPage />
      </section>
      <section id="armory" className="portfolio-section" aria-label="Skills and technology">
        <ArmoryPage />
      </section>
      <section id="arsenal" className="portfolio-section" aria-label="Experience and education">
        <ArsenalPage />
      </section>
      <section id="trophies" className="portfolio-section" aria-label="Academic honors">
        <TrophiesPage />
      </section>
      <section id="contact" className="portfolio-section" aria-label="Contact">
        <ContactPage />
      </section>
    </div>
  );
}
