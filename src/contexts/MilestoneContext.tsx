import { createContext, useContext, useState, type ReactNode } from "react";
import type { Milestone } from "../types/refactoringTypes";

interface MilestoneFormData {
  name: string;
  year: number;
}

interface MilestoneContextType {
  milestones: Milestone[];
  addMilestone: (milestoneOjection: Milestone) => void;
}

const MilestoneContext = createContext<MilestoneContextType | null>(null);

export default function MilestoneProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  // convert the milestones into a format that will create the reference dots

  function addMilestone(data: Milestone) {
    setMilestones((prev) => [...prev, data]);
  }

  const value: MilestoneContextType = { milestones, addMilestone };

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
