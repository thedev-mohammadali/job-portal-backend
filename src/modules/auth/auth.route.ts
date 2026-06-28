import { Router } from "express";
import authenticate from "../../middlewares/auth.middleware";
import sendResponse from "../../utils/sendResponse";
import { authController } from "./auth.controller";

const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/test", authenticate, (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Success",
    data: req.user,
  });
});

export const authRoutes = router;
