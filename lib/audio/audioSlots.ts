/**
 * Fixed file-path contract for every audio asset the Guild Hall expects.
 * None of these files ship in the repo (licensing — see plan notes on
 * "Proof of a Hero"/Capcom). Drop licensed or original files at these
 * exact paths under /public/audio to light the system up; until then
 * every slot resolves to "unavailable" and playback is silently skipped.
 */

export const MUSIC_SLOT = "/audio/guild-theme.mp3";

export const AMBIENCE_SLOTS = {
  forest: "/audio/ambience-forest.mp3",
  wind: "/audio/ambience-wind.mp3",
  campfire: "/audio/campfire.mp3",
  forge: "/audio/forge-hammer.mp3",
  birds: "/audio/birds.mp3",
} as const;

export const ROAR_SLOT = "/audio/roar-distant.mp3";

export const SFX_SLOTS = {
  buttonPress: "/audio/sfx/button-press.mp3",
  pageTurn: "/audio/sfx/page-turn.mp3",
  waxSeal: "/audio/sfx/wax-seal.mp3",
} as const;

export type AmbienceLayerKey = keyof typeof AMBIENCE_SLOTS;
export type SfxKey = keyof typeof SFX_SLOTS;
