import type { MusicProvider } from "../types/provider.js";
import type { MusicProviderType } from "../types/song.js";
import { LocalMusicProvider } from "./providers/local-provider.js";
import { YouTubeMusicProvider } from "./providers/youtube-provider.js";

const providers: Record<MusicProviderType, MusicProvider> = {
  local: new LocalMusicProvider(),
  youtube: new YouTubeMusicProvider(),

  // future
  spotify: new YouTubeMusicProvider(),
  licensed: new LocalMusicProvider(),
};

export function getMusicProvider(
  type: MusicProviderType
): MusicProvider {
  return providers[type];
}