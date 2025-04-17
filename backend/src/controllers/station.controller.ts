import { asyncHandler } from "../middlewares/asyncHandler";
import { StationService } from "../services/station.repository";

/**
 * @route   POST /api/v1/stations
 * @desc    Gets all stations
 * @access  Public
 *
 * @returns {200} { status: 'success', data: stations }
 * @throws  {400} Validation Error
 */
export const getStations = asyncHandler(async (_req, res) => {
    const stations = await StationService.getAllStations();
    res.status(200).json({ status: "success", data: stations });
  });