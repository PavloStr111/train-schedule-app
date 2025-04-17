import { Router } from "express";
import { getTrains, createTrain, deleteTrain, getTrain, updateTrain } from "../controllers/train.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/")
  .get(authenticateJWT, getTrains)
  .post(authenticateJWT, createTrain);

router.route("/:id")
  .get(authenticateJWT, getTrain)
  .put(authenticateJWT, updateTrain)
  .delete(authenticateJWT, deleteTrain);



export default router;
