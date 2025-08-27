import { useForm } from "react-hook-form";
import { useMilestone } from "../../../contexts/MilestoneContext";
import type { Milestone } from "../../../types/refactoringTypes";
import {
  colourOptions,
  milestoneTypes,
} from "../../../constants/milestoneConstants";

interface MilestoneFormData {
  name: string;
  year: number;
  colour: (typeof colourOptions)[number]["hex"];
}

export default function MilestoneInput() {
  const { milestones, addMilestone } = useMilestone();
  const { register, handleSubmit, reset, watch } = useForm<Milestone>({
    defaultValues: {
      colour: "#0000FF",
      type: "static",
    },
  });

  const onSubmit = (data: Milestone) => {
    console.log("formData", data);
    const newMilestone: Milestone = { ...data, id: Date.now() };
    addMilestone(newMilestone);
    reset();
  };

  const watchedMiltestoneType = watch("type");
  console.log("milestone type", watchedMiltestoneType);
  console.log("milestone type typeof", typeof watchedMiltestoneType);

  return (
    <div className="flex-1 bg-white rounded-xl p-5 flex items-center   gap-2 ">
      <div className="border-r border-gray-200 p-2">Milestone</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 item-center justify-between"
      >
        <div className="toolbar-container-input">
          <label className="toolbar-label-input">Type</label>
          <select
            id="type"
            {...register("type")}
            className="toolbar-select-input"
          >
            {milestoneTypes.map((i, idx) => {
              return (
                <option key={idx} value={i.type}>
                  {i.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="toolbar-container-input">
          <label className="toolbar-label-input">Name</label>
          <input
            {...register("name", { required: true })}
            type="string"
            className="toolbar-input"
          />
        </div>
        {watchedMiltestoneType === "static" && (
          <div className="toolbar-container-input">
            <label className="toolbar-label-input">Year</label>
            <input
              {...register("year", { valueAsNumber: true, required: true })}
              type="number"
              className="modal-input "
            />
          </div>
        )}

        {watchedMiltestoneType === "conditional" ? (
          <div className="toolbar-container-input">
            <label className="toolbar-label-input">Amount</label>
            <input
              type="text"
              className="modal-input"
              {...register("amount", {
                required: true,
                setValueAs: (value: string) => {
                  if (!value) return undefined;
                  const numeric = value.replace(/,/g, "");
                  return /^\d+$/.test(numeric) ? Number(numeric) : undefined;
                },
              })}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                const rawValue = target.value.replace(/,/g, "");

                // allow only digits
                if (!/^\d*$/.test(rawValue)) {
                  target.value = rawValue.replace(/\D/g, "").toLocaleString();
                  return;
                }

                if (!rawValue) {
                  target.value = "";
                  return;
                }

                target.value = Number(rawValue).toLocaleString();
              }}
            />
          </div>
        ) : null}

        <div className="toolbar-container-input">
          <label className="toolbar-label-input">Colour</label>

          <select
            id="colour"
            {...register("colour", { required: true })}
            className="toolbar-select-input"
          >
            {colourOptions.map((i, idx) => {
              return (
                <option key={idx} value={i.hex}>
                  {i.label}
                </option>
              );
            })}
          </select>
        </div>

        <button type="submit" className="toolbar-add-button">
          +
        </button>
      </form>
    </div>
  );
}
