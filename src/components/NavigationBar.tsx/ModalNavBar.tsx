import { MODALCATS } from "../../constants/modalCategories";
import type { ModalOpenType } from "../../types/types";

interface ModalNavBarProps {
  setModalOpened: (value: ModalOpenType) => void;
}

export default function ModalNavBar({ setModalOpened }: ModalNavBarProps) {
  return (
    <div className="bg-purple-300 text-white p-2  sticky top-0 z-50">
      <ul className="modal-navbar flex  items-center justify-between gap-2 ">
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
