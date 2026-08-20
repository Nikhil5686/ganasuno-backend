import type { Express } from "express";

import eraRouter from "./eras.js";
import songRouter from "./songs.js";
import { youtubePlaylistService } from "../services/youtube-playlist-service.js";

export function registerRoutes(app: Express): void {
  app.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "ganasuno-backend",
    });
  });

  app.use("/api/eras", eraRouter);
  app.use("/api/songs", songRouter);

  // Temporary YouTube playlist test route
  app.get("/api/test/youtube-playlist", async (_req, res) => {
    try {
      const songs = await youtubePlaylistService.getPlaylistSongs(
        "PLgCV-sHZhmPJPm-4DPbNwC3UdonuURgcW",
      );

      res.json({
        language: "Hindi",
        era: "1970s",
        playlistId: "PLgCV-sHZhmPJPm-4DPbNwC3UdonuURgcW",
        total: songs.length,
        songs,
      });
    } catch (error) {
      console.error("YouTube playlist error:", error);

      res.status(500).json({
        error: "Failed to load YouTube playlist",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });
}
