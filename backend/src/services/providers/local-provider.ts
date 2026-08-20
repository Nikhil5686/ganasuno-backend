import type { MusicProvider, PlaybackSource } from "../../types/provider.js";
import type { Song } from "../../types/song.js";

const DEFAULT_DEV_AUDIO_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export class LocalMusicProvider implements MusicProvider {
  public readonly name = "local" as const;

  public async getTrack(_providerId: string): Promise<Partial<Song> | null> {
    return null;
  }

  public async getPlaybackSource(song: Song): Promise<PlaybackSource> {
    return {
      type: "audio",
      url: song.audioUrl || DEFAULT_DEV_AUDIO_URL,
      mimeType: "audio/mpeg",
    };
  }

  public async isAvailable(): Promise<boolean> {
    return true;
  }
}
