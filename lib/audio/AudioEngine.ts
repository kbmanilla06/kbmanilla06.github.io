import {
  MUSIC_SLOT,
  AMBIENCE_SLOTS,
  ROAR_SLOT,
  SFX_SLOTS,
  type AmbienceLayerKey,
  type SfxKey,
} from "./audioSlots";

type AvailabilityListener = (slot: string, available: boolean) => void;

/**
 * Ramp `param` to `target` over `durationSec`, cancelling any in-flight
 * ramp first so overlapping fade calls (e.g. rapid mute toggling) don't
 * produce zipper noise or fight each other.
 */
function fadeGain(
  ctx: AudioContext,
  param: AudioParam,
  target: number,
  durationSec: number
) {
  const now = ctx.currentTime;
  param.cancelScheduledValues(now);
  param.setValueAtTime(param.value, now);
  param.linearRampToValueAtTime(target, now + durationSec);
}

/**
 * Module-singleton audio graph for the Guild Hall. Lazily constructed on
 * the first user gesture (the landing sequence's "Enter the Guild" gate)
 * since AudioContext cannot be started before that. Every source load /
 * play call is wrapped defensively — this engine is expected to run with
 * zero audio files present (see audioSlots.ts) and must never throw.
 */
class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private ambienceGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private ambienceLayerGains: Partial<Record<AmbienceLayerKey, GainNode>> = {};

  private musicEl: HTMLAudioElement | null = null;
  private ambienceEls: Partial<Record<AmbienceLayerKey, HTMLAudioElement | null>> = {};
  private roarEl: HTMLAudioElement | null = null;
  private roarTimer: ReturnType<typeof setTimeout> | null = null;

  private sfxBuffers: Map<SfxKey, AudioBuffer> = new Map();
  private mediaSourcesBound = new WeakSet<HTMLAudioElement>();
  private pendingPlay = new WeakSet<HTMLAudioElement>();
  private existenceCache = new Map<string, Promise<boolean>>();

  private availability: Record<string, boolean> = {};
  private listeners: Set<AvailabilityListener> = new Set();

  /**
   * A HEAD fetch (not a native <audio>/<img>-style resource load) so a
   * missing file resolves to a plain `false` instead of the browser
   * logging its own "Failed to load resource: 404" to the console —
   * that diagnostic is emitted by the browser's native media loader
   * regardless of whether our JS handles the resulting error event.
   */
  private checkExists(src: string): Promise<boolean> {
    let cached = this.existenceCache.get(src);
    if (!cached) {
      cached = fetch(src, { method: "HEAD" })
        .then((res) => res.ok)
        .catch(() => false);
      this.existenceCache.set(src, cached);
    }
    return cached;
  }

  get initialized() {
    return this.ctx !== null;
  }

  onAvailabilityChange(listener: AvailabilityListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private setAvailable(slot: string, available: boolean) {
    if (this.availability[slot] === available) return;
    this.availability[slot] = available;
    this.listeners.forEach((l) => l(slot, available));
  }

  isAvailable(slot: string) {
    return this.availability[slot] ?? false;
  }

  /** Must be called from within a user-gesture handler. */
  init() {
    if (this.ctx) return;
    try {
      const AudioContextCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioContextCtor();

      this.masterGain = this.ctx.createGain();
      this.musicGain = this.ctx.createGain();
      this.ambienceGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();

      this.musicGain.connect(this.masterGain);
      this.ambienceGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      (Object.keys(AMBIENCE_SLOTS) as AmbienceLayerKey[]).forEach((key) => {
        const gain = this.ctx!.createGain();
        gain.connect(this.ambienceGain!);
        this.ambienceLayerGains[key] = gain;
      });

      this.musicEl = this.createLoopElement(MUSIC_SLOT, this.musicGain);
      (Object.keys(AMBIENCE_SLOTS) as AmbienceLayerKey[]).forEach((key) => {
        this.ambienceEls[key] = this.createLoopElement(
          AMBIENCE_SLOTS[key],
          this.ambienceLayerGains[key]!
        );
      });

      this.roarEl = this.createLoopElement(ROAR_SLOT, this.sfxGain, false);
      this.scheduleRoar();
    } catch (err) {
      console.warn("[AudioEngine] init failed, audio disabled", err);
    }
  }

  private createLoopElement(
    src: string,
    destination: GainNode,
    loop = true
  ): HTMLAudioElement | null {
    try {
      // No `src` set yet — the existence check below decides whether the
      // browser ever attempts the network request at all.
      const el = new Audio();
      el.loop = loop;
      el.preload = "none";
      el.crossOrigin = "anonymous";
      el.volume = 1;
      el.addEventListener("error", () => this.setAvailable(src, false));

      if (this.ctx && !this.mediaSourcesBound.has(el)) {
        const source = this.ctx.createMediaElementSource(el);
        source.connect(destination);
        this.mediaSourcesBound.add(el);
      }

      this.checkExists(src).then((exists) => {
        this.setAvailable(src, exists);
        if (!exists) return;
        el.src = src;
        el.preload = "auto";
        if (this.pendingPlay.has(el)) {
          this.pendingPlay.delete(el);
          el.play().catch(() => {});
        }
      });

      return el;
    } catch (err) {
      console.warn(`[AudioEngine] failed to create source for ${src}`, err);
      this.setAvailable(src, false);
      return null;
    }
  }

  private async safePlay(el: HTMLAudioElement | null) {
    if (!el) return;
    if (!el.src) {
      // Existence check hasn't resolved (or failed) yet — queue the
      // intent so createLoopElement can pick it up if the file appears.
      this.pendingPlay.add(el);
      return;
    }
    try {
      await el.play();
    } catch {
      // Autoplay/decoding rejection — treat as silently unavailable.
    }
  }

  playMusic(fadeSec = 2) {
    if (!this.ctx || !this.musicGain || !this.musicEl) return;
    this.safePlay(this.musicEl);
    fadeGain(this.ctx, this.musicGain.gain, this.musicGain.gain.value || 1, fadeSec);
  }

  stopMusic(fadeSec = 1.5) {
    if (!this.ctx || !this.musicGain || !this.musicEl) return;
    fadeGain(this.ctx, this.musicGain.gain, 0, fadeSec);
    const el = this.musicEl;
    setTimeout(() => el?.pause(), fadeSec * 1000 + 50);
  }

  setMusicVolume(volume: number, fadeSec = 0.15) {
    if (!this.ctx || !this.musicGain) return;
    fadeGain(this.ctx, this.musicGain.gain, volume, fadeSec);
  }

  playAmbienceLayer(key: AmbienceLayerKey, fadeSec = 2) {
    if (!this.ctx) return;
    const el = this.ambienceEls[key];
    const gain = this.ambienceLayerGains[key];
    if (!el || !gain) return;
    this.safePlay(el);
    fadeGain(this.ctx, gain.gain, 1, fadeSec);
  }

  stopAmbienceLayer(key: AmbienceLayerKey, fadeSec = 1.5) {
    if (!this.ctx) return;
    const el = this.ambienceEls[key];
    const gain = this.ambienceLayerGains[key];
    if (!el || !gain) return;
    fadeGain(this.ctx, gain.gain, 0, fadeSec);
    setTimeout(() => el?.pause(), fadeSec * 1000 + 50);
  }

  setAmbienceVolume(volume: number, fadeSec = 0.15) {
    if (!this.ctx || !this.ambienceGain) return;
    fadeGain(this.ctx, this.ambienceGain.gain, volume, fadeSec);
  }

  setMasterMuted(muted: boolean) {
    if (!this.ctx || !this.masterGain) return;
    fadeGain(this.ctx, this.masterGain.gain, muted ? 0 : 1, 0.3);
  }

  /** Rare, randomized one-shot so it never reads as a metronomic loop. */
  private scheduleRoar() {
    if (this.roarTimer) clearTimeout(this.roarTimer);
    const delay = 40_000 + Math.random() * 50_000;
    this.roarTimer = setTimeout(() => {
      if (this.roarEl?.src) {
        this.roarEl.currentTime = 0;
      }
      this.safePlay(this.roarEl);
      this.scheduleRoar();
    }, delay);
  }

  private async loadSfxBuffer(key: SfxKey): Promise<AudioBuffer | null> {
    if (!this.ctx) return null;
    const cached = this.sfxBuffers.get(key);
    if (cached) return cached;
    try {
      const res = await fetch(SFX_SLOTS[key]);
      if (!res.ok) throw new Error(String(res.status));
      const arrayBuffer = await res.arrayBuffer();
      const buffer = await this.ctx.decodeAudioData(arrayBuffer);
      this.sfxBuffers.set(key, buffer);
      this.setAvailable(SFX_SLOTS[key], true);
      return buffer;
    } catch {
      this.setAvailable(SFX_SLOTS[key], false);
      return null;
    }
  }

  async playSfx(key: SfxKey) {
    if (!this.ctx || !this.sfxGain) return;
    const buffer = await this.loadSfxBuffer(key);
    if (!buffer) return;
    try {
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.sfxGain);
      source.start();
    } catch {
      // Ignore — a missed click sound is not worth surfacing.
    }
  }
}

let engine: AudioEngine | null = null;

export function getAudioEngine(): AudioEngine {
  if (!engine) engine = new AudioEngine();
  return engine;
}
