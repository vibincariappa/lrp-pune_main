require("dotenv").config();
const prisma = require("../config/db");

const initialData = [
  // Metric cards (Pillar 0)
  { pillar: 0, key: "familiesSupported", value: "1240" },
  { pillar: 0, key: "studentsBenefited", value: "3500" },
  { pillar: 0, key: "trainingParticipants", value: "850" },
  { pillar: 0, key: "healthBeneficiaries", value: "4200" },
  { pillar: 0, key: "employmentAssistance", value: "620" },

  // Pillars reach (Pillar 1 to 6)
  { pillar: 1, key: "reach", value: "85" },
  { pillar: 2, key: "reach", value: "92" },
  { pillar: 3, key: "reach", value: "74" },
  { pillar: 4, key: "reach", value: "98" },
  { pillar: 5, key: "reach", value: "68" },
  { pillar: 6, key: "reach", value: "82" },

  // Additional names if needed
  { pillar: 1, key: "title", value: "Institution Building" },
  { pillar: 2, key: "title", value: "Accessibility" },
  { pillar: 3, key: "title", value: "Govt. Convergence" },
  { pillar: 4, key: "title", value: "Health" },
  { pillar: 5, key: "title", value: "Employment" },
  { pillar: 6, key: "title", value: "Skill Building" }
];

async function seed() {
  console.log("Seeding database...");
  for (const item of initialData) {
    await prisma.pillarData.upsert({
      where: {
        pillar_key: {
          pillar: item.pillar,
          key: item.key
        }
      },
      update: {
        value: item.value
      },
      create: {
        pillar: item.pillar,
        key: item.key,
        value: item.value
      }
    });
  }
  console.log("Database seeded successfully!");
}

seed()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
