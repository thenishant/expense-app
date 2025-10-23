export const apiEndpoints = {
    transactionsInAMonth: 'expense/transactions',
    summary: 'expense/summary',
    createExpense: 'expense/create',
    categoryTransactions: 'expense/categoryTransactions',
    monthlyTransactions: 'expense/getMonthlyTransactions',
    createBudget: 'budget/create',
    allBudget: 'budget/budgets',
    createInvestmentPlan: 'investment/create-plan',
    allInvestmentPlans: 'investment/get-investments',

    //Category
    createCategory: 'category/create',
    getCategories: 'category/categories',
};

export function buildUrl(apiEndpoint) {
    return `${process.env.EXPO_PUBLIC_EXPRESS_URL}${apiEndpoint}`
}
