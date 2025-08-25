import { MODALCATS } from "../../constants/modalCategories";
import { useModal } from "../../contexts/ModalContext";
import type { ModalOpenType } from "../../types/types";
import EditIncome from "../Modals/EditModalTypes/EditIncome";

export default function ModalNavBar() {
  const { openModal } = useModal();
  return (
    <div className="bg-purple-300 text-white p-2  sticky top-0 z-50">
      <ul className="modal-navbar flex  items-center justify-between gap-2 ">
        {MODALCATS.map((cat) => {
          return (
            <li
              key={cat.option}
              onClick={() => openModal(cat.element)}
              className="flex w-full items-center justify-center bg-purple-600 rounded-xl p-2 hover:bg-purple-900 transition-colors cursor-pointer"
            >
              {cat.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
