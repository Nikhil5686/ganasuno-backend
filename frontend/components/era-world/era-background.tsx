"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { EraConfig } from "@/data/eras";
import EraObjectLayer from "./era-object-layer";

type EraBackgroundProps = {
  selectedEra: EraConfig;
  previousEra: EraConfig | null;
  isTransitioning: boolean;
  overlayStyle?: CSSProperties;
  activeObjectAction?: string | null;
};

const VIDEO_BACKGROUNDS: Record<string, string> = {
  "1970s": "/eras/1970s.mp4",
  "1980s": "/eras/1980s.mp4",
  "1990s": "/eras/1990s.mp4",
  "2000s": "/eras/2000s.mp4",
  "2010s": "/eras/2010s.mp4",
  "2020s": "/eras/2020s.mp4",
};

export default function EraBackground({
  selectedEra,
  previousEra,
  isTransitioning,
  overlayStyle,
  activeObjectAction,
}: EraBackgroundProps) {
  const selectedVideo = VIDEO_BACKGROUNDS[selectedEra.id];

  const previousVideo = previousEra
    ? VIDEO_BACKGROUNDS[previousEra.id]
    : undefined;

  const currentVideoRef = useRef<HTMLVideoElement | null>(null);

  const nextVideoRef = useRef<HTMLVideoElement | null>(null);

  const [nextVideoReady, setNextVideoReady] = useState(false);

  /*
   * Load the selected video into the hidden layer.
   */
  useEffect(() => {
    setNextVideoReady(false);

    const video = nextVideoRef.current;

    if (!video || !selectedVideo) {
      return;
    }

    video.src = selectedVideo;
    video.load();

    const handleCanPlay = () => {
      setNextVideoReady(true);

      video.play().catch(() => {
        // Muted autoplay should normally be allowed.
      });
    };

    video.addEventListener("canplay", handleCanPlay, { once: true });

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [selectedVideo]);

  /*
   * Once the next video is ready, make it the current
   * video and pause the old layer after the transition.
   */
  useEffect(() => {
    if (!nextVideoReady) {
      return;
    }

    const current = currentVideoRef.current;
    const next = nextVideoRef.current;

    if (!next) {
      return;
    }

    next.play().catch(() => {});

    const timeout = window.setTimeout(() => {
      if (current) {
        current.pause();
      }
    }, 700);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [nextVideoReady]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Previous/static fallback */}
      {previousEra && previousVideo ? (
        <video
          src={previousVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className={`era-bg-layer object-cover ${
            isTransitioning ? "era-bg-out" : "era-bg-hidden"
          }`}
        />
      ) : previousEra ? (
        <Image
          src={previousEra.world.background}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className={`era-bg-layer object-cover ${
            isTransitioning ? "era-bg-out" : "era-bg-hidden"
          }`}
        />
      ) : null}

      {/* Current video layer */}
      {selectedVideo ? (
        <>
          <video
            ref={currentVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className={`era-bg-layer object-cover ${
              nextVideoReady ? "era-bg-hidden" : "era-bg-visible"
            }`}
          />

          {/* Next video layer */}
          <video
            ref={nextVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className={`era-bg-layer object-cover ${
              nextVideoReady ? "era-bg-visible" : "era-bg-hidden"
            }`}
          />
        </>
      ) : (
        <Image
          src={selectedEra.world.background}
          alt={selectedEra.world.scene || `${selectedEra.title} era artwork`}
          fill
          priority
          sizes="100vw"
          className="era-bg-layer object-cover era-bg-visible"
        />
      )}

      {/* Main dark gradient */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/50"
        aria-hidden="true"
      />

      {/* Era-specific overlay */}
      {overlayStyle ? (
        <div
          className={`era-bg-overlay pointer-events-none absolute inset-0 ${
            isTransitioning ? "era-bg-overlay-fade" : ""
          }`}
          style={overlayStyle}
          aria-hidden="true"
        />
      ) : null}

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_30%,rgba(0,0,0,0.4)_100%)]"
        aria-hidden="true"
      />

      <EraObjectLayer activeObjectAction={activeObjectAction} />
    </div>
  );
}
