import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import type { LoginRequest, RegisterRequest } from "./auth.interface";
import { authService } from "./auth.service";
import { refreshCookieOptions } from "./cookie.utils";

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
  const { refreshToken, ...loginData } = await authService.loginUser(req.body);

  res.cookie("refreshToken", refreshToken, refreshCookieOptions);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Log in successful",
    data: loginData,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const accessToken = await authService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Token refreshed successfully",
    data: accessToken,
  });
});

const logoutUser = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  await authService.logoutUser(refreshToken);

  res.clearCookie("refreshToken", refreshCookieOptions);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Logged out successfully",
  });
});

export const authController = {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
};
