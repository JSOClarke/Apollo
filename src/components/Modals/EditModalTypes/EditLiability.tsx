import { useForm } from "react-hook-form";
import EditLayout from "./EditLayout";
import { User } from "../../../MockData/mockUserInformation";
import type { Liability } from "../../../types/refactoringTypes";
import { useEffect } from "react";

interface EditLiabilityProps {
  selectedObject: Liability;
}

export default function EditLiabilities({
  selectedObject,
}: EditLiabilityProps) {
  const { register, reset } = useForm<Liability>({
    defaultValues: selectedObject,
  });
  console.log("selectedObject", selectedObject);
  useEffect(() => {
    reset(selectedObject);
  }, [selectedObject, reset]);

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
          <label>Interest Rate</label>
          <input
            className="modal-input"
            {...register("interestRate", {
              required: "Interest Rate is Required",
            })}
          />
        </div>
        <div className="modal-form-container">
          <label>Annual Repayment</label>
          <input
            className="modal-input"
            {...register("annualRepayment", {
              required: "Annual Repayment is Required",
            })}
          />
        </div>
      </form>
    </EditLayout>
  );
}
