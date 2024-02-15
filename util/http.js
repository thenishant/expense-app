import axios from "axios";

const firebaseBackendURL = process.env.EXPO_PUBLIC_FIREBASE_BACKEND_URL;

export async function storeExpense(expenseData) {
    const response = await axios.post(firebaseBackendURL + "/expenses.json", expenseData);
    return response.data.name
}

export async function fetchExpense() {
    const response = await axios.get(firebaseBackendURL + "/expenses.json");

    const expenses = []
    for (const key in response.data) {
        const expenseObject = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            desc: response.data[key].desc,
            type: response.data[key].type,
            category: response.data[key].category,
            paymentMode: response.data[key].paymentMode
        }
        expenses.push(expenseObject)
    }
    return expenses
}

export async function updateExpense(id, expenseData) {
    return await axios.put(firebaseBackendURL + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
    return await axios.delete(firebaseBackendURL + `/expenses/${id}.json`);
}