import axios from "axios";

const firebaseBackendURL = process.env.EXPO_PUBLIC_FIREBASE_BACKEND_URL;
const EXPRESS_URL = process.env.EXPO_PUBLIC_EXPRESS_URL;

export async function createExpense(expenseData) {
    const response = await axios.post(EXPRESS_URL + "/api/expense/create", expenseData);
    return response.data.name
}

export async function fetchExpense() {
    const response = await axios.get(EXPRESS_URL + "/api/expense/getAllTransactionsForAMonth?month=Mar");

    const expenses = []
    for (const key of response.data['allExpenses']) {
        const expenseObject = {
            id: key._id,
            amount: key.amount,
            category: key.category,
            date: key.date,
            desc: key.desc,
            type: key.type,
            paymentMode: key.paymentMode
        }
        expenses.push(expenseObject)
    }
    return expenses
}

export async function updateExpense(id, expenseData) {
    const data = {
        type: expenseData.type, category: expenseData.category, amount: expenseData.amount, desc: expenseData.desc, paymentMode: expenseData.paymentMode
    }
    console.log(id)
    console.log(data)
    const axiosResponse = await axios.put(EXPRESS_URL + `/api/expense/update`, data, {headers: {id: id}});

    console.log(axiosResponse.data)

    return axiosResponse
}

export async function deleteExpense(id) {
    return await axios.delete(EXPRESS_URL + `/api/expense/${id}`, {headers: {id: id}});
}