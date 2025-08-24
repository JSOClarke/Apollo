import ChartBar from "../components/Charts/BarChart/ChartBar";
import YearlyProjectionDetails from "../components/YearlyProjectionDetails/YearlyProjectionDetails";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-2 flex-1">
      <div className="flex flex-1 bar-chart-container bg-white rounded-xl p-2 min-h-90 border border-red-500 ">
        <ChartBar />
      </div>
      <div className=" md:w-50 flex-shrink-0 yearly-projection-details bg-white rounded-xl p-2 ">
        <YearlyProjectionDetails />
      </div>
    </div>
  );
}
