import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipContentProps,
} from "recharts";

import type {
  YearlyProjectionData,
  FlattenedYearlyProjection,
} from "../../../types/refactoringTypes";
import { useProjection } from "../../../contexts/ProjectionContext";
import { useYearProjectionDetails } from "../../../contexts/YearProjectionDetailsContext";
import CustomChartToolTip from "./customToolTip/CustomChartToolTip";
import { chartConstants } from "../../../constants/chartConstants";

export default function BarRechart() {
  const { setYearSelected } = useYearProjectionDetails();
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

  const handleBarClick = (data: YearlyProjectionData) => {
    setYearSelected(data.year);
  };

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
          width={100}
          tickFormatter={(value: number) => `£${value.toLocaleString("en-GB")}`}
        />
        <Tooltip
          cursor={false}
          content={(props: TooltipContentProps<number, string>) => (
            <CustomChartToolTip {...props} />
          )}
        />{" "}
        <Bar
          dataKey="totalAssets"
          fill={chartConstants[2].color}
          barSize={30}
          stackId={"a"}
          onClick={handleBarClick}
          cursor="pointer"
          radius={barRadius}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
