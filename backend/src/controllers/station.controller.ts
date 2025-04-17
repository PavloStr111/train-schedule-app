import { asyncHandler } from "../middlewares/asyncHandler";
import { StationService } from "../services/station.repository";

export const getStations = asyncHandler(async (_req, res) => {
    const stations = await StationService.getAllStations();
    res.status(200).json({ status: "success", data: stations });
  });