import { Router } from "express";
import { analytics, reports } from "../modules/admin/controller";
import { auth } from "../middleware/auth";

export const adminRouter = Router();

adminRouter.get("/analytics", auth("ADMIN"), analytics);
adminRouter.get("/reports", auth("ADMIN"), reports);
