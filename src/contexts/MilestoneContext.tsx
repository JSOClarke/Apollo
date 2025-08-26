import { createContext, useContext, useState, type ReactNode } from "react";
import type { Milestone } from "../types/refactoringTypes";
import { useMemo } from "react";
import { useProjection } from "./ProjectionContext";

interface MilestoneContextType {
  milestones: Milestone[];
  addMilestone: (milestoneOjection: Milestone) => void;
  updatedMilestones: Milestone[];
}

const MilestoneContext = createContext<MilestoneContextType | null>(null);

export default function MilestoneProvider({
  children,
}: {
  children: ReactNode;
}) {
  const projectionData = useProjection();
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const updatedMilestones: Milestone[] = useMemo(() => {
    const memoMilestones = milestones.map((i) => {
      if (i.type === "conditional" && i.amount !== undefined) {
        const yearData = projectionData.find((e) => {
          const totalAssets = e.assets.reduce((sum, j) => sum + j.amount, 0);
          return totalAssets >= i.amount;
        });
        return { ...i, year: yearData?.year };
      }
      return i;
    });
    return memoMilestones;
  }, [projectionData, milestones]);

  console.log("updatedMilestones", updatedMilestones);

  // convert the milestones into a format that will create the reference dots

  function addMilestone(data: Milestone) {
    setMilestones((prev) => [...prev, data]);
  }

  const value: MilestoneContextType = {
    milestones,
    addMilestone,
    updatedMilestones,
  };

  return (
    <MilestoneContext.Provider value={value}>
      {children}
    </MilestoneContext.Provider>
  );
}
export function useMilestone() {
  const context = useContext(MilestoneContext);
  if (!context) throw new Error("Blah");
  return context;
}
