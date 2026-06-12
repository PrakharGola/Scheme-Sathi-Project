import { Request, Response } from "express";
import { prisma } from "../../config/db";

export async function analytics(req: Request, res: Response) {
  const [userCount, eligibilityCount, conversationsCount] = await Promise.all([
    prisma.user.count(),
    prisma.eligibilityResponse.count(),
    prisma.conversation.count()
  ]);

  const langUsage = await prisma.conversation.groupBy({
    by: ["language"],
    _count: { _all: true }
  });

  return res.json({
    totalUsers: userCount,
    eligibilityChecks: eligibilityCount,
    totalConversations: conversationsCount,
    languageUsage: langUsage,
    mostAskedScheme: null
  });
}

export async function reports(_req: Request, res: Response) {
  const queries = await prisma.conversation.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });
  return res.json({ conversations: queries });
}
