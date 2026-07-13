"use client";

import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { getAudioEngine } from "@/lib/audio/AudioEngine";
import { BrassCorners } from "./BrassCorner";

type Variant = "default" | "accent" | "ghost";

interface BaseProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: Variant;
  brass?: boolean;
  className?: string;
}

interface ButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

interface LinkProps extends BaseProps {
  href: string;
  external?: boolean;
}

type GuildButtonProps = ButtonProps | LinkProps;

function playPressSfx() {
  getAudioEngine().playSfx("buttonPress");
}

export default function GuildButton(props: GuildButtonProps) {
  const { children, icon, variant = "default", brass = false, className = "" } = props;
  const classes = `guild-button variant-${variant} ${className}`;

  const content = (
    <>
      {brass && <BrassCorners />}
      {icon && (
        <span className="engraved-icon" aria-hidden="true">
          <span className="engrave-shadow">{icon}</span>
          <span className="engrave-face">{icon}</span>
        </span>
      )}
      {children}
    </>
  );

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={playPressSfx}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={playPressSfx}>
        {content}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- stripped so they aren't spread onto the DOM node
  const { onClick, children: _ch, icon: _ic, variant: _v, brass: _b, className: _cl, ...rest } =
    props as ButtonProps;
  return (
    <button
      className={classes}
      onClick={(e) => {
        playPressSfx();
        onClick?.(e);
      }}
      {...rest}
    >
      {content}
    </button>
  );
}
