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
  return (
    <nav
      aria-label="Era selection timeline"
      className="w-full flex items-center justify-center"
    >
      {/* Horizontal scroll container on small screens, centered single row on desktop */}
      <div className="timeline-scroll w-full overflow-x-auto py-1">
        <div className="flex min-w-max md:min-w-0 items-center justify-center gap-2 px-1 sm:gap-3 mx-auto">
          {eras.map((era) => {
            const isActive = era.id === selectedEraId;

            return (
              <button
                key={era.id}
                type="button"
                onClick={() => onSelectEra(era.id)}
                aria-pressed={isActive}
                className={`glass-control shrink-0 rounded-full px-3 py-1.5 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs uppercase tracking-[0.1em] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 focus-visible:outline-offset-2 ${
                  isActive ? "glass-control-active" : ""
                }`}
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
