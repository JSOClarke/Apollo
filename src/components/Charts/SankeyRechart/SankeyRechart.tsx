import { Sankey, ResponsiveContainer, Tooltip } from "recharts";
import { useSankeyData } from "../../../hooks/useSankeyData";
export default function SankeyRechart() {
  const sankeyData = useSankeyData();

  return (
    <div className="h-[100%] w-[100%]  flex items-center justify-center mt-20 ">
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <Sankey data={sankeyData} nodePadding={50} nodeWidth={20}>
          <Tooltip />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}
