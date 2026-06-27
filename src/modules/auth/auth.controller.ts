import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import type { LoginRequest, RegisterRequest } from "./auth.interface";
import { authService } from "./auth.service";

const registerUser = catchAsync(async (req: RegisterRequest, res) => {
  const registeredUser = await authService.registerUser(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "User created successfully",
    data: registeredUser,
  });
});

const loginUser = catchAsync(async (req: LoginRequest, res) => {
  const loggedInUser = await authService.loginUser(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Log in successful",
    data: loggedInUser,
  });
});

export const authController = {
  registerUser,
  loginUser,
};
