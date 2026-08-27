import type { CatalogEraId } from "../types/era.js";
import type { SongLanguage } from "../types/song.js";

export interface MusicCatalog {
  language: SongLanguage;
  eraId: CatalogEraId;
  playlistId: string;
}

export const MUSIC_CATALOGS: MusicCatalog[] = [
  // =========================
  // HINDI
  // =========================

  {
    language: "Hindi",
    eraId: "1970s",
    playlistId: "PLgCV-sHZhmPJPm-4DPbNwC3UdonuURgcW",
  },
  {
    language: "Hindi",
    eraId: "1980s",
    playlistId: "PLLounUW9rgqGDmPxbZBerszf0dBq_M93b",
  },
  {
    language: "Hindi",
    eraId: "1990s",
    playlistId: "PLMRKdK25AuPVjHl9Kdb-gkBy0Cm7Zi2xo",
  },
  {
    language: "Hindi",
    eraId: "2000s",
    playlistId: "PLjxsdvPZH24OZoxZSnuEqrW1crVtceCNG",
  },
  {
    language: "Hindi",
    eraId: "2010s",
    playlistId: "PLRv0QDUN0WEIcKOCpVtxU98AtJ2mxzXmG",
  },
  {
    language: "Hindi",
    eraId: "2020s",
    playlistId: "PLVJLDURxwO2tPCJxQjgfvwEo--JGjB3wu",
  },

  // =========================
  // BHOJPURI
  // =========================

  {
    language: "Bhojpuri",
    eraId: "old",
    playlistId: "PLZ9cT_s0Z8CU",
  },
  {
    language: "Bhojpuri",
    eraId: "new",
    playlistId: "PLCPhwaq_5EWM",
  },

  // Haryanvi

  {
    language: "Haryanvi",
    eraId: "old",
    playlistId: "PLB45HKYZKUqU",
  },
  {
    language: "Haryanvi",
    eraId: "new",
    playlistId: "PLavtZT2SgOqE",
  },

  // GUJARATI

  {
    language: "Gujarati",
    eraId: "old",
    playlistId: "PLKtkwA2ZzcVA",
  },
  {
    language: "Gujarati",
    eraId: "new",
    playlistId: "PLYWvXo0_rhX0",
  },

  // =========================
  // PUNJABI
  // =========================

  {
    language: "Punjabi",
    eraId: "old",
    playlistId: "PLIv91AJQiHbg",
  },

  {
    language: "Punjabi",
    eraId: "new",
    playlistId: "PLfUo87ZwllT4",
  },

  // =========================
  // ENGLISH
  // =========================
  {
    language: "English",
    eraId: "old",
    playlistId: "PLMT3zN-Us5L4",
  },
  {
    language: "English",
    eraId: "new",
    playlistId: "PLGA2vB0LgUV4",
  },
];
