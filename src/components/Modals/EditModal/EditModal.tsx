import type { ModalOpenType } from "../../../types/types";
import EditAsset from "../EditModalTypes/EditAsset";
import EditExpense from "../EditModalTypes/EditExpense";
import EditIncome from "../EditModalTypes/EditIncome";
import EditLiability from "../EditModalTypes/EditLiability";
import { useState } from "react";

interface EditModalType {
  modalOpened: ModalOpenType;
  setModalOpened: (value: ModalOpenType) => void;
}

interface SelectableObject {
  id: string;
  name?: string;
}

export default function EditModal({
  modalOpened,
  setModalOpened,
}: EditModalType) {
  const [selectedObject, setSelectedObject] = useState<
    SelectableObject | undefined
  >();

  return (
    <div className="fixed inset-0 flex-col flex md:flex-row  items-center justify-center bg-black/60 z-50 gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        {modalOpened.modalTypeSelected === "incomes" && (
          <EditIncome
            selectedObject={selectedObject}
            setModalOpened={setModalOpened}
          />
        )}
        {modalOpened.modalTypeSelected === "expenses" && <EditExpense />}
        {modalOpened.modalTypeSelected === "assets" && <EditAsset />}
        {modalOpened.modalTypeSelected === "liabilities" && selectedObject && (
          <EditLiability selectedObject={selectedObject} />
        )}{" "}
      </div>
    </div>
  );
}
