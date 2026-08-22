"use client";

type YouTubeState = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  muted: boolean;
};

class YouTubeEngine {
  private player: any = null;

  private pendingVideoId: string | null = null;
  private pendingStartTime = 0;

  public state: YouTubeState = {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    muted: false,
  };

  private listeners = new Set<() => void>();

  /**
   * Attach the actual YouTube player.
   *
   * If load() was called before the player was ready,
   * the pending video will automatically be loaded here
   * with its requested start time.
   */
  setPlayer(player: any) {
    this.player = player;
    this.setupMediaSession();

    if (this.pendingVideoId) {
      const videoId = this.pendingVideoId;
      const startTime = this.pendingStartTime;

      this.pendingVideoId = null;
      this.pendingStartTime = 0;

      this.player.loadVideoById(videoId, startTime);

      this.state.currentTime = startTime;
      this.state.isPlaying = false;

      this.notify();
    }

    this.notify();
  }

  setMediaMetadata(
    title: string,
    artist = "GanaSuno",
    artwork = "/icons/icon-512.png",
  ) {
    if (!("mediaSession" in navigator)) {
      return;
    }

    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist,
      album: "GanaSuno",
      artwork: [
        {
          src: artwork,
          sizes: "512x512",
          type: "image/png",
        },
      ],
    });
  }

  /**
   * Remove the player when the component is unmounted.
   */
  clearPlayer() {
    this.player = null;
  }

  /**
   * Load a YouTube video.
   *
   * startTime is in seconds.
   *
   * Example:
   *
   * load("abc123", 8)
   *
   * starts the video at 00:08.
   */
  load(videoId: string, startTime = 0) {
    if (!videoId) return;

    const safeStartTime = Math.max(0, startTime);

    // Player isn't ready yet.
    if (!this.player) {
      this.pendingVideoId = videoId;
      this.pendingStartTime = safeStartTime;

      this.state = {
        isPlaying: false,
        currentTime: safeStartTime,
        duration: 0,
        muted: this.state.muted,
      };

      this.notify();

      return;
    }

    // Player is ready.
    this.player.loadVideoById(videoId, safeStartTime);

    this.state = {
      isPlaying: false,
      currentTime: safeStartTime,
      duration: 0,
      muted: this.state.muted,
    };

    this.notify();
  }

  updateTime() {
    if (!this.player) return;

    const currentTime =
      this.player.getCurrentTime?.() ?? this.state.currentTime ?? 0;

    const duration = this.player.getDuration?.() ?? this.state.duration ?? 0;

    this.state.currentTime = Math.max(0, currentTime);
    this.state.duration = Math.max(0, duration);

    this.notify();
  }

  public setPlaying(isPlaying: boolean) {
    this.state.isPlaying = isPlaying;
    this.notify();
  }

  play() {
    if (!this.player) return;

    this.player.playVideo?.();

    this.state.isPlaying = true;
    this.notify();
  }

  pause() {
    if (!this.player) return;

    this.player.pauseVideo?.();

    this.state.isPlaying = false;
    this.notify();
  }

  togglePlay() {
    if (!this.player) return;

    const playerState = this.player.getPlayerState?.();

    if (playerState === 1) {
      this.pause();
    } else {
      this.play();
    }
  }

  seek(seconds: number) {
    if (!this.player) return;

    const safeSeconds = Math.max(0, seconds);

    this.player.seekTo?.(safeSeconds, true);

    this.state.currentTime = safeSeconds;

    this.notify();
  }

  mute() {
    if (!this.player) return;

    this.player.mute?.();

    this.state.muted = true;

    this.notify();
  }

  unMute() {
    if (!this.player) return;

    this.player.unMute?.();

    this.state.muted = false;

    this.notify();
  }

  toggleMute() {
    if (!this.player) return;

    if (this.state.muted) {
      this.unMute();
    } else {
      this.mute();
    }
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn);

    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  private setupMediaSession() {
    if (!("mediaSession" in navigator)) {
      return;
    }

    navigator.mediaSession.setActionHandler("play", () => {
      this.play();
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      this.pause();
    });

    navigator.mediaSession.setActionHandler("nexttrack", () => {
      window.dispatchEvent(new Event("ganasuno-next"));
    });

    navigator.mediaSession.setActionHandler("previoustrack", () => {
      window.dispatchEvent(new Event("ganasuno-previous"));
    });
  }
}

export const youtubeEngine = new YouTubeEngine();

import { useEffect, useState } from "react";

export function useYoutubeAudio() {
  const [state, setState] = useState({
    ...youtubeEngine.state,
  });

  useEffect(() => {
    return youtubeEngine.subscribe(() => {
      setState({
        ...youtubeEngine.state,
      });
    });
  }, []);

  return {
    state,

    play: () => youtubeEngine.play(),

    pause: () => youtubeEngine.pause(),

    togglePlay: () => youtubeEngine.togglePlay(),

    toggleMute: () => youtubeEngine.toggleMute(),

    seek: (seconds: number) => {
      youtubeEngine.seek(seconds);
    },
  };
}
