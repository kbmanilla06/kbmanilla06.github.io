interface StatBarProps {
  level: number; // 1-5
  max?: number;
  label?: string;
}

export default function StatBar({ level, max = 5, label }: StatBarProps) {
  const segments = Array.from({ length: max }, (_, i) => i < level);

  return (
    <div
      className="flex items-center gap-1.5"
      role="img"
      aria-label={`${label ? `${label}: ` : ""}${level} out of ${max} mastery`}
    >
      {segments.map((filled, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            width: 18,
            height: 6,
            borderRadius: 2,
            background: filled
              ? "linear-gradient(180deg, var(--color-gold-bright), var(--color-brass))"
              : "var(--color-iron)",
            boxShadow: filled
              ? "inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.5)"
              : "inset 0 1px 2px rgba(0,0,0,0.6)",
          }}
        />
      ))}
    </div>
  );
}
