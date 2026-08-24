"use client";

import type { EraConfig } from "@/data/eras";

type EraSelectorProps = {
  eras: EraConfig[];
  selectedEraId: string;
  onSelectEra: (eraId: string) => void;
  disabledEraIds?: string[];
};

export default function EraSelector({
  eras,
  selectedEraId,
  onSelectEra,
  disabledEraIds = [],
}: EraSelectorProps) {
  // Remove duplicate era IDs while preserving the first occurrence.
  const uniqueEras = Array.from(
    new Map(eras.map((era) => [era.id, era])).values(),
  );

  return (
    <nav
      aria-label="Era selection timeline"
      className="w-full flex items-center justify-center"
    >
      <div className="timeline-scroll w-full overflow-x-auto py-1">
        <div className="flex min-w-max md:min-w-0 items-center justify-center gap-2 px-1 sm:gap-3 mx-auto">
          {uniqueEras.map((era) => {
            const isActive = era.id === selectedEraId;
            const isDisabled = disabledEraIds.includes(era.id);

            return (
              <button
                key={era.id}
                type="button"
                onClick={() => onSelectEra(era.id)}
                disabled={isDisabled}
                aria-pressed={isActive}
                className={`glass-control shrink-0 rounded-full px-3 py-1.5 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs uppercase tracking-[0.1em] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 focus-visible:outline-offset-2 ${
                  isActive ? "glass-control-active" : ""
                } ${isDisabled ? "cursor-not-allowed opacity-40" : ""}`}
              >
                {era.title}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
