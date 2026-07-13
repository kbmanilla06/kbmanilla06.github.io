"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useUIStore } from "@/store/uiStore";

gsap.registerPlugin(ScrollTrigger);

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Replaces the legacy static site's IntersectionObserver `.reveal`
 * pattern with a GSAP ScrollTrigger tween. Using useGSAP (not raw gsap
 * calls) means the ScrollTrigger instance this creates is automatically
 * reverted/killed on unmount — required so triggers don't accumulate
 * across client-side navigations between routes (a known GSAP + Next.js
 * App Router leak if triggers are created outside a cleaned-up context).
 */
export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  y = 24,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useUIStore((s) => s.prefersReducedMotion);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref, dependencies: [prefersReducedMotion] }
  );

  return (
    <div ref={ref} className={`${className} ${prefersReducedMotion ? "" : "reveal-hidden"}`}>
      {children}
    </div>
  );
}
