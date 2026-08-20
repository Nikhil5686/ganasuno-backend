"use client";

import { useState, useEffect, useCallback } from "react";

// ============================================================================
// Volume Control Architecture:
// ============================================================================
//
// GanaSuno has TWO completely independent volume systems:
//
// A) WEBSITE VOLUME (audio.volume / audio.muted)
//    - Controlled by the GanaSuno volume slider in the glass player.
//    - Controlled by keyboard shortcuts: Ctrl+ArrowUp, Ctrl+ArrowDown, Ctrl+M.
//    - Range: 0.0 to 1.0 (displayed as 0% to 100% in the UI).
//    - Persisted in localStorage and restored on reload.
//
// B) SYSTEM / OS VOLUME (hardware volume keys)
//    - Controlled by the operating system or hardware keyboard volume keys.
//    - A normal browser webpage CANNOT reliably read or control the OS master
//      volume. We do NOT attempt to synchronize or represent it.
//
// These two systems are deliberately kept separate.
// ============================================================================

// ============================================================================
// Timeline / Duration Architecture:
// ============================================================================
//
// The HTMLAudioElement is the SINGLE SOURCE OF TRUTH for:
//   - currentTime (audio.currentTime)
//   - duration    (audio.duration)
//
// Events used:
//   - loadedmetadata  → read initial duration (may change with durationchange)
//   - durationchange  → update duration if it changes after initial load
//   - timeupdate      → read currentTime, clamped: 0 <= t <= duration
//   - ended           → set currentTime to real duration (not 0), stop playback
//   - play / pause    → sync isPlaying flag
//
// Duration may be NaN, Infinity, or 0 before metadata loads. Always guard:
//   isFinite(duration) && duration > 0
//
// currentTime is always clamped to [0, duration] before storing in state.
// Progress bar percentage = (currentTime / duration) * 100, clamped 0..100.
// ============================================================================

const PLACEHOLDER_AUDIO_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const VOLUME_STORAGE_KEY = "ganasuno:volume";

type StoredVolume = {
  volume: number;
  muted: boolean;
};

