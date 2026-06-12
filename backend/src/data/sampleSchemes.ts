import { Scheme } from "@prisma/client";

export const sampleSchemes: Scheme[] = [
  {
    id: "sample-pm-kisan",
    name: "PM-KISAN",
    slug: "pm-kisan",
    description:
      "Income support scheme for farmer families providing financial assistance every year.",
    eligibility: "farmer bpl small marginal farmer",
    benefits: "Rs 6000 per year",
    documents: ["Aadhaar", "Land records", "Bank account details"],
    applicationProcess: "Apply through the PM-KISAN portal or local agriculture office.",
    officialLink: "https://pmkisan.gov.in/",
    stateAvailability: ["UP", "MH", "WB", "DL", "KA", "TN"],
    category: "Agriculture",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "sample-ayushman-bharat",
    name: "Ayushman Bharat PM-JAY",
    slug: "ayushman-bharat-pm-jay",
    description:
      "Health insurance cover for eligible low-income families at empanelled hospitals.",
    eligibility: "bpl low income vulnerable household",
    benefits: "Rs 500000 health cover per family per year",
    documents: ["Aadhaar", "Ration card", "PM-JAY card if available"],
    applicationProcess: "Check eligibility and visit an empanelled hospital or CSC.",
    officialLink: "https://pmjay.gov.in/",
    stateAvailability: ["UP", "MH", "WB", "DL", "KA", "TN"],
    category: "Health",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "sample-scholarship",
    name: "National Scholarship Portal",
    slug: "national-scholarship-portal",
    description:
      "Scholarship discovery and application platform for eligible students.",
    eligibility: "student bpl income scholarship",
    benefits: "Rs 10000 per year",
    documents: ["Aadhaar", "Income certificate", "Marksheets", "Bank account details"],
    applicationProcess: "Register and apply through the National Scholarship Portal.",
    officialLink: "https://scholarships.gov.in/",
    stateAvailability: ["UP", "MH", "WB", "DL", "KA", "TN"],
    category: "Education",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export function filterSampleSchemes(query: {
  search?: string;
  state?: string;
  category?: string;
}) {
  const search = query.search?.toLowerCase();
  const category = query.category?.toLowerCase();

  return sampleSchemes.filter((scheme) => {
    const matchesSearch =
      !search ||
      scheme.name.toLowerCase().includes(search) ||
      scheme.description.toLowerCase().includes(search);
    const matchesCategory = !category || scheme.category.toLowerCase() === category;
    const matchesState = !query.state || scheme.stateAvailability.includes(query.state);

    return matchesSearch && matchesCategory && matchesState;
  });
}
