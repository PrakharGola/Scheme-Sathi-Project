import { Request, Response, NextFunction } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";

const limiter = new RateLimiterMemory({
  points: 100,
  duration: 60
});

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await limiter.consume(req.ip || "global");
    return next();
  } catch {
    return res.status(429).json({ error: "Too many requests" });
  }
}
