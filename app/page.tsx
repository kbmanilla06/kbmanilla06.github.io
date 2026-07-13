import HeroSceneLoader from "@/components/3d/HeroSceneLoader";
import LandingSequence from "@/components/3d/LandingSequence";

export default function Home() {
  return (
    <div className="relative">
      <HeroSceneLoader />
      <LandingSequence />
    </div>
  );
}
