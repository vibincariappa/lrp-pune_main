import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePillar } from "../../hooks/usePillar";
import AnimatedCounter from "../../components/public/AnimatedCounter";
import ThreePillarAnimation from "../../components/public/ThreePillarAnimation";
import { motion } from "framer-motion";

export default function PillarPage6() {
  const navigate = useNavigate();
  const { data: apiResponse, isLoading } = usePillar(6);
  const [activeStep, setActiveStep] = useState(1);
  const [progressHeight, setProgressHeight] = useState(16.6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const apiAttr = apiResponse?.success ? apiResponse.data.attributes : null;
  const displayReach = apiAttr?.reach ? parseInt(apiAttr.reach, 10) : 82;

  const milestoneData = {
    1: {
      percentage: 16.6,
      desc: "Community engagement starts with identifying local potential and mapping existing skill gaps in transition zones."
    },
    2: {
      percentage: 33.3,
      desc: "Our diagnostic enrollment process matches candidates to industry-aligned growth sectors based on aptitude and aspiration."
    },
    3: {
      percentage: 50.0,
      desc: "Trainees undergo 200+ hours of hands-on simulation and theoretical learning with tier-one industry partners."
    },
    4: {
      percentage: 66.6,
      desc: "Rigorous third-party assessments ensure every trainee meets global quality standards for their respective trade."
    },
    5: {
      percentage: 83.3,
      desc: "Graduates receive government-recognized certification, providing them a formal entry point into the organized labor market."
    },
    6: {
      percentage: 100.0,
      desc: "The journey culminates in direct corporate placement or supported entrepreneurship with initial capital facilitation."
    }
  };

  const handleStepClick = (stepNum) => {
    setActiveStep(stepNum);
    setProgressHeight(milestoneData[stepNum].percentage);
  };

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
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label text-[11px] uppercase tracking-wider hover:bg-primary-container hover:shadow-lg transition-all cursor-pointer font-bold"
          >
            Get Involved
          </button>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section with Embedded Three.js Animation */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary text-white">
          {/* Three.js Background Layer */}
          <div className="absolute inset-0 w-full h-full z-0 bg-transparent opacity-85 pointer-events-none">
            <ThreePillarAnimation pillarId={6} />
          </div>

          {/* Centered Typography & CTA Layer */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-6 px-6 text-center"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block font-label text-[12px] uppercase tracking-[0.4em] text-secondary-fixed mb-2 border-l-2 border-secondary pl-4 font-bold"
            >
              Economic Empowerment
            </motion.span>
            
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl md:text-7xl text-white font-bold leading-tight tracking-tight"
            >
              Pillar 6: <br/><span className="italic text-primary-fixed-dim font-normal">Skill Building</span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="font-body text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Restoring dignity through professional elevation. Equipping Pune’s diverse workforce with the technical mastery required for a sustainable urban future.
            </motion.p>

            <motion.div variants={itemVariants}>
              <div className="text-xs font-label text-secondary border border-secondary/20 bg-secondary/5 px-4 py-2 rounded-lg inline-block">
                CURRENT REACH: <span className="font-bold">{displayReach}%</span> Target Accomplished
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center pt-2"
            >
              <button
                onClick={() => {
                  const el = document.getElementById("skill-ecosystem");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-secondary text-on-secondary px-8 py-4 rounded-full font-label-caps text-label-caps transition-all hover:shadow-xl hover:-translate-y-0.5 cursor-pointer font-bold"
              >
                Explore Programs
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("success-stories");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-white/20 text-white px-8 py-4 rounded-full font-label-caps text-label-caps transition-all hover:bg-white/5 cursor-pointer font-bold backdrop-blur-sm"
              >
                2024 Impact Report
              </button>
            </motion.div>

            {/* Metric Preview inside Hero container - moved below CTA */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left w-full mt-10 max-w-4xl"
            >
              {/* Metric Card 1 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-xl flex flex-col gap-1 shadow-sm hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-label text-[10px] text-white/60 uppercase tracking-wider font-bold">
                  Empowered Lives
                </span>
                <span className="font-display text-3xl text-white font-bold">
                  <AnimatedCounter value={12450} />+
                </span>
              </div>

              {/* Metric Card 2 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-xl flex flex-col gap-1 shadow-sm hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-label text-[10px] text-white/60 uppercase tracking-wider font-bold">
                  Success Rate
                </span>
                <span className="font-display text-3xl text-white font-bold">
                  <AnimatedCounter value={92} />%
                </span>
              </div>

              {/* Metric Card 3 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-xl flex flex-col gap-1 shadow-sm hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-label text-[10px] text-white/60 uppercase tracking-wider font-bold">
                  Core Modules
                </span>
                <span className="font-display text-3xl text-white font-bold">
                  <AnimatedCounter value={48} />
                </span>
              </div>

              {/* Metric Card 4 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-xl flex flex-col gap-1 shadow-sm hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-label text-[10px] text-white/60 uppercase tracking-wider font-bold">
                  Training Hours
                </span>
                <span className="font-display text-3xl text-white font-bold">
                  <AnimatedCounter value={250} />k
                </span>
              </div>
            </motion.div>
          </motion.div>

          <div
            onClick={() => {
              const el = document.getElementById("learning-pathway");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 cursor-pointer z-10 hover:opacity-100 transition-opacity"
          >
            <span className="font-label text-[10px] uppercase tracking-widest text-white font-bold">Scroll to Pathway</span>
            <div className="w-px h-12 bg-white animate-bounce"></div>
          </div>
        </section>

        {/* Section 2: Skill Ecosystem */}
        <section id="skill-ecosystem" className="py-32 bg-surface max-w-7xl mx-auto px-margin-desktop scroll-mt-20">
          <div className="w-full text-left">
            <div className="flex flex-col items-center mb-24 text-center max-w-3xl mx-auto">
              <span className="font-label text-[12px] text-secondary font-bold uppercase tracking-[0.3em] mb-6 block">Our Methodology</span>
              <h2 className="font-display text-5xl md:text-6xl text-primary mb-8 font-bold">The Skill Ecosystem</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed font-light">A multi-layered approach to human capital development, bridging the gap between traditional livelihoods and the modern economy.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Vocational Trades */}
              <div className="bg-white/70 backdrop-blur-md p-10 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-outline-variant/20 relative overflow-hidden group">
                <div className="w-14 h-14 bg-secondary-container/20 rounded-2xl flex items-center justify-center text-secondary mb-8 group-hover:bg-secondary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">engineering</span>
                </div>
                <h3 className="font-headline text-2xl text-primary mb-4 leading-tight font-bold">Vocational Trades</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Technical mastery for industrial manufacturing and infrastructure maintenance.</p>
                <div className="font-label text-[10px] font-bold text-secondary flex items-center gap-2 mt-auto">
                  <span className="w-8 h-[1px] bg-secondary/30"></span> 24% ENROLLMENT
                </div>
              </div>

              {/* Livelihood Essentials */}
              <div className="bg-white/70 backdrop-blur-md p-10 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-outline-variant/20 relative overflow-hidden group">
                <div className="w-14 h-14 bg-on-tertiary-container/20 rounded-2xl flex items-center justify-center text-on-tertiary-container mb-8 group-hover:bg-on-tertiary-container group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">diversity_3</span>
                </div>
                <h3 className="font-headline text-2xl text-primary mb-4 leading-tight font-bold">Livelihood Essentials</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Foundational financial literacy, communication, and interpersonal resilience.</p>
                <div className="font-label text-[10px] font-bold text-on-tertiary-container flex items-center gap-2 mt-auto">
                  <span className="w-8 h-[1px] bg-on-tertiary-container/30"></span> 32% ENROLLMENT
                </div>
              </div>

              {/* Digital Literacies */}
              <div className="bg-white/70 backdrop-blur-md p-10 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-primary/10 relative overflow-hidden border-2 shadow-lg group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">devices</span>
                </div>
                <h3 className="font-headline text-2xl text-primary mb-4 leading-tight font-bold">Digital Literacies</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Bridging the divide with advanced software, cloud, and data operations training.</p>
                <div className="font-label text-[10px] font-bold text-primary flex items-center gap-2 mt-auto">
                  <span className="w-8 h-[1px] bg-primary/30"></span> 38% ENROLLMENT
                </div>
              </div>

              {/* Leadership Tracks */}
              <div className="bg-white/70 backdrop-blur-md p-10 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-outline-variant/20 relative overflow-hidden group">
                <div className="w-14 h-14 bg-secondary-container/20 rounded-2xl flex items-center justify-center text-secondary mb-8 group-hover:bg-secondary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">school</span>
                </div>
                <h3 className="font-headline text-2xl text-primary mb-4 leading-tight font-bold">Leadership Tracks</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Corporate readiness modules for middle-management and administrative roles.</p>
                <div className="font-label text-[10px] font-bold text-secondary flex items-center gap-2 mt-auto">
                  <span className="w-8 h-[1px] bg-secondary/30"></span> 18% ENROLLMENT
                </div>
              </div>

              {/* Entrepreneurship */}
              <div className="bg-white/70 backdrop-blur-md p-10 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-outline-variant/20 relative overflow-hidden group">
                <div className="w-14 h-14 bg-on-tertiary-container/20 rounded-2xl flex items-center justify-center text-on-tertiary-container mb-8 group-hover:bg-on-tertiary-container group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                </div>
                <h3 className="font-headline text-2xl text-primary mb-4 leading-tight font-bold">Entrepreneurship</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Incubation support and seed mentorship for local small-scale innovators.</p>
                <div className="font-label text-[10px] font-bold text-on-tertiary-container flex items-center gap-2 mt-auto">
                  <span className="w-8 h-[1px] bg-on-tertiary-container/30"></span> 15% ENROLLMENT
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Learning Pathway */}
        <section id="learning-pathway" className="py-32 bg-primary text-white overflow-hidden scroll-mt-20">
          <div className="max-w-7xl mx-auto px-margin-desktop text-left">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
              <div className="lg:col-span-2">
                <span className="font-label text-[12px] text-secondary-fixed uppercase tracking-[0.4em] mb-6 block font-bold">Transformation Journey</span>
                <h2 className="font-display text-5xl text-white mb-8 leading-tight font-bold">The Learning <br/>Pathway</h2>
                <p className="text-primary-fixed-dim/80 text-xl leading-relaxed mb-10 font-light">From initial community outreach to the ultimate goal of sustainable livelihood creation, we follow a rigorous six-step process.</p>
                
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-10 rounded-3xl min-h-[180px] flex flex-col justify-center transition-all duration-300">
                  <p className="text-white text-lg font-medium italic leading-relaxed">
                    {milestoneData[activeStep].desc}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="relative flex flex-col gap-4">
                  {/* Vertical Progress Line */}
                  <div className="absolute left-8 top-0 w-1 h-full bg-white/10 rounded-full z-0 overflow-hidden">
                    <div 
                      className="w-full bg-secondary transition-all duration-700 ease-in-out" 
                      style={{ height: `${progressHeight}%` }}
                    ></div>
                  </div>

                  {/* Milestone Cards */}
                  {[
                    { step: 1, label: "Step 01", title: "Community Outreach", icon: "person_pin" },
                    { step: 2, label: "Step 02", title: "Diagnostic Enrollment", icon: "assignment_ind" },
                    { step: 3, label: "Step 03", title: "Immersive Training", icon: "model_training" },
                    { step: 4, label: "Step 04", title: "Industry Assessment", icon: "quiz" },
                    { step: 5, label: "Step 05", title: "Institutional Certification", icon: "verified" },
                    { step: 6, label: "Step 06", title: "Livelihood Placement", icon: "work" }
                  ].map((m) => (
                    <div 
                      key={m.step}
                      className="group flex items-center gap-10 relative z-10 cursor-pointer" 
                      onClick={() => handleStepClick(m.step)}
                    >
                      <div className={`w-16 h-16 rounded-full bg-primary border-4 flex items-center justify-center text-white transition-all flex-shrink-0 duration-300 ${
                        activeStep === m.step ? "border-secondary scale-110 shadow-lg" : "border-white/10 group-hover:border-secondary/50"
                      }`}>
                        <span className="material-symbols-outlined text-2xl">{m.icon}</span>
                      </div>
                      <div className={`bg-white/5 border border-white/10 p-6 rounded-2xl flex-grow transition-all duration-300 ${
                        activeStep === m.step ? "bg-white/15 border-secondary/40" : "hover:bg-white/10"
                      }`}>
                        <h4 className="font-label text-xs uppercase tracking-widest text-secondary-fixed mb-1 font-bold">{m.label}</h4>
                        <p className="font-headline text-xl text-white font-bold">{m.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Performance Analytics */}
        <section className="py-32 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-margin-desktop text-left">
            <div className="flex flex-col mb-20">
              <span className="font-label text-[12px] text-primary font-bold uppercase tracking-[0.3em] mb-4">Metric Analysis</span>
              <h2 className="font-display text-5xl text-primary font-bold">Training Performance</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Enrollment vs Completion Chart */}
              <div className="bg-white p-12 rounded-3xl border border-outline-variant/30 shadow-sm">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h3 className="font-headline text-2xl text-primary mb-1 font-bold">Progress Efficiency</h3>
                    <p className="text-xs text-on-surface-variant font-body font-semibold">Quarterly comparison of trainee retention.</p>
                  </div>
                  <div className="flex gap-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary/20"></div>
                      <span className="text-[10px] font-label uppercase">Enrollment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-[10px] font-label uppercase">Completion</span>
                    </div>
                  </div>
                </div>

                <div className="h-[350px] flex items-end justify-between gap-6 px-4">
                  {/* Q1 */}
                  <div className="flex-1 flex flex-col items-center gap-4 h-full justify-end">
                    <div className="w-full flex gap-2 items-end h-full">
                      <div className="flex-1 bg-primary/20 h-[92%] rounded-t-lg transition-all hover:opacity-85" title="Enrollment: 92%"></div>
                      <div className="flex-1 bg-primary h-[84%] rounded-t-lg transition-all hover:opacity-85" title="Completion: 84%"></div>
                    </div>
                    <span className="font-label text-[11px] uppercase text-on-surface-variant tracking-wider font-bold">Q1</span>
                  </div>

                  {/* Q2 */}
                  <div className="flex-1 flex flex-col items-center gap-4 h-full justify-end">
                    <div className="w-full flex gap-2 items-end h-full">
                      <div className="flex-1 bg-primary/20 h-[88%] rounded-t-lg transition-all hover:opacity-85" title="Enrollment: 88%"></div>
                      <div className="flex-1 bg-primary h-[81%] rounded-t-lg transition-all hover:opacity-85" title="Completion: 81%"></div>
                    </div>
                    <span className="font-label text-[11px] uppercase text-on-surface-variant tracking-wider font-bold">Q2</span>
                  </div>

                  {/* Q3 */}
                  <div className="flex-1 flex flex-col items-center gap-4 h-full justify-end">
                    <div className="w-full flex gap-2 items-end h-full">
                      <div className="flex-1 bg-primary/20 h-[96%] rounded-t-lg transition-all hover:opacity-85" title="Enrollment: 96%"></div>
                      <div className="flex-1 bg-primary h-[90%] rounded-t-lg transition-all hover:opacity-85" title="Completion: 90%"></div>
                    </div>
                    <span className="font-label text-[11px] uppercase text-on-surface-variant tracking-wider font-bold">Q3</span>
                  </div>

                  {/* Q4 */}
                  <div className="flex-1 flex flex-col items-center gap-4 h-full justify-end">
                    <div className="w-full flex gap-2 items-end h-full">
                      <div className="flex-1 bg-primary/20 h-[100%] rounded-t-lg transition-all hover:opacity-85" title="Enrollment: 100%"></div>
                      <div className="flex-1 bg-primary h-[94%] rounded-t-lg transition-all hover:opacity-85" title="Completion: 94%"></div>
                    </div>
                    <span className="font-label text-[11px] uppercase text-on-surface-variant tracking-wider font-bold">Q4</span>
                  </div>
                </div>
              </div>

              {/* Sector Participation Distribution */}
              <div className="bg-white p-12 rounded-3xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
                <div className="mb-12">
                  <h3 className="font-headline text-2xl text-primary mb-1 font-bold">Market Distribution</h3>
                  <p className="text-xs text-on-surface-variant font-body font-semibold">Sectoral demand alignment for 2024 cohorts.</p>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-3 items-end">
                      <span className="font-body text-sm font-bold text-primary">Tech & Advanced Digital</span>
                      <span className="font-label text-sm text-secondary font-bold">38%</span>
                    </div>
                    <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full shadow-[0_0_15px_rgba(135,82,0,0.3)]" style={{ width: "38%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-3 items-end">
                      <span className="font-body text-sm font-bold text-primary">Smart Manufacturing</span>
                      <span className="font-label text-sm text-on-tertiary-container font-bold">26%</span>
                    </div>
                    <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-on-tertiary-container rounded-full shadow-[0_0_15px_rgba(97,171,172,0.3)]" style={{ width: "26%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-3 items-end">
                      <span className="font-body text-sm font-bold text-primary">Service Ecosystems</span>
                      <span className="font-label text-sm text-primary font-bold">22%</span>
                    </div>
                    <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(0,32,69,0.3)]" style={{ width: "22%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-3 items-end">
                      <span className="font-body text-sm font-bold text-primary">Civic Administration</span>
                      <span className="font-label text-sm text-outline font-bold">14%</span>
                    </div>
                    <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-outline rounded-full" style={{ width: "14%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Success Stories */}
        <section id="success-stories" className="py-32 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-margin-desktop text-left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="relative">
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary-container/10 rounded-full blur-[100px] z-0"></div>
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary-container/10 rounded-full blur-[100px] z-0"></div>
                <div className="relative z-10 p-4 bg-surface rounded-lg shadow-2xl border border-outline-variant/30">
                  <img 
                    alt="Professional Success Portrait" 
                    className="w-full object-cover aspect-[4/5] rounded-sm grayscale-[0.2] hover:grayscale-0 transition-all duration-700" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2iGqno91c79xpE_ca8F_LLU8985wr0HBnyzeROTAqv-VdYPm9DVaH72ud-vaP2dHVZsU6RvkcDj1XJQPq83cNtlycT-dq9SWTRBVsFRqmKVt0BAa-A63TRhG4GOQskamLBS2jCUvvcXsqYNwLgo9kPVVW29-GeIIt73ZgvV21zU88oMEzhqgDt0SRMunyAHcRaQMmIQxrwDdDKMge8Bnm90cJwfCNkIrkBoa7XGP69Snyw8uMdJCYg6PxmMSObeJ1OWz-oaoOAz0j"
                  />
                  <div className="absolute -bottom-10 -right-10 bg-primary text-on-primary p-8 rounded-2xl shadow-2xl max-w-[280px] border-4 border-white rotate-[2deg] flex flex-col gap-2">
                    <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary-fixed-dim font-bold">Institutional Impact</span>
                    <p className="font-display text-xl leading-tight italic">"My classroom is now the whole city."</p>
                    <p className="text-[11px] font-bold text-secondary-fixed uppercase tracking-widest">Anjali Mehta</p>
                    <p className="text-[10px] opacity-70">Senior Data Ops, Pune Hub</p>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-label text-[12px] text-secondary font-bold uppercase tracking-[0.4em] mb-8 block">Legacy of Progress</span>
                <h2 className="font-display text-5xl md:text-6xl text-primary mb-10 leading-[1.1] font-bold">The Restoration of Professional Dignity</h2>
                <div className="space-y-8 text-on-surface-variant text-lg leading-relaxed font-light">
                  <p>Anjali, a resident near the Vanaz Metro expansion, faced displacement not just of property, but of purpose. Our Digital Ops program offered more than a certificate—it offered a bridge.</p>
                  <p className="italic text-primary border-l-4 border-secondary pl-8 py-2 font-semibold bg-surface-container-low/40 rounded-r-lg">
                    "Infrastructure is concrete and steel, but community is heart and skill. Pune Metro didn't just give me a transit line; they gave me a trajectory."
                  </p>
                  <p>Today, Anjali leads a multi-functional team at a major FinTech regional office, exemplifying the core mission of Pillar 6: converting urban shift into individual growth.</p>
                </div>
                <div className="mt-14 flex items-center gap-10">
                  <button className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold hover:bg-primary-container transition-all hover:shadow-xl group flex items-center gap-2">
                    Full Documentary 
                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">play_circle</span>
                  </button>
                  <a className="text-primary font-bold flex items-center gap-2 group border-b-2 border-transparent hover:border-secondary transition-all pb-1 uppercase text-xs tracking-widest cursor-pointer" href="#">
                    More Stories 
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">trending_flat</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Final Culmination */}
        <section className="py-40 bg-primary text-on-primary overflow-hidden text-center">
          <div className="max-w-7xl mx-auto px-margin-desktop text-center space-y-12">
            <h2 className="font-display text-5xl md:text-7xl text-white mb-12 max-w-4xl mx-auto leading-tight font-bold">
              Empowering Minds. <br/>
              <span className="italic text-secondary-fixed font-normal">Defining the Future.</span>
            </h2>
            <p className="text-primary-fixed-dim text-xl md:text-2xl max-w-2xl mx-auto mb-20 font-light leading-relaxed">
              Join us in creating an inclusive Pune where infrastructure serves as the ultimate catalyst for human potential.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
              <Link 
                to="/" 
                className="bg-secondary text-on-secondary px-12 py-6 rounded-full text-lg font-bold hover:scale-105 transition-transform min-w-[280px] shadow-2xl text-center"
              >
                Return to Pulse Hub
              </Link>
              <button 
                onClick={() => navigate("/")}
                className="border-2 border-white/30 text-white px-12 py-6 rounded-full text-lg font-bold hover:bg-white/10 transition-all min-w-[280px] backdrop-blur-sm"
              >
                Explore Other Pillars
              </button>
            </div>
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
