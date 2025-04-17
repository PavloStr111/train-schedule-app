import { Request, Response, NextFunction } from "express";
import { TrainService } from "../services/train.repository";
import { asyncHandler } from "../middlewares/asyncHandler";

export const getTrains = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const trains = await TrainService.getAllTrains();
    res.status(200).json({ status: 'success', data: trains });
});

export const createTrain = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { trainNumber, direction, departureStationName, 
        arrivalStationName, departureTime, arrivalTime } = req.body;

    const train = await TrainService.createTrain(trainNumber, direction, departureStationName, 
        arrivalStationName, departureTime, arrivalTime);

    res.status(201).json({ status: 'success', data: train });

});

export const deleteTrain = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const trainId = Number(req.params.id);

    await TrainService.deleteTrain(trainId);

    res.status(200).json({ status: 'success', data: trainId });
});
