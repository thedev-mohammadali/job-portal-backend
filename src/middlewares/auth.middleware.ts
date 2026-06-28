import status from "http-status";
import jwt from "jsonwebtoken";
import env from "../config/env";
import { prisma } from "../config/prisma";
import { JwtUserPayload } from "../types/auth.types";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";

const authenticate = catchAsync(async (req, _res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization?.split(" ")[1]
    : authorization;

  if (!token) {
    throw new AppError(status.UNAUTHORIZED, "Please log in to continue");
  }

  const decoded = jwt.verify(token, env.jwtAccessSecret) as JwtUserPayload;

  const authenticatedUser = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

  if (!authenticatedUser) {
    throw new AppError(status.UNAUTHORIZED, "Authentication failed");
  }

  if (!authenticatedUser.isActive) {
    throw new AppError(
      status.FORBIDDEN,
      "Account is inactive. Please contact support",
    );
  }

  req.user = authenticatedUser;

  next();
});

export default authenticate;
