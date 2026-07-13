"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Cheap fresnel "shell" glow: render a slightly-scaled, backface-only
 * duplicate of an armor mesh with this unlit additive material instead
 * of fighting the standard PBR lighting pipeline.
 */
const RimLightMaterialImpl = shaderMaterial(
  { uColor: new THREE.Color("#e8c878"), uIntensity: 1.1 },
  `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewDir = normalize(-mvPosition.xyz);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  `
    uniform vec3 uColor;
    uniform float uIntensity;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      float fresnel = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0), 2.4);
      gl_FragColor = vec4(uColor * fresnel * uIntensity, fresnel * 0.9);
    }
  `,
  (material?: THREE.ShaderMaterial) => {
    if (!material) return;
    material.transparent = true;
    material.depthWrite = false;
    material.side = THREE.BackSide;
    material.blending = THREE.AdditiveBlending;
  }
);

extend({ RimLightMaterial: RimLightMaterialImpl });

declare module "@react-three/fiber" {
  interface ThreeElements {
    rimLightMaterial: Record<string, unknown>;
  }
}

export default RimLightMaterialImpl;
