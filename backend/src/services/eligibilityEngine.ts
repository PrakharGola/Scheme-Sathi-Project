import { Scheme } from "@prisma/client";

export interface EligibilityAnswers {
  age: number;
  gender: "male" | "female" | "other";
  state: string;
  occupation: string;
  annualIncome: number;
  isFarmer: boolean;
  isDisabled: boolean;
  isStudent: boolean;
  maritalStatus: string;
  familySize: number;
}

interface EligibilityResult {
  schemeId: string;
  name: string;
  priorityScore: number;
  reasons: string[];
  requiredDocuments: string[];
  potentialAnnualBenefit: number;
}

export function checkEligibility(
  answers: EligibilityAnswers,
  schemes: Scheme[]
): EligibilityResult[] {
  const results: EligibilityResult[] = [];

  for (const scheme of schemes) {
    let score = 0;
    const reasons: string[] = [];

    const eligibility = (scheme.eligibility || "").toLowerCase();
    const benefits = scheme.benefits || "";

    if (answers.isFarmer && eligibility.includes("farmer")) {
      score += 0.3;
      reasons.push("You are a farmer.");
    }

    if (eligibility.includes("women") && answers.gender === "female") {
      score += 0.2;
      reasons.push("You are a woman beneficiary.");
    }

    if (
      eligibility.includes("student") &&
      answers.isStudent
    ) {
      score += 0.2;
      reasons.push("You are a student.");
    }

    if (eligibility.includes("senior") && answers.age >= 60) {
      score += 0.2;
      reasons.push("You are a senior citizen.");
    }

    if (answers.annualIncome <= 300000 && eligibility.includes("bpl")) {
      score += 0.3;
      reasons.push("Your income is below BPL threshold.");
    }

    if (
      Array.isArray(scheme.stateAvailability) &&
      scheme.stateAvailability.includes(answers.state)
    ) {
      score += 0.2;
      reasons.push("Scheme is available in your state.");
    }

    if (score > 0.3) {
      const requiredDocuments = scheme.documents || [];
      const potentialAnnualBenefit =
        extractAnnualBenefitFromBenefits(benefits) || 0;
      results.push({
        schemeId: scheme.id,
        name: scheme.name,
        priorityScore: Number(score.toFixed(2)),
        reasons,
        requiredDocuments,
        potentialAnnualBenefit
      });
    }
  }

  return results.sort((a, b) => b.priorityScore - a.priorityScore);
}

function extractAnnualBenefitFromBenefits(benefits: string): number | null {
  const match = benefits.replace(/,/g, "").match(/(?:Rs\.?|INR|₹)\s*(\d+)/i);
  if (!match) return null;
  return Number(match[1]) || null;
}
