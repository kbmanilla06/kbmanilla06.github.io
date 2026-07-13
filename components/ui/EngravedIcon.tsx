export default function EngravedIcon({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`engraved-icon ${className}`} aria-hidden="true">
      <span className="engrave-shadow">{children}</span>
      <span className="engrave-face">{children}</span>
    </span>
  );
}
