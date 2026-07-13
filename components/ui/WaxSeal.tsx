"use client";

import { useState } from "react";
import { GuildEmblemIcon } from "./icons";

export default function WaxSeal({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const [stamped, setStamped] = useState(false);

  return (
    <button
      type="button"
      aria-label="Seal"
      className={`wax-seal ${stamped ? "stamped" : ""} ${className}`}
      onMouseEnter={() => setStamped(true)}
      onMouseLeave={() => setStamped(false)}
      onClick={onClick}
    >
      <GuildEmblemIcon width={14} height={14} aria-hidden="true" stroke="rgba(232,200,120,0.85)" />
    </button>
  );
}
