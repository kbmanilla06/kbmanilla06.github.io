import { useRef, type RefObject } from "react";
import * as THREE from "three";

/**
 * Named ref hierarchy for the hunter. This object is the swap boundary:
 * a future .glb avatar just needs to populate these same refs (e.g. via
 * drei's useGraph looking up nodes by name) and every animation system
 * below (breathing, blink, look-at) keeps working unchanged.
 */
export interface HunterRigRefs {
  root: RefObject<THREE.Group | null>;
  hips: RefObject<THREE.Group | null>;
  spine: RefObject<THREE.Group | null>;
  chest: RefObject<THREE.Group | null>;
  neck: RefObject<THREE.Group | null>;
  head: RefObject<THREE.Group | null>;
  visor: RefObject<THREE.Mesh | null>;
  cape: RefObject<THREE.Mesh | null>;
}

export function useHunterRig(): HunterRigRefs {
  const root = useRef<THREE.Group>(null);
  const hips = useRef<THREE.Group>(null);
  const spine = useRef<THREE.Group>(null);
  const chest = useRef<THREE.Group>(null);
  const neck = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const visor = useRef<THREE.Mesh>(null);
  const cape = useRef<THREE.Mesh>(null);

  return { root, hips, spine, chest, neck, head, visor, cape };
}
