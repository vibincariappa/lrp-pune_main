import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function PerformanceCharts({ growthData, distributionData }) {
  // Area Chart default data if missing
  const defaultGrowth = [
    { name: "Q1 2022", assistance: 100, directSupport: 50 },
    { name: "Q3 2022", assistance: 400, directSupport: 180 },
    { name: "Q1 2023", assistance: 650, directSupport: 320 },
    { name: "Q3 2023", assistance: 980, directSupport: 490 },
    { name: "Q1 2024", assistance: 1240, directSupport: 620 }
  ];

  // Pie Chart default data if missing
  const defaultDistribution = [
    { name: "Vocational Skills", value: 42, color: "#002045" },
    { name: "Healthcare", value: 28, color: "#61abac" },
    { name: "Education", value: 18, color: "#ffb55c" },
    { name: "Direct Subsidy", value: 12, color: "#c4c6cf" }
  ];

  const gData = growthData || defaultGrowth;
  const dData = distributionData || defaultDistribution;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
      {/* Program Growth Area Chart */}
      <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-headline-sm text-primary text-headline-sm">Program Growth</h3>
            <p className="text-on-surface-variant text-sm font-body-md mt-1">Cumulative impact metrics 2022-2026</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-xs font-label-caps">Assistance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-on-tertiary-container"></div>
              <span className="text-xs font-label-caps">Direct Support</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={gData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAssistance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#002045" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#002045" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSupport" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#61abac" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#61abac" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#74777f" fontSize={11} tickLine={false} />
              <YAxis stroke="#74777f" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e4e2dd" }} />
              <Area
                type="monotone"
                dataKey="assistance"
                stroke="#002045"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAssistance)"
              />
              <Area
                type="monotone"
                dataKey="directSupport"
                stroke="#61abac"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSupport)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Beneficiary Distribution Pie Chart */}
      <div className="bg-white p-8 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-headline-sm text-primary text-headline-sm">Beneficiary Distribution</h3>
          <p className="text-on-surface-variant text-sm font-body-md mt-1 mb-4">By Primary Sector Focus</p>
        </div>

        <div className="h-44 w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {dData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || "#002045"} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-primary font-display-lg">100%</span>
            <span className="text-[10px] text-outline font-label-caps">Focus</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {dData.map((entry, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || "#002045" }}></div>
                <span className="text-sm text-on-surface font-body-md">{entry.name}</span>
              </div>
              <span className="font-data-num text-sm text-primary">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
