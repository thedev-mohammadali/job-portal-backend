import status from "http-status";
import { UserRole } from "../generated/prisma/enums";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";

const authorize = (...requiredRoles: [UserRole, ...UserRole[]]) =>
  catchAsync(async (req, _res, next) => {
    if (!req.user) {
      throw new AppError(status.UNAUTHORIZED, "Please log in to continue");
    }

    if (!requiredRoles.includes(req.user.role)) {
      throw new AppError(
        status.FORBIDDEN,
        "You are not authorized to access this resource",
      );
    }

    next();
  });

export default authorize;
