export type EraId = "1970s" | "1980s" | "1990s" | "2000s" | "2010s" | "2020s";

export type SimpleEraId = "old" | "new";

export type LanguageEraId = EraId | SimpleEraId;

export interface Era {
  id: LanguageEraId;
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

  /*
   * Hindi uses:
   * 1970s / 1980s / 1990s / 2000s / 2010s / 2020s
   *
   * Other languages can use:
   * old / new
   */
  eraId: LanguageEraId;

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
    id: LanguageEraId;
    label: string;
    startYear: number;
    endYear: number;
    artwork: string;
  };

  songs: Song[];
  total: number;
}
