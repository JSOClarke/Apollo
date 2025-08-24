import BarRechart from "../components/Charts/BarChart/BarRechart";
import Sidebar from "../components/SidebarProjections/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-2 flex-1">
      <div className="flex flex-1 bar-chart-container bg-white rounded-xl p-2 min-h-90  ">
        <BarRechart />
      </div>
      <div className="md:min-w-100 flex-shrink-0 yearly-projection-details bg-white rounded-xl p-2 ">
        <Sidebar />
      </div>
    </div>
  );
}
