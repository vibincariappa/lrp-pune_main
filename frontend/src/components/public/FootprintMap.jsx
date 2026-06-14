import React, { useState } from "react";

export default function FootprintMap() {
  const [activeCluster, setActiveCluster] = useState(null);

  const clusters = [
    {
      id: "pc",
      name: "Pimpri-Chinchwad Cluster",
      coords: "Line 1 North",
      color: "bg-primary",
      desc: "Livelihood support, vocational centers, and direct assistance for 450+ families near PCMC corridor.",
      top: "25%",
      left: "35%"
    },
    {
      id: "cp",
      name: "Central Pune Hub",
      coords: "Line 1 & 2 Intersection",
      color: "bg-secondary",
      desc: "Community Hub and central training centers serving health and convergence services for 600+ families.",
      top: "45%",
      left: "48%"
    },
    {
      id: "ve",
      name: "Vanaz Extension Zone",
      coords: "Line 2 West",
      color: "bg-tertiary",
      desc: "Accessibility and skill-building programs active for 190+ PWDs and students.",
      top: "65%",
      left: "28%"
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-gutter items-center">
      {/* Cluster Details Side-Panel */}
      <div className="w-full md:w-1/3 space-y-6">
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">
          Operational Footprint
        </h2>
        <p className="font-body-lg text-on-surface-variant mb-6">
          Our interventions span across 5 major clusters along the Metro Line 1 & 2, ensuring no family is left behind.
        </p>
        <ul className="space-y-4">
          {clusters.map((c) => (
            <li
              key={c.id}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeCluster === c.id
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-outline-variant/30 bg-surface/50 hover:border-outline"
              }`}
              onClick={() => setActiveCluster(c.id === activeCluster ? null : c.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${c.color}`}></div>
                <span className="font-label-caps text-sm font-semibold text-primary">{c.name}</span>
              </div>
              {activeCluster === c.id && (
                <div className="mt-2 text-sm text-on-surface-variant animate-fadeIn">
                  <p className="font-medium text-xs text-secondary">{c.coords}</p>
                  <p className="mt-1">{c.desc}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Styled Map Container */}
      <div className="w-full md:w-2/3 h-[500px] rounded-2xl overflow-hidden border border-outline-variant/30 shadow-inner relative bg-[#E5E3DF]">
        <img
          className="w-full h-full object-cover grayscale opacity-55"
          alt="Pune Transit Map"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPb7zjgW7ql5Jc1nh8ySY-D3new86CExkZYwp9Yf3ON8Vl6t7nJfxQlzK9fNjuX_YWYYSkNNXxDWHS00UMZgSjnUnFjFzVqnWvDS8OraFaeToDndQgwrD8pYDlDUjiP4hY_uR5GRmSrXhauEwdAuEMARzK5C0BJXYuOBCfjuVT9KpVtiUVYUiyu26tMeedHroTXaPbHuNezFTdki00T83P6gvwTLR3ssjbqAmqpNur2QWmdmcbN1R8ThoS40KAO5OUiEAWwiyKczd0"
        />
        
        {/* Connection Metro line overlay path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 35 25 L 48 45 L 28 65" fill="none" stroke="#2b6cb0" strokeWidth="0.7" strokeDasharray="2" opacity="0.6" />
        </svg>

        {/* Dynamic Markers */}
        {clusters.map((c) => (
          <div
            key={c.id}
            className="absolute cursor-pointer group"
            style={{ top: c.top, left: c.left }}
            onClick={() => setActiveCluster(c.id === activeCluster ? null : c.id)}
          >
            <div className={`w-4 h-4 rounded-full ${c.color} animate-ping absolute opacity-75`} />
            <div className={`w-4 h-4 rounded-full ${c.color} relative border-2 border-white shadow`} />
            
            {/* Map Mini Tooltip */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-primary text-on-primary text-xs px-3 py-1.5 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              <p className="font-bold">{c.name}</p>
              <p className="opacity-75">{c.coords}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
