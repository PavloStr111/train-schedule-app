import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService"
import { asyncHandler } from "../middlewares/asyncHandler"

/**
 * @route   POST /api/v1/auth/register
 * @desc    Registration
 * @access  Public
 *
 * @returns {201} { status: 'success', data: userId }
 * @throws  {400} Validation Error
 */
export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body)
  const user = await AuthService.register(firstName, lastName, email, password);
  res.status(201).json({ status: 'success', data: user.id });
});

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login
 * @access  Public
 *
 * @returns {201} { status: 'success', data: userId }
 * @throws  {400} Validation Error
 */
export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { token } = await AuthService.login(email, password);
  res.status(200).json({ status: 'success', data: token });
});
