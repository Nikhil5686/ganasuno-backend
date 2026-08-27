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
  private pendingAutoplay = false;

  public state: YouTubeState = {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    muted: false,
  };

  private listeners = new Set<() => void>();

  setPlayer(player: any) {
    this.player = player;

    this.setupMediaSession();

    if (this.pendingVideoId) {
      const videoId = this.pendingVideoId;
      const startTime = this.pendingStartTime;
      const shouldAutoplay = this.pendingAutoplay;

      this.pendingVideoId = null;
      this.pendingStartTime = 0;
      this.pendingAutoplay = false;

      this.loadIntoPlayer(videoId, startTime, shouldAutoplay);
    }

    this.notify();
  }

  clearPlayer() {
    this.player = null;

    this.state = {
      ...this.state,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    };

    this.notify();
  }

  private loadIntoPlayer(videoId: string, startTime = 0, autoplay = false) {
    if (!this.player || !videoId) {
      return;
    }

    const safeStartTime = Math.max(0, startTime);

    try {
      if (autoplay && typeof this.player.loadVideoById === "function") {
        this.player.loadVideoById({
          videoId,
          startSeconds: safeStartTime,
        });
      } else if (typeof this.player.cueVideoById === "function") {
        this.player.cueVideoById({
          videoId,
          startSeconds: safeStartTime,
        });
      }

      this.state = {
        ...this.state,
        isPlaying: false,
        currentTime: safeStartTime,
        duration: 0,
      };

      this.notify();

      if (autoplay && typeof this.player.loadVideoById !== "function") {
        setTimeout(() => {
          this.play();
        }, 100);
      }
    } catch (error) {
      console.error("Failed to load YouTube video:", error);
    }
  }

  load(videoId: string, startTime = 0, autoplay = false) {
    if (!videoId) {
      return;
    }

    const safeStartTime = Math.max(0, startTime);

    if (!this.player) {
      this.pendingVideoId = videoId;
      this.pendingStartTime = safeStartTime;
      this.pendingAutoplay = autoplay;

      this.state = {
        ...this.state,
        isPlaying: false,
        currentTime: safeStartTime,
        duration: 0,
      };

      this.notify();
      return;
    }

    this.loadIntoPlayer(videoId, safeStartTime, autoplay);
  }

  updateTime() {
    if (!this.player) {
      return;
    }

    try {
      const currentTime =
        this.player.getCurrentTime?.() ?? this.state.currentTime ?? 0;

      const duration = this.player.getDuration?.() ?? this.state.duration ?? 0;

      this.state.currentTime = Math.max(0, currentTime);
      this.state.duration = Math.max(0, duration);

      this.notify();
    } catch {
      // Ignore transient YouTube API errors.
    }
  }

  setPlaying(isPlaying: boolean) {
    this.state.isPlaying = isPlaying;
    this.notify();
  }

  handleEnded() {
    this.state.isPlaying = false;
    this.updateTime();
    this.notify();
  }

  play() {
    if (!this.player) {
      return;
    }

    try {
      // Do NOT mark as playing here.
      // YouTube's PLAYING event is the source of truth.
      this.player.playVideo?.();

      this.notify();
    } catch (error) {
      console.warn("Unable to start YouTube playback:", error);

      this.state.isPlaying = false;
      this.notify();
    }
  }

  pause() {
    if (!this.player) {
      return;
    }

    try {
      this.player.pauseVideo?.();

      this.state.isPlaying = false;
      this.notify();
    } catch (error) {
      console.warn("Unable to pause YouTube playback:", error);
    }
  }

  togglePlay() {
    if (!this.player) {
      return;
    }

    const playerState = this.player.getPlayerState?.();

    if (playerState === 1) {
      this.pause();
    } else {
      this.play();
    }
  }

  seek(seconds: number) {
    if (!this.player) {
      return;
    }

    const safeSeconds = Math.max(0, seconds);

    try {
      this.player.seekTo?.(safeSeconds, true);

      this.state.currentTime = safeSeconds;
      this.notify();
    } catch (error) {
      console.warn("Unable to seek YouTube video:", error);
    }
  }

  mute() {
    if (!this.player) {
      return;
    }

    try {
      this.player.mute?.();

      this.state.muted = true;
      this.notify();
    } catch {
      // Ignore.
    }
  }

  unMute() {
    if (!this.player) {
      return;
    }

    try {
      this.player.unMute?.();

      this.state.muted = false;
      this.notify();
    } catch {
      // Ignore.
    }
  }

  toggleMute() {
    if (!this.player) {
      return;
    }

    if (this.state.muted) {
      this.unMute();
    } else {
      this.mute();
    }
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

    try {
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
    } catch {
      // Some browsers don't support every Media Session action.
    }
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
