import axios from "axios";

export async function storeExpense(expenseData) {
    await axios.post(process.env.EXPO_PUBLIC_FIREBASE_BACKEND_URL + "/expenses.json", expenseData)
}

export async function fetchExpense() {
    const response = await axios.get(process.env.EXPO_PUBLIC_FIREBASE_BACKEND_URL + "/expenses.json");

    const expenses = []
    for (const key in response.data) {
        const expenseObject = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            desc: response.data[key].desc,
        }
        expenses.push(expenseObject)
    }
    return expenses
}