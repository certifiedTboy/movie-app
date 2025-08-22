import { Request, Response, NextFunction } from "express";
import { CustomException } from "./custom-exception";

export const globalErrorHandler = (
  err: CustomException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ status: statusCode, message });
};
