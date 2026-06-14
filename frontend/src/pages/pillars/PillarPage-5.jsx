import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePillar } from "../../hooks/usePillar";
import AnimatedCounter from "../../components/public/AnimatedCounter";
import ThreePillarAnimation from "../../components/public/ThreePillarAnimation";
import { motion } from "framer-motion";

export default function PillarPage5() {
  const navigate = useNavigate();
  const { data: apiResponse, isLoading } = usePillar(5);
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
  const displayReach = apiAttr?.reach ? parseInt(apiAttr.reach, 10) : 68;

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
        {/* Hero Section with Embedded Three.js Animation */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary text-white">
          {/* Three.js Background Layer */}
          <div className="absolute inset-0 w-full h-full z-0 bg-transparent opacity-85 pointer-events-none">
            <ThreePillarAnimation pillarId={5} />
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
              PILLAR FIVE
            </motion.span>
            
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl md:text-7xl text-white font-bold leading-tight tracking-tight"
            >
              Employment Assistance
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="font-body text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Bridging the gap between Pune's resilient communities and the burgeoning industrial landscape through systematic placement and long-term career support.
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
                  const el = document.getElementById("employment-ecosystem");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-label-caps text-label-caps transition-all hover:shadow-xl hover:-translate-y-0.5 cursor-pointer font-bold"
              >
                Explore Ecosystem
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("success-stories");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-white text-white px-8 py-4 rounded-lg font-label-caps text-label-caps transition-all hover:bg-white/5 cursor-pointer font-bold"
              >
                Transformations
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
                  Job Referrals
                </span>
                <span className="font-display text-3xl text-white font-bold">
                  <AnimatedCounter value={2589} />+
                </span>
              </div>

              {/* Metric Card 2 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-xl flex flex-col gap-1 shadow-sm hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-label text-[10px] text-white/60 uppercase tracking-wider font-bold">
                  Opportunities
                </span>
                <span className="font-display text-3xl text-white font-bold">
                  <AnimatedCounter value={1726} />+
                </span>
              </div>

              {/* Metric Card 3 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-xl flex flex-col gap-1 shadow-sm hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-label text-[10px] text-white/60 uppercase tracking-wider font-bold">
                  Individuals Supported
                </span>
                <span className="font-display text-3xl text-white font-bold">
                  <AnimatedCounter value={4008} />+
                </span>
              </div>

              {/* Metric Card 4 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-xl flex flex-col gap-1 shadow-sm hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-label text-[10px] text-white/60 uppercase tracking-wider font-bold">
                  Successful Placements
                </span>
                <span className="font-display text-3xl text-white font-bold">
                  <AnimatedCounter value={1140} />+
                </span>
              </div>
            </motion.div>
          </motion.div>

          <div
            onClick={() => {
              const el = document.getElementById("transformation-pathway");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 cursor-pointer z-10 hover:opacity-100 transition-opacity"
          >
            <span className="font-label text-[10px] uppercase tracking-widest text-white font-bold">Scroll to Journey</span>
            <div className="w-px h-12 bg-white animate-bounce"></div>
          </div>
        </section>

        {/* Section 2: Employment Ecosystem */}
        <section id="employment-ecosystem" className="py-32 bg-background max-w-7xl mx-auto px-margin-desktop scroll-mt-20">
          <div className="w-full text-left">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="font-headline text-5xl font-bold text-primary mb-6">Employment Ecosystem</h2>
                <p className="text-on-surface-variant text-lg">A robust framework designed to create sustainable livelihoods by integrating talent scouting with industry requirements.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">west</span>
                </div>
                <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">east</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Job Referrals */}
              <div className="bg-white p-10 border border-outline-variant/30 hover:border-secondary transition-all group rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-4xl text-secondary mb-8 block group-hover:scale-110 transition-transform">handshake</span>
                <h3 className="font-headline text-2xl font-bold text-primary mb-4">Job Referrals</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-8">Direct pipeline connecting vetted candidates with verified regional opportunities across Pune's industrial zones.</p>
                <div className="pt-6 border-t border-outline-variant/30 flex items-center justify-between">
                  <span className="font-label text-[10px] uppercase text-outline font-bold">Target Met</span>
                  <span className="font-headline text-xl font-bold text-secondary">92%</span>
                </div>
              </div>

              {/* Career Guidance */}
              <div className="bg-primary text-white p-10 transition-all hover:shadow-2xl rounded-xl">
                <span className="material-symbols-outlined text-4xl text-tertiary-fixed-dim mb-8 block">psychology</span>
                <h3 className="font-headline text-2xl font-bold mb-4">Career Guidance</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-8">Professional counseling focusing on aptitude mapping, resume enhancement, and digital literacy workshops.</p>
                <ul className="space-y-3 font-semibold">
                  <li className="flex items-center gap-2 text-[10px] font-label uppercase tracking-widest text-tertiary-fixed-dim">
                    <span className="material-symbols-outlined text-sm">check_circle</span> Aptitude Mapping
                  </li>
                  <li className="flex items-center gap-2 text-[10px] font-label uppercase tracking-widest text-tertiary-fixed-dim">
                    <span className="material-symbols-outlined text-sm">check_circle</span> Interview Prep
                  </li>
                </ul>
              </div>

              {/* Employment Support */}
              <div className="bg-white p-10 border border-outline-variant/30 hover:border-tertiary transition-all group rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-4xl text-on-tertiary-container mb-8 block group-hover:scale-110 transition-transform">support_agent</span>
                <h3 className="font-headline text-2xl font-bold text-primary mb-4">Employment Support</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-8">Post-placement mentorship for 90 days to ensure smooth transition and high retention rates.</p>
                <div className="flex items-end gap-2">
                  <span className="font-headline text-4xl font-bold text-primary">88%</span>
                  <span className="text-[10px] font-label uppercase text-outline pb-2 font-bold">Retention</span>
                </div>
              </div>

              {/* Industry Connections */}
              <div className="bg-surface-container p-10 border border-outline-variant/30 group rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-4xl text-primary mb-8 block group-hover:rotate-12 transition-transform">hub</span>
                <h3 className="font-headline text-2xl font-bold text-primary mb-4">Industry Connections</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-8">Exclusive partnerships with over 45+ regional enterprises for priority community hiring.</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-white rounded-full text-[9px] font-label uppercase tracking-tighter border border-outline-variant/30 font-bold text-primary">Logistics</span>
                  <span className="px-3 py-1 bg-white rounded-full text-[9px] font-label uppercase tracking-tighter border border-outline-variant/30 font-bold text-primary">Manufacturing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Pathway to Transformation */}
        <section id="transformation-pathway" className="py-32 bg-surface-container-low overflow-hidden scroll-mt-20">
          <div className="max-w-7xl mx-auto px-margin-desktop text-left">
            <div className="text-center mb-24">
              <h2 className="font-headline text-5xl font-bold text-primary mb-6">The Pathway to Transformation</h2>
              <p className="text-on-surface-variant max-w-xl mx-auto">Tracing the systematic journey from potential to prosperity.</p>
            </div>
            
            <div className="relative">
              {/* Connect line overlay */}
              <div className="hidden lg:block absolute top-8 left-12 right-12 h-0.5 bg-gradient-to-r from-primary via-secondary to-on-tertiary-container opacity-20"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                {/* Step 1 */}
                <div className="group">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-8 mx-auto lg:mx-0 border border-outline-variant/30 group-hover:bg-primary group-hover:text-white transition-all text-primary">
                    <span className="material-symbols-outlined text-2xl">person_search</span>
                  </div>
                  <div className="text-center lg:text-left">
                    <h4 className="font-headline text-xl font-bold text-primary mb-3">01 Identification</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">Intensive community outreach and deep skills assessment profiling.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="group">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-8 mx-auto lg:mx-0 border border-outline-variant/30 group-hover:bg-secondary group-hover:text-white transition-all text-secondary">
                    <span className="material-symbols-outlined text-2xl">model_training</span>
                  </div>
                  <div className="text-center lg:text-left">
                    <h4 className="font-headline text-xl font-bold text-primary mb-3">02 Readiness</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">Core competence development, soft skills, and digital search readiness.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="group">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-8 mx-auto lg:mx-0 border border-outline-variant/30 group-hover:bg-on-tertiary-container group-hover:text-white transition-all text-on-tertiary-container">
                    <span className="material-symbols-outlined text-2xl">work_history</span>
                  </div>
                  <div className="text-center lg:text-left">
                    <h4 className="font-headline text-xl font-bold text-primary mb-3">03 Placement</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">Strategic alignment with partner enterprises and formal onboarding.</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="group">
                  <div className="w-16 h-16 bg-primary rounded-2xl shadow-2xl flex items-center justify-center mb-8 mx-auto lg:mx-0 scale-105 border border-outline-variant/30 text-white">
                    <span className="material-symbols-outlined text-2xl">trending_up</span>
                  </div>
                  <div className="text-center lg:text-left">
                    <h4 className="font-headline text-xl font-bold text-primary mb-3">04 Growth</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">Continuous mentorship leading to wage flow and family stability.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Performance Analytics */}
        <section className="py-32 bg-white max-w-7xl mx-auto px-margin-desktop">
          <div className="w-full text-left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="font-headline text-5xl font-bold text-primary mb-8">Performance Analytics</h2>
                <p className="text-on-surface-variant text-lg mb-12 leading-relaxed">Precision-targeted employment strategies result in high impact across diverse community segments.</p>
                
                <div className="space-y-10">
                  {/* Bar chart simulation */}
                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <span className="font-label text-xs uppercase tracking-widest text-primary font-bold">Women's Participation</span>
                      <span className="font-headline text-2xl font-bold text-primary">42%</span>
                    </div>
                    <div className="h-2.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <span className="font-label text-xs uppercase tracking-widest text-primary font-bold">Youth Placements</span>
                      <span className="font-headline text-2xl font-bold text-primary">58%</span>
                    </div>
                    <div className="h-2.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-on-tertiary-container rounded-full" style={{ width: "58%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <span className="font-label text-xs uppercase tracking-widest text-primary font-bold">First-time Earners</span>
                      <span className="font-headline text-2xl font-bold text-primary">65%</span>
                    </div>
                    <div className="h-2.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center">
                <div className="w-full aspect-square max-w-[440px] bg-background rounded-full border border-outline-variant/30 flex items-center justify-center p-12 shadow-inner relative overflow-hidden">
                  {/* Donut Chart Overlay */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90 p-8" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#eae8e3" strokeWidth="8"></circle>
                    {/* Primary (Total placements segment - 64% - dasharray 160.7 out of 251.2) */}
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#1a365d" strokeDasharray="160.7 251.2" strokeLinecap="round" strokeWidth="10"></circle>
                    {/* Secondary (Target progress segment - 32% - dasharray 80.3, offset -160.7) */}
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#ed8936" strokeDasharray="80.3 251.2" strokeDashoffset="-160.7" strokeLinecap="round" strokeWidth="10"></circle>
                  </svg>
                  <div className="text-center z-10 bg-white/60 p-6 rounded-full backdrop-blur-sm">
                    <div className="font-label text-[10px] text-outline uppercase tracking-widest mb-1 font-bold">Total Placements</div>
                    <div className="font-display text-4xl md:text-5xl font-bold text-primary">1,850<span className="text-secondary">+</span></div>
                  </div>
                </div>
                {/* Decorative floating element */}
                <div className="absolute top-4 right-4 bg-on-tertiary-container text-white px-6 py-4 rounded-xl shadow-2xl animate-bounce">
                  <div className="font-headline text-xl font-bold">140%</div>
                  <div className="text-[8px] font-label uppercase tracking-widest font-bold">Avg Income Jump</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Livelihood Transformations */}
        <section id="success-stories" className="py-32 bg-surface-container-low max-w-7xl mx-auto px-margin-desktop scroll-mt-20">
          <div className="w-full text-left">
            <h2 className="font-headline text-5xl font-bold text-primary mb-24 text-center">Livelihood Transformations</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Story 1 */}
              <div className="bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-xl hover:shadow-2xl transition-all">
                <div className="md:w-1/2 relative h-80 md:h-auto min-h-[300px]">
                  <img
                    alt="Anjali Deshmukh"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDXghqGs_Z3usEgstUWg-WwDUs9qq5MNoIxwTYNL81MmTPUmwX3UBnZZh19mU43EQlq2GmbdN3GNL0TK30XMkESkwj-pwbKsQV16Loey4alCbWAwdZcxLtK611jKTpMvU9I3OcBruHErCp1KPOogkH57LY3OWhRT1reRWd_JRGvHhOnMTzn0PulMRv5jvbDgzH-roBEY8QCCn8kaE00sb9F9nikUegQn6ro-ps8B-Z2LFaU5JJQNtJA7niPQIygn0nHvxuKbD-_7rS"
                  />
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow border border-outline-variant/30">
                    <div className="font-bold text-primary">Anjali Deshmukh</div>
                    <div className="text-[8px] font-label uppercase tracking-widest text-outline font-bold">Jr. Logistics Coordinator</div>
                  </div>
                </div>
                <div className="md:w-1/2 p-10 flex flex-col justify-between">
                  <div>
                    <span className="material-symbols-outlined text-secondary text-5xl mb-6">format_quote</span>
                    <p className="font-display text-2xl italic text-primary leading-tight">
                      "The program didn't just find me a job; they gave me a career path I never thought possible for someone from my community."
                    </p>
                  </div>
                  <div className="mt-12 pt-8 border-t border-outline-variant/30">
                    <div className="font-label text-[9px] uppercase tracking-widest text-outline mb-4 font-bold">Impact Snapshot</div>
                    <div className="flex items-center gap-6">
                      <div className="text-secondary font-bold text-3xl">140%</div>
                      <div className="h-10 w-px bg-outline-variant"></div>
                      <div className="text-[9px] font-label uppercase tracking-widest leading-relaxed font-bold text-primary">
                        Household Income<br/>Increase
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story 2 */}
              <div className="bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-xl hover:shadow-2xl transition-all">
                <div className="md:w-1/2 relative h-80 md:h-auto min-h-[300px]">
                  <img
                    alt="Vikram Patil"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7cpe-W019ILRUd6fmCjwmUpJPSApi-jzNk1jUciOs2aoYzWD3KAzYL2OaPb9jsOVLJkVxLLSvrAo0vwYeXmxk3_TvZ13TAeAIJaSufc1LRnYMMuCCDpoPjteHAPQvrNwhoHkjDq8OQJbH-g5njjEqc660wF9FPWC7B_-DBPl3ZqmkJcZ_rf2sve79zNWVRUC3au3UXG5exzHRRl1e50RrC1Szwd9co1cKmfgH5Ddsju8_r8Ylgxn9GHgSsfZhyVsXy95Mk7GyrVzs"
                  />
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow border border-outline-variant/30">
                    <div className="font-bold text-primary">Vikram Patil</div>
                    <div className="text-[8px] font-label uppercase tracking-widest text-outline font-bold">Infra. Technician</div>
                  </div>
                </div>
                <div className="md:w-1/2 p-10 flex flex-col justify-between">
                  <div>
                    <span className="material-symbols-outlined text-on-tertiary-container text-5xl mb-6">format_quote</span>
                    <p className="font-display text-2xl italic text-primary leading-tight">
                      "Through the metro-connection pipeline, I secured a role in infrastructure maintenance within weeks."
                    </p>
                  </div>
                  <div className="mt-12 pt-8 border-t border-outline-variant/30">
                    <div className="font-label text-[9px] uppercase tracking-widest text-outline mb-4 font-bold">Impact Snapshot</div>
                    <div className="flex items-center gap-6">
                      <div className="text-on-tertiary-container font-bold text-3xl">210%</div>
                      <div className="h-10 w-px bg-outline-variant"></div>
                      <div className="text-[9px] font-label uppercase tracking-widest leading-relaxed font-bold text-primary">
                        Certified Skill<br/>Premium
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: The Opportunity Network */}
        <section className="py-32 bg-primary text-on-primary overflow-hidden">
          <div className="max-w-7xl mx-auto px-margin-desktop text-center">
            <h2 className="font-headline text-5xl font-bold text-white mb-10">The Opportunity Network</h2>
            <p className="text-white/70 max-w-3xl mx-auto text-xl mb-24 leading-relaxed font-light">We leverage spatial data and local industry demands to create a localized employment grid, ensuring community wealth remains within the community.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div>
                <div className="font-headline text-5xl font-bold text-secondary mb-4">45+</div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-label font-bold">Partner Companies</div>
              </div>
              <div>
                <div className="font-headline text-5xl font-bold text-white mb-4">12km</div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-label font-bold">Avg. Commute</div>
              </div>
              <div>
                <div className="font-headline text-5xl font-bold text-tertiary-fixed-dim mb-4">8/10</div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-label font-bold">Satisfaction Score</div>
              </div>
              <div>
                <div className="font-headline text-5xl font-bold text-white mb-4">₹1.2M</div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-label font-bold">Monthly Wage Flow</div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Pillar CTA */}
        <section className="py-24 bg-surface max-w-7xl mx-auto px-margin-desktop text-center">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-outline-variant/30 p-margin-mobile md:p-margin-desktop text-center py-16 px-8 shadow-sm">
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="font-label text-[10px] uppercase tracking-[0.5em] text-outline mb-4 inline-block font-bold">NEXT STRATEGIC STEP</span>
              <h3 className="font-headline text-5xl font-bold text-primary mb-6">Pillar 6: Skill Building</h3>
              <p className="text-on-surface-variant text-xl leading-relaxed max-w-2xl mx-auto">Advancing livelihoods through specialized vocational training and global standard certification.</p>
              
              <Link to="/pillars/6" className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-lg font-bold hover:opacity-90 transition-all group mt-6 shadow">
                Explore Pillar 6
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
            {/* Subtle background text */}
            <div className="absolute -bottom-10 -right-10 text-[200px] font-headline font-bold text-on-surface-variant/5 select-none pointer-events-none group-hover:text-secondary/5 transition-colors">06</div>
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
