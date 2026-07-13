import Image from "next/image";

export default function HeroSceneLoader() {
  return (
    <div className="hero-camp-backdrop h-[100svh] w-full" aria-hidden="true">
      <Image
        src="/pictures/hunter-camp.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-camp-image object-cover"
      />
      <div className="hero-camp-light" />
      <div className="hero-camp-haze" />
      <div className="hero-camp-dust" />
      <div className="hero-camp-vignette" />
    </div>
  );
}
