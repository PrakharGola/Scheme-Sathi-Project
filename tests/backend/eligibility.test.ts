import { checkEligibility } from "../../backend/src/services/eligibilityEngine";

describe("checkEligibility", () => {
  it("matches farmer schemes", () => {
    const results = checkEligibility(
      {
        age: 35,
        gender: "male",
        state: "UP",
        occupation: "farmer",
        annualIncome: 200000,
        isFarmer: true,
        isDisabled: false,
        isStudent: false,
        maritalStatus: "married",
        familySize: 4
      },
      [
        {
          id: "1",
          name: "PM-KISAN",
          slug: "pm-kisan",
          description: "",
          eligibility: "farmer bpl",
          benefits: "Rs 6000 per year",
          documents: ["Aadhaar"],
          applicationProcess: "",
          officialLink: "",
          stateAvailability: ["UP"],
          category: "Agriculture",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    );

    expect(results[0].name).toBe("PM-KISAN");
    expect(results[0].potentialAnnualBenefit).toBe(6000);
  });
});
