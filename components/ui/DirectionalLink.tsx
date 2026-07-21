import Link from "next/link";
import type { ReactNode } from "react";

interface DirectionalLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  direction?: "forward" | "back";
  icon?: ReactNode;
  className?: string;
}

/**
 * WDL Directional link (03-wdl-components.md §Directional link, DR-037d):
 * label + decorative arrow. The arrow never carries the accessible name —
 * that is always the full label text. Hover/focus motion respects the
 * site-wide reduced-motion rule (app/globals.css).
 */
export default function DirectionalLink({ href, children, external, direction = "forward", icon, className = "" }: DirectionalLinkProps) {
  const content = (
    <>
      {icon && <span aria-hidden="true">{icon}</span>}
      <span className="directional-link-label">{children}</span>
      <span className="directional-link-arrow" aria-hidden="true">{direction === "back" ? "←" : "→"}</span>
    </>
  );
  const classes = `directional-link ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} data-direction={direction}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} data-direction={direction}>
      {content}
    </Link>
  );
}
