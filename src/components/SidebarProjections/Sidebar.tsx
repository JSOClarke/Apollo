import type { YearlyProjectionData } from "../../types/refactoringTypes";
import ListDisplay from "./ListDisplay";
import UniversalDropdownItem from "./UniversalDropdown/UniversalDropdownItem";
import { useProjection } from "../../contexts/ProjectionContext";
import type { Asset } from "../../types/refactoringTypes";
import YearSelector from "./YearSelector";
import { useYearProjectionDetails } from "../../contexts/YearProjectionDetailsContext";

export default function Sidebar() {
  const { selectedYearProjection } = useYearProjectionDetails();

  const projectionData = useProjection();
  console.log("projetion data", projectionData);

  function findAssetName(assetId: number) {
    const asset = selectedYearProjection?.assets.find(
      (a: Asset) => a.id === assetId
    );
    return asset?.name;
  }

  return (
    <div className="sidebar-container bg-[#fcfcfc] w-full h-full rounded-xl p-4">
      <YearSelector />
      <ListDisplay
        title="Assets"
        items={selectedYearProjection?.assets ?? []}
        renderItem={(item) => (
          <UniversalDropdownItem
            key={item.id}
            itemTitle={item.name}
            itemValue={item.amount}
          />
        )}
      />
      <ListDisplay
        title="Income"
        items={selectedYearProjection?.incomeBreakdown}
        renderItem={(item, idx) => (
          <UniversalDropdownItem
            key={idx}
            itemTitle={`${item.name}`}
            itemValue={item.amount}
          />
        )}
      />

      <ListDisplay
        title="Expenses"
        items={selectedYearProjection?.expenseBreakdown}
        renderItem={(item, idx) => (
          <UniversalDropdownItem
            key={idx}
            itemTitle={`${item.name}`}
            itemValue={item.amount}
          />
        )}
      />
      <ListDisplay
        title="Investment Growth "
        items={selectedYearProjection?.growthHistory}
        renderItem={(item, idx) => (
          <UniversalDropdownItem
            key={idx}
            itemTitle={`${findAssetName(item.assetId)}`}
            itemValue={item.amount}
          />
        )}
      />
      <ListDisplay
        title="Surplus "
        items={selectedYearProjection?.surplusHistory}
        renderItem={(item, idx) => (
          <UniversalDropdownItem
            key={idx}
            itemTitle={`${findAssetName(item.assetId)}`}
            itemValue={item.amount}
          />
        )}
      />
      <ListDisplay
        title="Passive Income Yield"
        items={selectedYearProjection?.passiveIncomesHistory}
        renderItem={(item, idx) => (
          <UniversalDropdownItem
            key={idx}
            itemTitle={`${findAssetName(item.fromAssetId)} `}
            itemValue={item.amount}
          />
        )}
      />
    </div>
  );
}
