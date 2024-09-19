import axios from "axios";
import moment from "moment";

const EXPRESS_URL = process.env.EXPO_PUBLIC_EXPRESS_URL;

export async function createExpense(expenseData) {
    const response = await axios.post(EXPRESS_URL + "expense/create", expenseData);
    return response.data.name
}

export async function fetchExpense() {
    const month = moment().format('MMM');
    const year = moment().format('YYYY');
    const response = await axios.get(EXPRESS_URL + `expense/transactions?month=${month}&year=${year}`);

    return (response.data['expenses'] || []).concat(response.data['investments'] || []).concat(response.data['incomes'] || [])
        .map(key => ({
            id: key._id,
            amount: key.amount,
            category: key.category,
            date: key.date,
            desc: key.desc,
            type: key.type,
            paymentMode: key.paymentMode
        }))
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