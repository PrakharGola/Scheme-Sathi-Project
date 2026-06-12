import { Request, Response } from "express";
import { chatWithSchemes } from "../../services/ragEngine";

export async function chat(req: Request, res: Response) {
  const { message, language } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  const userId = (req as any).user?.id;

  const result = await chatWithSchemes({ message, language, userId });
  return res.json(result);
}
