import type { ReactNode } from "react";

interface EditModalType {
  children: ReactNode;
}

export default function EditModal({ children }: EditModalType) {
  return (
    <div className="fixed inset-0 flex-col flex md:flex-row  items-center justify-center bg-black/60 z-50 gap-4">
      <div className="flex flex-col md:flex-row gap-4">{children}</div>
    </div>
  );
}
