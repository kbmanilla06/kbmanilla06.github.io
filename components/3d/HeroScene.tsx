"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import GuildCamp from "./environment/GuildCamp";
import Campfire from "./environment/Campfire";
import FogVolume from "./environment/FogVolume";
import Hunter from "./hunter/Hunter";
import { usePerformanceStore } from "@/store/performanceStore";
import { useUIStore } from "@/store/uiStore";

export default function HeroScene() {
  const tier = usePerformanceStore((s) => s.tier());
  const landingComplete = useUIStore((s) => s.landingComplete);
  const lowFi = tier === "low";

  return (
    <Canvas
      shadows={!lowFi}
      dpr={lowFi ? 1 : [1, 1.75]}
      camera={{ position: [0, 1.4, 4.8], fov: 38 }}
      onCreated={({ camera }) => camera.lookAt(0, 1.05, -0.3)}
      gl={{ antialias: !lowFi }}
    >
      <color attach="background" args={["#0d0906"]} />
      <fog attach="fog" args={["#1a140d", 5, 15]} />

      <ambientLight intensity={0.25} color="#5a5040" />
      <directionalLight
        position={[3, 5, 2]}
        intensity={0.6}
        color="#7c8ba0"
        castShadow={!lowFi}
      />

      <Suspense fallback={null}>
        <GuildCamp />
        <Campfire position={[0, 0, 0.4]} lowFi={lowFi} />
        <Hunter position={[0, 0, -0.3]} enabled={landingComplete} />
        {!lowFi && <FogVolume />}
        {!lowFi && (
          <ContactShadows
            position={[0, 0.001, 0]}
            opacity={0.55}
            blur={2.2}
            far={4}
            scale={8}
          />
        )}
        <Environment preset="sunset" background={false} />
      </Suspense>
    </Canvas>
  );
}
