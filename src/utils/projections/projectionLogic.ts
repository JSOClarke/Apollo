import type {
  BaseLineConditions,
  WithdrawlHistory,
  PassiveIncomeHistory,
  SurplusHistory,
  GrowthHistory,
  ContributionHistory,
  LiabilityPaymentHistory,
  Expenses,
  Incomes,
} from "../../types/refactoringTypes";
import {
  surplusPriority,
  deficitPriority,
} from "../../MockData/mockUserInformation";

export function projectionLogic(
  baseLineConditions: BaseLineConditions,
  currentYear: number,
  fractionOfYear = 1 // defaults to a full year
) {
  const { incomes, expenses, assets, liabilities } = baseLineConditions;

  const updatedAssets = [...assets];
  const updatedLiabilities = [...liabilities];

  const contributionsHistory: ContributionHistory[] = [];
  const passiveIncomesHistory: PassiveIncomeHistory[] = [];
  const withdrawalsHistory: WithdrawlHistory[] = [];
  const surplusesHistory: SurplusHistory[] = [];
  const growthHistory: GrowthHistory[] = [];
  const liabilityPaymentsHistory: LiabilityPaymentHistory[] = [];

  // Filter the incomes/expenses that are active for the current year

  const baseAcitveIncomes = incomes.filter(
    (i) => currentYear >= i.startYear && currentYear <= i.endYear
  );
  const baseActiveExpenses = expenses.filter(
    (e) => currentYear >= e.startYear && currentYear <= e.endYear
  );

  // Scale total income and expenses by fraction for partial years first and possibly last
  const activeIncomes: Incomes[] = baseAcitveIncomes.map((i) => {
    if (i.frequency && i.frequency === "monthly") {
      return { ...i, amount: i.amount * 12 };
    }
    return i;
  });

  const activeExpenses: Expenses[] = baseActiveExpenses.map((i) => {
    if (i.frequency && i.frequency === "monthly") {
      return { ...i, amount: i.amount * 12 };
    }
    return i;
  });

  const totalIncome = activeIncomes.reduce(
    (sum, i) => sum + i.amount * fractionOfYear,
    0
  );
  const totalExpenses = activeExpenses.reduce(
    (sum, i) => sum + i.amount * fractionOfYear,
    0
  );
  const netCashflow = totalIncome - totalExpenses;
  let remainingCashFlow = netCashflow;

  // Apply liabilities (interest + repayments)
  for (let i = 0; i < updatedLiabilities.length; i++) {
    const liab = updatedLiabilities[i];

    const interest = liab.amount * ((liab.interestRate ?? 0) * fractionOfYear);
    liab.amount += interest;

    let repayment = Math.min(
      (liab.annualRepayment ?? 0) * fractionOfYear,
      liab.amount
    );

    if (repayment > remainingCashFlow) {
      repayment = Math.max(0, remainingCashFlow);
    }

    liab.amount -= repayment;
    remainingCashFlow -= repayment;

    updatedLiabilities[i] = { ...liab };
    liabilityPaymentsHistory.push({
      liabilityId: liab.id,
      interest,
      repayment,
      remainingBalance: liab.amount,
    });
  }

  // Apply contributions scaled by fraction
  for (const asset of updatedAssets) {
    if (!asset.intendedMonthlyContribution || remainingCashFlow <= 0) continue;

    const annualContribution = Math.min(
      asset.intendedMonthlyContribution * 12 * fractionOfYear,
      remainingCashFlow
    );

    const index = updatedAssets.findIndex((a) => a.id === asset.id);
    updatedAssets[index] = {
      ...updatedAssets[index],
      amount: updatedAssets[index].amount + annualContribution,
    };

    contributionsHistory.push({
      assetId: asset.id,
      amount: annualContribution,
    });
    remainingCashFlow -= annualContribution;
  }

  // Apply growth scaled by fraction
  for (let i = 0; i < updatedAssets.length; i++) {
    if (!updatedAssets[i].growthRate) continue;
    const growthRate = updatedAssets[i].growthRate;
    if (!growthRate) continue;

    const growthAmount = updatedAssets[i].amount * growthRate * fractionOfYear;
    updatedAssets[i].amount += growthAmount;
    growthHistory.push({ assetId: updatedAssets[i].id, amount: growthAmount });
  }

  // Passive income scaled by fraction
  for (let i = 0; i < updatedAssets.length; i++) {
    const asset = updatedAssets[i];
    if (!asset.yieldRate) continue;

    const fromAsset = asset.id;
    const passiveIncomeValue = asset.amount * asset.yieldRate * fractionOfYear;

    for (const sp of surplusPriority) {
      const index = updatedAssets.findIndex((a) => a.id === sp.assetId);
      if (index === -1) continue;

      updatedAssets[index] = {
        ...updatedAssets[index],
        amount: updatedAssets[index].amount + passiveIncomeValue,
      };
      passiveIncomesHistory.push({
        fromAssetId: fromAsset,
        toAssetId: updatedAssets[index].id,
        amount: passiveIncomeValue,
      });

      break;
    }
  }

  //  Surplus
  if (remainingCashFlow > 0) {
    for (const sp of surplusPriority) {
      const index = updatedAssets.findIndex((a) => a.id === sp.assetId);
      if (index === -1) continue;

      updatedAssets[index] = {
        ...updatedAssets[index],
        amount: updatedAssets[index].amount + remainingCashFlow,
      };

      surplusesHistory.push({
        assetId: updatedAssets[index].id,
        amount: remainingCashFlow,
      });

      remainingCashFlow = 0;
      break;
    }
  }

  //  Deficit
  if (remainingCashFlow < 0) {
    let deficit = Math.abs(remainingCashFlow);
    for (const dp of deficitPriority) {
      const index = updatedAssets.findIndex((a) => a.id === dp.assetId);
      if (index === -1 || deficit <= 0) continue;

      const deduction = Math.min(deficit, updatedAssets[index].amount);
      updatedAssets[index] = {
        ...updatedAssets[index],
        amount: updatedAssets[index].amount - deduction,
      };

      withdrawalsHistory.push({
        assetId: updatedAssets[index].id,
        amount: deduction,
      });

      deficit -= deduction;
    }

    remainingCashFlow = -deficit;
  }

  return {
    updatedAssets,
    updatedLiabilities,
    liabilityPaymentsHistory,
    passiveIncomesHistory,
    contributionsHistory,
    withdrawalsHistory,
    netCashflow,
    surplusesHistory,
    growthHistory,
    remainingCashFlow,
    activeIncomes,
    activeExpenses,
  };
}
