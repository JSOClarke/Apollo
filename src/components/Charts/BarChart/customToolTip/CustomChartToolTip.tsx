import type { TooltipContentProps } from "recharts";
import type { FlattenedYearlyProjection } from "../../../../types/refactoringTypes";
import { chartConstants } from "../../../../constants/chartConstants";
import { useMilestone } from "../../../../contexts/MilestoneContext";
import { Divide, Milestone } from "lucide-react";

export default function CustomChartToolTip({
  active,
  payload,
  label,
}: TooltipContentProps<number, string>) {
  const { milestones } = useMilestone();
  if (!active || !payload || !label) return null;

  const yearPayload: FlattenedYearlyProjection = payload[0].payload;

  const milestonesYear = milestones.find((i) => i.year === yearPayload.year);

  return (
    <div className="bg-white p-2 rounded-lg shadow-md">
      <p className="font-semibold">{label}</p>

      {chartConstants.map((opt) => {
        const value = yearPayload[opt.key as keyof FlattenedYearlyProjection];
        if (!value) return null;

        if (Array.isArray(value)) {
          if (value.length === 0) return null;
          return (
            <div key={opt.key} className="mb-2">
              <p style={{ color: opt.color }}>{opt.label}:</p>
              <ul className="ml-2">
                {value.map((item, i) => (
                  <li key={i}>
                    {typeof item === "object" &&
                      `${item.name ? item.name : "none"}`}
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return (
          <p key={opt.key} style={{ color: opt.color }}>
            {opt.label}: £
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        );
      })}
      {milestonesYear && (
        <div className="border-t border-gray-200 mt-5 flex items-center gap-2">
          <div
            className={`w-4 h-4  rounded-full`}
            style={{ backgroundColor: milestonesYear.colour }}
          ></div>
          {milestonesYear.name}
        </div>
      )}
    </div>
  );
}
