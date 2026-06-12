export interface ImpactInput {
  households: number;
  currentAwareness: number;
  postAwareness: number;
  avgBenefit: number;
}

export function calculateImpact(input: ImpactInput) {
  const additionalBeneficiaries = Math.max(
    0,
    Math.round(input.households * ((input.postAwareness - input.currentAwareness) / 100))
  );

  return {
    additionalBeneficiaries,
    estimatedEconomicImpact: additionalBeneficiaries * input.avgBenefit
  };
}
