import { useForm } from "react-hook-form";
import EditLayout from "./EditLayout";
import { useEffect } from "react";
import { User } from "../../../MockData/mockUserInformation";
import { useState } from "react";
import type { Asset } from "../../../types/refactoringTypes";
import { useFinancialData } from "../../../contexts/useFinancialData";

export default function EditAsset() {
  const [newSelectedObject, setNewSelectedObject] = useState<Asset | undefined>(
    undefined
  );
  const { assets, addAsset, updateAsset } = useFinancialData();
  const { register, reset, handleSubmit } = useForm<Asset>({
    defaultValues: newSelectedObject,
  });
  const onSubmit = (formData: Asset) => {
    const updatedIncome = { ...formData, id: newSelectedObject.id };
    updateAsset(updatedIncome);
  };
  console.log("selectedObject", newSelectedObject);
  useEffect(() => {
    reset(newSelectedObject);
  }, [newSelectedObject, reset]);

  return (
    <div>
      <div className="selector bg-white rounded-xl p-4">
        <div className="title border-b border-gray-200 flex items-center justify-center">
          Assets
        </div>
        <div className="mapped-items flex gap-2 p-2">
          {assets.map((i) => {
            return (
              <div
                key={i.id}
                onClick={() => setNewSelectedObject(i)}
                className="bg-gray-200 p-4 flex-col items-center justify-center rounded-xl"
              >
                <div className="name">{i.name}</div>
                <div className="amount">{i.amount}</div>
                <div className="frequency">{i.growthRate}</div>
              </div>
            );
          })}
          <button
            type="button"
            className="bg-blue-200 p-2 rounded-xl"
            onClick={() => setNewSelectedObject(addAsset())}
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
              <input className="modal-input" {...register("type")} />
            </div>
            {newSelectedObject.type === "investment" && (
              <div className="modal-form-container">
                <label>Growth Rate</label>
                <input
                  className="modal-input"
                  {...register("growthRate", {
                    required: "Frequency is Required",
                    valueAsNumber: true,
                  })}
                />
              </div>
            )}
            {newSelectedObject.type === "cash" && (
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
            <button type="submit">Save</button>
          </form>
        </EditLayout>
      )}
    </div>
  );
}
