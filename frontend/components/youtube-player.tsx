"use client";

import { useEffect, useRef } from "react";
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
  autoplay?: boolean;
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

function isUnavailableVideoError(errorCode: number): boolean {
  return (
    errorCode === 2 ||
    errorCode === 5 ||
    errorCode === 100 ||
    errorCode === 101 ||
    errorCode === 150
  );
}

export default function YoutubePlayer({
  videoId,
  autoplay = false,
  onReady,
  onEnded,
}: YoutubePlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const playerRef = useRef<any>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentVideoIdRef = useRef(videoId);

  const autoplayRef = useRef(autoplay);

  const onEndedRef = useRef(onEnded);
  const onReadyRef = useRef(onReady);

  const endedRef = useRef(false);
  const errorHandledRef = useRef(false);

  /*
   * Keep callbacks and current values fresh
   * without recreating the YouTube iframe.
   */
  useEffect(() => {
    currentVideoIdRef.current = videoId;
    autoplayRef.current = autoplay;
    onEndedRef.current = onEnded;
    onReadyRef.current = onReady;
  }, [videoId, autoplay, onEnded, onReady]);

  /*
   * Create the YouTube player ONLY ONCE.
   */
  useEffect(() => {
    let cancelled = false;

    async function initializePlayer() {
      await loadYouTubeApi();

      if (cancelled) {
        return;
      }

      if (!window.YT?.Player || !containerRef.current) {
        return;
      }

      const player = new window.YT.Player(containerRef.current, {
        width: 1,
        height: 1,

        /*
         * Initial video only.
         * Future videos are loaded using loadVideoById()
         * on the SAME player instance.
         */
        videoId: currentVideoIdRef.current,

        playerVars: {
          autoplay: autoplayRef.current ? 1 : 0,
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
            errorHandledRef.current = false;

            youtubeEngine.setPlayer(event.target);

            console.log("YouTube player ready:", currentVideoIdRef.current);

            onReadyRef.current?.();

            /*
             * Keep updating playback position even when
             * the page is not visible.
             */
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }

            intervalRef.current = setInterval(() => {
              youtubeEngine.updateTime();
            }, 250);

            /*
             * If autoplay was requested, explicitly start it.
             */
            if (autoplayRef.current) {
              setTimeout(() => {
                if (!cancelled) {
                  youtubeEngine.play();
                }
              }, 150);
            }
          },

          onStateChange: (event) => {
            if (cancelled) {
              return;
            }

            if (!window.YT?.PlayerState) {
              return;
            }

            const playerState = event.data;

            if (playerState === window.YT.PlayerState.PLAYING) {
              youtubeEngine.setPlaying(true);
            } else if (playerState === window.YT.PlayerState.PAUSED) {
              youtubeEngine.setPlaying(false);
            } else if (playerState === window.YT.PlayerState.ENDED) {
              if (endedRef.current) {
                return;
              }

              endedRef.current = true;

              console.log("🎵 YouTube song ended:", currentVideoIdRef.current);

              youtubeEngine.handleEnded();

              /*
               * React changes the song.
               *
               * IMPORTANT:
               * We do NOT destroy this YouTube player.
               */
              onEndedRef.current?.();
            }
          },

          onError: (event) => {
            if (cancelled) {
              return;
            }

            const errorCode = event.data;

            console.warn(
              "YouTube video error:",
              errorCode,
              currentVideoIdRef.current,
            );

            if (errorHandledRef.current) {
              return;
            }

            if (isUnavailableVideoError(errorCode)) {
              errorHandledRef.current = true;
              endedRef.current = true;

              youtubeEngine.setPlaying(false);

              /*
               * Treat unavailable videos like ended songs.
               */
              setTimeout(() => {
                if (!cancelled) {
                  console.warn(
                    `Skipping unavailable YouTube video ${currentVideoIdRef.current}`,
                  );

                  onEndedRef.current?.();
                }
              }, 100);

              return;
            }

            console.error("YouTube player error:", errorCode);
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

      /*
       * The component is actually being destroyed here,
       * so now it is safe to destroy the YouTube player.
       */
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

  /*
   * THIS EFFECT handles song changes.
   *
   * The iframe is NOT recreated.
   */
  useEffect(() => {
    const player = playerRef.current;

    if (!player || !videoId) {
      return;
    }

    endedRef.current = false;
    errorHandledRef.current = false;

    console.log("🔄 Loading next video into existing YouTube player:", videoId);

    try {
      if (autoplay) {
        player.loadVideoById({
          videoId,
          startSeconds: 0,
        });
      } else {
        player.cueVideoById({
          videoId,
          startSeconds: 0,
        });
      }

      if (autoplay) {
        youtubeEngine.setPlaying(true);
      }
    } catch (error) {
      console.error("Failed to load next YouTube video:", error);
    }
  }, [videoId, autoplay]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
    />
  );
}
