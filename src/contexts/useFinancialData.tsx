import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  User,
  deficitPriority,
  surplusPriority,
} from "../MockData/mockUserInformation";

import {
  type Priority,
  type Asset,
  type Expenses,
  type Incomes,
  type Liability,
} from "../types/refactoringTypes";

interface FinancialContextType {
  incomes: Incomes[];
  expenses: Expenses[];
  liabilities: Liability[];
  assets: Asset[];
  updateIncome: (income: Incomes) => void;
  addIncome: () => Incomes;
  removeIncome: (id: number) => void;
  removeLiability: (id: number) => void;
  removeExpense: (id: number) => void;
  removeAsset: (id: number) => void;
  updateExpense: (expense: Expenses) => void;
  addExpense: () => Expenses;
  updateLiability: (liability: Liability) => void;
  addLiability: () => Liability;
  updateAsset: (asset: Asset) => void;
  addAsset: () => Asset;
  surplus: Priority[];
  deficit: Priority[];
  moveSurplusUpbyId: (id: number) => void;
  moveDeficitUpbyId: (id: number) => void;
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
  const [surplus, setSurplus] = useState<Priority[]>(surplusPriority);
  const [deficit, setDeficit] = useState<Priority[]>(deficitPriority);

  useEffect(() => {
    setSurplus((prev) => {
      // 1️⃣ Keep only priorities that still exist in assets, update their names
      const updated = prev
        .map((p) => {
          const asset = assets.find((a) => a.id === p.assetId);
          return asset ? { ...p, assetName: asset.name } : null;
        })
        .filter(Boolean) as Priority[];

      // 2️⃣ Find new assets not already in surplus
      const newAssets = assets
        .filter((a) => !updated.some((p) => p.assetId === a.id))
        .map((a) => ({ assetId: a.id, assetName: a.name }));

      // 3️⃣ Combine updated + new
      return [...updated, ...newAssets];
    });
  }, [assets]);

  console.log();

  function moveSurplusUpbyId(index: number) {
    if (index <= 0) return surplus; // already at top
    const newArr = [...surplus];
    [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    setSurplus(newArr);
  }

  function moveDeficitUpbyId(index: number) {
    if (index <= 0) return deficit; // already at top
    const newArr = [...deficit];
    [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    setDeficit(newArr);
  }

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
      amount: 100,
      startYear: 2025,
      endYear: 2025,
      frequency: "annual",
    };
    setIncomes((prev) => [...prev, newIncome]);
    return newIncome;
  };

  const removeIncome = (id: number) => {
    setIncomes((prev) => prev.filter((i) => i.id !== id));
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
      amount: 100,
      startYear: 2025,
      endYear: 2025,
      frequency: "annual",
    };
    setExpenses((prev) => [...prev, newExpense]);
    return newExpense;
  };

  const removeExpense = (id: number) => {
    setExpenses((prev) => prev.filter((i) => i.id !== id));
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
      amount: 100,
      interestRate: 0,
      annualRepayment: 0,
    };
    setLiabilities((prev) => [...prev, newLiability]);
    return newLiability;
  };

  const removeLiability = (id: number) => {
    setLiabilities((prev) => prev.filter((i) => i.id !== id));
  };

  // --- Assets ---
  const updateAsset = (updatedAsset: Asset) => {
    setAssets((prev) =>
      prev.map((asset) => (asset.id === updatedAsset.id ? updatedAsset : asset))
    );
    // const newPriority: Priority = {
    //   assetId: updatedAsset.id,
    //   assetName: updatedAsset.name,
    // };
    // setSurplus((p) => [...p, newPriority]);
  };

  const addAsset = () => {
    const newAsset: Asset = {
      id: Date.now(),
      name: "New Asset",
      amount: 100,
      type: "investment",
      growthRate: 0,
    };
    setAssets((prev) => [...prev, newAsset]);
    return newAsset;
  };

  const removeAsset = (id: number) => {
    setAssets((prev) => prev.filter((i) => i.id !== id));
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
    removeIncome,
    removeAsset,
    removeLiability,
    removeExpense,
    moveDeficitUpbyId,
    moveSurplusUpbyId,
    surplus,
    deficit,
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
