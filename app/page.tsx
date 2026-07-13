import HeroSceneLoader from "@/components/3d/HeroSceneLoader";
import LandingSequence from "@/components/3d/LandingSequence";
import QuestsPage from "@/app/quests/page";
import AboutPage from "@/app/about/page";
import ArmoryPage from "@/app/armory/page";
import TrophiesPage from "@/app/trophies/page";
import ArsenalPage from "@/app/arsenal/page";
import ContactPage from "@/app/contact/page";

export default function Home() {
  return (
    <div>
      <section id="home" className="portfolio-section relative" aria-label="Introduction">
        <HeroSceneLoader />
        <LandingSequence />
      </section>
      <section id="quests" className="portfolio-section" aria-label="Completed quests">
        <QuestsPage />
      </section>
      <section id="about" className="portfolio-section" aria-label="Hunter profile">
        <AboutPage />
      </section>
      <section id="armory" className="portfolio-section" aria-label="Skills and technology">
        <ArmoryPage />
      </section>
      <section id="trophies" className="portfolio-section" aria-label="Achievements">
        <TrophiesPage />
      </section>
      <section id="arsenal" className="portfolio-section" aria-label="Services">
        <ArsenalPage />
      </section>
      <section id="contact" className="portfolio-section" aria-label="Contact">
        <ContactPage />
      </section>
    </div>
  );
}
