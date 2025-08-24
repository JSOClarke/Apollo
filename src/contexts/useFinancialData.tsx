import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../MockData/mockUserInformation";

import type {
  Asset,
  Expenses,
  Incomes,
  Liability,
} from "../types/refactoringTypes";

interface FinancialContextType {
  incomes: Incomes[];
  expenses: Expenses[];
  liabilities: Liability[];
  assets: Asset[];
  updateIncome: (income: Incomes) => void;
  addIncome: () => Incomes;
  updateExpense: (expense: Expenses) => void;
  addExpense: () => Expenses;
  updateLiability: (liability: Liability) => void;
  addLiability: () => Liability;
  updateAsset: (asset: Asset) => void;
  addAsset: () => Asset;
}

const FinancialContext = createContext<FinancialContextType | undefined>(
  undefined
);

interface FinancialProviderProps {
  children: ReactNode;
}

export function FinancialProvider({ children }: FinancialProviderProps) {
  const [incomes, setIncomes] = useState<Incomes[]>(User.incomes);
  const [expenses, setExpenses] = useState<Expenses[]>(User.expenses);
  const [liabilities, setLiabilities] = useState<Liability[]>(User.liabilities);
  const [assets, setAssets] = useState<Asset[]>(User.assets);

  // --- Income ---
  const updateIncome = (updatedIncome: Incomes) => {
    setIncomes((prev) =>
      prev.map((income) =>
        income.id === updatedIncome.id ? updatedIncome : income
      )
    );
  };

  const addIncome = () => {
    const newIncome: Incomes = {
      id: Date.now(),
      name: "New Income",
      amount: 0,
      startYear: 2025,
      endYear: 2025,
      frequency: "annual",
    };
    setIncomes((prev) => [...prev, newIncome]);
    return newIncome;
  };

  // --- Expenses ---
  const updateExpense = (updatedExpense: Expenses) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  const addExpense = () => {
    const newExpense: Expenses = {
      id: Date.now(),
      name: "New Expense",
      amount: 0,
      startYear: 2025,
      endYear: 2025,
      frequency: "annual",
    };
    setExpenses((prev) => [...prev, newExpense]);
    return newExpense;
  };

  // --- Liabilities ---
  const updateLiability = (updatedLiability: Liability) => {
    setLiabilities((prev) =>
      prev.map((liability) =>
        liability.id === updatedLiability.id ? updatedLiability : liability
      )
    );
  };

  const addLiability = () => {
    const newLiability: Liability = {
      id: Date.now(),
      name: "New Liability",
      amount: 0,
      interestRate: 0,
      annualRepayment: 0,
    };
    setLiabilities((prev) => [...prev, newLiability]);
    return newLiability;
  };

  // --- Assets ---
  const updateAsset = (updatedAsset: Asset) => {
    setAssets((prev) =>
      prev.map((asset) => (asset.id === updatedAsset.id ? updatedAsset : asset))
    );
  };

  const addAsset = () => {
    const newAsset: Asset = {
      id: Date.now(),
      name: "New Asset",
      amount: 0,
      type: "investment",
      growthRate: 0,
    };
    setAssets((prev) => [...prev, newAsset]);
    return newAsset;
  };

  const value: FinancialContextType = {
    incomes,
    expenses,
    liabilities,
    assets,
    updateIncome,
    addIncome,
    updateExpense,
    addExpense,
    updateLiability,
    addLiability,
    updateAsset,
    addAsset,
  };

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancialData() {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error("useFinancialData must be used within FinancialProvider");
  }
  return context;
}
