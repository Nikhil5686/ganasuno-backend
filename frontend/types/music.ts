export type EraId =
  | "1970s"
  | "1980s"
  | "1990s"
  | "2000s"
  | "2010s"
  | "2020s";

export interface Era {
  id: EraId;
  label: string;
  startYear?: number;
  endYear?: number;
  artwork?: string;
  image?: string;
}

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
  language: SongLanguage;
  year: number;
  eraId: EraId;
  thumbnailUrl?: string;
  provider?: MusicProviderType;
  providerId?: string;
  nostalgiaScore?: number;
  popularityScore?: number;
  historicalScore?: number;
  finalScore?: number;
  rank?: number;
  tier?: NostalgiaTier;
  isActive?: boolean;
  duration?: string;
  audioUrl?: string;
  startTime?: number;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  year: number;
  eraId: EraId;
  thumbnailUrl?: string;
  provider?: MusicProviderType;
  providerId?: string;
  nostalgiaScore?: number;
  popularityScore?: number;
  historicalScore?: number;
  finalScore?: number;
  rank?: number;
  tier?: NostalgiaTier;
  isActive?: boolean;
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
