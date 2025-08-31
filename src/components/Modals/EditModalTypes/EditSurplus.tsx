import { ChevronDown, ChevronUp } from "lucide-react";
import { useModal } from "../../../contexts/ModalContext";
import { useFinancialData } from "../../../contexts/useFinancialData";
import EditLayout from "./EditLayout";

export default function EditSurplus() {
  const { closeModal } = useModal();
  const { surplus, moveSurplusUpbyId, deficit, moveDeficitUpbyId } =
    useFinancialData();

  return (
    <EditLayout>
      <div className="flex gap-2">
        <div className="priority-section-container ">
          <div className="priority-title">Surplus</div>
          {surplus.map((i, idx) => {
            return (
              <div className="priority-select " key={idx}>
                {` ${idx + 1}: `}
                {i.assetName} <ChevronDown />
                <ChevronUp onClick={() => moveSurplusUpbyId(idx)} />
              </div>
            );
          })}
        </div>
        <div className="priority-section-container">
          <div className="priority-title">Deficit</div>

          {deficit.map((i, idx) => {
            return (
              <div className="priority-select " key={idx}>
                {` ${idx + 1}: `}
                {i.assetName} <ChevronDown />
                <ChevronUp onClick={() => moveDeficitUpbyId(idx)} />
              </div>
            );
          })}
        </div>
      </div>
    </EditLayout>
  );
}
