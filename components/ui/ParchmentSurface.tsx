"use client";

import { useEffect, useState } from "react";
import { getParchmentNoiseTexture } from "@/lib/generateNoiseTexture";

interface ParchmentSurfaceProps {
  children: React.ReactNode;
  className?: string;
  rotate?: boolean;
  as?: "div" | "article" | "section";
}

export default function ParchmentSurface({
  children,
  className = "",
  rotate = false,
  as: Tag = "div",
}: ParchmentSurfaceProps) {
  const [noiseUrl, setNoiseUrl] = useState<string>("");

  useEffect(() => {
    setNoiseUrl(getParchmentNoiseTexture());
  }, []);

  return (
    <Tag
      className={`parchment-surface ${className}`}
      style={{
        ...(noiseUrl
          ? ({ ["--parchment-noise-url" as string]: `url(${noiseUrl})` } as React.CSSProperties)
          : {}),
        transform: rotate ? "rotate(-0.4deg)" : undefined,
      }}
    >
      {children}
    </Tag>
  );
}
