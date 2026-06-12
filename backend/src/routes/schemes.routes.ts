import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  create,
  get,
  list,
  remove,
  update
} from "../modules/schemes/controller";

export const schemesRouter = Router();

schemesRouter.get("/", list);
schemesRouter.get("/:id", get);
schemesRouter.post("/", auth("ADMIN"), create);
schemesRouter.put("/:id", auth("ADMIN"), update);
schemesRouter.delete("/:id", auth("ADMIN"), remove);
