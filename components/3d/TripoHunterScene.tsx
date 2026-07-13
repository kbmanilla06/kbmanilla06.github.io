"use client";

import { Suspense, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";
import { usePerformanceStore } from "@/store/performanceStore";
import { useUIStore } from "@/store/uiStore";

const MODEL_PATH = "/models/tripo-fantasy-assassin.glb";
const BASE_YAW = -Math.PI / 2;

function FantasyAssassin() {
  const model = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0, lastMove: 0 });
  const { scene } = useGLTF(MODEL_PATH);
  const prefersReducedMotion = useUIStore((state) => state.prefersReducedMotion);

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
      pointer.current.lastMove = performance.now();
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, []);

  useFrame(({ clock }, delta) => {
    if (!model.current || prefersReducedMotion) return;

    const elapsed = clock.getElapsedTime();
    const cursorIsActive = performance.now() - pointer.current.lastMove < 1800;

    // The Tripo export is a single static mesh without a skeleton. Rotating the
    // character as one piece keeps the original sculpt intact while still
    // creating a convincing cursor-follow and idle lookout effect.
    const idleGlance =
      Math.sin(elapsed * 0.43) * 0.1 + Math.sin(elapsed * 0.17 + 1.6) * 0.055;
    const targetYaw =
      BASE_YAW + (cursorIsActive ? pointer.current.x * 0.25 : idleGlance);
    const targetPitch = cursorIsActive
      ? MathUtils.clamp(-pointer.current.y * 0.075, -0.06, 0.06)
      : Math.sin(elapsed * 0.31) * 0.018;
    const damping = 1 - Math.exp(-delta * 3.8);

    model.current.rotation.y = MathUtils.lerp(
      model.current.rotation.y,
      targetYaw,
      damping
    );
    model.current.rotation.x = MathUtils.lerp(
      model.current.rotation.x,
      targetPitch,
      damping
    );
    model.current.position.x = MathUtils.lerp(
      model.current.position.x,
      cursorIsActive ? pointer.current.x * 0.025 : 0,
      damping * 0.45
    );
    model.current.position.y = -0.04 + Math.sin(elapsed * 1.15) * 0.012;
  });

  return (
    <group
      ref={model}
      position={[0, -0.06, 0]}
      rotation={[0, BASE_YAW, 0]}
      scale={1.6}
    >
      <primitive object={scene} dispose={null} />
    </group>
  );
}

export default function TripoHunterScene() {
  const tier = usePerformanceStore((state) => state.tier());
  const lowFi = tier === "low";

  return (
    <Canvas
      className="hero-model-canvas"
      dpr={lowFi ? 1 : [1, 1.35]}
      camera={{ position: [0, 0.02, 3.2], fov: 35 }}
      gl={{ alpha: true, antialias: !lowFi, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <hemisphereLight args={["#ffe1a0", "#17110c", 1.45]} />
      <directionalLight position={[-2.5, 4, 3]} intensity={2.5} color="#ffd49a" />
      <directionalLight position={[3, 1, -2]} intensity={1.5} color="#86a7a0" />
      <pointLight position={[-1.4, -0.25, 2]} intensity={2.2} color="#d76f2f" />
      <Suspense fallback={null}>
        <FantasyAssassin />
      </Suspense>
    </Canvas>
  );
}
