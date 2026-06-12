import { Router } from "express";
import { login, me, register } from "../modules/auth/controller";
import { auth } from "../middleware/auth";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", auth(), me);
