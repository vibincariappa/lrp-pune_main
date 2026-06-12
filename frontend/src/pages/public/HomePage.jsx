import React, { useState } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import AnimatedCounter from "../../components/public/AnimatedCounter";
import ThreeHeroAnimation from "../../components/public/ThreeHeroAnimation";
import PillarShaderAnimation from "../../components/public/PillarShaderAnimation";
import PerformanceCharts from "../../components/public/PerformanceCharts";
import FootprintMap from "../../components/public/FootprintMap";

export default function HomePage() {
  const { data: dashResponse, isLoading, isError } = useDashboard();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fallback defaults in case backend is loading/erroring
  const defaultMetrics = {
    familiesSupported: { value: 1240, trend: "+12%" },
    studentsBenefited: { value: 3500, trend: "+8%" },
    trainingParticipants: { value: 850, trend: "Steady" },
    healthBeneficiaries: { value: 4200, trend: "+15%" },
    employmentAssistance: { value: 620, trend: "+22%" }
  };

  const defaultPillars = [
    { id: 1, title: "Institution Building", reach: 85, icon: "account_tree" },
    { id: 2, title: "Accessibility", reach: 92, icon: "accessible" },
    { id: 3, title: "Govt. Convergence", reach: 74, icon: "hub" },
    { id: 4, title: "Health", reach: 98, icon: "health_and_safety" },
    { id: 5, title: "Employment", reach: 68, icon: "work_history" },
    { id: 6, title: "Skill Building", reach: 82, icon: "school" }
  ];

  const defaultTimeline = [
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

  const defaultStories = [
    {
      name: "Lata's Journey",
      quote: "The program didn't just give me a skill; it gave me back my identity. Today, I employ three others from my community.",
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJbFF6NHT9TGX9cLykqHRmPF8xK3kK_ZakRmlnRGCgSPoiiQ8UJ1Zfj0_QmgiFZ-loFUspfq6D0An12MTpqFYzwztc1-iq4u0a8v8N8WhDS8P2H8lfJO5tLB9c40kZJElUbwSoE_n2jg71wr9pXgga8Zs1zWoDJecVXsEn3SGM_l_ziZAFc_qChoTaI27CQL6JpNEg57e3XdVOZL1c7qSOOOsiyXr_-ssNfMYNBBnHWa-kIq3q1nTao4gKwc3YFWlTtTy15XqAUMaf",
      imgAlt: "Lata boutique portrait"
    },
    {
      name: "Rohan's New Horizon",
      quote: "Securing a job in the metro operations department was a dream I never thought possible before the assistance program.",
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4C61P4SVknLmsIXY7oRM-TGoSXTfuPY4D0fh-XWH4m4GcpV9Miu4qIspWNiH3-JfEB7BhyyQtyPUh8r2iI-H1Xp0-wpa3DuZO3eQN7rOlABBGHh6Z2QLyqi3I1vJ6ic287lxzFX9r7lU_buBbxUAiFdwrk5F35M9XcFCAurB22qnXrHRGtjmwfGU-pc6gwNHO0Zxf62-HlBol1ILndLAeI3zDi6CSEY8S0YwX9dLxzJGs3qFnL2BIRvt7ycrbVxpWJ3l5WXP9cjM2",
      imgAlt: "Rohan corporate office"
    },
    {
      name: "Priya's Education",
      quote: "The scholarship provided by Pune Metro has cleared the path for me to pursue engineering and give back to my city.",
      imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcf-ytZLVQCU80Cdv_6iOax9QBjqQTEY-cQ_d8kpmG4VrWAFRe13KNn0u798Or3CuXlJBsT2q9dPkNnw-l9-KEj45wEDGdozKKCbJI2HhZqh_XcUim6N3lcL0wYs2ucSiKgJNU__RJYEaJOcciLpF_SX5SbaPxrb837uUnZV-ht4qO35BzlFiIE6m3g6M0qXpou9WfGFBMLclAPhnkZsHPOh4Fj6NKxrQthKue7ubV3SpUAl9yvbzWOXcoBRxpYQ2edmiKH6oROsHg",
      imgAlt: "Priya study room desktop"
    }
  ];

  // Resolve dynamic API values
  const apiData = dashResponse?.success ? dashResponse.data : null;
  const metrics = apiData?.metrics || defaultMetrics;
  const pillars = apiData?.pillars || defaultPillars;
  const timeline = apiData?.timeline || defaultTimeline;
  const stories = apiData?.stories || defaultStories;
  const growthData = apiData?.charts?.programGrowth;
  const distributionData = apiData?.charts?.beneficiaryDistribution;

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  // Premium Shimmer skeleton if loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-primary font-label-caps tracking-widest text-sm animate-pulse">
          Loading Pune Metro LRP System...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 h-20 flex justify-between items-center px-margin-mobile md:px-margin-desktop left-0 right-0 max-w-7xl mx-auto">
        <div className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
          Pune Metro Livelihood
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-gutter">
          <a
            onClick={(e) => handleScrollTo(e, "impact")}
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer"
            href="#impact"
          >
            Impact
          </a>
          <a
            onClick={(e) => handleScrollTo(e, "pillars")}
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer"
            href="#pillars"
          >
            Pillars
          </a>
          <a
            onClick={(e) => handleScrollTo(e, "timeline")}
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer"
            href="#timeline"
          >
            Stories
          </a>
          <a
            onClick={(e) => handleScrollTo(e, "performance")}
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer"
            href="#performance"
          >
            Performance
          </a>
          <a
            onClick={(e) => handleScrollTo(e, "map")}
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer"
            href="#map"
          >
            Map
          </a>
        </div>

        <div className="hidden md:block">
          <button
            onClick={(e) => handleScrollTo(e, "impact")}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-caps text-label-caps transition-all duration-300 hover:opacity-90 active:scale-95 cursor-pointer shadow-sm hover:shadow"
          >
            Explore Impact
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-primary p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-surface border-b border-outline-variant/30 flex flex-col p-6 space-y-4 md:hidden shadow-lg animate-fadeIn">
            <a
              onClick={(e) => handleScrollTo(e, "impact")}
              className="font-label-caps text-label-caps text-primary hover:opacity-85"
              href="#impact"
            >
              Impact
            </a>
            <a
              onClick={(e) => handleScrollTo(e, "pillars")}
              className="font-label-caps text-label-caps text-primary hover:opacity-85"
              href="#pillars"
            >
              Pillars
            </a>
            <a
              onClick={(e) => handleScrollTo(e, "timeline")}
              className="font-label-caps text-label-caps text-primary hover:opacity-85"
              href="#timeline"
            >
              Stories
            </a>
            <a
              onClick={(e) => handleScrollTo(e, "performance")}
              className="font-label-caps text-label-caps text-primary hover:opacity-85"
              href="#performance"
            >
              Performance
            </a>
            <a
              onClick={(e) => handleScrollTo(e, "map")}
              className="font-label-caps text-label-caps text-primary hover:opacity-85"
              href="#map"
            >
              Map
            </a>
            <button
              onClick={(e) => handleScrollTo(e, "impact")}
              className="w-full bg-primary text-on-primary py-3 rounded-lg font-label-caps text-label-caps"
            >
              Explore Impact
            </button>
          </div>
        )}
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[800px] md:min-h-[921px] flex flex-col md:flex-row items-center overflow-hidden px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto py-stack-lg gap-8">
          <div className="w-full md:w-1/2 z-10 space-y-stack-md text-left">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest font-bold">
              Resilience &amp; Empowerment
            </span>
            <h1 className="font-display-xl text-display-lg-mobile md:text-display-xl text-primary leading-tight font-bold">
              Pune Metro Livelihood Restoration Program
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Supporting Project Affected Families through sustainable community development, fostering long-term economic stability and social equity across the Pune Metro corridor.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={(e) => handleScrollTo(e, "impact")}
                className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label-caps text-label-caps transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                Explore Impact
              </button>
              <button
                onClick={(e) => handleScrollTo(e, "timeline")}
                className="border border-primary text-primary px-8 py-4 rounded-lg font-label-caps text-label-caps transition-all hover:bg-primary/5 cursor-pointer"
              >
                Watch Story
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[400px] md:h-[600px] relative">
            <ThreeHeroAnimation />
          </div>
        </section>

        {/* Live Impact Overview */}
        <section id="impact" className="bg-surface-container-low py-stack-lg border-y border-outline-variant/20 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop overflow-x-auto">
            <div className="flex gap-gutter min-w-max pb-4">
              {/* Metric Card 1 */}
              <div className="bg-surface border border-outline-variant/30 p-6 rounded-xl min-w-[240px] flex flex-col gap-2 shadow-sm">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Families Supported
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-md font-data-num text-primary text-3xl font-bold">
                    <AnimatedCounter value={metrics.familiesSupported.value} />
                  </span>
                  <span className="text-green-600 flex items-center text-sm font-data-num font-bold">
                    <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>{" "}
                    {metrics.familiesSupported.trend}
                  </span>
                </div>
              </div>

              {/* Metric Card 2 */}
              <div className="bg-surface border border-outline-variant/30 p-6 rounded-xl min-w-[240px] flex flex-col gap-2 shadow-sm">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Students Benefited
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-md font-data-num text-primary text-3xl font-bold">
                    <AnimatedCounter value={metrics.studentsBenefited.value} />
                  </span>
                  <span className="text-green-600 flex items-center text-sm font-data-num font-bold">
                    <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>{" "}
                    {metrics.studentsBenefited.trend}
                  </span>
                </div>
              </div>

              {/* Metric Card 3 */}
              <div className="bg-surface border border-outline-variant/30 p-6 rounded-xl min-w-[240px] flex flex-col gap-2 shadow-sm">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Training Participants
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-md font-data-num text-primary text-3xl font-bold">
                    <AnimatedCounter value={metrics.trainingParticipants.value} />
                  </span>
                  <span className="text-primary flex items-center text-sm font-data-num font-bold">
                    <span className="material-symbols-outlined text-sm mr-0.5">trending_flat</span>{" "}
                    {metrics.trainingParticipants.trend}
                  </span>
                </div>
              </div>

              {/* Metric Card 4 */}
              <div className="bg-surface border border-outline-variant/30 p-6 rounded-xl min-w-[240px] flex flex-col gap-2 shadow-sm">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Health Beneficiaries
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-md font-data-num text-primary text-3xl font-bold">
                    <AnimatedCounter value={metrics.healthBeneficiaries.value} />
                  </span>
                  <span className="text-green-600 flex items-center text-sm font-data-num font-bold">
                    <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>{" "}
                    {metrics.healthBeneficiaries.trend}
                  </span>
                </div>
              </div>

              {/* Metric Card 5 */}
              <div className="bg-surface border border-outline-variant/30 p-6 rounded-xl min-w-[240px] flex flex-col gap-2 shadow-sm">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Employment Assistance
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-md font-data-num text-primary text-3xl font-bold">
                    <AnimatedCounter value={metrics.employmentAssistance.value} />
                  </span>
                  <span className="text-green-600 flex items-center text-sm font-data-num font-bold">
                    <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>{" "}
                    {metrics.employmentAssistance.trend}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Six Pillars */}
        <section id="pillars" className="relative py-stack-lg overflow-hidden scroll-mt-20">
          <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
            <PillarShaderAnimation />
          </div>
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="text-center mb-stack-lg">
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4 font-bold">
                Strategic Pillars of Growth
              </h2>
              <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Focused interventions designed to create a self-sustaining ecosystem for impacted communities.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {pillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="bg-surface/60 backdrop-blur-sm border border-outline-variant/30 p-8 rounded-xl group hover:border-primary transition-all duration-300 text-left shadow-sm hover:shadow"
                >
                  <span className="material-symbols-outlined text-4xl text-primary mb-6 group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </span>
                  <h3 className="font-headline-sm text-primary mb-2 text-xl font-bold">
                    {pillar.title}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">
                      Target Reach
                    </span>
                    <span className="font-data-num text-primary font-bold">{pillar.reach}%</span>
                  </div>
                  <div className="w-full bg-surface-variant rounded-full h-1.5">
                    <div
                      className="bg-tertiary-container h-1.5 rounded-full transition-all duration-1000"
                      style={{ width: `${pillar.reach}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Story Timeline */}
        <section id="timeline" className="py-stack-lg bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-stack-lg text-left gap-4">
              <div className="max-w-xl">
                <span className="font-label-caps text-label-caps text-secondary font-bold uppercase">The Journey</span>
                <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mt-2 font-bold">
                  Evolution of Livelihood
                </h2>
              </div>
              <button className="text-primary font-label-caps text-label-caps border-b-2 border-primary pb-1 font-semibold hover:opacity-85 cursor-pointer">
                View Full Roadmap
              </button>
            </div>
            <div className="relative">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-outline-variant/50 hidden md:block"></div>
              {timeline.map((event, idx) => (
                <div
                  key={idx}
                  className="relative mb-stack-lg md:flex justify-between items-center w-full text-left"
                >
                  {idx % 2 === 0 ? (
                    <>
                      <div className="md:w-5/12 mb-4 md:mb-0">
                        <div className="bg-surface p-8 border border-outline-variant/20 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <span className="font-label-caps text-label-caps text-secondary mb-2 block font-semibold">
                            {event.date}
                          </span>
                          <h4 className="font-headline-sm text-primary mb-2 text-lg font-bold">
                            {event.title}
                          </h4>
                          <p className="text-on-surface-variant font-body-md">
                            {event.description}
                          </p>
                        </div>
                      </div>
                      <div className="absolute left-[-4px] md:left-1/2 md:translate-x-[-50%] w-3.5 h-3.5 bg-primary rounded-full hidden md:block border-2 border-white"></div>
                      <div className="md:w-5/12"></div>
                    </>
                  ) : (
                    <>
                      <div className="md:w-5/12"></div>
                      <div className="absolute left-[-4px] md:left-1/2 md:translate-x-[-50%] w-3.5 h-3.5 bg-primary rounded-full hidden md:block border-2 border-white"></div>
                      <div className="md:w-5/12">
                        <div className="bg-surface p-8 border border-outline-variant/20 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <span className="font-label-caps text-label-caps text-secondary mb-2 block font-semibold">
                            {event.date}
                          </span>
                          <h4 className="font-headline-sm text-primary mb-2 text-lg font-bold">
                            {event.title}
                          </h4>
                          <p className="text-on-surface-variant font-body-md">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Program Performance */}
        <section id="performance" className="py-stack-lg bg-surface-container-low scroll-mt-20">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
            <PerformanceCharts growthData={growthData} distributionData={distributionData} />
          </div>
        </section>

        {/* Community Stories */}
        <section id="stories" className="py-stack-lg bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-stack-lg">
              <span className="font-label-caps text-label-caps text-secondary font-bold uppercase">
                Voices of Resilience
              </span>
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mt-2 font-bold">
                Community Stories
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter text-left">
              {stories.map((story, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden rounded-xl mb-6 shadow relative bg-surface-variant/35">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={story.imgAlt}
                      src={story.imgSrc}
                    />
                  </div>
                  <h4 className="font-headline-sm text-primary mb-2 text-xl font-bold">
                    {story.name}
                  </h4>
                  <p className="text-on-surface-variant italic mb-4 font-body-md">
                    "{story.quote}"
                  </p>
                  <span className="font-label-caps text-label-caps text-primary group-hover:translate-x-2 transition-transform inline-block font-semibold">
                    Read More →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Achievements Masonry */}
        <section className="py-stack-lg bg-surface-container-high/40">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop text-left">
            <h2 className="font-headline-md text-primary mb-stack-md text-2xl font-bold">
              Recent Program Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-outline-variant/30 row-span-2 flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
                <div>
                  <span className="font-label-caps text-label-caps text-tertiary-container mb-4 block font-bold">
                    Skills Workshop
                  </span>
                  <h4 className="font-headline-sm text-primary mb-4 text-xl font-bold">
                    Advanced Technical Certification
                  </h4>
                  <p className="text-on-surface-variant text-sm font-body-md">
                    Over 45 participants completed the latest HVAC and Electrical systems workshop, achieving 100% placement rate in local industries.
                  </p>
                </div>
                <img
                  className="rounded-lg mt-6 w-full h-48 object-cover bg-surface-variant/30"
                  alt="Workshop"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp50MI6oodKH_PFW9oN1iVKa_732SH61Z9u5Klkx8BDTddL2fQTQvYm3j6jbeLS3MJKSqNCwGt18pCS_LzHp2L_4szlkeEvYMfYmiX89VyrKB8PKKvfRL-JWOvXDyNQa1MzNkA0DHNaZkFijeqmtexVt9IQdBOYWH_0Y89TM-J0_L7C7Elfacmw7nslv96KHi9THv2mf5kdtUPf9ObUCXDpQpO-8c2VzDGb70wWN-qWUu1Z0M_Tg3DpE-yg_fdnX_kAORZflXrxK6r"
                />
              </div>

              <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm hover:shadow transition-shadow">
                <span className="font-label-caps text-label-caps text-tertiary-container mb-2 block font-bold">
                  Health Camp Success
                </span>
                <h4 className="font-headline-sm text-primary mb-2 text-lg font-bold">
                  Specialist Care for 500+
                </h4>
                <p className="text-on-surface-variant text-sm font-body-md">
                  Our bi-annual health camp recently concluded with record turnout for cardiac and pediatric screenings.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm hover:shadow transition-shadow">
                <span className="font-label-caps text-label-caps text-tertiary-container mb-2 block font-bold">
                  Policy Audit
                </span>
                <h4 className="font-headline-sm text-primary mb-2 text-lg font-bold">
                  Metro Accessibility Audit
                </h4>
                <p className="text-on-surface-variant text-sm font-body-md">
                  Successful completion of the third-party accessibility audit ensuring world-class standards for PWDs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-outline-variant/30 lg:col-span-2 shadow-sm hover:shadow transition-shadow">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/2">
                    <h4 className="font-headline-sm text-primary mb-4 text-lg font-bold">
                      Entrepreneurship Incubation
                    </h4>
                    <p className="text-on-surface-variant text-sm font-body-md">
                      A new initiative to provide seed funding and mentorship to 25 local micro-enterprises launched by project affected families.
                    </p>
                    <button className="mt-4 text-primary font-label-caps text-label-caps hover:underline cursor-pointer font-semibold">
                      Download PDF Report
                    </button>
                  </div>
                  <div className="md:w-1/2 w-full h-40 bg-surface-variant/30 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-outline">lightbulb</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Footprint Map */}
        <section id="map" className="py-stack-lg bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
            <FootprintMap />
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-primary py-stack-lg text-center overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
              <defs>
                <pattern height="10" id="grid" patternUnits="userSpaceOnUse" width="10">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"></path>
                </pattern>
              </defs>
              <rect fill="url(#grid)" height="100%" width="100%"></rect>
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10 space-y-6">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary font-bold">
              Building Sustainable Communities Together
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button
                onClick={(e) => handleScrollTo(e, "impact")}
                className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-lg font-label-caps text-label-caps hover:shadow-2xl transition-all cursor-pointer font-bold"
              >
                Explore Programs
              </button>
              <button
                onClick={(e) => handleScrollTo(e, "performance")}
                className="border border-on-primary text-on-primary px-10 py-5 rounded-lg font-label-caps text-label-caps hover:bg-white/10 transition-all cursor-pointer font-bold"
              >
                View Impact Dashboard
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest py-stack-lg border-t border-outline-variant/50 text-left">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-12">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="font-headline-md text-headline-md text-primary font-bold">
                Pune Metro Livelihood
              </div>
              <p className="text-on-surface-variant max-w-sm font-body-md">
                A dedicated initiative by the Pune Metro Rail Corporation focused on long-term sustainability and growth for project affected communities.
              </p>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-70 text-2xl">
                  public
                </span>
                <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-70 text-2xl">
                  share
                </span>
                <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-70 text-2xl">
                  mail
                </span>
              </div>
            </div>
            <div>
              <h5 className="font-label-caps text-label-caps text-primary mb-6 font-bold uppercase">
                Pillars
              </h5>
              <ul className="space-y-4 font-body-md text-on-surface-variant">
                <li>
                  <a
                    onClick={(e) => handleScrollTo(e, "pillars")}
                    className="hover:text-secondary transition-colors cursor-pointer"
                    href="#pillars"
                  >
                    Skill Building
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => handleScrollTo(e, "pillars")}
                    className="hover:text-secondary transition-colors cursor-pointer"
                    href="#pillars"
                  >
                    Health Initiatives
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => handleScrollTo(e, "pillars")}
                    className="hover:text-secondary transition-colors cursor-pointer"
                    href="#pillars"
                  >
                    Employment Support
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => handleScrollTo(e, "pillars")}
                    className="hover:text-secondary transition-colors cursor-pointer"
                    href="#pillars"
                  >
                    Govt. Integration
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-label-caps text-label-caps text-primary mb-6 font-bold uppercase">
                Resources
              </h5>
              <ul className="space-y-4 font-body-md text-on-surface-variant">
                <li>
                  <a className="hover:text-secondary transition-colors" href="#">
                    Annual Report
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => handleScrollTo(e, "stories")}
                    className="hover:text-secondary transition-colors cursor-pointer"
                    href="#stories"
                  >
                    Impact Stories
                  </a>
                </li>
                <li>
                  <a className="hover:text-secondary transition-colors" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="hover:text-secondary transition-colors" href="#">
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between gap-4">
            <p className="font-body-md text-on-surface-variant text-sm">
              © 2026 Pune Metro Rail Corporation. All rights reserved. Engineering Social Equity.
            </p>
            <div className="flex gap-6 text-sm font-label-caps text-on-surface-variant font-semibold">
              <a className="hover:text-primary" href="#">
                Terms
              </a>
              <a className="hover:text-primary" href="#">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
