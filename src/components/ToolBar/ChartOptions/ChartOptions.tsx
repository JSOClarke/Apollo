import { rechartsMap } from "../../../constants/rechartMap";
interface ChartOptionsProps {
  setSelectedChartId: (value: number) => void;
  selectedChartId: number;
}

export default function ChartOptions({
  setSelectedChartId,
  selectedChartId,
}: ChartOptionsProps) {
  return (
    <div className="bg-white rounded-xl flex p-2">
      <select
        name="chart-options"
        id="chart-options"
        value={selectedChartId}
        onChange={(e) => setSelectedChartId(Number(e.target.value))}
        className="toolbar-select-input"
      >
        {rechartsMap.map((i) => {
          return (
            <option key={i.chartId} value={i.chartId}>
              {i.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
