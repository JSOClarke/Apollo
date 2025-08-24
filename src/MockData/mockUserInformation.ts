import type { UserData } from "../types/refactoringTypes";

export const User: UserData = {
  incomes: [
    {
      name: "Salary",
      amount: 14000,
      frequency: "annual",
      id: 1,
      startYear: 2025,
      endYear: 2065,
    },
    {
      name: "BD",
      amount: 14000,
      frequency: "annual",
      id: 2,
      startYear: 2025,
      endYear: 2065,
    },
  ],
  expenses: [
    {
      name: "Rent",
      amount: 10000,
      frequency: "annual",
      id: 1,
      startYear: 2025,
      endYear: 2065,
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
      amount: 40000,
      type: "investment",
      growthRate: 0.07,
      id: 1,
    },
    { name: "Savings", amount: 30000, type: "cash", id: 2, yieldRate: 0.02 },
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
