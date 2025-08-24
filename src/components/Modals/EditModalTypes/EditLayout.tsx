import type { ReactNode } from "react";
interface EditLayoutProps {
  children: ReactNode;
}

export default function EditLayout({ children }: EditLayoutProps) {
  return (
    <div className="selector-container bg-white w-96 rounded-xl p-4 flex-col flex gap-4">
      <div className="title flex items-center justify-center bg-purple-300 text-white rounded-xl p-2">
        Edit Modal
      </div>

      {children}
      <div className="flex items-center justify-between">
        <button className="bg-green-500 p-2">Exit</button>
        <button className="bg-amber-200 p-2">Save</button>
      </div>
    </div>
  );
}
