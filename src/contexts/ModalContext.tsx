import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ModalContext = createContext<any | null>(null);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isModalOpen, setModalOpen] = useState<boolean>();
  const [content, setContent] = useState<ReactNode | null>(null);

  function openModal(c: ReactNode) {
    setContent(c);
    setModalOpen(true);
  }

  function closeModal() {
    setContent(null);
    setModalOpen(false);
  }

  const value = { openModal, isModalOpen, setModalOpen, closeModal };

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleRefClick(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    }
    document.addEventListener("mousedown", handleRefClick);
    return () => document.removeEventListener("mousedown", handleRefClick);
  }, [modalRef]);

  return (
    <ModalContext.Provider value={value}>
      {children}

      {isModalOpen && (
        <div className="fixed inset-0 flex-col flex md:flex-row  items-center justify-center bg-black/60 z-50 gap-4">
          <div className="flex flex-col md:flex-row gap-4" ref={modalRef}>
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Blah");
  }
  return context;
}
