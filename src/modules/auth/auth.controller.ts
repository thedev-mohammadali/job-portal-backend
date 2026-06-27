import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RegisterRequest } from "./auth.interface";
import { authService } from "./auth.service";

const registerUser = catchAsync(async (req: RegisterRequest, res) => {
  const registeredUser = await authService.registerUser(req.body);

  sendResponse(res, status.CREATED, {
    success: true,
    message: "User created successfully",
    data: registeredUser,
  });
});

export const authController = {
  registerUser,
};
