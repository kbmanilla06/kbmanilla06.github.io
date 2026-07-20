"use client";

import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "default" | "accent" | "ghost";

interface BaseProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: Variant;
  className?: string;
}

interface ButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> { href?: undefined; }
interface LinkProps extends BaseProps { href: string; external?: boolean; download?: boolean | string; }
type WdlButtonProps = ButtonProps | LinkProps;

export default function WdlButton(props: WdlButtonProps) {
  const { children, icon, variant = "default", className = "" } = props;
  const classes = `wdl-control variant-${variant} ${className}`;
  const content = <>{icon && <span className="wdl-button-icon" aria-hidden="true">{icon}</span>}{children}</>;

  if ("href" in props && props.href) {
    const { href, external, download } = props;
    if (external || download) {
      return <a href={href} target={external && !download ? "_blank" : undefined} rel={external && !download ? "noopener noreferrer" : undefined} download={download} className={classes}>{content}</a>;
    }
    return <Link href={href} className={classes}>{content}</Link>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- presentation-only props must not reach the DOM
  const { onClick, children: _children, icon: _icon, variant: _variant, className: _className, ...rest } = props as ButtonProps;
  return <button className={classes} onClick={onClick} {...rest}>{content}</button>;
}
