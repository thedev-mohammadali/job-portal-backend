import { ErrorRequestHandler } from "express";
import status from "http-status";
import env from "../config/env";
import AppError from "../utils/AppError";

const development = env.nodeEnv === "development";

const globalErrorHanlder: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  _next,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errorStack: development ? error.stack : undefined,
    });
  }

  if (error instanceof Error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: development ? error.message : "Something went wrong",
      errorStack: development ? error.stack : undefined,
    });
  }

  return res.status(status.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong",
  });
};

export default globalErrorHanlder;