function readStoredVolume(): StoredVolume | null {
  try {
    const raw = localStorage.getItem(VOLUME_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredVolume;
    if (
      typeof parsed.volume === "number" &&
      parsed.volume >= 0 &&
      parsed.volume <= 100 &&
      typeof parsed.muted === "boolean"
    ) {
      return parsed;
    }
  } catch {
    // Ignore corrupt storage
  }
  return null;
}

function writeStoredVolume(volume: number, muted: boolean) {
  try {
    localStorage.setItem(
      VOLUME_STORAGE_KEY,
      JSON.stringify({ volume, muted } satisfies StoredVolume)
    );
  } catch {
    // Storage may be unavailable in private browsing
  }
}

/**
 * Centralized, safe time formatter for GanaSuno.
 * Input: total seconds (may be NaN / Infinity / negative).
 * Output: mm:ss (or h:mm:ss for tracks >= 1 hour).
 */
export function formatAudioTime(totalSeconds: number): string {
  if (!isFinite(totalSeconds) || totalSeconds < 0) return "0:00";
  const t = Math.floor(totalSeconds);
  const hours = Math.floor(t / 3600);
  const minutes = Math.floor((t % 3600) / 60);
  const seconds = t % 60;
  const ss = String(seconds).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  if (hours > 0) {
    return `${hours}:${mm}:${ss}`;
  }
  return `${minutes}:${ss}`;
}

function safeDuration(audio: HTMLAudioElement): number {
  const d = audio.duration;
  return isFinite(d) && d > 0 ? d : 0;
}

class AudioEngine {
  private static instance: AudioEngine;
  private audio: HTMLAudioElement | null = null;

  public state = {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isMetadataLoading: false,
    volume: 80,
    muted: false,
    currentSongId: null as string | null,
  };

  private listeners: Set<() => void> = new Set();

  private constructor() {
    if (typeof window !== "undefined") {
      this.audio = new Audio();

      const stored = readStoredVolume();
      if (stored) {
        this.state.volume = stored.volume;
        this.state.muted = stored.muted;
        this.audio.volume = stored.volume / 100;
        this.audio.muted = stored.muted;
      } else {
        this.audio.volume = this.state.volume / 100;
      }

      this.audio.addEventListener("timeupdate", () => {
        if (!this.audio) return;
        const rawCurrent = this.audio.currentTime ?? 0;
        const safeDurationValue = safeDuration(this.audio);

        const clamped =
          safeDurationValue > 0
            ? Math.max(0, Math.min(rawCurrent, safeDurationValue))
            : Math.max(0, rawCurrent);

        this.updateState({ currentTime: clamped });
      });

      this.audio.addEventListener("loadedmetadata", () => {
        if (!this.audio) return;
        const d = safeDuration(this.audio);
        this.updateState({
          duration: d,
          currentTime: 0,
          isMetadataLoading: false,
        });
      });

      this.audio.addEventListener("durationchange", () => {
        if (!this.audio) return;
        const d = safeDuration(this.audio);
        if (d > 0) {
          this.updateState({ duration: d });
        }
      });

      this.audio.addEventListener("loadstart", () => {
        this.updateState({ isMetadataLoading: true, duration: 0, currentTime: 0 });
      });

      this.audio.addEventListener("error", () => {
        this.updateState({ isMetadataLoading: false, duration: 0 });
      });

      this.audio.addEventListener("play", () => {
        this.updateState({ isPlaying: true });
      });

      this.audio.addEventListener("pause", () => {
        this.updateState({ isPlaying: false });
      });

      this.audio.addEventListener("ended", () => {
        if (!this.audio) return;
        const endTime = safeDuration(this.audio) || this.state.duration;
        this.updateState({ isPlaying: false, currentTime: endTime });
      });

      this.audio.addEventListener("volumechange", () => {
        if (!this.audio) return;
        const volume = this.audio.volume * 100;
        const muted = this.audio.muted;
        this.updateState({ volume, muted });
        writeStoredVolume(volume, muted);
      });
    }
  }

  public static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }

  private updateState(newState: Partial<typeof this.state>) {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  public async play(songId: string, url?: string) {
    if (!this.audio) return;

    const resolvedUrl = url || PLACEHOLDER_AUDIO_URL;

    if (this.state.currentSongId !== songId) {
      this.audio.src = resolvedUrl;
      this.updateState({
        currentSongId: songId,
        currentTime: 0,
        duration: 0,
        isMetadataLoading: true,
      });
    }

    try {
      await this.audio.play();
    } catch (err) {
      console.warn("Audio playback failed (likely autoplay restriction):", err);
    }
  }

  public pause() {
    if (!this.audio) return;
    this.audio.pause();
  }

  public togglePlay() {
    if (!this.audio) return;
    if (this.state.isPlaying) {
      this.pause();
    } else if (this.state.currentSongId) {
      this.play(this.state.currentSongId, this.audio.src);
    }
  }

  public seek(seconds: number) {
    if (!this.audio) return;
    const safeDurationValue = safeDuration(this.audio);

    const clamped =
      safeDurationValue > 0
        ? Math.max(0, Math.min(seconds, safeDurationValue))
        : 0;

    this.audio.currentTime = clamped;
    this.updateState({ currentTime: clamped });
  }

  public setVolume(volume: number) {
    if (!this.audio) return;
    const safeVol = Math.max(0, Math.min(100, volume));
    this.audio.volume = safeVol / 100;
    if (safeVol > 0 && this.audio.muted) {
      this.audio.muted = false;
    }
  }

  public toggleMute() {
    if (!this.audio) return;
    this.audio.muted = !this.audio.muted;
  }
}

export function useAudio() {
  const engine = AudioEngine.getInstance();
  const [state, setState] = useState(engine.state);

  useEffect(() => {
    return engine.subscribe(() => {
      setState({ ...engine.state });
    });
  }, [engine]);

  return {
    state,
    play: useCallback(
      (songId: string, url?: string) => engine.play(songId, url),
      [engine]
    ),
    pause: useCallback(() => engine.pause(), [engine]),
    togglePlay: useCallback(() => engine.togglePlay(), [engine]),
    seek: useCallback((seconds: number) => engine.seek(seconds), [engine]),
    setVolume: useCallback((volume: number) => engine.setVolume(volume), [engine]),
    toggleMute: useCallback(() => engine.toggleMute(), [engine]),
  };
}
