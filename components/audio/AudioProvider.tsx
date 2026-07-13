"use client";

import MusicBoxControl from "./MusicBoxControl";

/** Mounted once so the optional, user-controlled soundtrack stays available across routes. */
export default function AudioProvider() {
  return <MusicBoxControl />;
}
