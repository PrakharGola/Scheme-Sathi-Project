import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);
  const status = err.status || 500;
  const message =
    err.code === "P1001"
      ? "Database is unavailable. Start PostgreSQL or use Docker Compose."
      : err.message || "Internal server error";
  res.status(status).json({ error: message });
}
