import { User } from "../../../MockData/mockUserInformation";
import type { ModalOpenType } from "../../../types/types";

interface SelectorModalProps {
  modalOpened: ModalOpenType;
  setSelectedObject: <T extends { id: string }>(value: T) => void;
}

export default function SelectorModal({
  modalOpened,
  setSelectedObject,
}: SelectorModalProps) {
  console.log("modalopened", modalOpened.modalTypeSelected);

  const selectionArray = User[modalOpened.modalTypeSelected];
  return (
    <div className="selector-container bg-white  rounded-xl p-4 flex ">
      <div className="title flex-col items-center justify-center bg-purple-300 text-white rounded-xl p-2">
        {modalOpened.modalTypeSelected}
      </div>
      <ul className="flex-wrap flex-row md:flex-col flex flex-1 p-2 ">
        {selectionArray.map((i, idx) => {
          return (
            <li key={idx} onClick={() => setSelectedObject(i)}>
              {i.name}
            </li>
          );
        })}
        {/* <li className="flex-1 flex items-center justify-center ">
          <div className="source-title flex-1 flex items-center justify-center ">
            Income Source 1
          </div>
        </li>
        <li className="flex-1 flex items-center justify-center ">
          <div className="source-title flex-1 flex items-center justify-center">
            Income Source 2
          </div>
        </li> */}
      </ul>
    </div>
  );
}
