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
  const { register, handleSubmit, reset } = useForm<Milestone>({
    defaultValues: { name: "100k oddy", year: 2025, colour: "#0000FF" },
  });

  const onSubmit = (data: MilestoneFormData) => {
    console.log("formData", data);
    const newMilestone: Milestone = { ...data, id: Date.now() };
    addMilestone(newMilestone);
    reset();
  };
  return (
    <div className="flex-1 bg-white rounded-xl p-2 flex items-center  gap-2 ">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <div className="flex items-center gap-2">
          <label>Name</label>
          <input {...register("name")} type="string" className="modal-input " />
        </div>
        <div className="flex items-center gap-2">
          <label>Year</label>
          <input
            {...register("year", { valueAsNumber: true })}
            type="number"
            className="modal-input "
          />
        </div>
        <div className="flex items-center gap-2">
          <label>Colour</label>

          <select id="colour" {...register("colour")}>
            {colourOptions.map((i, idx) => {
              return (
                <option key={idx} value={i.hex}>
                  {i.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label>Type</label>

          <select id="colour" {...register("type")}>
            {
              typeof milestoneTypes.map((i, idx) => {
                return (
                  <option key={idx} value={i}>
                    {i}
                  </option>
                );
              })
            }
          </select>
        </div>
        <button type="submit" className="modal-save-button">
          Add Milestone +
        </button>
      </form>
    </div>
  );
}
