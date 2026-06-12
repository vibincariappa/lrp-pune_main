import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PillarPage1 from "./PillarPage-1";
import PillarPage2 from "./PillarPage-2";

export default function PillarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pillarId = parseInt(id, 10) || 1;

  useEffect(() => {
    if (pillarId > 2 || pillarId < 1) {
      navigate("/");
    }
  }, [pillarId, navigate]);

  if (pillarId === 1) return <PillarPage1 />;
  if (pillarId === 2) return <PillarPage2 />;

  return null;
}
