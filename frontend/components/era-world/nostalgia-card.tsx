"use client";

import type { CSSProperties } from "react";

type NostalgiaCardProps = {
  eraLabel?: string;
  character: string;
  characterIcon?: string;
  quote: string;
  accentColor: string;
  glassStyle?: CSSProperties;
  isActive?: boolean;
};

export default function NostalgiaCard({
  eraLabel,
  character,
  characterIcon,
  quote,
  accentColor,
  glassStyle,
  isActive = false,
}: NostalgiaCardProps) {
  if (!character || !quote) {
    return null;
  }

  return (
    <aside
      aria-live="polite"
      className={`nostalgia-card mx-auto w-full max-w-md rounded-2xl border px-4 py-3 text-left transition-all duration-500 sm:px-5 sm:py-3.5 ${
        isActive ? "nostalgia-card-active" : ""
      }`}
      style={
        {
          "--nostalgia-accent": accentColor,
          ...glassStyle,
        } as CSSProperties
      }
    >
      {eraLabel ? (
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-stone-400/85 sm:text-[11px]">
          {eraLabel}
        </p>
      ) : null}

      <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-300/90 sm:text-xs">
        {characterIcon ? (
          <span aria-hidden="true" className="mr-1.5">
            {characterIcon}
          </span>
        ) : null}
        {character}
      </p>

      <p
        key={quote}
        className="nostalgia-quote text-[13px] leading-relaxed text-stone-100/90 sm:text-sm"
      >
        &ldquo;{quote}&rdquo;
      </p>
    </aside>
  );
}
