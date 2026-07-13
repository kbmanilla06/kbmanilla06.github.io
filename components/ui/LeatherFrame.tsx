export default function LeatherFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`leather-frame ${className}`}>{children}</div>;
}
