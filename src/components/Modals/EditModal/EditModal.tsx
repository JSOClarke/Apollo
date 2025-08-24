import type { ModalOpenType } from "../../../types/types";
import EditAsset from "../EditModalTypes/EditAsset";
import EditExpense from "../EditModalTypes/EditExpense";
import EditIncome from "../EditModalTypes/EditIncome";
import EditLiability from "../EditModalTypes/EditLiability";
import SelectorModal from "../SelectorModal/SelectorModal";
import { useState } from "react";

interface EditModalType {
  modalOpened: ModalOpenType;
}

interface SelectableObject {
  id: string;
  name?: string;
}

export default function EditModal({ modalOpened }: EditModalType) {
  const [selectedObject, setSelectedObject] = useState<
    SelectableObject | undefined
  >();
  return (
    <div className="fixed inset-0 flex-col flex md:flex-row  items-center justify-center bg-black/60 z-50 gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <SelectorModal
          modalOpened={modalOpened}
          setSelectedObject={setSelectedObject}
        />
        {modalOpened.modalTypeSelected === "incomes" && selectedObject && (
          <EditIncome selectedObject={selectedObject} />
        )}
        {modalOpened.modalTypeSelected === "expenses" && selectedObject && (
          <EditExpense selectedObject={selectedObject} />
        )}
        {modalOpened.modalTypeSelected === "assets" && selectedObject && (
          <EditAsset selectedObject={selectedObject} />
        )}
        {modalOpened.modalTypeSelected === "liabilities" && selectedObject && (
          <EditLiability selectedObject={selectedObject} />
        )}{" "}
      </div>
    </div>
  );
}
