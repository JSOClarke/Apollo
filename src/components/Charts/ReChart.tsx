import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ReChartProps {
  yearlyProjectionData: YearlyProjection[];
  setYearSelected: (year: number) => void;
  yearSelected: number;
}

export default function ReChart({
  yearlyProjectionData,
  setYearSelected,
  yearSelected,
}: ReChartProps) {
  const barRadius: [number, number, number, number] = [5, 5, 0, 0];

  console.log("chartData", yearlyProjectionData);

  const flattenedData: FlattenedYearlyProjection[] = yearlyProjectionData.map(
    (y: YearlyProjection) => ({
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

  const handleBarClick = (data: YearlyProjection) => {
    setYearSelected(data.year);
  };

  return (
    <ResponsiveContainer width={400} height={200}>
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
        <Tooltip />
        <Bar
          dataKey="totalAssets"
          fill={"red"}
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
