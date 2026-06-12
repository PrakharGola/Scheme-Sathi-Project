import { Router } from "express";
import { chat } from "../modules/chat/controller";

export const chatRouter = Router();

chatRouter.post("/", chat);
