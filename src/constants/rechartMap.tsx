import BarRechart from "../components/Charts/BarChart/BarRechart";
import SankeyRechart from "../components/Charts/SankeyRechart/SankeyRechart";
import { type ReactNode } from "react";

export interface reChartsMapType {
  name: string;
  label: string;
  element: ReactNode;
  chartId: number;
}
export const rechartsMap = [
  {
    name: "barChart",
    label: "Bar Chart",
    element: <BarRechart />,
    chartId: 1,
  },
  {
    name: "sankeyChart",
    label: "Sankey Chart",
    element: <SankeyRechart />,
    chartId: 2,
  },
];
