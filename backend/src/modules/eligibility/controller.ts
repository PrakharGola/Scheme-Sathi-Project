import { Request, Response } from "express";
import { prisma } from "../../config/db";
import { sampleSchemes } from "../../data/sampleSchemes";
import { checkEligibility, EligibilityAnswers } from "../../services/eligibilityEngine";

export async function check(req: Request, res: Response) {
  const answers = req.body as EligibilityAnswers;

  const schemes = await prisma.scheme.findMany().catch(() => sampleSchemes);

  const results = checkEligibility(answers, schemes);

  const totalPotentialAnnualBenefit = results.reduce(
    (sum, s) => sum + s.potentialAnnualBenefit,
    0
  );

  const saved = await prisma.eligibilityResponse.create({
    data: {
      userId: (req as any).user?.id || null,
      answers: answers as any,
      matchedSchemes: results as any
    }
  }).catch(() => ({ id: "local-demo" }));

  return res.json({
    eligibleSchemes: results,
    summary: {
      totalPotentialAnnualBenefit,
      responseId: saved.id
    }
  });
}
