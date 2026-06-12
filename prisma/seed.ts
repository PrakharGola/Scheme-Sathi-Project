import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Basic admin
  const admin = await prisma.user.upsert({
    where: { phone: "9999999999" },
    update: {},
    create: {
      name: "Admin",
      phone: "9999999999",
      passwordHash:
        "$2b$10$dummydummydummydummydummydummydummydummyd", // replace with real hash
      language: "en",
      role: "ADMIN"
    }
  });

  console.log("Admin:", admin.phone);

  // Seed schemes (example for PM-KISAN and Ayushman Bharat)
  await prisma.scheme.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "PM-KISAN",
        slug: "pm-kisan",
        description:
          "Income support scheme for farmer families providing ₹6,000 per year in three equal installments.",
        eligibility:
          "Farmer families with cultivable landholding; excludes higher-income taxpayers and institutional landholders.",
        benefits: "₹6,000 per year direct benefit transfer.",
        documents: ["Aadhaar Card", "Bank Passbook", "Land Ownership Proof"],
        applicationProcess:
          "Online via official PM-KISAN portal or CSC; update Aadhaar and bank details; verification by local authorities.",
        officialLink: "[pmkisan.gov.in](https://pmkisan.gov.in/)",
        stateAvailability: ["ALL_INDIA"],
        category: "farmer"
      },
      {
        name: "Ayushman Bharat - PMJAY",
        slug: "ayushman-bharat",
        description:
          "Health insurance scheme providing cashless coverage up to ₹5 lakh per eligible family per year.",
        eligibility:
          "Poor and vulnerable families as per SECC database; specific deprivation and occupational categories.",
        benefits:
          "Cashless hospitalization up to ₹5 lakh per family per year at empanelled hospitals.",
        documents: ["Aadhaar Card", "Ration Card", "SECC ID (if available)"],
        applicationProcess:
          "Check eligibility on PMJAY portal or call helpline; visit CSC or empanelled hospital for e-card.",
        officialLink: "[pmjay.gov.in](https://pmjay.gov.in/)",
        stateAvailability: ["ALL_INDIA"],
        category: "health"
      }
    ]
  });

  console.log("Seed completed");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
