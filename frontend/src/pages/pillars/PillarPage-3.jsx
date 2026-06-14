import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePillar } from "../../hooks/usePillar";
import AnimatedCounter from "../../components/public/AnimatedCounter";
import ThreePillarAnimation from "../../components/public/ThreePillarAnimation";

export default function PillarPage3() {
  const navigate = useNavigate();
  const { data: apiResponse, isLoading } = usePillar(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const apiAttr = apiResponse?.success ? apiResponse.data.attributes : null;
  const displayTitle = apiAttr?.title || "Government Convergence";
  const displayReach = apiAttr?.reach ? parseInt(apiAttr.reach, 10) : null;

  return (
    <div className="bg-background text-on-background font-body selection:bg-secondary-container selection:text-on-secondary-container min-h-screen">
      {/* Navigation */}
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
          {/* Three.js Container */}
          <div className="absolute inset-0 w-full h-full z-0 bg-transparent">
            <ThreePillarAnimation pillarId={3} />
          </div>
          
          <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
            <span className="font-label text-label-caps text-secondary uppercase tracking-[0.3em] mb-4 block">
              Pillar Three
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-primary mb-6 font-bold">
              {displayTitle}
            </h1>
            <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Bridging the final mile through institutional synergy. We synchronize public policy with local execution to ensure no citizen is left behind.
            </p>
            {displayReach && (
              <div className="mt-8 text-xs font-label text-primary border border-primary/20 bg-primary/5 px-4 py-2 rounded-lg inline-block w-fit">
                CURRENT REACH: <span className="font-bold">{displayReach}%</span> Target Accomplished
              </div>
            )}
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
            <span className="material-symbols-outlined text-primary text-3xl">expand_more</span>
          </div>
        </section>

        {/* SECTION 7: SCHEME EXPLORER */}
        <section className="py-24 bg-surface px-8 md:px-16" id="scheme-explorer">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-16 text-left">
              <span className="font-label text-label-caps text-on-tertiary-container mb-2 block uppercase tracking-wider">
                Institutional Portfolio
              </span>
              <h2 className="font-display text-4xl text-primary mb-4 font-bold">
                Scheme Explorer
              </h2>
              <p className="text-on-surface-variant max-w-2xl">
                A curated repository of primary social security architectures currently active in the ecosystem.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Ayushman Bharat */}
              <div className="bg-surface-container-lowest p-6 border border-outline-variant rounded-lg transition-all duration-300 hover:border-primary hover:-translate-y-1 group cursor-pointer text-left shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded text-primary">
                    <span className="material-symbols-outlined text-2xl">health_and_safety</span>
                  </div>
                  <span className="font-label text-[10px] px-2 py-1 bg-green-100 text-green-800 rounded font-bold">ACTIVE</span>
                </div>
                <h3 className="font-headline text-xl mb-2 text-primary font-bold">Ayushman Bharat</h3>
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">
                  Universal healthcare coverage providing a safety net for vulnerable families.
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[11px] font-label text-outline mb-1">
                      <span>COVERAGE</span>
                      <span className="text-primary font-bold">
                        <AnimatedCounter value={98} />.2%
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: "98.2%" }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/50">
                    <span className="material-symbols-outlined text-xs text-on-tertiary-container">verified</span>
                    <span className="font-label text-[10px] text-on-tertiary-container uppercase tracking-wider font-semibold">Validated by Pulse</span>
                  </div>
                </div>
              </div>

              {/* PDS */}
              <div className="bg-surface-container-lowest p-6 border border-outline-variant rounded-lg transition-all duration-300 hover:border-primary hover:-translate-y-1 group cursor-pointer text-left shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded text-primary">
                    <span className="material-symbols-outlined text-2xl">nutrition</span>
                  </div>
                  <span className="font-label text-[10px] px-2 py-1 bg-green-100 text-green-800 rounded font-bold">ACTIVE</span>
                </div>
                <h3 className="font-headline text-xl mb-2 text-primary font-bold">Distribution System</h3>
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">
                  Ensuring food security through efficient grain and nutrient logistics.
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[11px] font-label text-outline mb-1">
                      <span>EFFICIENCY</span>
                      <span className="text-primary font-bold">
                        <AnimatedCounter value={95} />.4%
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: "95.4%" }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/50">
                    <span className="material-symbols-outlined text-xs text-on-tertiary-container">verified</span>
                    <span className="font-label text-[10px] text-on-tertiary-container uppercase tracking-wider font-semibold">Validated by Pulse</span>
                  </div>
                </div>
              </div>

              {/* Pension */}
              <div className="bg-surface-container-lowest p-6 border border-outline-variant rounded-lg transition-all duration-300 hover:border-primary hover:-translate-y-1 group cursor-pointer text-left shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded text-primary">
                    <span className="material-symbols-outlined text-2xl">payments</span>
                  </div>
                  <span className="font-label text-[10px] px-2 py-1 bg-yellow-100 text-yellow-800 rounded font-bold">REVIEWING</span>
                </div>
                <h3 className="font-headline text-xl mb-2 text-primary font-bold">Pension Schemes</h3>
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">
                  Dignified financial security for elderly citizens and specialized groups.
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[11px] font-label text-outline mb-1">
                      <span>DISTRIBUTION</span>
                      <span className="text-primary font-bold">
                        <AnimatedCounter value={92} />.0%
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/50">
                    <span className="material-symbols-outlined text-xs text-on-tertiary-container">history</span>
                    <span className="font-label text-[10px] text-on-tertiary-container uppercase tracking-wider font-semibold">In Verification</span>
                  </div>
                </div>
              </div>

              {/* Aadhar */}
              <div className="bg-surface-container-lowest p-6 border border-outline-variant rounded-lg transition-all duration-300 hover:border-primary hover:-translate-y-1 group cursor-pointer text-left shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded text-primary">
                    <span className="material-symbols-outlined text-2xl">fingerprint</span>
                  </div>
                  <span className="font-label text-[10px] px-2 py-1 bg-green-100 text-green-800 rounded font-bold">ACTIVE</span>
                </div>
                <h3 className="font-headline text-xl mb-2 text-primary font-bold">Aadhar Support</h3>
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">
                  Biometric identity integration for seamless benefit transfers.
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[11px] font-label text-outline mb-1">
                      <span>ENROLLMENT</span>
                      <span className="text-primary font-bold">
                        <AnimatedCounter value={100} />%
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/50">
                    <span className="material-symbols-outlined text-xs text-on-tertiary-container">verified</span>
                    <span className="font-label text-[10px] text-on-tertiary-container uppercase tracking-wider font-semibold">Validated by Pulse</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: PROGRAM ANALYTICS */}
        <section className="py-24 bg-surface-container-low px-8 md:px-16 border-y border-outline-variant/50 animate-fadeIn" id="program-analytics">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-16">
              <span className="font-label text-label-caps text-on-tertiary-container mb-2 block uppercase tracking-wider">
                Analytical Engine
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-primary mb-4 font-bold">
                Impact Transparency
              </h2>
              <p className="text-on-surface-variant max-w-xl mx-auto">
                Real-time quantification of program performance across critical touchpoints.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
              {/* Chart 1 */}
              <div className="bg-white p-8 rounded-lg border border-outline-variant/30 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="font-headline text-lg text-primary font-bold">Beneficiary Growth</h4>
                    <p className="text-xs font-label text-outline uppercase tracking-wider">Monthly New Enrollments</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-label text-primary tracking-tighter font-bold">
                      +12.5k
                    </div>
                    <div className="text-[10px] font-label text-green-600 flex items-center justify-end font-semibold">
                      <span className="material-symbols-outlined text-xs mr-0.5">trending_up</span> 15% WoW
                    </div>
                  </div>
                </div>
                {/* SVG Chart Simulation */}
                <div className="h-64 w-full relative">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 160">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#002045" stopOpacity={0.15}></stop>
                        <stop offset="100%" stopColor="#002045" stopOpacity={0}></stop>
                      </linearGradient>
                    </defs>
                    <path d="M0,140 C50,130 100,100 150,110 C200,120 250,50 300,60 C350,70 400,20 450,30 L450,160 L0,160 Z" fill="url(#chartGradient)"></path>
                    <path d="M0,140 C50,130 100,100 150,110 C200,120 250,50 300,60 C350,70 400,20 450,30" fill="none" stroke="#002045" strokeWidth="2.5"></path>
                    <circle cx="150" cy="110" fill="#002045" r="4"></circle>
                    <circle cx="300" cy="60" fill="#002045" r="4"></circle>
                  </svg>
                  <div className="flex justify-between mt-4 px-2">
                    <span className="text-[10px] font-label text-outline font-semibold">JAN</span>
                    <span className="text-[10px] font-label text-outline font-semibold">MAR</span>
                    <span className="text-[10px] font-label text-outline font-semibold">MAY</span>
                    <span className="text-[10px] font-label text-outline font-semibold">JUL</span>
                    <span className="text-[10px] font-label text-outline font-semibold">SEP</span>
                    <span className="text-[10px] font-label text-outline font-semibold">NOV</span>
                  </div>
                </div>
              </div>

              {/* Chart 2 */}
              <div className="bg-white p-8 rounded-lg border border-outline-variant/30 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="font-headline text-lg text-primary font-bold">Adoption Trends</h4>
                    <p className="text-xs font-label text-outline uppercase tracking-wider">Departmental Efficiency</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-label text-primary tracking-tighter font-bold">
                      <AnimatedCounter value={88} />%
                    </div>
                    <div className="text-[10px] font-label text-green-600 flex items-center justify-end font-semibold">
                      <span className="material-symbols-outlined text-xs mr-0.5">trending_up</span> 8% MoM
                    </div>
                  </div>
                </div>
                {/* CSS Bar Chart Simulation */}
                <div className="h-64 w-full flex items-end justify-around gap-2 px-4 pb-2 border-b border-outline-variant/20">
                  <div className="flex flex-col items-center gap-4 w-full group">
                    <div className="w-full bg-surface-container-high relative rounded-t-sm h-[180px]">
                      <div className="absolute bottom-0 w-full bg-primary-container group-hover:bg-primary transition-all duration-500 rounded-t-sm" style={{ height: "75%" }}></div>
                    </div>
                    <span className="text-[10px] font-label text-outline uppercase font-bold">Health</span>
                  </div>
                  <div className="flex flex-col items-center gap-4 w-full group">
                    <div className="w-full bg-surface-container-high relative rounded-t-sm h-[180px]">
                      <div className="absolute bottom-0 w-full bg-primary-container group-hover:bg-primary transition-all duration-500 rounded-t-sm" style={{ height: "90%" }}></div>
                    </div>
                    <span className="text-[10px] font-label text-outline uppercase font-bold">Food</span>
                  </div>
                  <div className="flex flex-col items-center gap-4 w-full group">
                    <div className="w-full bg-surface-container-high relative rounded-t-sm h-[180px]">
                      <div className="absolute bottom-0 w-full bg-primary-container group-hover:bg-primary transition-all duration-500 rounded-t-sm" style={{ height: "60%" }}></div>
                    </div>
                    <span className="text-[10px] font-label text-outline uppercase font-bold">Income</span>
                  </div>
                  <div className="flex flex-col items-center gap-4 w-full group">
                    <div className="w-full bg-surface-container-high relative rounded-t-sm h-[180px]">
                      <div className="absolute bottom-0 w-full bg-primary-container group-hover:bg-primary transition-all duration-500 rounded-t-sm" style={{ height: "82%" }}></div>
                    </div>
                    <span className="text-[10px] font-label text-outline uppercase font-bold">ID</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 11: PHOTO GALLERY */}
        <section className="py-24 bg-surface px-8 md:px-16" id="community-gallery">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-16 text-left">
              <span className="font-label text-label-caps text-on-tertiary-container mb-2 block uppercase tracking-wider">
                Ground Reality
              </span>
              <h2 className="font-display text-4xl text-primary mb-4 font-bold">
                Impact Gallery
              </h2>
              <p className="text-on-surface-variant max-w-2xl">
                Witness the convergence of policy and people across the region's diverse landscapes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Item 1 */}
              <div className="relative group overflow-hidden rounded-lg shadow shadow-primary/5 aspect-[4/3] bg-surface-variant">
                <img
                  alt="Awareness Camp"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuARucHU34e9mQlnD1XbBQe5g1HuwaiTqw9OBjKs6CyAap2iLZyU8MVaMWmPfDfVqgrYRj9aEi0wgZ-ipHlB0gRdz8QIiINwd3BLy1odzFspJLHBxJx9mxWZ5zavc5w8LRnN6CHscjto5elDEygcNXwltuZDEf1cP7zEAhWYx59dgjeM0XMuJYvAAc98pOLHyjkLNRT9OmjGUuIio6Wvrnzy5sV8-bYUZu0VweTY51b8hiunGCaKnPtSBQ"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                  <span className="font-label text-[10px] text-white/80 uppercase tracking-widest mb-1 font-semibold">Awareness Camps</span>
                  <h5 className="text-white font-headline text-lg font-bold">Local Synergy Workshop</h5>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative group overflow-hidden rounded-lg shadow shadow-primary/5 aspect-[4/3] bg-surface-variant">
                <img
                  alt="Support Drive"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI6XgL8s1REJe-O2m9lMMh6-yJE1GVmw6Yx_0l2KEImBxsQMVNqYXFu3FrfuKQqnumL6EemUtZtEr0hIwusHkkHrkTWHWddkhTvnzn1aXvlJ4RPYc5n-vf3jHuMffUAmmYDj8fDXGbFUpEPl1JGxpMriy-xvqssMDY60gxkFiiujwVtWYEdjdlCLTATA4H8OYFmaaD_q7E8lKTMOB0svqwDEZ8uqfne0PC2JAVTSVghjEcKMdo0_5s1g"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                  <span className="font-label text-[10px] text-white/80 uppercase tracking-widest mb-1 font-semibold">Application Support</span>
                  <h5 className="text-white font-headline text-lg font-bold">One-Stop Digital Desk</h5>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative group overflow-hidden rounded-lg shadow shadow-primary/5 aspect-[4/3] bg-surface-variant">
                <img
                  alt="Community Meeting"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQz68l4NqTnaLfRbMoKVyEYVtL_nDqzyUiGXbexb8qGklavN24UQo_imgAjAPInce7Ftv1CoC5gmAN4tCvm24nPDXxolwQchGac18vaDDLbwjLViZbrxqgfxMgBaEP7zZCyzZ77wcCWNyCcWppopu0hj-K8ZZxpgPoyBpjsfpS76Tnh4zTgVRnzJ1NXUakq67sY6Vf-q-rGzZK6j9XAYJQ3qaiETAtqWWvKnzYdHb9KAdURa2ViZpCFA"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                  <span className="font-label text-[10px] text-white/80 uppercase tracking-widest mb-1 font-semibold">Community Meetings</span>
                  <h5 className="text-white font-headline text-lg font-bold">Pillar 3 Strategy Session</h5>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer / Next CTA */}
        <section className="py-32 bg-primary text-on-primary text-center px-8 relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
            <span className="font-label text-label-caps text-secondary-fixed mb-4 block tracking-[0.4em] uppercase font-bold">
              Next Phase
            </span>
            <h2 className="font-display text-5xl mb-12 font-bold text-white leading-tight">
              Livelihood Sustainability
            </h2>
            <Link
              to="/pillars/4"
              className="inline-flex items-center gap-4 bg-secondary text-on-secondary px-8 py-4 rounded group hover:opacity-90 transition-all font-bold shadow"
            >
              <span className="font-label uppercase tracking-widest text-sm">Explore Pillar 4</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
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
