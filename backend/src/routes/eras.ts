import { Router } from "express";
import { getEras } from "../controllers/era-controller.js";

const router = Router();

router.get("/", getEras);

export default router;
