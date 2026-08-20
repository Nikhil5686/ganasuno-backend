import { useCallback, useEffect, useRef } from "react";
import type { EraAmbientSoundConfig } from "@/data/eras";

export type AmbientSoundControls = {
  /** Prepare audio element without playing (browser-safe). */
  prepare: () => void;
  /** Play ambient sound — must be called from a user gesture. */
  play: () => Promise<void>;
  /** Stop and reset ambient sound. */
  stop: () => void;
  isReady: boolean;
};

/**
 * Reusable ambient sound scaffold.
 * Does not autoplay — callers must invoke `play()` from user interaction.
 */
export function useEraAmbientSound(
  config: EraAmbientSoundConfig
): AmbientSoundControls {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const prepare = useCallback(() => {
    if (!config.enabled || !config.url) {
      return;
    }

    if (!audioRef.current) {
      const audio = new Audio(config.url);
      audio.loop = true;
      audio.volume = config.volume;
      audio.preload = "none";
      audioRef.current = audio;
    } else {
      audioRef.current.volume = config.volume;
    }
  }, [config.enabled, config.url, config.volume]);

  const play = useCallback(async () => {
    if (!config.enabled || !config.url) {
      return;
    }

    prepare();

    try {
      await audioRef.current?.play();
    } catch {
      // Autoplay or load restrictions — expected until a real URL is wired.
    }
  }, [config.enabled, config.url, prepare]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  }, []);

  useEffect(() => {
    return () => {
      stop();
      audioRef.current = null;
    };
  }, [stop]);

  useEffect(() => {
    stop();
    audioRef.current = null;
  }, [config.url, stop]);

  return {
    prepare,
    play,
    stop,
    isReady: config.enabled && Boolean(config.url),
  };
}
