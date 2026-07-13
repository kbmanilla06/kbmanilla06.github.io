"use client";

import * as THREE from "three";

const WOOD = "#3a2a1d";
const WOOD_LIGHT = "#5c4530";
const BRASS = "#a8813f";

function Crate({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={WOOD} roughness={0.9} />
      </mesh>
      {[0, 1].map((i) => (
        <mesh key={i} position={[0, 0.26 - i * 0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.32, 0.015, 6, 4]} />
          <meshStandardMaterial color={BRASS} metalness={0.7} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Banner({
  position,
  rotation = [0, 0, 0],
  color = "#7c3f36",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 2.4, 8]} />
        <meshStandardMaterial color={WOOD} roughness={0.85} />
      </mesh>
      <mesh position={[0.32, 1.6, 0]} castShadow>
        <planeGeometry args={[0.6, 1]} />
        <meshStandardMaterial color={color} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function WeaponRack({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[-0.3, 0.55, 0]} castShadow>
        <boxGeometry args={[0.08, 1.1, 0.08]} />
        <meshStandardMaterial color={WOOD} roughness={0.9} />
      </mesh>
      <mesh position={[0.3, 0.55, 0]} castShadow>
        <boxGeometry args={[0.08, 1.1, 0.08]} />
        <meshStandardMaterial color={WOOD} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[0.68, 0.06, 0.06]} />
        <meshStandardMaterial color={WOOD} roughness={0.9} />
      </mesh>
      {[-0.18, 0, 0.18].map((x, i) => (
        <mesh key={i} position={[x, 0.35, 0]} rotation={[0, 0, 0.05 * (i - 1)]} castShadow>
          <boxGeometry args={[0.03, 0.9, 0.01]} />
          <meshStandardMaterial color="#8b8d88" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function QuestBoard({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[1.1, 1.4, 0.06]} />
        <meshStandardMaterial color={WOOD} roughness={0.9} />
      </mesh>
      {[
        [-0.28, 0.9],
        [0.24, 0.75],
        [-0.1, 0.45],
        [0.3, 0.35],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.04]} rotation={[0, 0, (i - 2) * 0.05]}>
          <planeGeometry args={[0.32, 0.42]} />
          <meshStandardMaterial color="#cdbb8e" roughness={0.95} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export default function GuildCamp() {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[8, 48]} />
        <meshStandardMaterial color="#241f1a" roughness={1} />
      </mesh>

      {/* Back wall of packed dirt/wood palisade */}
      <mesh position={[0, 1.2, -3.2]} receiveShadow>
        <boxGeometry args={[9, 2.4, 0.2]} />
        <meshStandardMaterial color={WOOD} roughness={0.95} />
      </mesh>

      <Banner position={[-1.8, 0, -2.9]} color="#7c3f36" />
      <Banner position={[1.8, 0, -2.9]} rotation={[0, Math.PI, 0]} color="#3e6377" />

      <WeaponRack position={[-2.6, 0, -1.6]} />
      <QuestBoard position={[2.6, 0, -1.8]} />

      <Crate position={[-2.2, 0.25, 0.6]} />
      <Crate position={[-1.7, 0.25, 1.0]} />
      <Crate position={[2.3, 0.25, 0.9]} />

      {/* Simple platform under the hunter/campfire */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.7, 0.04, 24]} />
        <meshStandardMaterial color={WOOD_LIGHT} roughness={0.85} />
      </mesh>
    </group>
  );
}
