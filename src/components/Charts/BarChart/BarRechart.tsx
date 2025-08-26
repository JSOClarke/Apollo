import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  type TooltipContentProps,
  ReferenceDot,
} from "recharts";

import type {
  YearlyProjectionData,
  FlattenedYearlyProjection,
} from "../../../types/refactoringTypes";
import { useProjection } from "../../../contexts/ProjectionContext";
import { useYearProjectionDetails } from "../../../contexts/YearProjectionDetailsContext";
import CustomChartToolTip from "./customToolTip/CustomChartToolTip";
import { chartConstants } from "../../../constants/chartConstants";
import { unitMap } from "../../../constants/unitsMap";
import type { BarRectangleItem } from "recharts/types/cartesian/Bar";
import { useMilestone } from "../../../contexts/MilestoneContext";
import { useEffect, useMemo } from "react";
import useMilestoneReferenceDots from "../../../hooks/useMilestoneReferenceDots";

export default function BarRechart() {
  const { setYearSelected, yearSelected } = useYearProjectionDetails();
  const projectionData = useProjection();
  const barRadius: [number, number, number, number] = [5, 5, 0, 0];

  const flattenedData: FlattenedYearlyProjection[] = projectionData.map(
    (y: YearlyProjectionData) => ({
      year: y.year,
      totalIncome: y.incomeBreakdown.reduce((sum, i) => sum + i.amount, 0),
      totalExpenses: y.expenseBreakdown.reduce((sum, i) => sum + i.amount, 0),
      totalAssets: y.assets.reduce((sum, i) => sum + i.amount, 0),
      totalLiabilities: y.liabilities.reduce((sum, i) => sum + i.amount, 0),
      totalPassiveIncome: y.passiveIncomesHistory.reduce(
        (sum, i) => sum + i.amount,
        0
      ),
      milestones: y.milestones,
    })
  );

  const tickFormatterFormatter = (value: number) => {
    if (value >= unitMap.MILLION) {
      return `£${(value / unitMap.MILLION).toFixed(2)}m`;
    }
    if (value >= unitMap.THOUSAND) {
      return `£${value / unitMap.THOUSAND}k`;
    }

    return value.toString();
  };

  const handleBarClick = (
    data: any,
    index: number,
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    setYearSelected(data.payload.year);
  };

  const referenceDots = useMilestoneReferenceDots();
  console.log("milestonesDotMap", referenceDots);

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarChart
        data={flattenedData}
        barGap={0}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis
          width={50}
          tickFormatter={(value: number) => tickFormatterFormatter(value)}
        />

        <ReferenceLine x={yearSelected} strokeDasharray="3 3" stroke="red" />
        <Tooltip
          cursor={false}
          content={(props: TooltipContentProps<number, string>) => (
            <CustomChartToolTip {...props} />
          )}
        />

        <Bar
          dataKey={chartConstants[2].key}
          fill={chartConstants[2].color}
          barSize={30}
          stackId={"a"}
          onClick={handleBarClick}
          cursor="pointer"
          radius={barRadius}
        />
        {referenceDots.map((i, idx) => {
          return i;
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}
