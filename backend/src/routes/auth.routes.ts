import { Router } from "express";
import { login, me, register } from "../modules/auth/controller";
import { auth } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";

export const authRouter = Router();

authRouter.post("/register", asyncHandler(register));
authRouter.post("/login", asyncHandler(login));
authRouter.get("/me", auth(), asyncHandler(me));
