import type { ReactNode } from "react";

interface EditLayoutProps {
  children: ReactNode;
}

export default function EditLayout({ children }: EditLayoutProps) {
  return (
    <div className="selector-container bg-white  rounded-xl p-4 flex-col flex gap-4 w-full">
      <div className="title flex items-center justify-center bg-purple-300 text-white rounded-xl p-2">
        Edit Modal
      </div>

      {children}
    </div>
  );
}
