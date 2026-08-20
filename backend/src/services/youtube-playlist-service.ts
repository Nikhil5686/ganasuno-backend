import { Innertube } from "youtubei.js";

export interface PlaylistSong {
  id: string;
  title: string;
  artist?: string;
  movie?: string;
  thumbnailUrl?: string;
  provider: "youtube";
  providerId: string;
}

class YouTubePlaylistService {
  private youtube: Innertube | null = null;

  private async getClient(): Promise<Innertube> {
    if (!this.youtube) {
      this.youtube = await Innertube.create();
    }

    return this.youtube;
  }

  public async getPlaylistSongs(playlistId: string): Promise<PlaylistSong[]> {
    if (!playlistId) {
      throw new Error("YouTube playlist ID is required");
    }

    const youtube = await this.getClient();

    const playlist = await youtube.getPlaylist(playlistId);

    const songs: PlaylistSong[] = [];

    for (const video of playlist.videos ?? []) {
      if (
        typeof video !== "object" ||
        video === null ||
        !("content_id" in video)
      ) {
        continue;
      }

      const videoId = video.content_id;

      if (typeof videoId !== "string" || !videoId) {
        continue;
      }

      let title = "Unknown Song";
      let artist: string | undefined;
      let movie: string | undefined;

      /*
       * LockupView metadata
       */
      if ("metadata" in video) {
        const metadata = video.metadata;

        if (metadata && typeof metadata === "object" && "title" in metadata) {
          const titleData = metadata.title;

          if (
            titleData &&
            typeof titleData === "object" &&
            "text" in titleData &&
            typeof titleData.text === "string"
          ) {
            title = titleData.text;
          }
        }
      }

      /*
       * Extract additional information from the
       * YouTube title when it is explicitly present.
       *
       * We do NOT guess release year here.
       */
      const titleParts = title
        .split("|")
        .map((part) => part.trim())
        .filter(Boolean);

      if (titleParts.length >= 2) {
        const possibleMovie = titleParts.find((part) =>
          /\b(song|film|movie|movie song)\b/i.test(part),
        );

        if (possibleMovie) {
          movie = possibleMovie;
        }
      }

      let thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

      if (
        "content_image" in video &&
        video.content_image &&
        typeof video.content_image === "object" &&
        "image" in video.content_image &&
        Array.isArray(video.content_image.image)
      ) {
        const image = video.content_image.image[0];

        if (
          image &&
          typeof image === "object" &&
          "url" in image &&
          typeof image.url === "string"
        ) {
          thumbnailUrl = image.url;
        }
      }

      songs.push({
        id: `youtube-${videoId}`,
        title,
        artist,
        movie,
        thumbnailUrl,
        provider: "youtube",
        providerId: videoId,
      });
    }

    return songs;
  }
}

export const youtubePlaylistService = new YouTubePlaylistService();
