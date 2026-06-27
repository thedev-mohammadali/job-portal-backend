import { Response } from "express";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface SuccessResponse<T> {
  statusCode: number;
  success: true;
  message: string;
  meta?: PaginationMeta;
  data?: T;
}

export interface ErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  errorStack?: string;
}

const sendResponse = <T>(
  res: Response,
  response: SuccessResponse<T> | ErrorResponse,
) => {
  const { statusCode, ...responseBody } = response;
  return res.status(statusCode).json(responseBody);
};

export default sendResponse;
