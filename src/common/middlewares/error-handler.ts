import { NextFunction, Request, Response } from 'express';

type ErrorWithStatus = Error & {
  statusCode?: number;
};

export const errorHandler = (
  err: ErrorWithStatus,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  void next;
  const statusCode = err.statusCode ?? 500;
  const message = statusCode === 500 ? 'Internal server error' : err.message;

  res.status(statusCode).json({
    success: false,
    message,
  });
};
