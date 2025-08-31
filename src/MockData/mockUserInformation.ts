import type { UserData, Priority } from "../types/refactoringTypes";

export const User: UserData = {
  incomes: [
    {
      name: "Salary",
      amount: 14000,
      frequency: "annual",
      id: 1,
      startYear: 2025,
      endYear: 2064,
    },
    {
      name: "State Pension",
      amount: 920,
      frequency: "monthly",
      id: 2,
      startYear: 2065,
      endYear: 2086,
    },
  ],
  expenses: [
    {
      name: "Rent",
      amount: 10000,
      frequency: "annual",
      id: 1,
      startYear: 2025,
      endYear: 2064,
    },
    {
      name: "Rent",
      amount: 15000,
      frequency: "annual",
      id: 3,
      startYear: 2065,
      endYear: 2085,
    },
    {
      name: "Holiday",
      amount: 1000,
      frequency: "annual",
      id: 2,
      startYear: 2025,
      endYear: 2062,
    },
  ],
  assets: [
    {
      name: "Stocks",
      amount: 30000,
      type: "investment",
      growthRate: 0.04,
      id: 1,
    },
    {
      name: "Pension",
      amount: 8000,
      type: "investment",
      growthRate: 0.04,
      id: 2,
    },
    { name: "Savings", amount: 30000, type: "cash", id: 3, yieldRate: 0.035 },
  ],
  liabilities: [
    {
      name: "Mortgage",
      amount: 0,
      type: "loan",
      interestRate: 0,
      id: 1,
      annualRepayment: 0,
    },
  ],
};

export const deficitPriority: Priority[] = [
  { assetId: 3, assetName: "Savings" },

  { assetId: 2, assetName: "Pension" },
  { assetId: 1, assetName: "Stocks" },
]; // savings first then stocks
export const surplusPriority: Priority[] = [
  { assetId: 1, assetName: "Stocks" },
  { assetId: 2, assetName: "Penison" },
  { assetId: 3, assetName: "Savings" },
]; // stocks first then savings
