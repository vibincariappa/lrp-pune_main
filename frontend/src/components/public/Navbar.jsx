import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    if (isHomePage) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 h-20 flex justify-between items-center px-margin-mobile md:px-margin-desktop left-0 right-0 max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold hover:opacity-85">
          {isHomePage ? "Pune Metro Livelihood" : "Pune Metro Impact"}
        </Link>
      </div>

      {isHomePage ? (
        /* Desktop Menu for Home Page */
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
      ) : (
        /* Desktop Menu for Pillar/Sub Pages */
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
      )}

      <div className="hidden md:flex items-center gap-4">
        {isHomePage ? (
          <>
            <Link
              to="/team/login"
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-300 mr-2 text-xs"
            >
              Staff Login
            </Link>
            <button
              onClick={(e) => handleScrollTo(e, "impact")}
              className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-caps text-label-caps transition-all duration-300 hover:opacity-90 active:scale-95 cursor-pointer shadow-sm hover:shadow"
            >
              Explore Impact
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="bg-secondary text-on-secondary px-6 py-2.5 rounded-lg font-label-caps text-label-caps hover:bg-on-secondary-container transition-all cursor-pointer shadow-sm"
          >
            Support Program
          </button>
        )}
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
          {isHomePage ? (
            <>
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
              <Link
                to="/team/login"
                className="w-full text-center font-label-caps text-label-caps text-primary hover:opacity-85 py-2 block text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Staff Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="font-label-caps text-label-caps text-primary hover:opacity-85" onClick={() => setMobileMenuOpen(false)}>
                Programs
              </Link>
              <Link to="/" className="font-label-caps text-label-caps text-primary hover:opacity-85" onClick={() => setMobileMenuOpen(false)}>
                Livelihoods
              </Link>
              <Link to="/" className="font-label-caps text-label-caps text-primary hover:opacity-85" onClick={() => setMobileMenuOpen(false)}>
                Data Portal
              </Link>
              <Link to="/" className="font-label-caps text-label-caps text-primary hover:opacity-85" onClick={() => setMobileMenuOpen(false)}>
                News
              </Link>
              <Link to="/" className="font-label-caps text-label-caps text-primary hover:opacity-85" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/");
                }}
                className="w-full bg-secondary text-on-secondary py-3 rounded-lg font-label-caps text-label-caps"
              >
                Support Program
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
