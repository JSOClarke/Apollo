import { useState } from "react";
import { useFinancialData } from "../../../contexts/useFinancialData";
import { formatCurrency } from "../../../utils/fomatting";
import { useFinancialDataMap } from "../../../hooks/useFinacialDataMap";
formatCurrency;

interface SelectorModalProps {
  title: string;
  modalType: "income" | "expense" | "liability" | "asset";
  setNewSelectedObject: (value: any) => void;
}

export default function SelectorModal({
  title,
  modalType,
  setNewSelectedObject,
}: SelectorModalProps) {
  const dataMap = useFinancialDataMap();
  const { add, items, remove } = dataMap[modalType];

  return (
    <div className="flex-col flex gap-4 md:min-w-100 mb-4">
      <div className="selector bg-white rounded-xl p-4">
        <div className="title-container flex border-b border-gray-200 gap-2 items-center justify-center p-2 ">
          <div className="title  flex items-center justify-center">{title}</div>
          <button
            type="button"
            className="bg-blue-200 py-2 px-4 rounded-xl"
            onClick={() => setNewSelectedObject(add())}
          >
            +
          </button>
        </div>

        <div className="mapped-items flex gap-2 p-2 cursor-pointer">
          {items.map((i) => {
            return (
              <div key={i.id} className="flex flex-col gap-2 flex-1">
                <div
                  onClick={() => setNewSelectedObject(i)}
                  className="bg-gray-200 p-4 flex-col flex items-center justify-center rounded-xl flex-1"
                >
                  <div className="name">{i.name}</div>
                  <div className="amount">{formatCurrency(i.amount)}</div>
                  {/* <div className="frequency">{i.frequency}</div> */}
                </div>
                <button
                  className="remove bg-red-200 rounded-xl px-4 py-2 w-full text-xl"
                  onClick={() => remove(i.id)}
                >
                  -
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
