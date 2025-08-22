import { Request, Response, NextFunction } from "express";

export const notFoundException = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    status: 404,
    message: `${req.originalUrl} endpoint does not exist on the api`,
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
};
