import { Response } from "express";

interface IResponseMetaData {
  page: number;
  limit: number;
  total: number;
}

interface ISendResponse<T> {
  success: boolean;
  message: string;
  meta?: IResponseMetaData;
  data?: T;
  errorStack?: string;
}

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  resData: ISendResponse<T>,
) => {
  return res.status(statusCode).json(resData);
};

export default sendResponse;
