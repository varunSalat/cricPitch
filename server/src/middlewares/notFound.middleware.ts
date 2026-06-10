import { NextFunction, Request, Response } from "express";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};
