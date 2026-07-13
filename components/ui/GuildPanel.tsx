import { BrassCorners } from "./BrassCorner";

interface GuildPanelProps {
  children: React.ReactNode;
  className?: string;
  brass?: boolean;
  as?: "div" | "section" | "article";
}

export default function GuildPanel({
  children,
  className = "",
  brass = true,
  as: Tag = "div",
}: GuildPanelProps) {
  return (
    <Tag className={`guild-panel ${className}`}>
      {brass && <BrassCorners />}
      {children}
    </Tag>
  );
}
