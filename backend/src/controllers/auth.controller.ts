import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService"
import { asyncHandler } from "../middlewares/asyncHandler"

export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body)
  const user = await AuthService.register(firstName, lastName, email, password);
  res.status(201).json({ status: 'success', data: user.id });
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { token } = await AuthService.login(email, password);
  res.status(200).json({ status: 'success', data: token });
});
