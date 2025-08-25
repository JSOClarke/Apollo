import { useForm } from "react-hook-form";
import EditLayout from "./EditLayout";
import { useState } from "react";
import { User } from "../../../MockData/mockUserInformation";
import { useEffect } from "react";
import type { Expenses } from "../../../types/refactoringTypes";
import { useFinancialData } from "../../../contexts/useFinancialData";

export default function EditExpense() {
  const [newSelectedObject, setNewSelectedObject] = useState<
    Expenses | undefined
  >(undefined);
  const { expenses, addExpense, updateExpense } = useFinancialData();
  console.log("expenses", expenses);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Expenses>({
    defaultValues: newSelectedObject,
  });
  console.log("selectedObject", newSelectedObject);
  useEffect(() => {
    reset(newSelectedObject);
  }, [newSelectedObject, reset]);
  const onSubmit = (formData: Expenses) => {
    const updatedExpense = { ...formData, id: newSelectedObject.id };
    updateExpense(updatedExpense);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="selector bg-white rounded-xl p-4">
        <div className="title border-b border-gray-200 flex items-center justify-center">
          Expenses
        </div>
        <div className="mapped-items flex gap-2 p-2">
          {expenses.map((i) => {
            return (
              <div
                key={i.id}
                onClick={() => setNewSelectedObject(i)}
                className="bg-gray-200 p-4 flex-col items-center justify-center"
              >
                <div className="name">{i.name}</div>
                <div className="amount">{i.amount}</div>
                <div className="frequency">{i.frequency}</div>
              </div>
            );
          })}
          <button
            type="button"
            className="bg-blue-200 p-2 rounded-xl"
            onClick={() => setNewSelectedObject(addExpense())}
          >
            Add Income +{" "}
          </button>
        </div>
      </div>
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
          <button type="submit">Save</button>
        </form>
      </EditLayout>
    </div>
  );
}
