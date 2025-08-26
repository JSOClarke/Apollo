import { useProjection } from "../contexts/ProjectionContext";

export default function useMilestoneConditional(amount: number) {
  const projectionData = useProjection();
  const yearData = projectionData.find((e) => {
    const totalAssets = e.assets.reduce((sum, i) => sum + i.amount, 0);
    if (totalAssets >= amount) {
      return e;
    }
  });
  return yearData?.year;
}
