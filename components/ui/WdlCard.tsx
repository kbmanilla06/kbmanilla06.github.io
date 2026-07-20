export default function WdlCard({ children, className = "" }: { children: React.ReactNode; className?: string; }) {
  return <div className={`wdl-card-surface ${className}`}>{children}</div>;
}
