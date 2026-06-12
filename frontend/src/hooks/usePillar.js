import { useQuery } from "@tanstack/react-query";
import { getPillar } from "../service/pillarService";

export const usePillar = (id) => {
  return useQuery({
    queryKey: ["pillar", id],
    queryFn: () => getPillar(id)
  });
};