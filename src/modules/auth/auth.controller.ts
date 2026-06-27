import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { RegisterRequest } from "./auth.interface";
import { authService } from "./auth.service";

const registerUser = catchAsync(async (req: RegisterRequest, res) => {
  const registeredUser = await authService.registerUser(req.body);

  res.status(status.CREATED).json({
    success: true,
    message: "User created successfully",
    data: registeredUser,
  });
});

export const authController = {
  registerUser,
};
