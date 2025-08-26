// import PageNavBar from "./components/NavigationBar.tsx/PageNavBar";
import { type ReactNode } from "react";
import ModalNavBar from "./components/NavigationBar.tsx/ModalNavBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-200 md:flex ">
      {/* <PageNavBar /> */}
      <div className="flex-1 min-w-0 flex-col flex">
        <ModalNavBar />

        <main className="p-2  flex-1 flex">{children}</main>
      </div>
    </div>
  );
}
