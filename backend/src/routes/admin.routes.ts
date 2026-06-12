import { Router } from "express";
import { analytics, reports } from "../modules/admin/controller";
import { auth } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";

export const adminRouter = Router();

adminRouter.get("/analytics", auth("ADMIN"), asyncHandler(analytics));
adminRouter.get("/reports", auth("ADMIN"), asyncHandler(reports));
