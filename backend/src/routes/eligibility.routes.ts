import { Router } from "express";
import { check } from "../modules/eligibility/controller";
import { asyncHandler } from "../utils/asyncHandler";

export const eligibilityRouter = Router();

eligibilityRouter.post("/check", asyncHandler(check));
