import { Request, Response, NextFunction } from "express";
import { TrainService } from "../services/train.repository";
import { asyncHandler } from "../middlewares/asyncHandler";
import { AppError } from "../errors/AppError";

export const getTrains = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const trains = await TrainService.getAllTrains();
    res.status(200).json({ status: 'success', data: trains });
});

export const getTrain = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const train = await TrainService.getTrain(id);
    if (!train) 
        throw new AppError("Train not found", 404);
    res.status(200).json({ status: "success", data: train });
  });

  export const createTrain = asyncHandler(async (req, res) => {
    const { trainNumber, direction, departureStationName, arrivalStationName, departureTime, arrivalTime } = req.body;
    const train = await TrainService.createTrain(
      trainNumber,
      direction,
      departureStationName,
      arrivalStationName,
      new Date(departureTime),
      new Date(arrivalTime)
    );
    res.status(201).json({ status: "success", data: train });
  });

export const updateTrain = asyncHandler(async (req, res) => {
    console.log("\n\n\n")

    const id = Number(req.params.id);
    console.log("dhythytd")
    console.log(req.body)
    const { trainNumber, direction, departureStationName, arrivalStationName,
        departureTime, arrivalTime } = req.body;
    const updated = await TrainService.updateTrain(
      id,
      trainNumber,
      direction,
      departureStationName,
      arrivalStationName,
      new Date(departureTime),
      new Date(arrivalTime)
    );
    res.status(200).json({ status: "success", data: updated });
  });
  

export const deleteTrain = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const trainId = Number(req.params.id);

    await TrainService.deleteTrain(trainId);

    res.status(200).json({ status: 'success', data: trainId });
});
