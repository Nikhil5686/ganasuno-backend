import type { Request, Response } from "express";
import { ERAS, DEFAULT_ERA_ID } from "../types/era.js";

export function getEras(_req: Request, res: Response): void {
  res.json({
    eras: ERAS,
    defaultEraId: DEFAULT_ERA_ID,
    total: ERAS.length,
  });
}
