import { useForm } from "react-hook-form";
import EditLayout from "./EditLayout";
import { useState } from "react";
import { User } from "../../../MockData/mockUserInformation";
import { useEffect } from "react";
import type { Expenses } from "../../../types/refactoringTypes";
import { useFinancialData } from "../../../contexts/useFinancialData";
import SelectorModal from "../SelectorModal/SelectorModal";
import { useModal } from "../../../contexts/ModalContext";

export default function EditExpense() {
  const [newSelectedObject, setNewSelectedObject] = useState<
    Expenses | undefined
  >(undefined);
  const { closeModal } = useModal();
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
    <div className="">
      <SelectorModal
        title="Expenses"
        modalType="expense"
        setNewSelectedObject={setNewSelectedObject}
      />
      {newSelectedObject && (
        <EditLayout>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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
                {...register("amount", {
                  required: "Amount is Required",
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="modal-form-container">
              <label>Frequency</label>
              <select
                className="modal-select-input"
                id="frequency"
                {...register("frequency", {
                  required: "Frequency is Required",
                })}
              >
                <option value="annual">Annually</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="modal-form-container">
              <label>Start Year</label>
              <input
                className="modal-input"
                {...register("startYear", {
                  required: "Start Year is Required",
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="modal-form-container">
              <label>End Year</label>
              <input
                className="modal-input"
                {...register("endYear", {
                  required: "End Year is Required",
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="modal-exit-button"
                onClick={() => closeModal()}
              >
                Exit
              </button>
              <button type="submit" className="modal-save-button">
                Save
              </button>
            </div>
          </form>
        </EditLayout>
      )}
    </div>
  );
}
