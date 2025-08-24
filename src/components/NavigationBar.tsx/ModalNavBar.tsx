import { MODALCATS } from "../../constants/modalCategories";
import type { ModalOpenType } from "../../types/types";

interface ModalNavBarProps {
  setModalOpened: (value: ModalOpenType) => void;
}

export default function ModalNavBar({ setModalOpened }: ModalNavBarProps) {
  return (
    <div className="bg-purple-300 text-white p-2  sticky top-0 z-50">
      <ul className="modal-navbar flex  items-center justify-between">
        {MODALCATS.map((cat) => {
          return (
            <li
              key={cat.option}
              onClick={() =>
                setModalOpened({
                  isModalOpen: true,
                  modalTypeSelected: cat.userOpt,
                })
              }
            >
              {cat.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
