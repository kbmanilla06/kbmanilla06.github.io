interface WdlPanelProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export default function WdlPanel({ children, className = "", as: Tag = "div" }: WdlPanelProps) {
  return <Tag className={`wdl-panel ${className}`}>{children}</Tag>;
}
