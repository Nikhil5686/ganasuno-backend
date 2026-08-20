import type { EraQuoteConfig } from "@/data/eras";

export type QuotePoolSource = EraQuoteConfig & {
  /** Runtime AI-generated quotes — injected by future services */
  runtime?: string[];
};

/**
 * Builds the full quote rotation pool from era config.
 * Order: primary → alternates → dynamic (config) → runtime (AI).
 */
export function buildQuotePool(source: QuotePoolSource): string[] {
  const pool = [
    source.primary,
    ...(source.alternates ?? []),
    ...(source.dynamic ?? []),
    ...(source.runtime ?? []),
  ].filter(Boolean);

  return pool.length > 0 ? pool : [""];
}

export function getNextQuoteIndex(
  currentIndex: number,
  poolLength: number
): number {
  if (poolLength <= 0) return 0;
  return (currentIndex + 1) % poolLength;
}

export function getQuoteAtIndex(
  pool: string[],
  index: number,
  fallback = ""
): string {
  return pool[index] ?? pool[0] ?? fallback;
}
