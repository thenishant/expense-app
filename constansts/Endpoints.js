export const apiEndpoints = {
    transactionsInAMonth: 'expense/transactions',
    monthlyExpense: 'expense/monthlyExpense',
    allCategories: 'category/getAllCategories',
    createExpense: 'expense/create',
    createCategory: 'category/new',
    categoryTransactions: 'expense/categoryTransactions',
    monthlyTransactions: 'expense/getMonthlyTransactions',
    createBudget: 'budget/create',
    allBudget: 'budget/allBudget'
};

export function buildUrl(apiEndpoint) {
    return `${process.env.EXPO_PUBLIC_EXPRESS_URL}${apiEndpoint}`
}

