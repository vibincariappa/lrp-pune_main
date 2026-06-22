import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isHomePage) {
    /* Rich Light-Themed Footer for HomePage */
    return (
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
                  <Link to="/pillars/1" className="hover:text-secondary transition-colors cursor-pointer">
                    Institution Building
                  </Link>
                </li>
                <li>
                  <Link to="/pillars/2" className="hover:text-secondary transition-colors cursor-pointer">
                    Accessibility
                  </Link>
                </li>
                <li>
                  <Link to="/pillars/3" className="hover:text-secondary transition-colors cursor-pointer">
                    Government Convergence
                  </Link>
                </li>
                <li>
                  <Link to="/pillars/4" className="hover:text-secondary transition-colors cursor-pointer">
                    Health &amp; Well-being
                  </Link>
                </li>
                <li>
                  <Link to="/pillars/5" className="hover:text-secondary transition-colors cursor-pointer">
                    Employment Assistance
                  </Link>
                </li>
                <li>
                  <Link to="/pillars/6" className="hover:text-secondary transition-colors cursor-pointer">
                    Skill Building
                  </Link>
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
    );
  }

  /* Dark-Themed Footer for Pillar/Sub Pages */
  return (
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
  );
}
