import { ErrorRequestHandler } from "express";
import status from "http-status";

const globalErrorHanlder: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  _next,
) => {
  res.status(status.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: (error as Error).message,
    error: (error as Error).stack,
  });
};

export default globalErrorHanlder;
