import { NextFunction, Response } from "express";
import status from "http-status";
import { RegisterRequest } from "./auth.interface";

const registerUser = (
  req: RegisterRequest,
  res: Response,
  next: NextFunction,
) => {
  const { email, password, role } = req.body;
  res.status(status.CREATED).json({
    success: true,
    message: "User created successfully",
    data: req.body,
  });
};

export const authController = {
  registerUser,
};
