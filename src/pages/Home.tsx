import { useState } from "react";
import ChartOptions from "../components/ChartOptions/ChartOptions";
import Sidebar from "../components/SidebarProjections/Sidebar";
import { rechartsMap } from "../constants/rechartMap";

export default function Home() {
  const [selectedChartId, setSelectedChartId] = useState<number>(
    rechartsMap[0].chartId
  );
  const selectedContent = rechartsMap.find(
    (i) => i.chartId === selectedChartId
  );
  return (
    <div className="flex flex-col md:flex-row gap-2 flex-1">
      <div className="flex flex-col flex-1 gap-2">
        <div>
          <ChartOptions
            setSelectedChartId={setSelectedChartId}
            selectedChartId={selectedChartId}
          />
        </div>
        <div className="flex-col  flex-1 bar-chart-container bg-white rounded-xl p-2 flex items-center justify-center min-h-90 ">
          {selectedContent?.element}
        </div>
      </div>
      <div className="md:min-w-100 flex-shrink-0 yearly-projection-details bg-white rounded-xl p-2 ">
        <Sidebar />
      </div>
    </div>
  );
}
