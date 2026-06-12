import { Router } from "express";
import { chat } from "../modules/chat/controller";
import { asyncHandler } from "../utils/asyncHandler";

export const chatRouter = Router();

chatRouter.post("/", asyncHandler(chat));
