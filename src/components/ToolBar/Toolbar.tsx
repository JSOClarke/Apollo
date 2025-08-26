import ChartOptions from "./ChartOptions/ChartOptions";
import MilestoneInput from "./Milestone/MilestoneInput";

interface ToolBarProps {
  setSelectedChartId: (value: number) => void;
  selectedChartId: number;
}

export default function Toolbar({
  selectedChartId,
  setSelectedChartId,
}: ToolBarProps) {
  return (
    <div className="flex w-full gap-2">
      <MilestoneInput />

      <ChartOptions
        setSelectedChartId={setSelectedChartId}
        selectedChartId={selectedChartId}
      />
    </div>
  );
}
