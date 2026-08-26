"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import type { Song } from "@/types/music";

import dynamic from "next/dynamic";

import { formatAudioTime } from "@/lib/audio/engine";
import { useYoutubeAudio, youtubeEngine } from "@/lib/audio/youtube-engine";

import { useFavorites } from "@/hooks/use-favorites";

import {
  DEFAULT_PLAYER_THEME,
  type PlayerThemeConfig,
} from "@/lib/player/theme";

const YoutubePlayer = dynamic(() => import("@/components/youtube-player"), {
  ssr: false,
});

type MusicPlayerProps = {
  song: Song | null;
  hasSongs: boolean;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
  eraArtwork?: string;
  themeConfig?: PlayerThemeConfig;
  eraQueue: Song[];
};

export default function MusicPlayer({
  song,
  eraQueue,
  hasSongs,
  isLoading,
  onPrevious,
  onNext,
  eraArtwork = "/eras/1990s.png",
  themeConfig = DEFAULT_PLAYER_THEME,
}: MusicPlayerProps) {
  const { state, togglePlay, seek, toggleMute } = useYoutubeAudio();

  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);

  const { isFavorite, toggleFavorite } = useFavorites();

  const canInteract = Boolean(song) && hasSongs;
  const isFav = isFavorite(song?.id);
  const accent = themeConfig.accentColor;

  const duration = state.duration;

  const hasDuration = duration > 0 && Number.isFinite(duration);

  /*
   * Keep current time inside the actual YouTube duMusicration.
   */
  const clampedCurrentTime = useMemo(() => {
    if (hasDuration) {
      return Math.min(Math.max(state.currentTime, 0), duration);
    }

    return Math.max(state.currentTime, 0);
  }, [state.currentTime, duration, hasDuration]);

  /*
   * Calculate timeline percentage.
   */
  const progressPercent = useMemo(() => {
    if (!hasDuration) {
      return 0;
    }

    return Math.min(100, Math.max(0, (clampedCurrentTime / duration) * 100));
  }, [clampedCurrentTime, duration, hasDuration]);

  /*
   * ================================================================
   * LOAD PLAYBACK WHEN SONG CHANGES
   * ================================================================
   */
  useEffect(() => {
    if (!song) {
      setYoutubeVideoId(null);
      youtubeEngine.clearPlayer();
      return;
    }

    if (song.provider === "youtube" && song.providerId) {
      console.log("Loading YouTube video:", song.providerId);

      setYoutubeVideoId(song.providerId);

      youtubeEngine.load(song.providerId, song.startTime ?? 0, true);

      setTimeout(() => {
        youtubeEngine.play();
      }, 150);

      youtubeEngine.setMediaMetadata(
        song.title,
        song.artist ?? "GanaSuno",
        song.thumbnailUrl ?? "/icons/icon-512.png",
      );
    } else {
      console.warn("No playable source found:", song);

      setYoutubeVideoId(null);
      youtubeEngine.clearPlayer();
    }
  }, [song]);

  /*
   * ================================================================
   * CLEAR PLAYER WHEN THERE IS NO SONG
   * ================================================================
   */
  useEffect(() => {
    if (!song) {
      setYoutubeVideoId(null);
      youtubeEngine.clearPlayer();
    }
  }, [song]);

  useEffect(() => {
    const handleNext = () => {
      onNext();
    };

    window.addEventListener("ganasuno-next", handleNext);

    return () => {
      window.removeEventListener("ganasuno-next", handleNext);
    };
  }, [onNext]);

  /*
   * Album artwork.
   */
  const coverImage = song?.thumbnailUrl || eraArtwork;

  /*
   * Duration label.
   */
  const durationLabel = hasDuration ? formatAudioTime(duration) : "0:00";

  return (
    <section
      aria-label="Music player"
      className="frosted-player relative mx-auto flex h-[100px] min-h-[96px] w-full max-w-[500px] items-center gap-2.5 rounded-2xl p-2.5 text-stone-100 sm:gap-3 sm:p-3"
      style={
        {
          "--player-accent": accent,
          ...themeConfig.glassStyle,
        } as React.CSSProperties
      }
    >
      {/* ============================================================
          ALBUM COVER
      ============================================================ */}

      <div
        className="relative h-[48px] w-[48px] shrink-0 overflow-hidden rounded-full border border-white/20 bg-stone-900 shadow-md sm:h-[52px] sm:w-[52px]"
        style={{
          boxShadow: `0 0 16px ${accent}22`,
        }}
      >
        <Image
          src={coverImage}
          alt={song ? `${song.title} artwork` : "Era artwork"}
          fill
          sizes="52px"
          className={`object-cover ${
            state.isPlaying ? "animate-[spin_18s_linear_infinite]" : ""
          }`}
        />

        <div className="absolute inset-0 z-10 m-auto h-2.5 w-2.5 rounded-full border border-white/30 bg-black/80" />
      </div>

      {/* ============================================================
          SONG INFORMATION + TIMELINE
      ============================================================ */}

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <div>
          {isLoading && (
            <div className="mb-1 flex items-center gap-1.5 text-[9px] text-stone-400">
              <span className="h-2.5 w-2.5 animate-spin rounded-full border border-stone-400 border-t-transparent" />
              Loading
            </div>
          )}
          <h2 className="truncate text-xs font-semibold tracking-wide text-stone-100">
            {isLoading
              ? "Please wait..."
              : song
                ? song.title
                : "No songs available"}
          </h2>

          <p className="truncate text-[10px] text-stone-400">
            {isLoading
              ? "Songs are loading..."
              : song
                ? song.artist
                : "Try selecting another era"}
          </p>
        </div>

        {/* ========================================================
            TIMELINE
        ======================================================== */}

        <input
          aria-label="Seek position"
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={progressPercent}
          disabled={!canInteract || !hasDuration}
          onChange={(event) => {
            if (!hasDuration) {
              return;
            }

            const percentage = Number(event.target.value) / 100;

            const newTime = percentage * duration;

            seek(newTime);
          }}
          className="player-seek h-1 w-full cursor-pointer rounded-full disabled:cursor-not-allowed"
          style={
            {
              "--seek-progress": `${progressPercent}%`,
              "--seek-accent": accent,
            } as React.CSSProperties
          }
        />

        {/* ========================================================
            HIDDEN YOUTUBE PLAYER
        ======================================================== */}
        {youtubeVideoId && (
          <YoutubePlayer videoId={youtubeVideoId} autoplay onEnded={onNext} />
        )}

        {/* ========================================================
            TIME
        ======================================================== */}

        <div className="flex justify-between font-mono text-[9px] text-stone-400">
          <span>{formatAudioTime(clampedCurrentTime)}</span>

          <span>{durationLabel}</span>
        </div>
      </div>

      {/* ============================================================
    CONTROLS
============================================================ */}

      <div className="flex items-center gap-1.5">
        {/* ========================================================
      MUTE
  ======================================================== */}

        <button
          type="button"
          aria-label={state.muted ? "Unmute" : "Mute"}
          disabled={!canInteract}
          onClick={toggleMute}
          className="glass-control flex h-8 w-8 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            className="h-4 w-4 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {state.muted ? (
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73L19.73 21 21 19.73z" />
            ) : (
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            )}
          </svg>
        </button>

        {/* ========================================================
      PREVIOUS
  ======================================================== */}

        <TransportButton
          label="Previous song"
          onClick={onPrevious}
          disabled={!canInteract}
        >
          <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
        </TransportButton>

        {/* ========================================================
      PLAY / PAUSE — CENTER
  ======================================================== */}

        <button
          type="button"
          aria-label={state.isPlaying ? "Pause" : "Play"}
          disabled={!canInteract}
          onClick={() => {
            if (!youtubeVideoId) {
              return;
            }

            youtubeEngine.togglePlay();
          }}
          className="glass-play-btn flex h-11 w-11 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          {state.isPlaying ? (
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* ========================================================
      NEXT
  ======================================================== */}

        <TransportButton
          label="Next song"
          onClick={onNext}
          disabled={!canInteract}
        >
          <path d="m6 18 8.5-6L6 6v12zM16 6v12h2V6h-2z" />
        </TransportButton>

        {/* ========================================================
      FAVORITE
  ======================================================== */}

        <button
          type="button"
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          disabled={!canInteract}
          onClick={() => {
            if (song) {
              toggleFavorite(song.id);
            }
          }}
          className="glass-control flex h-8 w-8 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            className={`h-4 w-4 ${
              isFav ? "fill-current" : "fill-none stroke-current stroke-2"
            }`}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
    </section>
  );
}

/* ==========================================================================
   TRANSPORT BUTTON
========================================================================== */

function TransportButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="glass-control flex h-7 w-7 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-40 sm:h-8 sm:w-8"
    >
      <svg
        className="h-3.5 w-3.5 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {children}
      </svg>
    </button>
  );
}
