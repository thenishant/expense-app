import axios from "axios";
import {apiEndpoints, buildUrl} from "../constansts/Endpoints";

const EXPRESS_URL = process.env.EXPO_PUBLIC_EXPRESS_URL;

export async function createExpense(expenseData) {


    const response = await axios.post(EXPRESS_URL + "expense/create", expenseData);
    return response.data.name
}

export async function getTransactionsResponse(month, year) {
    const response = await axios.get(EXPRESS_URL + `expense/transactions?month=${month}&year=${year}`);
    return response.data;
}

export async function getTransactionsPaymentMode() {
    const response = await axios.get(EXPRESS_URL + `expense/transactions?month=${month}&year=${year}`);
    let data = response.data['transactions'];
}

export async function updateExpense(id, expenseData) {
    const data = {
        type: expenseData.type,
        category: expenseData.category,
        amount: expenseData.amount,
        desc: expenseData.desc,
        paymentMode: expenseData.paymentMode,
        date: expenseData.date
    }
    return await axios.patch(EXPRESS_URL + `expense/update`, data, {headers: {"id": id}})
}

export async function deleteExpense(id) {
    return await axios.delete(EXPRESS_URL + `expense/${id}`, {headers: {"id": id}});
}

export async function getCategoryTransactionResponse(month, year) {
    const response = await axios.get(buildUrl(`${apiEndpoints.categoryTransactions}?month=${month}&year=${year}`));
    return response.data;
}

export async function getSummary() {
    const response = await axios.get(buildUrl(apiEndpoints.summary))
    return response.data;
}
