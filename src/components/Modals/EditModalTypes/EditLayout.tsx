import type { ReactNode } from "react";
import { useModal } from "../../../contexts/ModalContext";

interface EditLayoutProps {
  children: ReactNode;
}

export default function EditLayout({ children }: EditLayoutProps) {
  const { closeModal } = useModal();

  return (
    <div className="selector-container bg-white  rounded-xl p-4 flex-col flex gap-4 w-full">
      <div className="title flex items-center justify-center bg-purple-300 text-white rounded-xl p-2">
        Edit Modal
      </div>

      {children}
      <div className="flex items-center justify-between">
        <button className="bg-green-500 p-2" onClick={() => closeModal()}>
          Exit
        </button>
      </div>
    </div>
  );
}
