import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAudioEngine } from "@/lib/audio/AudioEngine";
import { AMBIENCE_SLOTS, type AmbienceLayerKey } from "@/lib/audio/audioSlots";

const AMBIENCE_KEYS = Object.keys(AMBIENCE_SLOTS) as AmbienceLayerKey[];

interface AudioState {
  hasEnteredGuild: boolean;
  musicVolume: number;
  ambienceVolume: number;
  musicMuted: boolean;
  ambienceMuted: boolean;
  masterMuted: boolean;

  enterGuild: () => void;
  setMusicVolume: (v: number) => void;
  setAmbienceVolume: (v: number) => void;
  toggleMusicMuted: () => void;
  toggleAmbienceMuted: () => void;
  toggleMasterMuted: () => void;
}

function applyMusicState(state: Pick<AudioState, "musicMuted" | "musicVolume">) {
  const engine = getAudioEngine();
  engine.setMusicVolume(state.musicMuted ? 0 : state.musicVolume);
}

function applyAmbienceState(
  state: Pick<AudioState, "ambienceMuted" | "ambienceVolume">
) {
  const engine = getAudioEngine();
  engine.setAmbienceVolume(state.ambienceMuted ? 0 : state.ambienceVolume);
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => ({
      hasEnteredGuild: false,
      musicVolume: 0.6,
      ambienceVolume: 0.5,
      musicMuted: false,
      ambienceMuted: false,
      masterMuted: false,

      enterGuild: () => {
        if (get().hasEnteredGuild) return;
        const engine = getAudioEngine();
        engine.init();
        engine.setMasterMuted(get().masterMuted);
        applyMusicState(get());
        applyAmbienceState(get());
        engine.playMusic(3);
        AMBIENCE_KEYS.forEach((key) => engine.playAmbienceLayer(key, 3));
        set({ hasEnteredGuild: true });
      },

      setMusicVolume: (v) => {
        set({ musicVolume: v });
        applyMusicState(get());
      },
      setAmbienceVolume: (v) => {
        set({ ambienceVolume: v });
        applyAmbienceState(get());
      },
      toggleMusicMuted: () => {
        const next = !get().musicMuted;
        set({ musicMuted: next });
        applyMusicState({ ...get(), musicMuted: next });
      },
      toggleAmbienceMuted: () => {
        const next = !get().ambienceMuted;
        set({ ambienceMuted: next });
        applyAmbienceState({ ...get(), ambienceMuted: next });
      },
      toggleMasterMuted: () => {
        const next = !get().masterMuted;
        set({ masterMuted: next });
        getAudioEngine().setMasterMuted(next);
      },
    }),
    {
      name: "guild-audio-prefs",
      partialize: (state) => ({
        musicVolume: state.musicVolume,
        ambienceVolume: state.ambienceVolume,
        musicMuted: state.musicMuted,
        ambienceMuted: state.ambienceMuted,
        masterMuted: state.masterMuted,
      }),
    }
  )
);
