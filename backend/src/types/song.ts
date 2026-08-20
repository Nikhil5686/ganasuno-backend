import type { EraId } from "./era.js";

export type MusicProviderType = "youtube" | "spotify" | "licensed" | "local";

export type NostalgiaTier = "iconic" | "most-loved" | "deep-nostalgia";

export type SongLanguage =
  | "Hindi"
  | "English"
  | "Bhojpuri"
  | "Gujarati"
  | "Haryanvi"
  | "Punjabi";
  
export interface Song {
  id: string;
  title: string;
  artist: string;
  movie?: string;
  album?: string;
  language?: string;
  genre?: string;
  year: number;
  eraId: EraId;
  thumbnailUrl?: string;
  provider: MusicProviderType;
  providerId?: string;
  nostalgiaScore: number;
  popularityScore: number;
  historicalScore: number;
  finalScore?: number;
  rank?: number;
  tier?: NostalgiaTier;
  isActive: boolean;
  duration?: string;
  audioUrl?: string;
  startTime?: number;
}

export interface EraSongsResponse {
  era: {
    id: EraId;
    label: string;
    startYear: number;
    endYear: number;
    artwork: string;
  };
  songs: Song[];
  total: number;
}
