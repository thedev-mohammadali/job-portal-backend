import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (controllerFunction: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
