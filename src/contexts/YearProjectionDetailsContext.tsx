import {
  createContext,
  type ReactNode,
  useState,
  useMemo,
  useContext,
} from "react";
import { useProjection } from "./ProjectionContext";
import type { YearlyProjectionData } from "../types/refactoringTypes";

interface YearProjectionDetailsContextProps {
  yearSelected: number;
  setYearSelected: (value: number) => void;
  selectedYearProjection: YearlyProjectionData;
}

const YearProjectionDetailsContext =
  createContext<YearProjectionDetailsContextProps | null>(null);

interface YearProjectionProviderProps {
  children: ReactNode;
}

export function YearProjectionProvider({
  children,
}: YearProjectionProviderProps) {
  const projectionData = useProjection();
  const [yearSelected, setYearSelected] = useState<number>(1);

  const selectedYearProjection = useMemo(() => {
    const data =
      projectionData.find((yearData) => yearData.year === yearSelected) ||
      projectionData[0];
    return data;
  }, [yearSelected, projectionData]);

  const value = { yearSelected, setYearSelected, selectedYearProjection };

  return (
    <YearProjectionDetailsContext.Provider value={value}>
      {children}
    </YearProjectionDetailsContext.Provider>
  );
}

export function useYearProjectionDetails() {
  const context = useContext(YearProjectionDetailsContext);
  if (!context) {
    throw new Error("Blah");
  }
  return context;
}
