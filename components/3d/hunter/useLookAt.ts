"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { HunterRigRefs } from "./useHunterRig";

const YAW_LIMIT = THREE.MathUtils.degToRad(24);
const PITCH_LIMIT = THREE.MathUtils.degToRad(14);
const FOLLOW_LERP = 0.07;
const GESTURE_LERP = 0.045;

// Scratch objects reused every frame — never allocate inside useFrame.
const rayOrigin = new THREE.Vector3();
const rayDir = new THREE.Vector3();
const ray = new THREE.Ray();
const plane = new THREE.Plane();
const planeNormal = new THREE.Vector3();
const worldTarget = new THREE.Vector3();
const localTarget = new THREE.Vector3();
const headWorldPos = new THREE.Vector3();
const parentInverse = new THREE.Matrix4();
const euler = new THREE.Euler(0, 0, 0, "YXZ");
const targetQuat = new THREE.Quaternion();

type Mode = "cursor" | "gesture";

/**
 * Owns 100% of head rotation: cursor-follow look-at AND the periodic
 * "glance away" idle gesture, implemented as one state machine so there
 * is never a second system fighting over the same transform. Breathing
 * (chest) and blink (visor) are separate bones/meshes and can't conflict
 * with this regardless.
 */
export function useLookAt(rig: HunterRigRefs, enabled: boolean) {
  const mode = useRef<Mode>("cursor");
  const gestureTarget = useRef(new THREE.Vector2(0, 0));
  const nextGestureAt = useRef(
    typeof performance !== "undefined" ? performance.now() + 6000 + Math.random() * 6000 : 0
  );
  const gestureEndsAt = useRef(0);

  useFrame((state) => {
    const head = rig.head.current;
    if (!head || !enabled) return;

    const now = state.clock.elapsedTime * 1000;

    if (mode.current === "cursor" && now > nextGestureAt.current) {
      mode.current = "gesture";
      gestureTarget.current.set(
        (Math.random() - 0.5) * 1.6,
        (Math.random() - 0.5) * 0.8
      );
      gestureEndsAt.current = now + 1500 + Math.random() * 1000;
    }
    if (mode.current === "gesture" && now > gestureEndsAt.current) {
      mode.current = "cursor";
      nextGestureAt.current = now + 6000 + Math.random() * 6000;
    }

    const pointerNdc =
      mode.current === "gesture" ? gestureTarget.current : state.pointer;

    const camera = state.camera;
    head.getWorldPosition(headWorldPos);
    planeNormal.set(0, 0, 1).applyQuaternion(camera.quaternion);
    plane.setFromNormalAndCoplanarPoint(planeNormal, headWorldPos);

    rayOrigin.set(pointerNdc.x, pointerNdc.y, 0.5).unproject(camera);
    rayDir.copy(rayOrigin).sub(camera.position).normalize();
    ray.set(camera.position, rayDir);

    if (!ray.intersectPlane(plane, worldTarget)) return;

    const parent = head.parent;
    if (!parent) return;
    parent.updateWorldMatrix(true, false);
    parentInverse.copy(parent.matrixWorld).invert();
    localTarget.copy(worldTarget).applyMatrix4(parentInverse);

    const dx = localTarget.x - head.position.x;
    const dy = localTarget.y - head.position.y;
    const dz = localTarget.z - head.position.z;

    let yaw = Math.atan2(dx, dz || 0.001);
    let pitch = Math.atan2(-dy, Math.hypot(dx, dz));

    yaw = THREE.MathUtils.clamp(yaw, -YAW_LIMIT, YAW_LIMIT);
    pitch = THREE.MathUtils.clamp(pitch, -PITCH_LIMIT, PITCH_LIMIT);

    euler.set(pitch, yaw, 0);
    targetQuat.setFromEuler(euler);

    const lerp = mode.current === "gesture" ? GESTURE_LERP : FOLLOW_LERP;
    head.quaternion.slerp(targetQuat, lerp);
  });
}
