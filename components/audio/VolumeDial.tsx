"use client";

import { useCallback, useRef } from "react";

interface VolumeDialProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const MIN_ANGLE = -135;
const MAX_ANGLE = 135;

export default function VolumeDial({ label, value, onChange }: VolumeDialProps) {
  const dragState = useRef<{ startY: number; startValue: number } | null>(null);

  const angle = MIN_ANGLE + value * (MAX_ANGLE - MIN_ANGLE);

  const clamp = (v: number) => Math.min(1, Math.max(0, v));

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragState.current = { startY: e.clientY, startValue: value };
    },
    [value]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragState.current) return;
      const delta = dragState.current.startY - e.clientY;
      onChange(clamp(dragState.current.startValue + delta / 120));
    },
    [onChange]
  );

  const onPointerUp = useCallback(() => {
    dragState.current = null;
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        e.preventDefault();
        onChange(clamp(value + 0.05));
      } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        e.preventDefault();
        onChange(clamp(value - 0.05));
      }
    },
    [value, onChange]
  );

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value * 100)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onWheel={(e) => {
          e.preventDefault();
          onChange(clamp(value + (e.deltaY < 0 ? 0.05 : -0.05)));
        }}
        onKeyDown={onKeyDown}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, var(--color-gold-bright), var(--color-brass) 55%, var(--color-brass-dark) 100%)",
          boxShadow:
            "inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.5)",
          position: "relative",
          cursor: "ns-resize",
          touchAction: "none",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 4,
            left: "50%",
            width: 2,
            height: 12,
            background: "var(--color-parchment-ink)",
            transformOrigin: "50% 16px",
            transform: `translateX(-50%) rotate(${angle}deg)`,
          }}
        />
      </div>
      <span className="text-[0.65rem] uppercase tracking-wide text-[var(--color-text-muted)]">
        {label}
      </span>
    </div>
  );
}
