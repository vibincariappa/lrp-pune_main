import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePillar } from "../../hooks/usePillar";
import AnimatedCounter from "../../components/public/AnimatedCounter";
import ThreePillarAnimation from "../../components/public/ThreePillarAnimation";
import { motion } from "framer-motion";

export default function PillarPage4() {
  const navigate = useNavigate();
  const { data: apiResponse, isLoading } = usePillar(4);
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
  const displayReach = apiAttr?.reach ? parseInt(apiAttr.reach, 10) : 98;

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
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Three.js Background Layer */}
          <div className="absolute inset-0 w-full h-full z-0 bg-transparent opacity-85 pointer-events-none">
            <ThreePillarAnimation pillarId={4} />
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
              PILLAR FOUR
            </motion.span>
            
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl md:text-7xl text-primary font-bold leading-tight tracking-tight"
            >
              Health &amp; <span className="text-secondary italic">Well-being</span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
            >
              Enhancing community well-being through preventive healthcare, outreach programs, health camps, and digital health initiatives.
            </motion.p>

            <motion.div variants={itemVariants}>
              <div className="text-xs font-label text-primary border border-primary/20 bg-primary/5 px-4 py-2 rounded-lg inline-block">
                CURRENT REACH: <span className="font-bold">{displayReach}%</span> Target Accomplished
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center pt-2"
            >
              <button
                onClick={() => {
                  const el = document.getElementById("health-initiatives");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label-caps text-label-caps transition-all hover:shadow-xl hover:-translate-y-0.5 cursor-pointer font-bold"
              >
                Explore Reach
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("success-stories");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-primary text-primary px-8 py-4 rounded-lg font-label-caps text-label-caps transition-all hover:bg-primary/5 cursor-pointer font-bold"
              >
                Success Stories
              </button>
            </motion.div>

            {/* Metric Preview inside Hero container - moved below CTA */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left w-full mt-10 max-w-4xl"
            >
              {/* Metric Card 1 */}
              <div className="bg-white/40 backdrop-blur-md border border-outline-variant/30 p-5 rounded-xl flex flex-col gap-1 shadow-sm hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-label text-[10px] text-tertiary uppercase tracking-wider font-bold">
                  Total Beneficiaries
                </span>
                <span className="font-display text-3xl text-primary font-bold">
                  <AnimatedCounter value={12400} />+
                </span>
              </div>

              {/* Metric Card 2 */}
              <div className="bg-white/40 backdrop-blur-md border border-outline-variant/30 p-5 rounded-xl flex flex-col gap-1 shadow-sm hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-label text-[10px] text-secondary uppercase tracking-wider font-bold">
                  Health Camps
                </span>
                <span className="font-display text-3xl text-primary font-bold">
                  <AnimatedCounter value={142} />+
                </span>
              </div>

              {/* Metric Card 3 */}
              <div className="bg-white/40 backdrop-blur-md border border-outline-variant/30 p-5 rounded-xl flex flex-col gap-1 shadow-sm hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-label text-[10px] text-primary uppercase tracking-wider font-bold">
                  Mobile Van Visits
                </span>
                <span className="font-display text-3xl text-primary font-bold">
                  <AnimatedCounter value={850} />+
                </span>
              </div>

              {/* Metric Card 4 */}
              <div className="bg-white/40 backdrop-blur-md border border-outline-variant/30 p-5 rounded-xl flex flex-col gap-1 shadow-sm hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-label text-[10px] text-tertiary uppercase tracking-wider font-bold">
                  ABHA Registrations
                </span>
                <span className="font-display text-3xl text-primary font-bold">
                  <AnimatedCounter value={9200} />+
                </span>
              </div>
            </motion.div>
          </motion.div>

          <div
            onClick={() => {
              const el = document.getElementById("journey-pathway");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 cursor-pointer z-10 hover:opacity-100 transition-opacity"
          >
            <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">Scroll to Journey</span>
            <div className="w-px h-12 bg-primary animate-bounce"></div>
          </div>
        </section>

        {/* Section 2: Health Initiatives Overview */}
        <section id="health-initiatives" className="py-24 bg-surface max-w-7xl mx-auto px-margin-desktop scroll-mt-20">
          <div className="w-full text-left">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <h2 className="font-label text-xs text-secondary uppercase tracking-[0.2em] mb-4 font-bold">Our Methodology</h2>
                <h3 className="text-4xl font-headline font-bold text-primary">Core Health Initiatives</h3>
              </div>
              <div className="text-on-surface-variant font-body text-sm max-w-sm">
                A multi-layered approach to urban health, bridging the gap between clinical facilities and community doorsteps.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="group bg-surface-container-low p-8 rounded-xl border border-outline-variant/30 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-lg mb-6 group-hover:scale-110 transition-transform text-primary">
                  <span className="material-symbols-outlined text-3xl">medical_services</span>
                </div>
                <h4 className="text-xl font-headline font-semibold text-primary mb-4">Health Camps</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Comprehensive diagnostic and specialist consultations delivered directly to metro hubs and neighborhoods.</p>
                <div className="flex items-center gap-2 text-primary font-label text-xs font-bold uppercase tracking-tight">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  4,200+ Screened
                </div>
              </div>

              {/* Card 2 */}
              <div className="group bg-surface-container-low p-8 rounded-xl border border-outline-variant/30 hover:bg-white hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-500">
                <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center rounded-lg mb-6 group-hover:scale-110 transition-transform text-secondary">
                  <span className="material-symbols-outlined text-3xl">local_shipping</span>
                </div>
                <h4 className="text-xl font-headline font-semibold text-primary mb-4">Mobile Van</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Equipped mobile medical units providing high-frequency visits to underserved clusters for routine checkups.</p>
                <div className="flex items-center gap-2 text-secondary font-label text-xs font-bold uppercase tracking-tight">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                  </span>
                  850+ Monthly Visits
                </div>
              </div>

              {/* Card 3 */}
              <div className="group bg-surface-container-low p-8 rounded-xl border border-outline-variant/30 hover:bg-white hover:shadow-2xl hover:shadow-tertiary/5 transition-all duration-500">
                <div className="w-12 h-12 bg-tertiary-fixed-dim/20 flex items-center justify-center rounded-lg mb-6 group-hover:scale-110 transition-transform text-on-tertiary-container">
                  <span className="material-symbols-outlined text-3xl">fingerprint</span>
                </div>
                <h4 className="text-xl font-headline font-semibold text-primary mb-4">ABHA Registration</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Facilitating Ayushman Bharat Health Accounts to ensure digitized, portable medical records for every citizen.</p>
                <div className="flex items-center gap-2 text-on-tertiary-container font-label text-xs font-bold uppercase tracking-tight">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-on-tertiary-container opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-on-tertiary-container"></span>
                  </span>
                  9,200+ IDs Generated
                </div>
              </div>

              {/* Card 4 */}
              <div className="group bg-surface-container-low p-8 rounded-xl border border-outline-variant/30 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-lg mb-6 group-hover:scale-110 transition-transform text-primary">
                  <span className="material-symbols-outlined text-3xl">groups</span>
                </div>
                <h4 className="text-xl font-headline font-semibold text-primary mb-4">Community Outreach</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Localized awareness drives focusing on preventive care, maternal health, and seasonal disease management.</p>
                <div className="flex items-center gap-2 text-primary font-label text-xs font-bold uppercase tracking-tight">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  12k+ Touched
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Community Health Journey */}
        <section id="journey-pathway" className="py-24 bg-primary text-on-primary relative overflow-hidden scroll-mt-20">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-margin-desktop text-center">
            <h3 className="text-3xl font-headline font-bold text-center mb-16 text-white">The Continuity of Care Pathway</h3>
            <div className="relative py-12">
              {/* Animated Path Line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/20 -translate-y-1/2 hidden md:block">
                <div className="h-full bg-secondary-container w-3/4 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative">
                {/* Milestone 1 */}
                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center mb-4 border-4 border-primary group-hover:scale-110 transition-transform z-10 shadow-lg">
                    <span className="material-symbols-outlined text-2xl font-bold">campaign</span>
                  </div>
                  <h5 className="font-headline font-bold mb-2 text-white">Outreach</h5>
                  <p className="text-xs text-on-primary-container font-semibold">Doorstep Awareness</p>
                </div>
                {/* Milestone 2 */}
                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center mb-4 border-4 border-primary group-hover:scale-110 transition-transform z-10 shadow-lg">
                    <span className="material-symbols-outlined text-2xl font-bold">event_note</span>
                  </div>
                  <h5 className="font-headline font-bold mb-2 text-white">Camp</h5>
                  <p className="text-xs text-on-primary-container font-semibold">Localized Testing</p>
                </div>
                {/* Milestone 3 */}
                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <div className="w-16 h-16 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-4 border-4 border-primary group-hover:scale-110 transition-transform z-10 shadow-lg font-bold">
                    <span className="material-symbols-outlined text-2xl font-bold">biotech</span>
                  </div>
                  <h5 className="font-headline font-bold mb-2 text-secondary-container">Screening</h5>
                  <p className="text-xs text-on-primary-container font-semibold">Vital Vitals Check</p>
                </div>
                {/* Milestone 4 */}
                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center mb-4 border-4 border-primary group-hover:scale-110 transition-transform z-10 shadow-lg">
                    <span className="material-symbols-outlined text-2xl font-bold">stethoscope</span>
                  </div>
                  <h5 className="font-headline font-bold mb-2 text-white">Consultation</h5>
                  <p className="text-xs text-on-primary-container font-semibold">Specialist Opinion</p>
                </div>
                {/* Milestone 5 */}
                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center mb-4 border-4 border-primary group-hover:scale-110 transition-transform z-10 shadow-lg">
                    <span className="material-symbols-outlined text-2xl font-bold">history</span>
                  </div>
                  <h5 className="font-headline font-bold mb-2 text-white">Follow-up</h5>
                  <p className="text-xs text-on-primary-container font-semibold">Medication Tracking</p>
                </div>
                {/* Milestone 6 */}
                <div className="flex flex-col items-center text-center group cursor-pointer">
                  <div className="w-16 h-16 bg-tertiary-fixed-dim text-on-tertiary-fixed rounded-full flex items-center justify-center mb-4 border-4 border-primary group-hover:scale-110 transition-transform z-10 shadow-lg font-bold">
                    <span className="material-symbols-outlined text-2xl font-bold">favorite</span>
                  </div>
                  <h5 className="font-headline font-bold mb-2 text-tertiary-fixed-dim">Well-being</h5>
                  <p className="text-xs text-on-primary-container font-semibold">Sustained Health</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 & 6: Data & Demographics */}
        <section className="py-24 bg-surface-container-low max-w-7xl mx-auto px-margin-desktop">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
              {/* Participation Trends */}
              <div className="lg:col-span-8 bg-white p-8 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h4 className="font-headline font-bold text-primary text-2xl">Reach Expansion</h4>
                    <p className="text-on-surface-variant text-sm">Monthly participation growth across all health activities</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-[10px] font-label-caps uppercase tracking-tighter font-semibold">Camps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      <span className="text-[10px] font-label-caps uppercase tracking-tighter font-semibold">Mobile Van</span>
                    </div>
                  </div>
                </div>

                {/* SVG/CSS Chart Simulation */}
                <div className="h-80 w-full relative flex items-end justify-between gap-4 px-4 pb-2 border-l border-b border-outline-variant/20">
                  {/* Jan */}
                  <div className="flex-1 flex flex-col justify-end gap-1 h-full items-center group relative">
                    <div className="w-full bg-primary/20 h-[30%] rounded-t relative">
                      <div className="absolute inset-x-0 bottom-0 bg-primary h-[85%] rounded-t transition-all group-hover:opacity-80"></div>
                    </div>
                    <div className="w-full bg-secondary/20 h-[20%] rounded-t relative">
                      <div className="absolute inset-x-0 bottom-0 bg-secondary h-[70%] rounded-t transition-all group-hover:opacity-80"></div>
                    </div>
                    <span className="text-[10px] font-label-caps text-on-surface-variant mt-1 font-semibold">JAN</span>
                  </div>
                  {/* Feb */}
                  <div className="flex-1 flex flex-col justify-end gap-1 h-full items-center group relative">
                    <div className="w-full bg-primary/20 h-[45%] rounded-t relative">
                      <div className="absolute inset-x-0 bottom-0 bg-primary h-[90%] rounded-t transition-all group-hover:opacity-80"></div>
                    </div>
                    <div className="w-full bg-secondary/20 h-[35%] rounded-t relative">
                      <div className="absolute inset-x-0 bottom-0 bg-secondary h-[80%] rounded-t transition-all group-hover:opacity-80"></div>
                    </div>
                    <span className="text-[10px] font-label-caps text-on-surface-variant mt-1 font-semibold">FEB</span>
                  </div>
                  {/* Mar */}
                  <div className="flex-1 flex flex-col justify-end gap-1 h-full items-center group relative">
                    <div className="w-full bg-primary/20 h-[60%] rounded-t relative">
                      <div className="absolute inset-x-0 bottom-0 bg-primary h-[70%] rounded-t transition-all group-hover:opacity-80"></div>
                    </div>
                    <div className="w-full bg-secondary/20 h-[50%] rounded-t relative">
                      <div className="absolute inset-x-0 bottom-0 bg-secondary h-[75%] rounded-t transition-all group-hover:opacity-80"></div>
                    </div>
                    <span className="text-[10px] font-label-caps text-on-surface-variant mt-1 font-semibold">MAR</span>
                  </div>
                  {/* Apr */}
                  <div className="flex-1 flex flex-col justify-end gap-1 h-full items-center group relative">
                    <div className="w-full bg-primary/20 h-[55%] rounded-t relative">
                      <div className="absolute inset-x-0 bottom-0 bg-primary h-[85%] rounded-t transition-all group-hover:opacity-80"></div>
                    </div>
                    <div className="w-full bg-secondary/20 h-[45%] rounded-t relative">
                      <div className="absolute inset-x-0 bottom-0 bg-secondary h-[80%] rounded-t transition-all group-hover:opacity-80"></div>
                    </div>
                    <span className="text-[10px] font-label-caps text-on-surface-variant mt-1 font-semibold">APR</span>
                  </div>
                  {/* May */}
                  <div className="flex-1 flex flex-col justify-end gap-1 h-full items-center group relative">
                    <div className="w-full bg-primary/20 h-[75%] rounded-t relative">
                      <div className="absolute inset-x-0 bottom-0 bg-primary h-[95%] rounded-t transition-all group-hover:opacity-80"></div>
                    </div>
                    <div className="w-full bg-secondary/20 h-[60%] rounded-t relative">
                      <div className="absolute inset-x-0 bottom-0 bg-secondary h-[90%] rounded-t transition-all group-hover:opacity-80"></div>
                    </div>
                    <span className="text-[10px] font-label-caps text-on-surface-variant mt-1 font-semibold">MAY</span>
                  </div>
                  {/* Jun */}
                  <div className="flex-1 flex flex-col justify-end gap-1 h-full items-center group relative">
                    <div className="w-full bg-primary/20 h-[90%] rounded-t relative">
                      <div className="absolute inset-x-0 bottom-0 bg-primary h-[88%] rounded-t transition-all group-hover:opacity-80"></div>
                    </div>
                    <div className="w-full bg-secondary/20 h-[75%] rounded-t relative">
                      <div className="absolute inset-x-0 bottom-0 bg-secondary h-[85%] rounded-t transition-all group-hover:opacity-80"></div>
                    </div>
                    <span className="text-[10px] font-label-caps text-on-surface-variant mt-1 font-semibold">JUN</span>
                  </div>
                  {/* Jul */}
                  <div className="flex-1 flex flex-col justify-end gap-1 h-full items-center group relative">
                    <div className="w-full bg-primary/20 h-[95%] rounded-t relative">
                      <div className="absolute inset-x-0 bottom-0 bg-primary h-[92%] rounded-t transition-all group-hover:opacity-80"></div>
                    </div>
                    <div className="w-full bg-secondary/20 h-[80%] rounded-t relative">
                      <div className="absolute inset-x-0 bottom-0 bg-secondary h-[88%] rounded-t transition-all group-hover:opacity-80"></div>
                    </div>
                    <span className="text-[10px] font-label-caps text-on-surface-variant mt-1 font-semibold">JUL</span>
                  </div>
                </div>
              </div>

              {/* Demographics Donut */}
              <div className="lg:col-span-4 bg-white p-8 rounded-xl border border-outline-variant/30 flex flex-col items-center shadow-sm">
                <h4 className="font-headline font-bold text-primary text-2xl mb-2 w-full">Beneficiary Focus</h4>
                <p className="text-on-surface-variant text-sm mb-8 w-full">Inclusivity in healthcare delivery</p>
                <div className="relative w-48 h-48 mb-8">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="transparent" r="40" className="stroke-surface-container-high" strokeWidth="12"></circle>
                    {/* Women (62%) - Dasharray 155.7 out of 251.2 */}
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#002045" strokeDasharray="155.7 251.2" strokeDashoffset="0" strokeWidth="12"></circle>
                    {/* Seniors (18%) - Dasharray 45.2, offset to start after Women */}
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#ed8936" strokeDasharray="45.2 251.2" strokeDashoffset="-155.7" strokeWidth="12"></circle>
                    {/* Children (12%) - Dasharray 30.1, offset to start after Seniors */}
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#61abac" strokeDasharray="30.1 251.2" strokeDashoffset="-200.9" strokeWidth="12"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-headline font-bold text-primary">12.4k</span>
                    <span className="text-[10px] font-label-caps uppercase text-outline font-bold">Total</span>
                  </div>
                </div>
                <div className="w-full space-y-4 font-body-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                      <span className="text-xs font-semibold">Women</span>
                    </div>
                    <span className="font-label text-xs font-bold">62%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                      <span className="text-xs font-semibold">Senior Citizens</span>
                    </div>
                    <span className="font-label text-xs font-bold">18%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-on-tertiary-container"></div>
                      <span className="text-xs font-semibold">Children</span>
                    </div>
                    <span className="font-label text-xs font-bold">12%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Healthcare Success Stories (Masonry) */}
        <section id="success-stories" className="py-24 bg-surface max-w-7xl mx-auto px-margin-desktop scroll-mt-20">
          <div className="w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-headline font-bold text-primary mb-4">Human Impact Stories</h2>
              <p className="text-on-surface-variant max-w-xl mx-auto font-body-md">Real journeys of recovery and well-being supported by our health interventions.</p>
            </div>
            
            <div className="columns-1 md:columns-3 gap-8 space-y-8 text-left">
              {/* Story 1 */}
              <div className="break-inside-avoid bg-white p-6 rounded-xl border border-outline-variant/30 group hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-lg">
                <img
                  className="w-full h-64 object-cover rounded-lg mb-6 group-hover:scale-[1.01] transition-transform duration-500"
                  alt="Saraswati M."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2Ry34T3bxzm0lx4GLFaWBVvuYxtcvjo3frk-0EgTGlM07DJF65R49F666Xek0W7tsWPOKi1DyxBl_EzPjT9Ttietkc_24teM8baiYMrsNpPlg7MBJaQs5WTrWjkedy4D6VNBYcD_T4QbQjFKozrX1fXKaC1BxTZAaG9Ha2u24yMG2eV7DV5fcZwrizwGIreZF5rrCDKpehETXk4yP9cvkLXH70z71m_AE3WjvoDZDRvwP2JMpRVkhUJqNugXeoAkKZ9GGQ4wEZD38"
                />
                <div className="font-label text-[10px] text-secondary uppercase tracking-widest mb-2 font-bold">Pimpri Hub</div>
                <blockquote className="text-base font-display italic text-primary mb-6 leading-relaxed">
                  "The mobile health van is a blessing. As a senior, traveling to hospitals was hard. Now, my diabetes is managed right at my doorstep."
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/20">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">SM</div>
                  <div>
                    <div className="text-sm font-bold text-primary">Saraswati M.</div>
                    <div className="text-[10px] text-on-surface-variant font-semibold">Senior Beneficiary</div>
                  </div>
                </div>
              </div>

              {/* Story 2 */}
              <div className="break-inside-avoid bg-white p-6 rounded-xl border border-outline-variant/30 group hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-lg">
                <img
                  className="w-full h-80 object-cover rounded-lg mb-6 group-hover:scale-[1.01] transition-transform duration-500"
                  alt="Dr. Rahul P."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj-jG6e6Fb1uNd18w5P3e3_LsJ7iIw1FvbyzIMCV1yY3S4F3uj4E6iqKi6YtGf3x6iMii4S-YawNAkkTQ0geif7NyY02XZhCXkkM4DAnB-BVcbatpZ-pgbltRrYN6jLhiWZeq5nYM_24MXaiply8LtlfItFIDTdJ0B-3JpWaqMUOcqd5gQ9virE75rNXkRNvWLW5-BVfA7vrw3Gryqa-zhq2hKXpJDNzRj3zPITkWfbEbLgZG1c-oY5MYJdf4zUNlRN2aPxPWDBh2O"
                />
                <div className="font-label text-[10px] text-on-tertiary-container uppercase tracking-widest mb-2 font-bold">Program Impact</div>
                <blockquote className="text-base font-display italic text-primary mb-6 leading-relaxed">
                  "Creating 9,000+ ABHA IDs has fundamentally changed how these families view their health. Data is empowerment."
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/20">
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed-dim/30 text-on-tertiary-fixed flex items-center justify-center text-xs font-bold">RP</div>
                  <div>
                    <div className="text-sm font-bold text-primary">Dr. Rahul P.</div>
                    <div className="text-[10px] text-on-surface-variant font-semibold">Lead Outreach Coordinator</div>
                  </div>
                </div>
              </div>

              {/* Story 3 */}
              <div className="break-inside-avoid bg-white p-6 rounded-xl border border-outline-variant/30 group hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-lg">
                <img
                  className="w-full h-56 object-cover rounded-lg mb-6 group-hover:scale-[1.01] transition-transform duration-500"
                  alt="Anjali K."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYoYMV28KhjYnv4_uT9AJxgG9S78ZTPnTxDrMdjuIHr8WtH7JyXGKBIny_1HfnTalI6BD8JyMrneeychJyrXJ9FMZ3xYdlPwQMnUZJsic8pLCSiKromBt2xwOkoF5doMshIMaxLcM1LcZkPxN7OzzqAOPeTty4mcT59Mnsp2O4ZD5ReykXulmo3_8_SOVpehqDJiiCCZlXp2Tq_bZ6ltij_w9yzs4LAKbU3NUO_nDgVeampWwyy4kzKZttUKk1V_hPVkN86r0eBlwQ"
                />
                <div className="font-label text-[10px] text-primary uppercase tracking-widest mb-2 font-bold">Community Camp</div>
                <blockquote className="text-base font-display italic text-primary mb-6 leading-relaxed">
                  "My children received their basic checkups and vaccinations all at once. The camp was so efficient."
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/20">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-bold">AK</div>
                  <div>
                    <div className="text-sm font-bold text-primary">Anjali K.</div>
                    <div className="text-[10px] text-on-surface-variant font-semibold">Mother of Two</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Community Health Network Visualization */}
        <section className="py-24 bg-tertiary text-on-tertiary overflow-hidden">
          <div className="max-w-7xl mx-auto px-margin-desktop text-left relative">
            <div className="md:w-1/2 mb-16">
              <h2 className="text-4xl font-headline font-bold mb-6 text-white">The Service Network</h2>
              <p className="text-tertiary-fixed-dim leading-relaxed font-body-md">Our infrastructure is designed as a living web, connecting centralized clinical expertise with decentralized community access points. Every node represents a life touched and a health journey secured.</p>
            </div>
            
            <div className="relative h-[250px] w-full border border-white/10 rounded-2xl bg-black/20 flex items-center justify-center overflow-hidden px-6">
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-4xl">
                <div className="text-center group">
                  <div className="w-4 h-4 bg-secondary rounded-full mx-auto mb-4 animate-pulse"></div>
                  <div className="font-label text-xs uppercase tracking-widest text-secondary-fixed-dim font-bold">8 Hubs</div>
                  <div className="text-[10px] opacity-70 font-semibold mt-1">Primary Care</div>
                </div>
                <div className="text-center group">
                  <div className="w-4 h-4 bg-on-tertiary-container rounded-full mx-auto mb-4 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                  <div className="font-label text-xs uppercase tracking-widest text-tertiary-fixed-dim font-bold">142 Satellite</div>
                  <div className="text-[10px] opacity-70 font-semibold mt-1">Health Camps</div>
                </div>
                <div className="text-center group">
                  <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-4 animate-pulse" style={{ animationDelay: "1s" }}></div>
                  <div className="font-label text-xs uppercase tracking-widest text-primary-fixed-dim font-bold">850 Nodes</div>
                  <div className="text-[10px] opacity-70 font-semibold mt-1">Mobile Service</div>
                </div>
                <div className="text-center group">
                  <div className="w-4 h-4 bg-secondary-container rounded-full mx-auto mb-4 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
                  <div className="font-label text-xs uppercase tracking-widest text-secondary-fixed font-bold">12k+ Links</div>
                  <div className="text-[10px] opacity-70 font-semibold mt-1">Beneficiary Network</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 12: Next Pillar Transition */}
        <section className="py-24 bg-surface max-w-7xl mx-auto px-margin-desktop text-center">
          <div className="relative rounded-3xl overflow-hidden bg-primary p-margin-mobile md:p-margin-desktop text-center text-white py-16 px-8">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="font-label-caps text-label-caps text-secondary-fixed mb-4 inline-block font-bold">UP NEXT</span>
              <h2 className="font-display-lg text-display-lg mb-8 font-bold text-3xl">Pillar 5: Employment Assistance</h2>
              <p className="font-body-lg text-white/80 mb-stack-lg leading-relaxed max-w-2xl mx-auto">From well-being to livelihood. Learn how we bridge health security with economic opportunities through specialized job placement and training programs.</p>
              
              <div className="flex gap-12 justify-center mb-8">
                <div>
                  <div className="text-2xl font-headline font-bold text-secondary-container">2,450+</div>
                  <div className="text-[10px] font-label-caps uppercase text-on-primary-container font-semibold">Jobs Facilitated</div>
                </div>
                <div>
                  <div className="text-2xl font-headline font-bold text-secondary-container">48</div>
                  <div className="text-[10px] font-label-caps uppercase text-on-primary-container font-semibold">Partner Companies</div>
                </div>
              </div>

              <Link to="/pillars/5" className="inline-flex items-center gap-3 bg-secondary text-on-secondary px-8 py-4 rounded-lg font-bold hover:opacity-90 transition-all group mt-6 shadow">
                Explore Pillar 5
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
