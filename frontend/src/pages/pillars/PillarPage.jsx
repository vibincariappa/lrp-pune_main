import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PillarPage1 from "./PillarPage-1";
import PillarPage2 from "./PillarPage-2";
import PillarPage3 from "./PillarPage-3";
import PillarPage4 from "./PillarPage-4";
import PillarPage5 from "./PillarPage-5";
import PillarPage6 from "./PillarPage-6";

export default function PillarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pillarId = parseInt(id, 10) || 1;

  useEffect(() => {
    if (pillarId > 6 || pillarId < 1) {
      navigate("/");
    }
  }, [pillarId, navigate]);

  if (pillarId === 1) return <PillarPage1 />;
  if (pillarId === 2) return <PillarPage2 />;
  if (pillarId === 3) return <PillarPage3 />;
  if (pillarId === 4) return <PillarPage4 />;
  if (pillarId === 5) return <PillarPage5 />;
  if (pillarId === 6) return <PillarPage6 />;

  return null;
}
