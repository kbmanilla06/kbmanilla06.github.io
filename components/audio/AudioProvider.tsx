"use client";

import MusicBoxControl from "./MusicBoxControl";

/**
 * Mounted once in app/layout.tsx (not app/template.tsx) so it — and the
 * underlying AudioEngine singleton it exposes controls for — survives
 * client-side navigation between routes. The actual AudioContext is only
 * constructed on first user gesture via audioStore.enterGuild(), called
 * from the landing sequence's gate.
 */
export default function AudioProvider() {
  return <MusicBoxControl />;
}
