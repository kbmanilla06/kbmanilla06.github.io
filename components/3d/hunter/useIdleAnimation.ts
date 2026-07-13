"use client";

import { useFrame } from "@react-three/fiber";
import type { HunterRigRefs } from "./useHunterRig";

const BREATH_HZ = 0.28;
const BREATH_SCALE_AMOUNT = 0.018;
const BREATH_LIFT_AMOUNT = 0.006;
const POSTURE_HZ = 0.05;
const POSTURE_AMOUNT = 0.02;

/**
 * Breathing on the chest bone and a very slow posture sway on the hips —
 * both independent transform channels from head rotation (owned by
 * useLookAt), so they can run every frame with no arbitration needed.
 */
export function useIdleAnimation(rig: HunterRigRefs, enabled: boolean) {
  useFrame((state) => {
    if (!enabled) return;
    const t = state.clock.elapsedTime;

    const chest = rig.chest.current;
    if (chest) {
      const breath = Math.sin(t * Math.PI * 2 * BREATH_HZ);
      chest.scale.y = 1 + breath * BREATH_SCALE_AMOUNT;
      chest.position.y = 0.16 + breath * BREATH_LIFT_AMOUNT;
    }

    const hips = rig.hips.current;
    if (hips) {
      hips.rotation.z = Math.sin(t * Math.PI * 2 * POSTURE_HZ) * POSTURE_AMOUNT * 0.3;
    }
  });
}
