"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import "@/shaders/fogVolume";

interface FogMaterialRef {
  uTime: number;
}

export default function FogVolume() {
  const matRef = useRef<FogMaterialRef>(null);

  useFrame((state) => {
    if (matRef.current) matRef.current.uTime = state.clock.elapsedTime;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
      <planeGeometry args={[12, 12]} />
      <fogVolumeMaterial ref={matRef} uColor="#241f1a" uOpacity={0.3} />
    </mesh>
  );
}
