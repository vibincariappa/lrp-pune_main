import React from "react";
import { useParams } from "react-router-dom";

export default function PillarPage() {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-background p-8 text-left space-y-6 pt-28 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary font-display-lg">Pillar Detail View (ID: {id})</h1>
      <p className="text-on-surface-variant font-body-md">View detailed charts and impact metrics for this growth pillar.</p>
    </div>
  );
}
