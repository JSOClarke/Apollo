import { useForm } from "react-hook-form";
import EditLayout from "./EditLayout";
import { User } from "../../../MockData/mockUserInformation";
import type { Expenses } from "../../../types/refactoringTypes";

interface EditExpenseProps {
  selectedObject: Expenses;
}

export default function EditExpense({ selectedObject }: EditExpenseProps) {
  const { register } = useForm<Expenses>({
    defaultValues: { ...selectedObject },
  });
  console.log("selectedObject", selectedObject);

  return (
    <EditLayout>
      <form action="" className="flex flex-col gap-4">
        <div className="modal-form-container ">
          <label>Name</label>
          <input
            className="modal-input"
            {...register("name", { required: "Name is Required" })}
          />
        </div>
        <div className="modal-form-container">
          <label>Amount</label>
          <input
            className="modal-input"
            {...register("amount", { required: "Amount is Required" })}
          />
        </div>
        <div className="modal-form-container">
          <label>Frequency</label>
          <input
            className="modal-input"
            {...register("frequency", { required: "Frequency is Required" })}
          />
        </div>
        <div className="modal-form-container">
          <label>Start Year</label>
          <input
            className="modal-input"
            {...register("startYear", { required: "Start Year is Required" })}
          />
        </div>
        <div className="modal-form-container">
          <label>End Year</label>
          <input
            className="modal-input"
            {...register("endYear", { required: "End Year is Required" })}
          />
        </div>
      </form>
    </EditLayout>
  );
}
