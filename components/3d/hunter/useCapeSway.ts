"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { HunterRigRefs } from "./useHunterRig";

const CAPE_HEIGHT = 0.7;

/**
 * CPU-driven cloth-ish sway instead of a hand-written custom-lit vertex
 * shader: the cape is a ~77-vertex plane, so recomputing positions every
 * frame is negligible cost, and it lets the cape keep using a normal
 * MeshStandardMaterial (correct PBR lighting/shadowing) rather than
 * re-deriving lighting math in GLSL. Top row is pinned near the shoulder
 * anchor; sway amplitude grows toward the hem.
 */
export function useCapeSway(rig: HunterRigRefs, enabled: boolean) {
  const basePositions = useRef<Float32Array | null>(null);

  useFrame((state) => {
    const mesh = rig.cape.current;
    if (!mesh || !enabled) return;
    const geom = mesh.geometry as THREE.BufferGeometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;

    if (!basePositions.current || basePositions.current.length !== posAttr.array.length) {
      basePositions.current = Float32Array.from(posAttr.array as Float32Array);
    }
    const base = basePositions.current;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < posAttr.count; i++) {
      const bx = base[i * 3];
      const by = base[i * 3 + 1];
      const bz = base[i * 3 + 2];
      const depth = THREE.MathUtils.clamp(-by / CAPE_HEIGHT, 0, 1);
      const sway = Math.pow(depth, 1.4);

      const dx = Math.sin(t * 1.3 + by * 3.2) * 0.06 * sway;
      const dz = Math.cos(t * 0.9 + by * 2.1) * 0.045 * sway + depth * depth * 0.04;

      posAttr.setXYZ(i, bx + dx, by, bz + dz);
    }
    posAttr.needsUpdate = true;
    geom.computeVertexNormals();
  });
}
