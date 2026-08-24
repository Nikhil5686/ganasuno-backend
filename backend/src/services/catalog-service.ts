import { MUSIC_CATALOGS } from "../data/music-catalogs.js";
import type { CatalogEraId } from "../types/era.js";
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
    const normalizedLanguage = language.trim().toLowerCase();
    const normalizedEraId = eraId.trim().toLowerCase() as CatalogEraId;

    /*
     * Hindi uses the existing historical eras.
     * Other languages can use the simplified "old" / "new" catalog eras.
     */
    const isSimpleEra = normalizedEraId === "old" || normalizedEraId === "new";

    if (!isSimpleEra && !isValidEraId(normalizedEraId)) {
      return null;
    }

    /*
     * Historical era information exists only for the
     * existing 1970s–2020s eras.
     */
    const era = isSimpleEra ? null : getEraById(normalizedEraId);

    if (!isSimpleEra && !era) {
      return null;
    }

    const catalog = MUSIC_CATALOGS.find(
      (item) =>
        item.eraId === normalizedEraId &&
        item.language.toLowerCase() === normalizedLanguage,
    );

    const playlistId = catalog?.playlistId;

    let eraSongs: Song[];

    if (playlistId) {
      const playlistKey = `${normalizedLanguage}:${normalizedEraId}`;

      let cachedSongs = this.playlistSongs.get(playlistKey);

      if (!cachedSongs) {
        const playlistSongs =
          await youtubePlaylistService.getPlaylistSongs(playlistId);

        cachedSongs = playlistSongs.map(
          (song): Song => ({
            id: song.id,
            title: song.title,
            artist: song.artist ?? "Unknown Artist",
            movie: song.movie,
            language,
            year:
              normalizedEraId === "old"
                ? 2010
                : normalizedEraId === "new"
                  ? 2020
                  : era!.startYear,
            eraId: normalizedEraId,
            thumbnailUrl: song.thumbnailUrl,
            provider: "youtube",
            providerId: song.providerId,

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
          song.eraId === normalizedEraId &&
          song.language?.trim().toLowerCase() === normalizedLanguage,
      );
    }

    const ranked = rankSongs(eraSongs);

    /*
     * Simple eras don't have historical years or artwork yet.
     * We provide safe values until the frontend has dedicated
     * Old/New presentation metadata.
     */
    return {
      era: {
        id: normalizedEraId,
        label: isSimpleEra
          ? normalizedEraId === "old"
            ? "Old"
            : "New"
          : era!.label,
        startYear: era?.startYear ?? 0,
        endYear: era?.endYear ?? 0,
        artwork: era?.artwork ?? "",
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
