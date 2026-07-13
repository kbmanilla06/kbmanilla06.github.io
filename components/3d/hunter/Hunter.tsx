"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useHunterRig } from "./useHunterRig";
import { useLookAt } from "./useLookAt";
import { useIdleAnimation } from "./useIdleAnimation";
import { useBlink } from "./useBlink";
import { useCapeSway } from "./useCapeSway";
import { armorProps, leatherProps, clothProps } from "./materials/ArmorMaterial";
import "./materials/RimLightMaterial";

const STEEL = "#8b8d88";
const BRASS = "#a8813f";
const LEATHER = "#4a3524";
const CAPE_COLOR = "#5a2420";

interface HunterProps {
  position?: [number, number, number];
  enabled?: boolean;
}

export default function Hunter({ position = [0, 0, 0], enabled = true }: HunterProps) {
  const rig = useHunterRig();

  useLookAt(rig, enabled);
  useIdleAnimation(rig, enabled);
  useBlink(rig, enabled);
  useCapeSway(rig, enabled);

  const capeGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.46, 0.7, 6, 10);
    geom.translate(0, -0.35, 0);
    return geom;
  }, []);

  return (
    <group ref={rig.root} position={position}>
      {/* Hips */}
      <group ref={rig.hips} position={[0, 0.95, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.32, 0.2, 0.2]} />
          <meshStandardMaterial {...armorProps(STEEL)} />
        </mesh>

        {/* Legs */}
        {[-1, 1].map((side) => (
          <group key={side} position={[0.11 * side, -0.1, 0]}>
            <mesh position={[0, -0.21, 0]} castShadow>
              <cylinderGeometry args={[0.065, 0.07, 0.42, 8]} />
              <meshStandardMaterial {...leatherProps(LEATHER)} />
            </mesh>
            <mesh position={[0, -0.5, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.065, 0.36, 8]} />
              <meshStandardMaterial {...armorProps(STEEL)} />
            </mesh>
            <mesh position={[0, -0.7, 0.04]} castShadow>
              <boxGeometry args={[0.1, 0.08, 0.2]} />
              <meshStandardMaterial {...armorProps(BRASS)} />
            </mesh>
          </group>
        ))}

        {/* Spine -> Chest */}
        <group ref={rig.spine} position={[0, 0.16, 0]}>
          <group ref={rig.chest} position={[0, 0.16, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.4, 0.32, 0.24]} />
              <meshStandardMaterial {...armorProps(STEEL)} />
            </mesh>
            <mesh position={[0, 0, 0.13]}>
              <boxGeometry args={[0.14, 0.14, 0.02]} />
              <meshStandardMaterial {...armorProps(BRASS)} />
            </mesh>
            {/* Rim-light shell for the breastplate */}
            <mesh scale={1.05}>
              <boxGeometry args={[0.4, 0.32, 0.24]} />
              <rimLightMaterial uColor="#e8c878" uIntensity={0.9} />
            </mesh>

            {/* Cape */}
            <mesh
              ref={rig.cape}
              geometry={capeGeometry}
              position={[0, 0.1, -0.14]}
              rotation={[0.18, 0, 0]}
              castShadow
            >
              <meshStandardMaterial {...clothProps(CAPE_COLOR)} />
            </mesh>

            {/* Arms */}
            {[-1, 1].map((side) => (
              <group key={side} position={[0.26 * side, 0.1, 0]}>
                <mesh position={[0, -0.15, 0]} castShadow>
                  <cylinderGeometry args={[0.055, 0.06, 0.3, 8]} />
                  <meshStandardMaterial {...leatherProps(LEATHER)} />
                </mesh>
                <mesh position={[0, -0.34, 0]} castShadow>
                  <cylinderGeometry args={[0.05, 0.055, 0.28, 8]} />
                  <meshStandardMaterial {...armorProps(STEEL)} />
                </mesh>
                <mesh position={[0, -0.5, 0]} castShadow>
                  <sphereGeometry args={[0.055, 8, 8]} />
                  <meshStandardMaterial {...leatherProps(LEATHER)} />
                </mesh>
              </group>
            ))}

            {/* Neck -> Head */}
            <group ref={rig.neck} position={[0, 0.2, 0]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.06, 0.07, 0.08, 8]} />
                <meshStandardMaterial {...armorProps(STEEL)} />
              </mesh>

              <group ref={rig.head} position={[0, 0.14, 0]}>
                <mesh castShadow>
                  <boxGeometry args={[0.2, 0.22, 0.22]} />
                  <meshStandardMaterial {...armorProps(STEEL)} />
                </mesh>
                {/* Visor glow slit — also the "blink" target */}
                <mesh ref={rig.visor} position={[0, 0.01, 0.111]}>
                  <boxGeometry args={[0.13, 0.03, 0.01]} />
                  <meshStandardMaterial
                    color="#c9a355"
                    emissive="#e8c878"
                    emissiveIntensity={1.4}
                    metalness={0.2}
                    roughness={0.4}
                  />
                </mesh>
                {/* Ear guards */}
                {[-1, 1].map((side) => (
                  <mesh key={side} position={[0.11 * side, -0.02, 0]} castShadow>
                    <boxGeometry args={[0.03, 0.1, 0.14]} />
                    <meshStandardMaterial {...armorProps(BRASS)} />
                  </mesh>
                ))}
                {/* Rim-light shell for the helm */}
                <mesh scale={1.08}>
                  <boxGeometry args={[0.2, 0.22, 0.22]} />
                  <rimLightMaterial uColor="#e8c878" uIntensity={1.1} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
