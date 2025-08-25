import { useForm } from "react-hook-form";
import EditLayout from "./EditLayout";
import { User } from "../../../MockData/mockUserInformation";
import { useFinancialData } from "../../../contexts/useFinancialData";
import type { Liability } from "../../../types/refactoringTypes";
import { useEffect, useState } from "react";

export default function EditLiabilities() {
  const [newSelectedObject, setNewSelectedObject] = useState<
    Liability | undefined
  >(undefined);
  const { updateIncome, incomes, addIncome, removeIncome } = useFinancialData();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Liability>({
    defaultValues: newSelectedObject,
  });
  const onSubmit = (formData: Incomes) => {
    const updatedIncome = { ...formData, id: newSelectedObject.id };
    updateIncome(updatedIncome);
  };

  useEffect(() => {
    reset(newSelectedObject);
  }, [newSelectedObject, reset]);

  return (
    <EditLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
