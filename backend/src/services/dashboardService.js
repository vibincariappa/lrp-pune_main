const prisma = require("../config/db");

const getDashboardStats = async () => {
  const records = await prisma.pillarData.findMany();

  // Helper to extract key values
  const getVal = (pillar, key, defaultVal) => {
    const rec = records.find((r) => r.pillar === pillar && r.key === key);
    return rec ? rec.value : defaultVal;
  };

  // Metrics
  const metrics = {
    familiesSupported: {
      value: parseInt(getVal(0, "familiesSupported", "1240"), 10),
      trend: "+12%"
    },
    studentsBenefited: {
      value: parseInt(getVal(0, "studentsBenefited", "3500"), 10),
      trend: "+8%"
    },
    trainingParticipants: {
      value: parseInt(getVal(0, "trainingParticipants", "850"), 10),
      trend: "Steady"
    },
    healthBeneficiaries: {
      value: parseInt(getVal(0, "healthBeneficiaries", "4200"), 10),
      trend: "+15%"
    },
    employmentAssistance: {
      value: parseInt(getVal(0, "employmentAssistance", "620"), 10),
      trend: "+22%"
    }
  };

  // 6 Pillars reach
  const pillars = [
    {
      id: 1,
      title: getVal(1, "title", "Institution Building"),
      reach: parseInt(getVal(1, "reach", "85"), 10),
      icon: "account_tree"
    },
    {
      id: 2,
      title: getVal(2, "title", "Accessibility"),
      reach: parseInt(getVal(2, "reach", "92"), 10),
      icon: "accessible"
    },
    {
      id: 3,
      title: getVal(3, "title", "Govt. Convergence"),
      reach: parseInt(getVal(3, "reach", "74"), 10),
      icon: "hub"
    },
    {
      id: 4,
      title: getVal(4, "title", "Health"),
      reach: parseInt(getVal(4, "reach", "98"), 10),
      icon: "health_and_safety"
    },
    {
      id: 5,
      title: getVal(5, "title", "Employment"),
      reach: parseInt(getVal(5, "reach", "68"), 10),
      icon: "work_history"
    },
    {
      id: 6,
      title: getVal(6, "title", "Skill Building"),
      reach: parseInt(getVal(6, "reach", "82"), 10),
      icon: "school"
    }
  ];

  // Static/Fallback data for charts & map to keep the endpoint unified
  const charts = {
    programGrowth: [
      { name: "Q1 2022", assistance: 100, directSupport: 50 },
      { name: "Q3 2022", assistance: 400, directSupport: 180 },
      { name: "Q1 2023", assistance: 650, directSupport: 320 },
      { name: "Q3 2023", assistance: 980, directSupport: 490 },
      { name: "Q1 2024", assistance: 1240, directSupport: 620 }
    ],
    beneficiaryDistribution: [
      { name: "Vocational Skills", value: 42, color: "#002045" },
      { name: "Healthcare", value: 28, color: "#61abac" },
      { name: "Education", value: 18, color: "#ffb55c" },
      { name: "Direct Subsidy", value: 12, color: "#c4c6cf" }
    ]
  };

  const timeline = [
    {
      date: "March 2022",
      title: "Project Launch",
      description: "Initial survey completion and formalization of the Livelihood Restoration Plan with stakeholder consensus."
    },
    {
      date: "September 2022",
      title: "Community Hub Opening",
      description: "The first physical center for training and support established in the heart of the impacted zone."
    },
    {
      date: "August 2023",
      title: "First Graduation Ceremony",
      description: "Celebrating 200+ individuals completing their specialized vocational training programs."
    }
  ];

  const stories = [
    {
      name: "Lata's Journey",
      quote: "The program didn't just give me a skill; it gave me back my identity. Today, I employ three others from my community.",
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJbFF6NHT9TGX9cLykqHRmPF8xK3kK_ZakRmlnRGCgSPoiiQ8UJ1Zfj0_QmgiFZ-loFUspfq6D0An12MTpqFYzwztc1-iq4u0a8v8N8WhDS8P2H8lfJO5tLB9c40kZJElUbwSoE_n2jg71wr9pXgga8Zs1zWoDJecVXsEn3SGM_l_ziZAFc_qChoTaI27CQL6JpNEg57e3XdVOZL1c7qSOOOsiyXr_-ssNfMYNBBnHWa-kIq3q1nTao4gKwc3YFWlTtTy15XqAUMaf",
      imgAlt: "A dignified close-up portrait of a middle-aged Indian woman named Lata, smiling warmly at the camera within her boutique shop."
    },
    {
      name: "Rohan's New Horizon",
      quote: "Securing a job in the metro operations department was a dream I never thought possible before the assistance program.",
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4C61P4SVknLmsIXY7oRM-TGoSXTfuPY4D0fh-XWH4m4GcpV9Miu4qIspWNiH3-JfEB7BhyyQtyPUh8r2iI-H1Xp0-wpa3DuZO3eQN7rOlABBGHh6Z2QLyqi3I1vJ6ic287lxzFX9r7lU_buBbxUAiFdwrk5F35M9XcFCAurB22qnXrHRGtjmwfGU-pc6gwNHO0Zxf62-HlBol1ILndLAeI3zDi6CSEY8S0YwX9dLxzJGs3qFnL2BIRvt7ycrbVxpWJ3l5WXP9cjM2",
      imgAlt: "A portrait of a young Indian man in corporate attire standing confidently in Pune."
    },
    {
      name: "Priya's Education",
      quote: "The scholarship provided by Pune Metro has cleared the path for me to pursue engineering and give back to my city.",
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcf-ytZLVQCU80Cdv_6iOax9QBjqQTEY-cQ_d8kpmG4VrWAFRe13KNn0u798Or3CuXlJBsT2q9dPkNnw-l9-KEj45wEDGdozKKCbJI2HhZqh_XcUim6N3lcL0wYs2ucSiKgJNU__RJYEaJOcciLpF_SX5SbaPxrb837uUnZV-ht4qO35BzlFiIE6m3g6M0qXpou9WfGFBMLclAPhnkZsHPOh4Fj6NKxrQthKue7ubV3SpUAl9yvbzWOXcoBRxpYQ2edmiKH6oROsHg",
      imgAlt: "An image of a young Indian girl sitting at a desk with a laptop."
    }
  ];

  return {
    metrics,
    pillars,
    charts,
    timeline,
    stories
  };
};

module.exports = {
  getDashboardStats
};
