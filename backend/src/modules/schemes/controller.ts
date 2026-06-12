import { Request, Response } from "express";
import {
  createScheme,
  deleteScheme,
  getScheme,
  listSchemes,
  updateScheme
} from "./service";

export async function list(req: Request, res: Response) {
  const { search, state, category } = req.query as any;
  const schemes = await listSchemes({ search, state, category });
  return res.json(schemes);
}

export async function get(req: Request, res: Response) {
  const scheme = await getScheme(req.params.id);
  return res.json(scheme);
}

export async function create(req: Request, res: Response) {
  const scheme = await createScheme(req.body);
  return res.status(201).json(scheme);
}

export async function update(req: Request, res: Response) {
  const scheme = await updateScheme(req.params.id, req.body);
  return res.json(scheme);
}

export async function remove(req: Request, res: Response) {
  await deleteScheme(req.params.id);
  return res.status(204).send();
}
