import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  create,
  get,
  list,
  remove,
  update
} from "../modules/schemes/controller";
import { asyncHandler } from "../utils/asyncHandler";

export const schemesRouter = Router();

schemesRouter.get("/", asyncHandler(list));
schemesRouter.get("/:id", asyncHandler(get));
schemesRouter.post("/", auth("ADMIN"), asyncHandler(create));
schemesRouter.put("/:id", auth("ADMIN"), asyncHandler(update));
schemesRouter.delete("/:id", auth("ADMIN"), asyncHandler(remove));
