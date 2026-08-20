import type { Song, NostalgiaTier } from "../types/song.js";
import { getEraById } from "../types/era.js";
import { RANKING_WEIGHTS, type RankingWeights } from "../config/ranking.js";

/**
 * Validates whether a song's release year is within the bounds of its assigned era.
 * e.g., song.year = 1995 with eraId = "1990s" (1990–1999) is valid.
 * song.year = 1985 with eraId = "1990s" is invalid.
 */
export function validateSongEra(song: Pick<Song, "year" | "eraId" | "title">): {
  valid: boolean;
  error?: string;
} {
  const era = getEraById(song.eraId);
  if (!era) {
    return {
      valid: false,
      error: `Unknown eraId "${song.eraId}" for song "${song.title}".`,
    };
  }

  if (song.year < era.startYear || song.year > era.endYear) {
    return {
      valid: false,
      error: `Song "${song.title}" (${song.year}) falls outside ${era.label} bounds (${era.startYear}–${era.endYear}).`,
    };
  }

  return { valid: true };
}

/**
 * Computes the normalized final nostalgia score (0–100) using weighted criteria:
 * finalScore = (nostalgiaScore * 0.50) + (historicalScore * 0.30) + (popularityScore * 0.20)
 */
export function calculateFinalScore(
  song: Pick<Song, "nostalgiaScore" | "historicalScore" | "popularityScore">,
  weights: RankingWeights = RANKING_WEIGHTS
): number {
  const rawScore =
    song.nostalgiaScore * weights.nostalgia +
    song.historicalScore * weights.historical +
    song.popularityScore * weights.popularity;

  // Clamp to 0..100 and round to 1 decimal place
  const clamped = Math.max(0, Math.min(100, rawScore));
  return Math.round(clamped * 10) / 10;
}

/**
 * Derives the nostalgia tier from the calculated score if not explicitly set.
 * Metadata only — iconic (>= 90), most-loved (>= 80), deep-nostalgia (< 80).
 */
export function deriveTier(score: number): NostalgiaTier {
  if (score >= 90) return "iconic";
  if (score >= 80) return "most-loved";
  return "deep-nostalgia";
}

/**
 * Ranks an array of songs for an era:
 * 1. Validates year bounds against era
 * 2. Computes finalScore
 * 3. Assigns tier
 * 4. Sorts descending by finalScore
 * 5. Assigns rank (1, 2, 3...)
 */
export function rankSongs(songs: Song[]): Song[] {
  const processed = songs
    .filter((song) => song.isActive)
    .map((song) => {
      const validation = validateSongEra(song);
      if (!validation.valid) {
        console.warn(`[RankingEngine Warning]: ${validation.error}`);
      }

      const finalScore = song.finalScore ?? calculateFinalScore(song);
      const tier = song.tier ?? deriveTier(finalScore);

      return {
        ...song,
        finalScore,
        tier,
      };
    });

  // Sort descending by finalScore
  processed.sort((a, b) => (b.finalScore ?? 0) - (a.finalScore ?? 0));

  // Assign 1-based ranks
  return processed.map((song, index) => ({
    ...song,
    rank: index + 1,
  }));
}
