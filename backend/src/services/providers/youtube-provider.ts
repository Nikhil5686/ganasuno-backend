import type { MusicProvider, PlaybackSource } from "../../types/provider.js";
import type { Song } from "../../types/song.js";

export class YouTubeMusicProvider implements MusicProvider {
  public readonly name = "youtube" as const;

  public async getTrack(providerId: string): Promise<Partial<Song> | null> {
    return {
      providerId,
      provider: "youtube",
    };
  }

  public async getPlaybackSource(song: Song): Promise<PlaybackSource> {
    if (!song.providerId) {
      throw new Error("YouTube video ID missing");
    }

    return {
      type: "youtube",
      videoId: song.providerId,
    };
  }

  public async isAvailable(): Promise<boolean> {
    return true;
  }
}
