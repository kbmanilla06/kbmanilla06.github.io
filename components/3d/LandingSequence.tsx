"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useUIStore } from "@/store/uiStore";
import { useAudioStore } from "@/store/audioStore";
import GuildButton from "@/components/ui/GuildButton";

export default function LandingSequence() {
  const container = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const gate = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);

  const hydrated = useUIStore((s) => s.hydrated);
  const landingStage = useUIStore((s) => s.landingStage);
  const landingComplete = useUIStore((s) => s.landingComplete);
  const prefersReducedMotion = useUIStore((s) => s.prefersReducedMotion);
  const setLandingStage = useUIStore((s) => s.setLandingStage);
  const completeLanding = useUIStore((s) => s.completeLanding);
  const enterGuild = useAudioStore((s) => s.enterGuild);

  const { contextSafe } = useGSAP({ scope: container });

  const handleEnter = contextSafe(() => {
    enterGuild();
    setLandingStage("campfire");

    if (prefersReducedMotion) {
      gsap.set(gate.current, { opacity: 0, pointerEvents: "none" });
      gsap.set(overlay.current, { opacity: 0 });
      gsap.set(title.current, { opacity: 1, y: 0 });
      setLandingStage("title");
      completeLanding();
      return;
    }

    const tl = gsap.timeline();

    tl.to(gate.current, { opacity: 0, duration: 0.3, pointerEvents: "none" })
      .to(overlay.current, { opacity: 0, duration: 1.4, ease: "power2.out" }, "<")
      .call(() => setLandingStage("hunter"))
      .call(() => setLandingStage("fog"), undefined, "+=0.3")
      .call(() => setLandingStage("title"), undefined, "+=0.3")
      .fromTo(
        title.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
      .call(() => completeLanding());
  });

  useGSAP(
    () => {
      if (!hydrated) return;
      if (landingStage === "black") setLandingStage("gate");
    },
    { dependencies: [hydrated, landingStage], scope: container }
  );

  return (
    <div ref={container} className="pointer-events-none absolute inset-0 z-10">
      <div ref={overlay} className="absolute inset-0 bg-black" />

      <div
        className="absolute inset-x-0 bottom-0 h-[50%]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-ink) 78%)",
        }}
      />

      {!landingComplete && (
        <div
          ref={gate}
          className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center gap-6 text-center px-6"
        >
          <p className="font-decorative text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">
            Guild Card · BS Computer Science, LPU Cavite
          </p>
          <GuildButton variant="accent" brass onClick={handleEnter}>
            Enter the Guild
          </GuildButton>
          <p className="text-xs text-[var(--color-text-muted)]">
            Unlocks guild music &amp; ambience
          </p>
        </div>
      )}

      <div
        ref={title}
        className="absolute inset-x-0 bottom-16 flex flex-col items-center gap-4 px-6 text-center opacity-0"
      >
        <h1 className="text-4xl sm:text-5xl text-[var(--color-gold-bright)]">
          Khristopher Ben Manilla
        </h1>
        <p className="max-w-xl text-sm text-[var(--color-text-muted)] sm:text-base">
          Aspiring cybersecurity hunter and software craftsman — tracking down
          vulnerabilities, forging secure systems, and clearing every quest
          with precision and care.
        </p>
        <div className="pointer-events-auto flex flex-wrap justify-center gap-3">
          <GuildButton href="#quests" variant="accent" brass>
            View Completed Quests
          </GuildButton>
          <GuildButton href="https://github.com/kbmanilla06" external>
            GitHub
          </GuildButton>
          <GuildButton href="https://www.linkedin.com/in/khristopher-ben-manilla-b875181b6/" external>
            LinkedIn
          </GuildButton>
        </div>
      </div>
    </div>
  );
}
