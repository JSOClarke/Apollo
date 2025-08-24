import { createContext, useContext, useMemo, type ReactNode } from "react";
import { calculateProjection } from "../utils/projections/projectionCalculation";
import { useFinancialData } from "./useFinancialData";
import type { YearlyProjectionData } from "../types/refactoringTypes";

const ProjectionContext = createContext<YearlyProjectionData[] | null>(null);

interface ProjectionsProviderProps {
  children: ReactNode;
}

export function ProjectionsProvider({ children }: ProjectionsProviderProps) {
  const { incomes, expenses, liabilities, assets } = useFinancialData();

  const projectionData = useMemo(() => {
    return calculateProjection({ incomes, expenses, liabilities, assets }, 64);
  }, [incomes, expenses, assets, liabilities]);

  return (
    <ProjectionContext.Provider value={projectionData}>
      {children}
    </ProjectionContext.Provider>
  );
}

export function useProjection() {
  const context = useContext(ProjectionContext);
  if (!context)
    throw new Error("useProjection must be used inside ProjectionProvider");
  return context;
}
