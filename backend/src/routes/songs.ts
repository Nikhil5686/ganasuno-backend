import { Router } from "express";

import { getSongs, getSongPlayback } from "../controllers/song-controller.js";

const router = Router();

router.get("/", getSongs);

router.get("/:id/playback", getSongPlayback);

export default router;
