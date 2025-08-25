import { useFinancialData } from "../contexts/useFinancialData";

export function useFinancialDataMap() {
  const {
    incomes,
    addIncome,
    removeIncome,
    removeAsset,
    removeExpense,
    removeLiability,
    updateIncome,
    expenses,
    addExpense,
    updateExpense,
    assets,
    addAsset,
    updateAsset,
    liabilities,
    addLiability,
    updateLiability,
  } = useFinancialData();

  const dataMap = {
    income: {
      items: incomes,
      add: addIncome,
      remove: removeIncome,
      update: updateIncome,
    },
    expense: {
      items: expenses,
      add: addExpense,
      update: updateExpense,
      remove: removeExpense,
    },
    asset: {
      items: assets,
      add: addAsset,
      update: updateAsset,
      remove: removeAsset,
    },
    liability: {
      items: liabilities,
      add: addLiability,
      update: updateLiability,
      remove: removeLiability,
    },
  } as const;

  return dataMap;
}

export type ModalType = keyof ReturnType<typeof useFinancialDataMap>;
