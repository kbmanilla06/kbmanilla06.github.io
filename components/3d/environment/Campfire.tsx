"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface CampfireProps {
  position?: [number, number, number];
  lowFi?: boolean;
}

export default function Campfire({ position = [0, 0, 0], lowFi = false }: CampfireProps) {
  const light = useRef<THREE.PointLight>(null);
  const flame = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const flicker = 2.2 + Math.sin(t * 8.3) * 0.25 + Math.sin(t * 21.7) * 0.15 + Math.random() * 0.1;
    if (light.current) light.current.intensity = flicker;
    if (flame.current) {
      flame.current.scale.setScalar(1 + Math.sin(t * 12) * 0.08 + Math.random() * 0.03);
    }
  });

  return (
    <group position={position}>
      {/* Logs */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, (i * Math.PI) / 3]} castShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.6, 6]} />
          <meshStandardMaterial color="#2a1c12" roughness={0.95} />
        </mesh>
      ))}

      <mesh ref={flame} position={[0, 0.15, 0]}>
        <coneGeometry args={[0.12, 0.35, 8]} />
        <meshStandardMaterial
          color="#e8933f"
          emissive="#e8641f"
          emissiveIntensity={2}
          transparent
          opacity={0.85}
        />
      </mesh>

      <pointLight
        ref={light}
        position={[0, 0.4, 0]}
        color="#e8933f"
        intensity={2.2}
        distance={6}
        decay={2}
        castShadow
      />

      {!lowFi && (
        <Sparkles
          count={30}
          scale={[0.8, 1.6, 0.8]}
          position={[0, 0.5, 0]}
          size={2}
          speed={0.35}
          color="#e8a35a"
          noise={1}
        />
      )}
    </group>
  );
}
