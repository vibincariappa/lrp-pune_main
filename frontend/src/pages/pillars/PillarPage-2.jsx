import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePillar } from "../../hooks/usePillar";
import AnimatedCounter from "../../components/public/AnimatedCounter";
import ThreePillarAnimation from "../../components/public/ThreePillarAnimation";
import { motion } from "framer-motion";

export default function PillarPage2() {
  const navigate = useNavigate();
  const { data: apiResponse, isLoading } = usePillar(2);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        {/* Hero Section with Integrated Three.js Animation */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Three.js Background Layer */}
          <div className="absolute inset-0 w-full h-full z-0 bg-transparent opacity-85 pointer-events-none">
            <ThreePillarAnimation pillarId={2} />
          </div>

          {/* Centered Typography & CTA Layer */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6 px-6 text-center"
          >
            <motion.span
              variants={itemVariants}
              className="font-label text-label-caps text-secondary uppercase tracking-[0.3em] font-bold text-xs"
            >
              PILLAR TWO
            </motion.span>
            
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl md:text-7xl text-primary font-bold leading-tight tracking-tight"
            >
              Accessibility
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
            >
              Creating pathways to education, employment and opportunity through improved mobility and accessibility support.
            </motion.p>

            {displayReach && (
              <motion.div variants={itemVariants}>
                <div className="text-xs font-label text-primary border border-primary/20 bg-primary/5 px-4 py-2 rounded-lg inline-block">
                  CURRENT REACH: <span className="font-bold">{displayReach}%</span> Target Accomplished
                </div>
              </motion.div>
            )}

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center pt-2"
            >
              <button
                onClick={() => {
                  const el = document.getElementById("overview");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label-caps text-label-caps transition-all hover:shadow-xl hover:-translate-y-0.5 cursor-pointer font-bold"
              >
                View Impact
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("timeline");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-primary text-primary px-8 py-4 rounded-lg font-label-caps text-label-caps transition-all hover:bg-primary/5 cursor-pointer font-bold"
              >
                Explore Programs
              </button>
            </motion.div>

            {/* Metric Preview inside Hero container - moved below CTA */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left w-full mt-10 max-w-3xl"
            >
              {/* Metric Card 1 */}
              <div className="bg-white/40 backdrop-blur-md border border-outline-variant/30 p-6 rounded-xl flex flex-col gap-2 shadow-sm hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-label text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                  Students Supported
                </span>
                <span className="font-data-num text-3xl text-primary font-bold">
                  <AnimatedCounter value={8200} />
                </span>
              </div>

              {/* Metric Card 2 */}
              <div className="bg-white/40 backdrop-blur-md border border-outline-variant/30 p-6 rounded-xl flex flex-col gap-2 shadow-sm hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-label text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                  Passes Distributed
                </span>
                <span className="font-data-num text-3xl text-secondary font-bold">
                  <AnimatedCounter value={12450} />
                </span>
              </div>

              {/* Metric Card 3 */}
              <div className="bg-white/40 backdrop-blur-md border border-outline-variant/30 p-6 rounded-xl flex flex-col gap-2 shadow-sm hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-label text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                  Working Professionals Assisted
                </span>
                <span className="font-data-num text-3xl text-primary-container font-bold">
                  <AnimatedCounter value={4250} />
                </span>
              </div>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
            <span className="material-symbols-outlined text-primary text-3xl">expand_more</span>
          </div>
        </section>

        {/* Live Impact Metrics */}
        <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto -mt-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-stack-md rounded-xl border border-outline-variant/30 flex items-center justify-between shadow-xl shadow-primary/5 text-left p-6">
              <div>
                <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">STUDENTS IDENTIFIED</div>
                <div className="font-display-lg text-[32px] text-primary font-bold">
                  <AnimatedCounter value={15000} />
                </div>
              </div>
              <span className="material-symbols-outlined text-primary text-[40px]">school</span>
            </div>
            <div className="glass-card p-stack-md rounded-xl border border-outline-variant/30 flex items-center justify-between shadow-xl shadow-primary/5 text-left p-6">
              <div>
                <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">PASSES DISTRIBUTED</div>
                <div className="font-display-lg text-[32px] text-secondary font-bold">
                  <AnimatedCounter value={8200} />
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary text-[40px]">confirmation_number</span>
            </div>
            <div className="glass-card p-stack-md rounded-xl border border-outline-variant/30 flex items-center justify-between shadow-xl shadow-primary/5 text-left p-6">
              <div>
                <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">PROGRAM COVERAGE</div>
                <div className="font-display-lg text-[32px] text-on-tertiary-container font-bold">
                  <AnimatedCounter value={94} />%
                </div>
              </div>
              <span className="material-symbols-outlined text-on-tertiary-container text-[40px]">target</span>
            </div>
          </div>
        </section>

        {/* Accessibility Overview (Interactive Bento) */}
        <section id="overview" className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-left">
          <div className="mb-stack-lg">
            <h2 className="font-display-lg text-display-lg text-primary mb-4 font-bold">Core Accessibility Portals</h2>
            <div className="h-1 w-20 bg-secondary"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {/* Card 1 */}
            <div className="group bg-surface-container-lowest border border-outline-variant/20 p-stack-md rounded-xl hover:border-secondary transition-all cursor-pointer p-6">
              <div className="flex justify-between items-start mb-12">
                <span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform">pedal_bike</span>
                <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
                  <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 48 48">
                    <circle className="text-surface-container-high" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
                    <circle className="text-secondary" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="25.1" strokeLinecap="round" strokeWidth="4"></circle>
                  </svg>
                  <span className="text-[10px] font-bold">80%</span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm mb-2 text-xl font-bold">Student Passes</h3>
              <p className="font-body-md text-on-surface-variant">Subsidized daily transit for students from low-income households near the Metro line.</p>
            </div>
            {/* Card 2 */}
            <div className="group bg-surface-container-lowest border border-outline-variant/20 p-stack-md rounded-xl hover:border-secondary transition-all cursor-pointer p-6">
              <div className="flex justify-between items-start mb-12">
                <span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform">work</span>
                <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
                  <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 48 48">
                    <circle className="text-surface-container-high" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
                    <circle className="text-on-tertiary-container" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="44.0" strokeLinecap="round" strokeWidth="4"></circle>
                  </svg>
                  <span className="text-[10px] font-bold">65%</span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm mb-2 text-xl font-bold">Work Transit</h3>
              <p className="font-body-md text-on-surface-variant">Connecting micro-entrepreneurs and gig workers to industrial and commercial hubs.</p>
            </div>
            {/* Card 3 */}
            <div className="group bg-surface-container-lowest border border-outline-variant/20 p-stack-md rounded-xl hover:border-secondary transition-all cursor-pointer p-6">
              <div className="flex justify-between items-start mb-12">
                <span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform">accessible</span>
                <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
                  <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 48 48">
                    <circle className="text-surface-container-high" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
                    <circle className="text-primary" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="10.0" strokeLinecap="round" strokeWidth="4"></circle>
                  </svg>
                  <span className="text-[10px] font-bold">92%</span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm mb-2 text-xl font-bold">Mobility Aid</h3>
              <p className="font-body-md text-on-surface-variant">Universal design implementation for seniors and citizens with physical disabilities.</p>
            </div>
            {/* Card 4 */}
            <div className="group bg-surface-container-lowest border border-outline-variant/20 p-stack-md rounded-xl hover:border-secondary transition-all cursor-pointer p-6">
              <div className="flex justify-between items-start mb-12">
                <span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform">diversity_3</span>
                <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
                  <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 48 48">
                    <circle className="text-surface-container-high" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
                    <circle className="text-secondary" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="35.2" strokeLinecap="round" strokeWidth="4"></circle>
                  </svg>
                  <span className="text-[10px] font-bold">72%</span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm mb-2 text-xl font-bold">Reach Outreach</h3>
              <p className="font-body-md text-on-surface-variant">Last-mile connectivity awareness programs and enrollment camps in remote clusters.</p>
            </div>
          </div>
        </section>

        {/* Journey to Opportunity */}
        <section className="py-stack-lg bg-surface-container-low border-y border-outline-variant/10 overflow-hidden text-center">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-lg">
            <h2 className="font-display-lg text-display-lg text-primary font-bold">The Journey to Opportunity</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto mt-4">Visualizing the direct pathway from domestic environments to economic participation.</p>
          </div>
          <div className="relative max-w-4xl mx-auto px-4 h-64 flex items-center justify-between">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 200">
              <path d="M50 100 Q 400 0 750 100" fill="transparent" stroke="#ffb55c" strokeDasharray="8 8" strokeWidth="2"></path>
              <circle cx="50" cy="100" fill="#002045" r="8"></circle>
              <circle cx="400" cy="50" fill="#ffb55c" r="12"></circle>
              <circle cx="750" cy="100" fill="#003d3e" r="8"></circle>
            </svg>
            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="bg-surface p-4 rounded-full shadow-lg border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary">home</span>
              </div>
              <span className="font-label-caps text-label-caps">HOME</span>
            </div>
            <div className="flex flex-col items-center gap-4 relative z-10 -translate-y-[40px]">
              <div className="bg-primary p-6 rounded-full shadow-xl border-4 border-white">
                <span className="material-symbols-outlined text-white">train</span>
              </div>
              <span className="font-label-caps text-label-caps text-primary">METRO ACCESS</span>
            </div>
            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="bg-surface p-4 rounded-full shadow-lg border border-outline-variant/20">
                <span className="material-symbols-outlined text-on-tertiary-container">rocket_launch</span>
              </div>
              <span className="font-label-caps text-label-caps">OPPORTUNITY</span>
            </div>
          </div>
        </section>

        {/* Program Analytics */}
        <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-gutter text-left">
          <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/20 p-6">
            <div className="flex justify-between items-center mb-stack-md mb-6">
              <h3 className="font-headline-sm text-headline-sm text-lg font-bold">Pass Distribution Progress</h3>
              <span className="font-label-caps text-label-caps text-secondary font-bold">TARGET VS ACHIEVEMENT</span>
            </div>
            <div className="aspect-video bg-surface-container/30 rounded flex items-end gap-4 p-4 h-[250px]">
              <div className="flex-1 bg-primary/10 rounded-t h-[60%] relative group">
                <div className="absolute inset-x-0 bottom-0 bg-primary h-[85%] rounded-t transition-all group-hover:opacity-80"></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold">Jan</div>
              </div>
              <div className="flex-1 bg-primary/10 rounded-t h-[75%] relative group">
                <div className="absolute inset-x-0 bottom-0 bg-primary h-[90%] rounded-t transition-all group-hover:opacity-80"></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold">Feb</div>
              </div>
              <div className="flex-1 bg-primary/10 rounded-t h-[90%] relative group">
                <div className="absolute inset-x-0 bottom-0 bg-primary h-[70%] rounded-t transition-all group-hover:opacity-80"></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold">Mar</div>
              </div>
              <div className="flex-1 bg-primary/10 rounded-t h-[80%] relative group">
                <div className="absolute inset-x-0 bottom-0 bg-secondary h-[95%] rounded-t transition-all group-hover:opacity-80"></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold font-label-caps text-secondary">Apr</div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/20 flex flex-col p-6">
            <div className="flex justify-between items-center mb-stack-md mb-6">
              <h3 className="font-headline-sm text-headline-sm text-lg font-bold">Beneficiary Composition</h3>
              <span className="font-label-caps text-label-caps text-on-tertiary-container font-bold">PARTICIPATION SPLIT</span>
            </div>
            <div className="flex-grow flex items-center justify-center gap-12">
              <div className="relative w-48 h-48 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                  <circle cx="96" cy="96" fill="transparent" r="80" className="stroke-surface-container-high" strokeWidth="16"></circle>
                  <circle cx="96" cy="96" fill="transparent" r="80" stroke="#002045" strokeDasharray="326.7 502.7" strokeDashoffset="0" strokeWidth="16"></circle>
                  <circle cx="96" cy="96" fill="transparent" r="80" stroke="#ffb55c" strokeDasharray="125.7 502.7" strokeDashoffset="-326.7" strokeWidth="16"></circle>
                  <circle cx="96" cy="96" fill="transparent" r="80" stroke="#61abac" strokeDasharray="50.3 502.7" strokeDashoffset="-452.4" strokeWidth="16"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display-lg text-headline-md text-primary font-bold text-2xl">12.4k</span>
                  <span className="font-label-caps text-[10px]">TOTAL</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="font-label-caps text-label-caps font-semibold">STUDENTS (65%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span className="font-label-caps text-label-caps font-semibold">PROFESSIONALS (25%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-on-tertiary-container"></div>
                  <span className="font-label-caps text-label-caps font-semibold">GENDER EQUITY (10%)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Impact Stories (Editorial) */}
        <section className="py-stack-lg bg-primary text-white text-left">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-12">
            <div className="mb-stack-lg mb-8">
              <span className="font-label-caps text-label-caps text-secondary-fixed">HUMAN STORIES</span>
              <h2 className="font-display-lg text-display-lg mt-2 font-bold text-3xl">Lives Redefined by Access</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-secondary-fixed/50 transition-all p-6">
                <div className="flex flex-col md:flex-row h-full gap-6">
                  <div className="w-full md:w-2/5 h-64 md:h-full overflow-hidden rounded-xl bg-white/10">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Priya Sharma portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhCGKtMVvkS2bqMd9jH8bAlgx7XukNV6_n0GKDe8Uj1u7u5erx3zNzuNuDU9QigUYjBLHVHv4e5Z2ADPBvRdLIE54ruSADzlpuDFECivlawf2vQh1htlt43yRtsiDyqYtqqpb9Z05SshV9JvyN9oGBbj9Tf8f4CGKHeb-tct5HJjJLPK4nwWEFY8R6jdewNW6IDOGd2f1fFsTnKSgiOce2fYhiub3yDKJBusSbm_J50_rolFrW8sr8m9IiSKEh04fGIcQScgKxUrNA" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="material-symbols-outlined text-secondary-fixed mb-4">format_quote</span>
                    <p className="font-display-lg text-headline-sm mb-6 leading-relaxed italic text-lg">"The Metro pass didn't just save me money; it saved me four hours of travel every day. That's four hours more for my dreams."</p>
                    <div>
                      <h4 className="font-bold text-lg">Priya Sharma</h4>
                      <p className="text-white/60 text-sm">Undergraduate Student, Kothrud Cluster</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-secondary-fixed/50 transition-all p-6">
                <div className="flex flex-col md:flex-row h-full gap-6">
                  <div className="w-full md:w-2/5 h-64 md:h-full overflow-hidden rounded-xl bg-white/10">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Rohan Deshmukh portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQw0r3vhjc6iN-edoSM_PqJNfYgvgmQFqb-ykYSGpEuVFu6R_GIkJKsV-QX7ng69TSAeBPG2Q1D3-DGdI67LriXfwiMWtXbZeqqlqN-VTD3wF9D2HIjfohVHS3PcYmf-Hy-jLFM9IIXt8HZ48GYvLDGw_qPdpAlXVHtp-UUl40MnK7DNwisJTiZgqYPB5cyxTFt4R4bUpQxZNLuNqjlKqiL-1b1FuupxfV2YkRwPCW090WwDfemY5U5vLf5Ogvekpu9Pjb1CdImvzL" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="material-symbols-outlined text-secondary-fixed mb-4">format_quote</span>
                    <p className="font-display-lg text-headline-sm mb-6 leading-relaxed italic text-lg">"Commuting to the tech park was once an obstacle. Now, the Metro is my bridge to a stable livelihood for my family."</p>
                    <div>
                      <h4 className="font-bold text-lg">Rohan Deshmukh</h4>
                      <p className="text-white/60 text-sm">Technical Support Lead, Hinjewadi Path</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobility Network Visualization */}
        <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-left">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-center py-12">
            <div className="lg:col-span-1 space-y-6">
              <h2 className="font-display-lg text-headline-md text-primary mb-6 font-bold text-2xl">Network Connectivity Index</h2>
              <p className="text-on-surface-variant">Mapping the geographical density of our beneficiaries against the arterial lines of the Pune Metro. Darker clusters indicate higher program penetration.</p>
              <div className="space-y-4">
                <div className="p-4 bg-surface-container rounded-lg border-l-4 border-primary">
                  <div className="font-bold text-sm">Line 1: PCMC to Swargate</div>
                  <div className="text-xs text-on-surface-variant">4,200 Active Passes</div>
                </div>
                <div className="p-4 bg-surface-container rounded-lg border-l-4 border-secondary">
                  <div className="font-bold text-sm">Line 2: Vanaz to Ramwadi</div>
                  <div className="text-xs text-on-surface-variant">5,850 Active Passes</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 relative aspect-video bg-surface-container-high rounded-2xl overflow-hidden border border-outline-variant/30 h-[380px]">
              <img className="w-full h-full object-cover opacity-80" alt="Minimalist white and blue map of Pune with neon routes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv61Q1L-ifDsYK4yg3W4trFHxZ7loanLJYXstUwdKPdbEYX2eU4cHVzZ1OoXendptl4bHo24USR0Od0clA0_KKL_9E8y1FePfqFGGD5GvClURIFgs0MWcRRTpRvqBtZkpnxuoxrYaCqm5qWJR6Ov9iVElgyvUFVfMt0ktSlllA5-vEA4LP2EiV9v5mJURDK4sVunnF31HDHGhfLfI6uIikkyXSfqGikgP6FfQi4DQYw5nxftFZdaXu4u9hmakakkIZXvaMiSwy0KAA" />
              <div className="absolute inset-0 bg-gradient-to-r from-surface-container-high/60 to-transparent"></div>
              <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-secondary rounded-full animate-ping"></div>
              <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-secondary rounded-full animate-ping delay-75"></div>
              <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-secondary rounded-full animate-ping delay-150"></div>
            </div>
          </div>
        </section>

        {/* Accessibility Timeline */}
        <section id="timeline" className="py-stack-lg bg-surface text-center">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-lg">
            <span className="font-label-caps text-label-caps text-secondary font-bold">METHODOLOGY</span>
            <h2 className="font-display-lg text-display-lg text-primary font-bold mt-2">From Identification to Impact</h2>
          </div>
          <div className="max-w-4xl mx-auto px-margin-mobile relative py-8 text-left">
            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-outline-variant before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant bg-surface group-hover:border-secondary transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="text-sm font-bold">01</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-sm">
                  <h4 className="font-bold text-primary">Citizen Identification</h4>
                  <p className="text-sm text-on-surface-variant">Socio-economic mapping of clusters along the 5km radius of each metro station.</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant bg-surface group-hover:border-secondary transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="text-sm font-bold">02</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-sm">
                  <h4 className="font-bold text-primary">Eligibility Verification</h4>
                  <p className="text-sm text-on-surface-variant">Seamless digital verification of academic or professional credentials via govt API.</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant bg-surface group-hover:border-secondary transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className="text-sm font-bold">03</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-sm">
                  <h4 className="font-bold text-primary">Smart Card Issuance</h4>
                  <p className="text-sm text-on-surface-variant">Distribution of NFC-enabled multi-modal transit cards at local community centers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Pillar CTA */}
        <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center py-12">
          <div className="relative rounded-3xl overflow-hidden bg-primary p-margin-mobile md:p-margin-desktop text-center text-white py-16 px-8">
            <div className="absolute inset-0 opacity-20"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="font-label-caps text-label-caps text-secondary-fixed mb-4 inline-block font-bold">WHAT'S NEXT?</span>
              <h2 className="font-display-lg text-display-lg mb-8 font-bold text-3xl">Pillar 3: Government Convergence</h2>
              <p className="font-body-lg text-white/80 mb-stack-lg">Discover how we are integrating metro accessibility with essential healthcare and civic services to create a truly inclusive urban ecosystem.</p>
              <Link to="/pillars/3" className="inline-flex items-center gap-3 bg-secondary text-on-secondary px-8 py-4 rounded-lg font-bold hover:opacity-90 transition-all group mt-6 shadow">
                Explore Pillar 3
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
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
