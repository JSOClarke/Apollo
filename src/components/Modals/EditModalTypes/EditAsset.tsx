import { useForm } from "react-hook-form";
import EditLayout from "./EditLayout";
import { useEffect } from "react";
import { User } from "../../../MockData/mockUserInformation";
import type { Asset } from "../../../types/refactoringTypes";

interface EditAssetProps {
  selectedObject: Asset;
}

export default function EditAsset({ selectedObject }: EditAssetProps) {
  const { register, reset } = useForm<Asset>({
    defaultValues: { ...selectedObject },
  });
  console.log("selectedObject", selectedObject);
  useEffect(() => {
    reset(selectedObject);
  }, [selectedObject, reset]);

  return (
    <EditLayout>
      <form action="" className="flex flex-col gap-4" key={selectedObject.id}>
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
          <label>Growth Rate</label>
          <input
            className="modal-input"
            {...register("growthRate", { required: "Frequency is Required" })}
          />
        </div>
        <div className="modal-form-container">
          <label>Yield Rate</label>
          <input
            className="modal-input"
            {...register("yieldRate", { required: "Start Year is Required" })}
          />
        </div>
      </form>
    </EditLayout>
  );
}
