import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { getStations } from "../controllers/station.controller";

const router = Router();

router.get("/", authenticateJWT, getStations);

export default router;
