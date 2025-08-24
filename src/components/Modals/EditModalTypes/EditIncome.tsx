import { useForm } from "react-hook-form";
import EditLayout from "./EditLayout";
import { useEffect } from "react";
import { User } from "../../../MockData/mockUserInformation";
import type { Incomes } from "../../../types/refactoringTypes";
import { useFinancialData } from "../../../contexts/useFinancialData";
import type { ModalOpenType } from "../../../types/types";
import { useState } from "react";

interface EditModalProps {
  selectedObject: Incomes;
  setModalOpened: (value: ModalOpenType) => void;
}

export default function EditIncome({
  selectedObject,
  setModalOpened,
}: EditModalProps) {
  const [newSelectedObject, setNewSelectedObject] = useState<
    Incomes | undefined
  >(undefined);

  console.log("selectedObject", newSelectedObject);
  const { updateIncome, incomes, addIncome } = useFinancialData();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Incomes>({
    defaultValues: newSelectedObject,
  });
  const onSubmit = (formData: Incomes) => {
    const updatedIncome = { ...formData, id: newSelectedObject.id };
    updateIncome(updatedIncome);
  };

  useEffect(() => {
    reset(newSelectedObject);
  }, [newSelectedObject, reset]);

  console.log("incomes", incomes);

  return (
    <div className="flex-col flex gap-4">
      <div className="selector bg-white rounded-xl p-4">
        <div className="title border-b border-gray-200 flex items-center justify-center">
          Incomes
        </div>
        <div className="mapped-items flex gap-2 p-2">
          {incomes.map((i) => {
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
            onClick={() => setNewSelectedObject(addIncome())}
          >
            Add Income +{" "}
          </button>
        </div>
      </div>
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
              <input
                className="modal-input"
                {...register("frequency", {
                  required: "Frequency is Required",
                })}
              />
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
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() =>
                setModalOpened({
                  isModalOpen: false,
                  modalTypeSelected: "none",
                })
              }
            >
              Cancel
            </button>
          </form>
        </EditLayout>
      )}
    </div>
  );
}
