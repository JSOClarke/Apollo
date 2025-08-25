import { Sankey, ResponsiveContainer, Tooltip } from "recharts";
import type {
  YearlyProjectionData,
  SankeyLink,
  SankeyNode,
} from "../../../types/refactoringTypes";
import type { SankeyData } from "recharts/types/chart/Sankey";
import { useFinancialData } from "../../../contexts/useFinancialData";
import { useYearProjectionDetails } from "../../../contexts/YearProjectionDetailsContext";

export default function SankeyRechart() {
  const { selectedYearProjection } = useYearProjectionDetails();

  const links: SankeyLink[] = [];

  if (!selectedYearProjection) {
    return <div>No data for selected year</div>;
  }
  const nodeNames = [
    ...selectedYearProjection.incomeBreakdown.map((i) => `Income: ${i.name}`),
    "Cash Balance",
    "Expenses",

    ...selectedYearProjection.expenseBreakdown.map((e) => `Expense: ${e.name}`),
    ...selectedYearProjection.assets.map((a) => `Asset: ${a.name}`),
    "Surplus",
    "Deficit",
    "Transfers",
  ];
  const nodes = nodeNames.map((name, index) => {
    let nodeColor = "#8884d8"; // default color

    if (name.startsWith("Income:")) {
      nodeColor = "#82ca9d"; // green for income
    } else if (name.startsWith("Expense:")) {
      nodeColor = "#ff7c7c"; // red for expenses
    } else if (name.startsWith("Asset:")) {
      nodeColor = "#ffc658"; // yellow for assets
    } else if (name === "Cash Balance") {
      nodeColor = "#8dd1e1"; // blue for cash
    }

    return { name, nodeColor };
  });

  console.log("nodes", nodes);
  console.log(nodes);
  selectedYearProjection.expenseBreakdown.forEach((exp) => {
    const sourceIndex = nodeNames.indexOf("Cash Balance");
    const targetIndex1 = nodeNames.indexOf("Expenses");
    const targetIndex2 = nodeNames.indexOf(`Expense: ${exp.name}`); // or Asset depending on logic

    links.push({
      source: sourceIndex,
      target: targetIndex1,
      value: exp.amount,
    });
    links.push({
      source: targetIndex1,
      target: targetIndex2,
      value: exp.amount,
    });
  });

  selectedYearProjection.incomeBreakdown.forEach((inc) => {
    const sourceIndex = nodeNames.indexOf(`Income: ${inc.name}`);
    const targetIndex1 = nodeNames.indexOf("Cash Balance");

    links.push({
      source: sourceIndex,
      target: targetIndex1,
      value: inc.amount,
    });
  });

  selectedYearProjection.surplusHistory.forEach((surp) => {
    const sourceIndex = nodeNames.indexOf("Cash Balance");
    const targetIndex = nodeNames.indexOf(
      `Asset: ${
        selectedYearProjection.assets.find((a) => a.id === surp.assetId)?.name
      }`
    );
    const middleIndex = nodeNames.indexOf("Transfers");
    links.push({
      source: sourceIndex,
      target: middleIndex,
      value: surp.amount,
    });
    links.push({
      source: middleIndex,
      target: targetIndex,
      value: surp.amount,
    });
  });

  selectedYearProjection.passiveIncomesHistory.forEach((p) => {
    const sourceIndex = nodeNames.indexOf(
      `Asset: ${
        selectedYearProjection.assets.find((a) => a.id === p.fromAssetId)?.name
      }`
    );
    const targetIndex1 = nodeNames.indexOf("Cash Balance");

    links.push({
      source: sourceIndex,
      target: targetIndex1,
      value: p.amount,
    });

    const targetIndex3 = nodeNames.indexOf(
      `Asset: ${
        selectedYearProjection.assets.find((a) => a.id === p.toAssetId)?.name
      }`
    );

    const targetIndex2 = nodeNames.indexOf("Transfers");
    links.push({
      source: targetIndex1,
      target: targetIndex2,
      value: p.amount,
    });
    links.push({
      source: targetIndex2,
      target: targetIndex3,
      value: p.amount,
    });
  });

  console.log("nodeNames", nodeNames);
  console.log("Links", links);

  const sankeyData: SankeyData = { nodes, links };
  console.log("sankeyData", sankeyData);
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
