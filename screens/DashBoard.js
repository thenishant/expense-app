import React, {useContext, useEffect, useState} from "react";
import {RefreshControl, ScrollView, StyleSheet} from "react-native";
import CardSection from "./sections/CardSection";
import MonthYearHeader from "../components/UI/HeaderWithArrow";
import ExpensePerMonthChart from "./sections/ExpensePerMonthChart";
import IncomeVsExpenseChart from "./sections/IncomeVsExpenseChart";
import PaymentModePerMonth from "./sections/PaymentMode";
import {fetchExpense} from "../util/http";
import {ExpensesContext} from "../store/expenses-context";
import {CategoryContext} from "../store/category-context";
import {apiEndpoints, buildUrl} from "../constansts/Endpoints";
import axios from "axios";
import {getMonth} from "../util/Date";

function DashBoard() {
    const [refreshing, setRefreshing] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState('')
    const expensesContext = useContext(ExpensesContext);
    const categoryContext = useContext(CategoryContext);

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            let expenses;
            try {
                expenses = await fetchExpense();
                expensesContext.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch expenses!!');
            }
            setIsFetching(false);
        }

        getExpenses();
    }, []);

    useEffect(() => {
        const month = getMonth(selectedMonth);
        const expenseCategoryHandler = async () => {
            setIsFetching(true);
            let expensesByCategory = [];
            try {
                const response = await axios.get(buildUrl(`${apiEndpoints.transactionsInAMonth}?month=${month}`));
                const allExpensesResponse = response.data.allExpenses;
                const totalExpenseSum = allExpensesResponse.reduce((total, expense) => total + expense.amount, 0);
                expensesByCategory = Object.entries(allExpensesResponse.reduce((acc, expense) => {
                    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                    return acc;
                }, {})).map(([category, amount]) => ({
                    category, amount, percent: ((amount / totalExpenseSum) * 100).toFixed(1)
                }));
                categoryContext.setCategory(expensesByCategory);
            } catch (error) {
                setError(`Error fetching expense data for ${month}`);
                console.error(error);
            }
            setIsFetching(false);
        }
        expenseCategoryHandler();
    }, [selectedMonth, categoryContext]);

    const onRefresh = () => {
        setRefreshing(true);
        setRefreshing(false);
    };

    const handleMonthChange = (newDate) => {
        setSelectedMonth(newDate);
    };

    return (<ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <MonthYearHeader onMonthChange={handleMonthChange}/>
        <CardSection selectedMonth={selectedMonth}/>
        <ExpensePerMonthChart selectedMonth={selectedMonth}/>
        <IncomeVsExpenseChart/>
        <PaymentModePerMonth refreshing={refreshing} selectedMonth={selectedMonth}/>
    </ScrollView>);
}

export default DashBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#eef4f8'
    }
});
