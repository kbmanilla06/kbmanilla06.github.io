"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { HunterRigRefs } from "./useHunterRig";

/**
 * The hunter wears a closed helm, so "blink" is reinterpreted as the
 * visor's inner glow briefly dimming/narrowing — same idea (an
 * independent, randomized timer that never touches rotation), adapted
 * to a helmeted design instead of a bare face with eyelids.
 */
export function useBlink(rig: HunterRigRefs, enabled: boolean) {
  const nextBlinkAt = useRef(2000 + Math.random() * 3000);
  const blinkEndsAt = useRef(0);
  const blinking = useRef(false);

  useFrame((state) => {
    const visor = rig.visor.current;
    if (!visor || !enabled) return;

    const now = state.clock.elapsedTime * 1000;

    if (!blinking.current && now > nextBlinkAt.current) {
      blinking.current = true;
      blinkEndsAt.current = now + 130;
    }
    if (blinking.current && now > blinkEndsAt.current) {
      blinking.current = false;
      nextBlinkAt.current = now + 2000 + Math.random() * 4000;
    }

    const mat = visor.material as THREE.MeshStandardMaterial | undefined;
    if (mat && "emissiveIntensity" in mat) {
      const target = blinking.current ? 0.15 : 1.4;
      mat.emissiveIntensity += (target - mat.emissiveIntensity) * 0.4;
    }
    visor.scale.y += ((blinking.current ? 0.25 : 1) - visor.scale.y) * 0.4;
  });
}
