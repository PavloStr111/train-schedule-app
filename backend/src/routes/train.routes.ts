import { Router } from "express";
import { getTrains, createTrain, deleteTrain } from "../controllers/train.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/")
    .get(authenticateJWT, getTrains)
    .post(authenticateJWT, createTrain);

router.route("/:id")
    .delete(authenticateJWT, deleteTrain);

export default router;
