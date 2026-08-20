import type { MusicProviderType, Song } from "./song.js";

export type PlaybackSource =
  | {
      type: "audio";
      url: string;
      mimeType?: string;
      expiresAt?: Date;
    }
  | {
      type: "youtube";
      videoId: string;
    }
  | {
      type: "spotify";
      trackId: string;
    };

export interface MusicProvider {
  readonly name: MusicProviderType;
  getTrack(providerId: string): Promise<Partial<Song> | null>;
  getPlaybackSource(song: Song): Promise<PlaybackSource>;
  isAvailable(): Promise<boolean>;
}
