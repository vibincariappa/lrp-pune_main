import React from "react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-8 text-left space-y-6 pt-28 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary font-display-lg">LRP Admin Dashboard</h1>
      <p className="text-on-surface-variant font-body-md">Manage livelihood metrics, stories, and pillars.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-outline-variant/20 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-primary">Upload Data</h3>
          <p className="text-sm text-on-surface-variant mt-1">Upload CSV or PDF data for processing.</p>
        </div>
      </div>
    </div>
  );
}
