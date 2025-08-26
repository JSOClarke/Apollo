import { useForm } from "react-hook-form";
import EditLayout from "./EditLayout";
import { useEffect } from "react";
import { User } from "../../../MockData/mockUserInformation";
import type { Incomes } from "../../../types/refactoringTypes";
import { useFinancialData } from "../../../contexts/useFinancialData";
import type { ModalOpenType } from "../../../types/types";
import { useState } from "react";
import { formatCurrency } from "../../../utils/fomatting";
import SelectorModal from "../SelectorModal/SelectorModal";
import { useModal } from "../../../contexts/ModalContext";

export default function EditIncome() {
  const [newSelectedObject, setNewSelectedObject] = useState<
    Incomes | undefined
  >(undefined);

  console.log("selectedObject", newSelectedObject);
  const { closeModal } = useModal();
  const { updateIncome, incomes, addIncome, removeIncome } = useFinancialData();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Incomes>({
    defaultValues: newSelectedObject,
  });
  const onSubmit = (formData: Incomes) => {
    if (newSelectedObject) {
      const updatedIncome = { ...formData, id: newSelectedObject.id };
      updateIncome(updatedIncome);
    }
  };

  useEffect(() => {
    reset(newSelectedObject);
  }, [newSelectedObject, reset]);

  console.log("incomes", incomes);

  return (
    <div>
      <SelectorModal
        title="Incomes"
        modalType="income"
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
              {errors.name && (
                <span className="text-red-400">{errors.name.message}</span>
              )}
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
              {errors.amount && (
                <span className="text-red-400">{errors.amount.message}</span>
              )}
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
                })}
              />
            </div>
            <div className="modal-form-container">
              <label>End Year</label>
              <input
                className="modal-input"
                {...register("endYear", { required: "End Year is Required" })}
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
