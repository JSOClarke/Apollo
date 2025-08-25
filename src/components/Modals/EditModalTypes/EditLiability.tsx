import { useForm } from "react-hook-form";
import EditLayout from "./EditLayout";
import { User } from "../../../MockData/mockUserInformation";
import { useFinancialData } from "../../../contexts/useFinancialData";
import type { Liability } from "../../../types/refactoringTypes";
import { useEffect, useState } from "react";
import SelectorModal from "../SelectorModal/SelectorModal";
import { useModal } from "../../../contexts/ModalContext";

export default function EditLiabilities() {
  const [newSelectedObject, setNewSelectedObject] = useState<
    Liability | undefined
  >(undefined);
  const { closeModal } = useModal();
  const { updateLiability } = useFinancialData();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Liability>({
    defaultValues: newSelectedObject,
  });
  const onSubmit = (formData: Liability) => {
    const updatedLiability = { ...formData, id: newSelectedObject.id };
    updateLiability(updatedLiability);
  };

  useEffect(() => {
    reset(newSelectedObject);
  }, [newSelectedObject, reset]);

  return (
    <div>
      <SelectorModal
        title="Liabilities"
        modalType="liability"
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
