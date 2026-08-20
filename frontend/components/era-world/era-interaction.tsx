"use client";

import type { CSSProperties } from "react";

type EraInteractionProps = {
  label: string;
  accentColor: string;
  isActive?: boolean;
  onInteract: () => void;
};

export default function EraInteraction({
  label,
  accentColor,
  isActive = false,
  onInteract,
}: EraInteractionProps) {
  if (!label) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onInteract}
      aria-pressed={isActive}
      className={`era-interaction glass-control shrink-0 rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] sm:text-xs ${
        isActive ? "era-interaction-active" : ""
      }`}
      style={
        {
          "--interaction-accent": accentColor,
        } as CSSProperties
      }
    >
      {label}
    </button>
  );
}
