import { Router } from "express";
import { check } from "../modules/eligibility/controller";

export const eligibilityRouter = Router();

eligibilityRouter.post("/check", check);
