"use client";

import { useCallback, useEffect, useRef } from "react";
import { youtubeEngine } from "@/lib/audio/youtube-engine";

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        options: {
          width?: string | number;
          height?: string | number;
          videoId?: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: any }) => void;
            onStateChange?: (event: { target: any; data: number }) => void;
            onError?: (event: { target: any; data: number }) => void;
          };
        },
      ) => any;

      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };

    onYouTubeIframeAPIReady?: () => void;
  }
}

type YoutubePlayerProps = {
  videoId: string;
  onReady?: () => void;
  onEnded?: () => void;
};

let youtubeApiPromise: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) {
    return Promise.resolve();
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  youtubeApiPromise = new Promise<void>((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve();
    };

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]',
    );

    if (existingScript) {
      return;
    }

    const script = document.createElement("script");

    script.src = "https://www.youtube.com/iframe_api";

    script.async = true;

    document.head.appendChild(script);
  });

  return youtubeApiPromise;
}

export default function YoutubePlayer({
  videoId,
  onReady,
  onEnded,
}: YoutubePlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const playerRef = useRef<any>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const endedRef = useRef(false);

  const onEndedRef = useRef(onEnded);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onEndedRef.current = onEnded;
    onReadyRef.current = onReady;
  }, [onEnded, onReady]);

  useEffect(() => {
    let cancelled = false;

    async function initializePlayer() {
      if (!videoId) {
        return;
      }

      await loadYouTubeApi();

      if (cancelled) {
        return;
      }

      if (!window.YT?.Player || !containerRef.current) {
        return;
      }

      /*
       * Stop the previous time-update loop.
       */
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const player = new window.YT.Player(containerRef.current, {
        width: 1,
        height: 1,

        videoId,

        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },

        events: {
          onReady: (event) => {
            if (cancelled) {
              return;
            }

            playerRef.current = event.target;

            endedRef.current = false;

            youtubeEngine.setPlayer(event.target);

            console.log("YouTube player ready:", videoId);

            onReadyRef.current?.();

            intervalRef.current = setInterval(() => {
              youtubeEngine.updateTime();
            }, 250);
          },

          onStateChange: (event) => {
            if (cancelled) {
              return;
            }

            const playerState = event.data;

            if (!window.YT?.PlayerState) {
              return;
            }

            /*
             * PLAYING
             */
            if (playerState === window.YT.PlayerState.PLAYING) {
              youtubeEngine.setPlaying(true);
            } else if (playerState === window.YT.PlayerState.PAUSED) {
              /*
               * PAUSED
               */
              youtubeEngine.setPlaying(false);
            } else if (playerState === window.YT.PlayerState.ENDED) {
              if (endedRef.current) {
                return;
              }

              endedRef.current = true;

              youtubeEngine.updateTime();
              youtubeEngine.setPlaying(false);

              onEndedRef.current?.();
            }
          },

          onError: (event) => {
            console.error(
              "YouTube player error:",
              event.data,
              "videoId:",
              videoId,
            );
          },
        },
      });

      playerRef.current = player;
    }

    void initializePlayer();

    return () => {
      cancelled = true;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);

        intervalRef.current = null;
      }

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore destroy errors.
        }

        playerRef.current = null;
      }

      youtubeEngine.clearPlayer();
    };
  }, []);

  useEffect(() => {
    if (!videoId) {
      return;
    }

    endedRef.current = false;

    youtubeEngine.load(videoId);
  }, [videoId]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
    />
  );
}
