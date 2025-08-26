import { useForm } from "react-hook-form";
import EditLayout from "./EditLayout";
import { useEffect } from "react";
import { User } from "../../../MockData/mockUserInformation";
import { useState } from "react";
import type { Asset } from "../../../types/refactoringTypes";
import { useFinancialData } from "../../../contexts/useFinancialData";
import SelectorModal from "../SelectorModal/SelectorModal";
import { useModal } from "../../../contexts/ModalContext";

export default function EditAsset() {
  const [newSelectedObject, setNewSelectedObject] = useState<Asset | undefined>(
    undefined
  );
  const { closeModal } = useModal();
  const { assets, addAsset, updateAsset } = useFinancialData();
  const { register, reset, handleSubmit, watch } = useForm<Asset>({
    defaultValues: { growthRate: 0.0, yieldRate: 0.0, ...newSelectedObject },
  });
  const onSubmit = (formData: Asset) => {
    if (newSelectedObject) {
      const updatedAsset = { ...formData, id: newSelectedObject.id };
      updateAsset(updatedAsset);
    }
  };
  console.log("selectedObject", newSelectedObject);
  useEffect(() => {
    if (newSelectedObject) {
      reset({
        growthRate: 0,
        yieldRate: 0,
        ...newSelectedObject,
      });
    }
  }, [newSelectedObject, reset]);

  const watchedtype = watch("type");

  console.log("watchedtype", watchedtype);

  return (
    <div>
      <SelectorModal
        title="Assets"
        modalType="asset"
        setNewSelectedObject={setNewSelectedObject}
      />

      {newSelectedObject && (
        <EditLayout>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            key={newSelectedObject.id}
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
              <label>Type</label>
              <select
                id="type"
                className="modal-select-input"
                {...register("type")}
              >
                <option value="investment">Investment</option>
                <option value="cash">Cash</option>
                <option value="property">Property</option>
              </select>
            </div>
            {(watchedtype === "investment" || watchedtype === "property") && (
              <div className="modal-form-container">
                <label>Growth Rate</label>
                <input
                  className="modal-input"
                  {...register("growthRate", {
                    required: "growth rate is Required",
                    valueAsNumber: true,
                  })}
                />
              </div>
            )}
            {watchedtype === "cash" && (
              <div className="modal-form-container">
                <label>Yield Rate</label>
                <input
                  className="modal-input"
                  {...register("yieldRate", {
                    required: "Start Year is Required",
                    valueAsNumber: true,
                  })}
                />
              </div>
            )}
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
