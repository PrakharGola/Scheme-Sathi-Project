import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-in-prod",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173"
};
