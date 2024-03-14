export const apiEndpoints = {
    transactionsInAMonth: '/expense/getAllTransactionsForAMonth',
    monthlyExpense: '/expense/monthlyExpense',
    allCategories: '/category/getAllCategories',
    createExpense: '/expense/create',
    createCategory: '/category/new',
    paymentMode: '/expense/getPaymentModeForExpenseForAMonth',
    monthlyTransactions: '/expense/getMonthlyTransactions',
};

export function buildUrl(apiEndpoint) {
    return `${process.env.EXPO_PUBLIC_EXPRESS_URL}${apiEndpoint}`
}

