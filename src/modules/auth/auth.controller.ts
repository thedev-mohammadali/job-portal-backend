import { NextFunction, Response } from "express";
import status from "http-status";
import { RegisterRequest } from "./auth.interface";
import { authService } from "./auth.service";

const registerUser = async (
  req: RegisterRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const registeredUser = await authService.registerUser(req.body);

    res.status(status.CREATED).json({
      success: true,
      message: "User created successfully",
      data: registeredUser,
    });
  } catch (error: any) {
    console.error(error);
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  registerUser,
};
