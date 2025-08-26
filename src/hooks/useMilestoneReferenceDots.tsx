import { useMemo } from "react";
import { useMilestone } from "../contexts/MilestoneContext";
import { useProjection } from "../contexts/ProjectionContext";
import { ReferenceDot } from "recharts";

export default function useMilestoneReferenceDots() {
  const projectionData = useProjection();
  const { milestones } = useMilestone();
  const referenceDots = useMemo(() => {
    const baseMilestonesDotMap = milestones.map((i) => {
      const yearData = projectionData.find((e) => e.year === i.year);
      const maxValueY =
        yearData?.assets.reduce((sum, i) => sum + i.amount, 0) || 0;
      const offsetMaxValueY = maxValueY + 30000;
      return (
        <ReferenceDot
          x={i.year}
          y={offsetMaxValueY}
          r={7}
          fill={i.colour}
          stroke="white"
          strokeWidth={1}
        />
      );
    });
    return baseMilestonesDotMap;
  }, [projectionData, milestones]);
  return referenceDots;
}
