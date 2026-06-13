import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePillar } from "../../hooks/usePillar";
import AnimatedCounter from "../../components/public/AnimatedCounter";
import ThreePillarAnimation from "../../components/public/ThreePillarAnimation";

export default function PillarPage1() {
  const navigate = useNavigate();
  const { data: apiResponse, isLoading } = usePillar(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const config = {
    title: "Institution Building",
    subtitle: "Creating resilient, self-governing community structures that serve as the foundation for long-term socio-economic stability.",
    metricTitle1: "Institutions Formed",
    metricCount1: 142,
    metricTitle2: "Beneficiaries Reach",
    metricCount2: 4200,
    badgeText: "Livelihood Restoration",
    foundationsTitle: "Structural Foundations",
    foundationsDesc: "The three core pillars of community organization.",
    foundations: [
      { title: "Housing Societies (CHS)", desc: "Formalizing cooperative housing structures to ensure legal security and collective maintenance.", percent: 92, icon: "apartment", color: "bg-primary" },
      { title: "Self-Help Groups (SHG)", desc: "Empowering women through micro-finance and collective bargaining within neighborhood units.", percent: 85, icon: "groups", color: "bg-tertiary-container" },
      { title: "Anganwadi Centers", desc: "Building nutritional and educational centers to secure the health of the next generation.", percent: 78, icon: "child_care", color: "bg-secondary" }
    ],
    liveMetrics: [
      { label: "CHS FORMED", value: 42 },
      { label: "SHG FORMED", value: 86 },
      { label: "HH CONNECTED", value: 3120 },
      { label: "BANK ACCOUNTS", value: 94, suffix: "%" },
      { label: "TRAINED LEADERS", value: 248 },
      { label: "COMMUNITY REVENUE", value: "₹12.4M", isStatic: true }
    ],
    milestones: [
      { label: "REGISTRATION", value: 90, offset: 36.4, color: "text-primary" },
      { label: "FUNDING ACCESS", value: 70, offset: 109.3, color: "text-tertiary" },
      { label: "DIGITAL LITERACY", value: 50, offset: 182.2, color: "text-secondary" }
    ],
    journey: [
      { stage: "STAGE 01", title: "Planning & GIS Mapping", desc: "Identifying community boundaries and existing social threads using spatial data." },
      { stage: "STAGE 02", title: "Community Mobilization", desc: "Door-to-door engagement to build trust and explain the benefits of collective action." },
      { stage: "STAGE 03", title: "Formation & Elections", desc: "Democratic selection of core leadership committees and office bearers." },
      { stage: "STAGE 04 (IN PROGRESS)", title: "Legal Registration", desc: "Navigating municipal frameworks to grant institutions full legal status." },
      { stage: "STAGE 05", title: "Operationalization", desc: "Opening bank accounts and launching regular community-led programs." }
    ],
    stories: [
      { name: "Sunita Devi", role: "SHG LEADER", location: "Sangam CHS Unit 4", quote: "The training didn't just give us a bank account; it gave us the voice to demand better for our children's future.", imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAknbpmKGCTTKsoHJ3_TeEYkaawH5lj-pWPDnuebiMWNuM9u-jWkDg42Qrc2oYMo55fksUcdD4j4UnN6aakV8P-DP9MB1GZJAugLWjh52D3km7W-EIlppuT_2riS_OpiA3yr2A85VdoqQcPzZSOubIlbNhXpc-CmUZ4PWKQC9c0TVtr_ECOiH7pbttalMFN4il2HozO8_LIGu6J8u7MCnM2N83PYvUog3FHaHUcorZqrRpX7KzjhnMJqMKA7ks-cAja89BUHguOjwTe" },
      { name: "Rajesh Kumar", role: "FEDERATION SEC.", location: "Metro Nagar Federation", quote: "Moving from individual struggle to collective management has redefined how we see our property and our rights.", imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDpNvGNE2PcFGj1UzWVGnF16ZFmmF6WUUlS7Cl37bx_ynOo4l73ruWdPw5vz6iQ5RioibVXrpRo57e6ES-wdKsu4UcS5o3-WU8lW84JMz-JToABM19_6bL4nlYofXCXG5CYcUynB0hrkHKpXmcnXZoD2VqGwqm9DF2z_fnpm6QcpAv0MyOJSE4aE9FJmUg4l-DiMgNgImsbHGOG2K87JaltgPWTRjpUdz3dLoosyGJ2dwdUL4qOam5RcyW2yg6E0NrsIS21lde3-E5" }
    ],
    diagram: {
      node1: "Households",
      node2: "SHGs",
      node3: "CHS & Federation"
    },
    nextPillarId: 2,
    nextPillarTitle: "Pillar 2: Accessibility"
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const apiAttr = apiResponse?.success ? apiResponse.data.attributes : null;
  const displayTitle = apiAttr?.title || config.title;
  const displayReach = apiAttr?.reach ? parseInt(apiAttr.reach, 10) : null;

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-secondary-fixed selection:text-on-secondary-fixed min-h-screen">
      {/* TopNavBar */}
      <nav className="bg-surface/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-outline-variant/20 max-w-7xl mx-auto left-0 right-0">
        <div className="flex justify-between items-center px-margin-desktop py-4 h-20">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-headline-sm text-headline-sm font-bold text-primary hover:opacity-85">
              Pune Metro Impact
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-on-surface-variant hover:text-primary font-label-caps text-label-caps transition-colors">
              Programs
            </Link>
            <Link to="/" className="text-on-surface-variant hover:text-primary font-label-caps text-label-caps transition-colors">
              Livelihoods
            </Link>
            <Link to="/" className="text-on-surface-variant hover:text-primary font-label-caps text-label-caps transition-colors">
              Data Portal
            </Link>
            <Link to="/" className="text-on-surface-variant hover:text-primary font-label-caps text-label-caps transition-colors">
              News
            </Link>
            <Link to="/" className="text-on-surface-variant hover:text-primary font-label-caps text-label-caps transition-colors">
              About
            </Link>
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-label-caps text-label-caps hover:bg-on-secondary-container transition-all cursor-pointer"
          >
            Support Program
          </button>
        </div>
      </nav>

      <main className="pt-20">
        {/* 1. Immersive Hero */}
        <section className="relative min-h-[921px] flex items-center overflow-hidden px-margin-desktop max-w-7xl mx-auto">
          <div className="absolute inset-0 hero-pattern opacity-10 pointer-events-none"></div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center z-10 text-left py-12">
            <div className="flex flex-col gap-stack-md">
              <span className="font-label-caps text-label-caps text-secondary tracking-widest uppercase font-bold">
                {config.badgeText}
              </span>
              <h1 className="font-display-xl text-display-xl text-primary max-w-xl font-bold leading-tight">
                Pillar 1: {displayTitle}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                {config.subtitle}
              </p>

              {displayReach && (
                <div className="text-xs font-label-caps text-primary border border-primary/20 bg-primary/5 px-4 py-2 rounded-lg inline-block w-fit">
                  CURRENT REACH: <span className="font-bold">{displayReach}%</span> Target Accomplished
                </div>
              )}

              <div className="flex flex-wrap gap-stack-md mt-4">
                <div className="bg-white p-6 border border-outline-variant/30 rounded-xl shadow-sm min-w-[180px]">
                  <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">
                    {config.metricTitle1}
                  </span>
                  <span className="font-data-num text-headline-md text-primary text-3xl font-bold">
                    <AnimatedCounter value={config.metricCount1} />
                  </span>
                </div>
                <div className="bg-white p-6 border border-outline-variant/30 rounded-xl shadow-sm min-w-[180px]">
                  <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">
                    {config.metricTitle2}
                  </span>
                  <span className="font-data-num text-headline-md text-primary text-3xl font-bold">
                    <AnimatedCounter value={config.metricCount2} />
                  </span>+
                </div>
              </div>
            </div>
            <div className="relative h-[450px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl bg-primary-container border border-outline-variant/10">
              <ThreePillarAnimation pillarId={1} />
            </div>
          </div>
        </section>

        {/* 2. Pillar Overview */}
        <section className="py-stack-lg bg-surface-container-low px-margin-desktop scroll-mt-20 max-w-7xl mx-auto">
          <div className="w-full text-left">
            <div className="mb-stack-lg">
              <h2 className="font-headline-md text-headline-md text-primary font-bold text-2xl">
                {config.foundationsTitle}
              </h2>
              <p className="text-on-surface-variant mt-2 font-body-md">
                {config.foundationsDesc}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {config.foundations.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card p-stack-md rounded-2xl flex flex-col gap-4 group hover:border-primary/20 transition-all shadow-sm"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-lg font-bold">
                    {item.title}
                  </h3>
                  <p className="text-on-surface-variant font-body-md flex-grow">
                    {item.desc}
                  </p>
                  <div className="mt-auto">
                    <div className="flex justify-between font-label-caps text-[10px] mb-2 font-semibold">
                      <span>ACHIEVEMENT</span>
                      <span>{item.percent}%</span>
                    </div>
                    <div className="h-1.5 bg-outline-variant/30 w-full rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Live Impact Metrics */}
        <section className="py-stack-lg px-margin-desktop bg-white max-w-7xl mx-auto">
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-left border-y border-outline-variant/20 py-8">
              {config.liveMetrics.map((m, idx) => (
                <div key={idx} className="p-4 border-r border-outline-variant/20 last:border-0">
                  <span className="font-label-caps text-[10px] text-on-surface-variant font-bold">
                    {m.label}
                  </span>
                  <div className="font-data-num text-headline-md text-primary mt-2 text-2xl font-bold">
                    {m.isStatic ? (
                      m.value
                    ) : (
                      <>
                        <AnimatedCounter value={m.value} />
                        {m.suffix || ""}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Target vs Achievement */}
        <section className="py-stack-lg px-margin-desktop bg-surface-container-low max-w-7xl mx-auto">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center text-left">
            <div className="space-y-6">
              <h2 className="font-headline-md text-headline-md text-primary font-bold text-2xl">
                Strategic Milestones
              </h2>
              <p className="text-on-surface-variant font-body-md mt-4 max-w-md">
                Our progress is measured against rigorous benchmarks established during the initial socio-economic impact assessment.
              </p>
              <div className="mt-stack-md flex flex-wrap gap-8 justify-start">
                {config.milestones.map((m, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 128 128">
                        <circle className="text-outline-variant/20" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="4"></circle>
                        <circle
                          className={`${m.color} progress-ring__circle`}
                          cx="64"
                          cy="64"
                          fill="transparent"
                          r="58"
                          stroke="currentColor"
                          strokeDasharray="364.4"
                          strokeDashoffset={m.offset}
                          strokeLinecap="round"
                          strokeWidth="4"
                        ></circle>
                      </svg>
                      <span className="absolute font-data-num text-headline-sm text-xl font-bold">
                        {m.value}%
                      </span>
                    </div>
                    <span className="font-label-caps text-[10px] mt-2 font-bold">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Bar Chart */}
            <div className="bg-white p-stack-md rounded-2xl shadow-sm border border-outline-variant/20 h-[400px] flex flex-col justify-between p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="font-label-caps text-label-caps text-primary font-bold">
                  Cumulative Growth Index
                </span>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary"></div>
                    <span className="text-[10px] font-label-caps font-bold">Target</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#89d3d4]"></div>
                    <span className="text-[10px] font-label-caps font-bold">Actual</span>
                  </div>
                </div>
              </div>
              <div className="w-full h-64 flex items-end gap-6 px-4 border-l border-b border-outline-variant/20 pb-2">
                <div className="flex-1 flex flex-col justify-end gap-1 h-full items-center">
                  <div className="w-full bg-primary/20 h-[30%] rounded-t"></div>
                  <div className="w-full bg-primary h-[25%] rounded-t"></div>
                  <span className="text-[9px] font-label-caps text-on-surface-variant mt-1">2022</span>
                </div>
                <div className="flex-1 flex flex-col justify-end gap-1 h-full items-center">
                  <div className="w-full bg-primary/20 h-[45%] rounded-t"></div>
                  <div className="w-full bg-primary h-[40%] rounded-t"></div>
                  <span className="text-[9px] font-label-caps text-on-surface-variant mt-1">2023</span>
                </div>
                <div className="flex-1 flex flex-col justify-end gap-1 h-full items-center">
                  <div className="w-full bg-primary/20 h-[60%] rounded-t"></div>
                  <div className="w-full bg-primary h-[58%] rounded-t"></div>
                  <span className="text-[9px] font-label-caps text-on-surface-variant mt-1">2024</span>
                </div>
                <div className="flex-1 flex flex-col justify-end gap-1 h-full items-center">
                  <div className="w-full bg-primary/20 h-[75%] rounded-t"></div>
                  <div className="w-full bg-primary h-[72%] rounded-t"></div>
                  <span className="text-[9px] font-label-caps text-on-surface-variant mt-1">2025</span>
                </div>
                <div className="flex-1 flex flex-col justify-end gap-1 h-full items-center">
                  <div className="w-full bg-primary/20 h-[90%] rounded-t"></div>
                  <div className="w-full bg-primary h-[88%] rounded-t"></div>
                  <span className="text-[9px] font-label-caps text-on-surface-variant mt-1">2026</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Ecosystem Connectivity Diagram */}
        <section className="py-stack-lg px-margin-desktop bg-white overflow-hidden max-w-7xl mx-auto">
          <div className="w-full">
            <div className="text-center mb-stack-lg">
              <h2 className="font-headline-md text-headline-md text-primary font-bold text-2xl">
                Ecosystem Connectivity
              </h2>
              <p className="text-on-surface-variant max-w-lg mx-auto font-body-md mt-2">
                Visualizing the organic growth of relationships from household level to metropolitan governance.
              </p>
            </div>
            <div className="relative h-[400px] flex items-center justify-center">
              <svg className="w-full max-w-4xl h-auto" viewBox="0 0 800 400">
                <circle cx="100" cy="200" fill="transparent" r="40" stroke="#002045" strokeDasharray="4 4"></circle>
                <text className="font-label-caps text-[10px] font-semibold" dy=".3em" textAnchor="middle" x="100" y="200">
                  {config.diagram.node1}
                </text>

                <path className="opacity-30" d="M 140 200 Q 250 100 360 200" fill="none" stroke="#002045" strokeWidth="1.5">
                  <animate attributeName="stroke-dasharray" dur="3s" from="0, 500" repeatCount="indefinite" to="500, 0"></animate>
                </path>
                <path className="opacity-30" d="M 140 200 Q 250 300 360 200" fill="none" stroke="#002045" strokeWidth="1.5">
                  <animate attributeName="stroke-dasharray" dur="3s" from="500, 0" repeatCount="indefinite" to="0, 500"></animate>
                </path>

                <circle cx="400" cy="200" fill="#d6e3ff" r="60"></circle>
                <text className="font-label-caps text-[12px] font-bold text-primary" dy=".3em" textAnchor="middle" x="400" y="200">
                  {config.diagram.node2}
                </text>

                <path className="opacity-20" d="M 460 200 L 650 200" fill="none" stroke="#002045" strokeWidth="2.5"></path>
                <circle cx="700" cy="200" fill="#002045" r="80"></circle>
                <text className="font-label-caps text-[14px] fill-white font-bold" dy=".3em" textAnchor="middle" x="700" y="200">
                  {config.diagram.node3}
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* 6. Success Stories */}
        <section className="py-stack-lg px-margin-desktop bg-surface-container max-w-7xl mx-auto">
          <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg text-left gap-4">
              <div>
                <h2 className="font-headline-md text-headline-md text-primary font-bold text-2xl">
                  Voices of Resilience
                </h2>
                <p className="text-on-surface-variant mt-2 font-body-md">
                  Real impact through community empowerment.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter text-left">
              {config.stories.map((story, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl flex flex-col sm:flex-row gap-6 shadow-sm">
                  <div className="w-32 h-40 rounded-xl overflow-hidden flex-shrink-0 bg-surface-variant/30">
                    <img alt={story.name} className="w-full h-full object-cover" src={story.imgSrc} />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="font-label-caps text-[10px] text-secondary font-bold">
                        {story.role}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-primary mt-1 text-lg font-bold">
                        {story.name}
                      </h3>
                      <p className="text-on-surface-variant italic mt-4 font-body-md text-sm">
                        "{story.quote}"
                      </p>
                    </div>
                    <div className="font-label-caps text-[10px] text-on-surface-variant mt-4 font-semibold">
                      {story.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Timeline */}
        <section className="py-stack-lg px-margin-desktop bg-white max-w-7xl mx-auto">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-stack-lg text-left items-start">
            <div className="space-y-4">
              <h2 className="font-headline-md text-headline-md text-primary font-bold text-2xl">
                Formation Journey
              </h2>
              <p className="text-on-surface-variant font-body-md">
                A structured 5-stage evolution for every institution we build.
              </p>
            </div>
            <div className="relative space-y-12 pl-4">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-outline-variant/30"></div>
              {config.journey.map((j, idx) => (
                <div key={idx} className="relative pl-12">
                  <div className="absolute left-4.5 top-1.5 w-3.5 h-3.5 rounded-full bg-primary border-2 border-white shadow-[0_0_0_4px_rgba(0,32,69,0.1)]"></div>
                  <span className="font-label-caps text-label-caps text-secondary font-bold">
                    {j.stage}
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-lg font-bold mt-1">
                    {j.title}
                  </h4>
                  <p className="text-on-surface-variant font-body-md text-sm mt-2">
                    {j.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Monthly Performance */}
        <section className="py-stack-lg px-margin-desktop bg-surface-container-low max-w-7xl mx-auto">
          <div className="w-full text-left">
            <div className="flex justify-between items-center mb-stack-lg">
              <h2 className="font-headline-md text-headline-md text-primary font-bold text-2xl">
                Monthly Performance Index
              </h2>
              <select className="bg-white border border-outline-variant/35 text-label-caps text-xs rounded px-4 py-2 font-bold">
                <option>Last 12 Months</option>
                <option>Current Quarter</option>
              </select>
            </div>
            <div className="h-64 w-full relative">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
                <path d="M0,280 L100,240 L200,250 L300,180 L400,160 L500,190 L600,120 L700,90 L800,100 L900,40 L1000,60 L1000,300 L0,300 Z" fill="url(#areaGrad)"></path>
                <path d="M0,280 L100,240 L200,250 L300,180 L400,160 L500,190 L600,120 L700,90 L800,100 L900,40 L1000,60" fill="none" stroke="#002045" strokeWidth="2.5"></path>
                <defs>
                  <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#002045" stopOpacity={0.15}></stop>
                    <stop offset="100%" stopColor="#002045" stopOpacity={0}></stop>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute bottom-0 w-full flex justify-between font-label-caps text-[9px] text-on-surface-variant pt-4 border-t border-outline-variant/20 font-semibold">
                <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span><span>DEC</span>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Gallery */}
        <section className="py-stack-lg px-margin-desktop bg-white max-w-7xl mx-auto">
          <div className="w-full text-left">
            <div className="mb-stack-lg">
              <h2 className="font-headline-md text-headline-md text-primary font-bold text-2xl">
                Community Engagement
              </h2>
              <p className="text-on-surface-variant mt-2 font-body-md">
                Capturing moments of collaboration and decision-making.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-xl overflow-hidden shadow-sm bg-surface-variant/30">
                <img
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  alt="Meeting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUebvVEqDNyGR-uSV698EaNOR8WBCFJfxmGQY4kFrv6P18Nx2dc10ndrKEKJQOLxEu_IcMn-Hy6oZa7r35h7nsMz0oYUh9dy304M1ggrfboeuCs-fzj9j6-YBFqOpeX7IfmmBWR92ARmpwQiu0_V2J2DE3ZeUuMznS75oW_ROvDZFCEtZ-Ah7FFHjo0lnBpFdfIXZuImVFGcKkPRnWrHv8jvqkKKBvmOk5W1XLeNU8nmPVCehy7GQxgSmnHcK7xkLka5Z-KMCFN4eG"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm bg-surface-variant/30">
                <img
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  alt="Social mapping"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-aFwgM_J1_myfQTwScy2NnCFpmPqvI6bP_J-XBlyhxkItUks8ocJdS3PkwuNYmfczJggT45cIMRszxENN-OWiyOMe15AN4nXeEIkoPvhW_tQVKiXnLtxIcBUSa9X8-KKpuciG0qIm1sUnKEunDo-wnB5Y7poDIL5JRMeuv-irRFn3RJmrN4_xiv_BFmh5RXvYfG4qV4WVFjpHCQcGrzyxvRmgof56LHwZ4_GWSR_1u_g1GjC_6plZtYCYGscp8HHspchDQssvcxnM"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm bg-surface-variant/30">
                <img
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  alt="Leadership"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkoIlzPa1FLZV_pPX_7DNALMwaA3xJe9gWb2jwx1XO9HyWKXwR_ouBREOZvQi9oALG9KTlPheNPi9GDBcEBXgtzwl8W08_OdVp1T9f8KKG0vwFGnYwnbeVGAPIk1Cst1FPUALK6uPbq57949dbhVFmpu3iNuhH1Wgz8dDT4HyS5BXc6WqblWTvC-h2kT3V1d87_PmckAc-r0UMS9gmGkq3OmLpMzp4Uy2JB0cK3IHlSHc0p1pyKBCP_L5WtQxzkLx6UCobptEZvMAy"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm bg-surface-variant/30">
                <img
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  alt="Celebration"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB56p2K-yPCckAJfRX9P44JeqOK67RlSjB33n0H8Vlsv9ldtbc9rU4ZM7qAQTZjmmiqNPpR5xrkca48SB0PtqgyvTW10aRJvs1UElij0AZnCR0VNO0ZQJuSYiwEL2iAnmuJcVHJipZ38KQSe_EQjSZVp5HX9lSQOPwpBL_aKIzryC5tGVRUZkPGvSHC9LFs9vbm-8Zzc8pPLnMsxyNCRI-3kWUvPXmS_ZIe9SjZwDAXfFkKubcvUNZOyGfc7bZ73SID80h7Kc0gKmfs"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 10. Next Pillar Transition */}
        <section className="bg-primary py-32 px-margin-desktop text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#89d3d4] via-transparent to-transparent"></div>
          </div>
          <div className="max-w-container-max mx-auto relative z-10 space-y-6">
            <span className="font-label-caps text-label-caps text-tertiary-fixed-dim tracking-widest font-bold">
              CONTINUE THE JOURNEY
            </span>
            <h2 className="font-display-lg text-display-lg text-white font-bold text-3xl">
              {config.nextPillarTitle}
            </h2>
            <p className="text-[#adc7f7] text-body-lg max-w-xl mx-auto">
              Ready to explore further? Transition into the next operational phase of the Livelihood Restoration Program.
            </p>
            <Link
              to={`/pillars/${config.nextPillarId}`}
              className="inline-flex items-center gap-4 bg-white text-primary px-10 py-5 rounded-lg font-headline-sm hover:bg-primary-fixed transition-all cursor-pointer font-bold mt-4 shadow"
            >
              Explore Next Pillar
              <span className="material-symbols-outlined font-bold">arrow_right_alt</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-on-primary w-full border-t border-on-primary/10 text-left">
        <div className="px-margin-desktop py-stack-lg flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-headline-sm text-headline-sm text-on-primary font-bold">Pune Metro Impact</span>
            <p className="font-label-caps text-[10px] text-on-primary/60 max-w-xs font-semibold">
              Building institutional resilience for the metropolitan future of Pune.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-label-caps text-label-caps font-semibold">
            <a className="text-on-primary/80 hover:text-on-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="text-on-primary/80 hover:text-on-primary transition-colors" href="#">
              Accessibility
            </a>
            <a className="text-on-primary/80 hover:text-on-primary transition-colors" href="#">
              Contact Us
            </a>
            <a className="text-on-primary/80 hover:text-on-primary transition-colors" href="#">
              Stakeholder Portal
            </a>
          </div>
          <div className="text-on-primary/60 font-label-caps text-[10px] text-center md:text-right font-semibold">
            © 2026 Pune Metro Livelihood Restoration Program. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
