import { Router } from "express";
import authRoutes from "./auth.routes";
import trainRoutes from "./train.routes";
import stationRoutes from './station.routes';

const router = Router();

router.use("/auth", authRoutes);
router.use("/trains", trainRoutes);
router.use("/stations", stationRoutes);

export default router;
