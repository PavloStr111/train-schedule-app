import { Request, Response, NextFunction } from "express";
import { TrainService } from "../services/train.repository";
import { asyncHandler } from "../middlewares/asyncHandler";
import { AppError } from "../errors/AppError";

/**
 * @route   GET /api/v1/trains
 * @desc    Gets all trains
 * @access  Public
 *
 * @returns {200} { status: 'success', data: trains }
 * @throws  {400} Validation Error
 */
export const getTrains = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const trains = await TrainService.getAllTrains();
    res.status(200).json({ status: 'success', data: trains });
});

/**
 * @route   POST /api/v1/train/:id
 * @desc    Gets train with an appropriate id
 * @access  Public
 *
 * @returns {201} { status: 'success', data: train }
 * @throws  {404} No train
 */
export const getTrain = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const train = await TrainService.getTrain(id);
    if (!train) 
        throw new AppError("Train not found", 404);
    res.status(200).json({ status: "success", data: train });
  });

  export const createTrain = asyncHandler(async (req, res) => {
    const { trainNumber, direction, departureStation, arrivalStation, departureTime, arrivalTime } = req.body;
    const train = await TrainService.createTrain(
      trainNumber,
      direction,
      departureStation,
      arrivalStation,
      new Date(departureTime),
      new Date(arrivalTime)
    );
    res.status(201).json({ status: "success", data: train });
  });

/**
 * @route   PUT /api/v1/train/:id
 * @desc    Updates an appropriate train
 * @access  Public
 *
 * @returns {200} { status: 'success', data: train }
 */
export const updateTrain = asyncHandler(async (req, res) => {

    const id = Number(req.params.id);

    const { trainNumber, direction, departureStation, arrivalStation,
        departureTime, arrivalTime } = req.body;
    const updated = await TrainService.updateTrain(
      id,
      trainNumber,
      direction,
      departureStation,
      arrivalStation,
      new Date(departureTime),
      new Date(arrivalTime)
    );
    res.status(200).json({ status: "success", data: updated });
  });
  
/**
 * @route   DELETE /api/v1/train/:id
 * @desc    Deletes an appropriate train
 * @access  Public
 *
 * @returns {200} { status: 'success', data: trainId }
 */
export const deleteTrain = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const trainId = Number(req.params.id);

    await TrainService.deleteTrain(trainId);

    res.status(200).json({ status: 'success', data: trainId });
});
