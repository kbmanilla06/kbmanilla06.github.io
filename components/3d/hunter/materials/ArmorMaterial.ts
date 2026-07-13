import * as THREE from "three";

export const armorProps = (color: string) => ({
  color,
  metalness: 0.85,
  roughness: 0.35,
}) satisfies Partial<THREE.MeshStandardMaterialParameters>;

export const leatherProps = (color: string) => ({
  color,
  metalness: 0.05,
  roughness: 0.85,
}) satisfies Partial<THREE.MeshStandardMaterialParameters>;

export const clothProps = (color: string) => ({
  color,
  metalness: 0,
  roughness: 0.95,
  side: THREE.DoubleSide,
}) satisfies Partial<THREE.MeshStandardMaterialParameters>;
