export const apiEndpoints = {
    transactionsInAMonth: 'expense/transactions',
    summary: 'expense/summary',
    allCategories: 'category/getAllCategories',
    createExpense: 'expense/create',
    createCategory: 'category/new',
    categoryTransactions: 'expense/categoryTransactions',
    monthlyTransactions: 'expense/getMonthlyTransactions',
    createBudget: 'budget/create',
    allBudget: 'budget/budgets',
    createInvestmentPlan: 'investment/plan',
};

export function buildUrl(apiEndpoint) {
    return `${process.env.EXPO_PUBLIC_EXPRESS_URL}${apiEndpoint}`
}

