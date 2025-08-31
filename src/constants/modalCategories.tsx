import type { ReactNode } from "react";
import EditAsset from "../components/Modals/EditModalTypes/EditAsset";
import EditExpense from "../components/Modals/EditModalTypes/EditExpense";
import EditIncome from "../components/Modals/EditModalTypes/EditIncome"; // adjust the path
import EditLiabilities from "../components/Modals/EditModalTypes/EditLiability";
import EditSurplus from "../components/Modals/EditModalTypes/EditSurplus";

interface ModalCat {
  name: string;
  option: number;
  userOpt: string;
  element: ReactNode; // optional, because not all have an element yet
}

export const MODALCATS: ModalCat[] = [
  { name: "Income", option: 1, userOpt: "incomes", element: <EditIncome /> },
  {
    name: "Expenses",
    option: 2,
    userOpt: "expenses",
    element: <EditExpense />,
  },
  { name: "Assets", option: 3, userOpt: "assets", element: <EditAsset /> },
  {
    name: "Liabilities",
    option: 4,
    userOpt: "liabilities",
    element: <EditLiabilities />,
  },
  {
    name: "Surplus/Deficit Order",
    option: 4,
    userOpt: "surplus-deficit-ordering",
    element: <EditSurplus />,
  },
];
