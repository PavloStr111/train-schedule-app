import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

/**
 * @desc    Handler for all global errors
 * @access  Public
 */
export const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {

  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  res.status(statusCode).json({
    statusCode: status,
    message: `Error: ${err.message}`
  });
};
