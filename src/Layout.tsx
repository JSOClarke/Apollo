import { useState, type ReactNode } from "react";
import PageNavBar from "./components/NavigationBar.tsx/PageNavBar";
import ModalNavBar from "./components/NavigationBar.tsx/ModalNavBar";
// import SelectorModal from "./components/Modals/SelectorModal/SelectorModal";
// import EditIncome from "./components/Modals/EditModalTypes/EditIncome";
import EditModal from "./components/Modals/EditModal/EditModal";
import type { ModalOpenType } from "./types/types";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [modalOpened, setModalOpened] = useState<ModalOpenType>({
    isModalOpen: false,
    modalTypeSelected: "none",
  });

  return (
    <div className="min-h-screen bg-gray-200 md:flex ">
      <PageNavBar />
      <div className="flex-1 min-w-0 flex-col flex">
        <ModalNavBar />

        <main className="p-2  flex-1 flex">{children}</main>
      </div>
    </div>
  );
}
