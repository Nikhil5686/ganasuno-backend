import type { Request, Response } from "express";
import { catalogService } from "../services/catalog-service.js";
import {
  ERAS,
  DEFAULT_ERA_ID,
  isValidEraId,
} from "../types/era.js";
import { getMusicProvider } from "../services/provider-manager.js";

export async function getSongs(req: Request, res: Response): Promise<void> {
  const eraParam = req.query.era as string | undefined;
  const languageParam = req.query.language as string | undefined;

  const eraId = eraParam || DEFAULT_ERA_ID;
  const language = languageParam || "Hindi";

  if (!isValidEraId(eraId)) {
    res.status(400).json({
      error: `Invalid era "${eraId}".`,
      validEras: [
        ...ERAS.map((e) => ({
          id: e.id,
          label: e.label,
        })),
        {
          id: "old",
          label: "Old",
        },
        {
          id: "new",
          label: "New",
        },
      ],
    });

    return;
  }

  const result = await catalogService.getSongsByEra(eraId, language);

  if (!result) {
    res.status(404).json({
      error: `Era "${eraId}" not found.`,
    });

    return;
  }

  res.json(result);
}

export async function getSongPlayback(
  req: Request,
  res: Response,
): Promise<void> {
  const songId = String(req.params.id);

  const song = catalogService.getSongById(songId);

  if (!song) {
    res.status(404).json({
      error: `Song "${songId}" not found.`,
    });

    return;
  }

  try {
    const provider = getMusicProvider(song.provider);

    const playbackSource = await provider.getPlaybackSource(song);

    res.json({
      songId: song.id,
      provider: song.provider,
      playback: playbackSource,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to generate playback source.",
    });
  }
}
