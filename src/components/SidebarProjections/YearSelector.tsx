import { useProjection } from "../../contexts/ProjectionContext";
import { useYearProjectionDetails } from "../../contexts/YearProjectionDetailsContext";
import type { YearlyProjectionData } from "../../types/refactoringTypes";

export default function YearSelector() {
  const projectionData = useProjection();
  const { yearSelected, setYearSelected } = useYearProjectionDetails();
  return (
    <div className="selector-container">
      <select
        name="year-selector"
        id="year-selector"
        className="w-full"
        value={yearSelected}
        onChange={(e) => setYearSelected(Number(e.target.value))}
      >
        {projectionData.map((year: YearlyProjectionData) => {
          return (
            <option
              className="w-full"
              key={year.year}
              value={year.year}
            >{`Year ${year.year}`}</option>
          );
        })}
      </select>
    </div>
  );
}
