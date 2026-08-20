export interface RankingWeights {
  /** Weight for curated era nostalgia and emotional resonance (0.0 to 1.0) */
  nostalgia: number;
  /** Weight for historical era significance and period representation (0.0 to 1.0) */
  historical: number;
  /** Weight for general cultural familiarity and popularity (0.0 to 1.0) */
  popularity: number;
}

/**
 * Centralized nostalgia scoring weights.
 * Total must sum to 1.0.
 *
 * finalScore = (nostalgiaScore * 0.50) + (historicalScore * 0.30) + (popularityScore * 0.20)
 */
export const RANKING_WEIGHTS: RankingWeights = {
  nostalgia: 0.50,
  historical: 0.30,
  popularity: 0.20,
} as const;
