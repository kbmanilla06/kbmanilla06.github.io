"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Cheap ground-hugging fog: a single plane with an animated noise-based
 * alpha mask, fading to transparent at the edges. Not a true volumetric,
 * but reads as drifting fog at a fraction of the cost.
 */
const FogVolumeMaterialImpl = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color("#241f1a"), uOpacity: 0.35 },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 drift = vec2(uTime * 0.015, uTime * 0.008);
      float n = noise(vUv * 3.0 + drift) * 0.6 + noise(vUv * 6.0 - drift) * 0.4;

      float edge = smoothstep(0.0, 0.35, vUv.x) * smoothstep(1.0, 0.65, vUv.x)
                 * smoothstep(0.0, 0.35, vUv.y) * smoothstep(1.0, 0.65, vUv.y);

      float alpha = n * edge * uOpacity;
      gl_FragColor = vec4(uColor, alpha);
    }
  `,
  (material?: THREE.ShaderMaterial) => {
    if (!material) return;
    material.transparent = true;
    material.depthWrite = false;
  }
);

extend({ FogVolumeMaterial: FogVolumeMaterialImpl });

declare module "@react-three/fiber" {
  interface ThreeElements {
    fogVolumeMaterial: Record<string, unknown>;
  }
}

export default FogVolumeMaterialImpl;
