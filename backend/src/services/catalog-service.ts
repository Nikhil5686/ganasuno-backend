import { MUSIC_CATALOGS } from "../data/music-catalogs.js";
import type { EraId } from "../types/era.js";
import { getEraById, isValidEraId } from "../types/era.js";
import type { Song, EraSongsResponse } from "../types/song.js";
import { rankSongs } from "./ranking-engine.js";
import { SONGS } from "../data/songs.js";
import { youtubePlaylistService } from "./youtube-playlist-service.js";

export class CatalogService {
  private songs: Song[];
  private playlistSongs = new Map<string, Song[]>();

  constructor(initialSongs: Song[] = SONGS) {
    this.songs = [...initialSongs];
  }

  public async getSongsByEra(
    eraId: string,
    language: string = "Hindi",
  ): Promise<EraSongsResponse | null> {
    if (!isValidEraId(eraId)) {
      return null;
    }

    const era = getEraById(eraId);

    if (!era) {
      return null;
    }

    const normalizedLanguage = language.trim().toLowerCase();

    const catalog = MUSIC_CATALOGS.find(
      (item) =>
        item.eraId === eraId &&
        item.language.toLowerCase() === normalizedLanguage,
    );

    const playlistId = catalog?.playlistId;

    let eraSongs: Song[];

    if (playlistId) {
      const playlistKey = `${normalizedLanguage}:${eraId}`;

      let cachedSongs = this.playlistSongs.get(playlistKey);

      if (!cachedSongs) {
        const playlistSongs =
          await youtubePlaylistService.getPlaylistSongs(playlistId);

        // existing mapping code...

        cachedSongs = playlistSongs.map(
          (song): Song => ({
            id: song.id,
            title: song.title,
            artist: song.artist ?? "Unknown Artist",
            movie: song.movie,
            language,
            year: era.startYear,
            eraId: era.id,
            thumbnailUrl: song.thumbnailUrl,
            provider: "youtube",
            providerId: song.providerId,

            // Neutral values until proper metadata
            // enrichment is implemented.
            nostalgiaScore: 0,
            popularityScore: 0,
            historicalScore: 0,

            isActive: true,
          }),
        );

        this.playlistSongs.set(playlistKey, cachedSongs);
      }

      eraSongs = cachedSongs;
    } else {
      eraSongs = this.songs.filter(
        (song) =>
          song.eraId === eraId &&
          song.language?.trim().toLowerCase() === normalizedLanguage,
      );
    }

    const ranked = rankSongs(eraSongs);

    return {
      era: {
        id: era.id,
        label: era.label,
        startYear: era.startYear,
        endYear: era.endYear,
        artwork: era.artwork,
      },
      songs: ranked,
      total: ranked.length,
    };
  }

  public getSongById(songId: string): Song | null {
    for (const songs of this.playlistSongs.values()) {
      const playlistSong = songs.find(
        (song) => song.id === songId && song.isActive,
      );

      if (playlistSong) {
        return playlistSong;
      }
    }

    const song = this.songs.find((s) => s.id === songId && s.isActive);

    return song ?? null;
  }
}

export const catalogService = new CatalogService();
