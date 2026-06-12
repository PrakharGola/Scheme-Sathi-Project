import { Request, Response } from "express";
import { registerUser, loginUser } from "./service";
import { prisma } from "../../config/db";

export async function register(req: Request, res: Response) {
  const { name, phone, password, language } = req.body;
  if (!name || !phone || !password || !language) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const result = await registerUser({ name, phone, password, language });
  return res.json(result);
}

export async function login(req: Request, res: Response) {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const result = await loginUser({ phone, password });
  return res.json(result);
}

export async function me(req: Request, res: Response) {
  const authUser = (req as any).user;
  if (!authUser) return res.status(401).json({ error: "Unauthorized" });

  const user = await prisma.user.findUnique({ where: { id: authUser.id } });
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json({ user });
}
