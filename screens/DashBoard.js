import React, {useContext, useEffect, useState} from "react";
import {ScrollView, StyleSheet, RefreshControl} from "react-native";
import CardSection from "./sections/CardSection";
import MonthYearHeader from "../components/UI/HeaderWithArrow";
import ExpensePerMonthChart from "./sections/ExpensePerMonthChart";
import IncomeVsExpenseChart from "./sections/IncomeVsExpenseChart";
import PaymentModePerMonth from "./sections/PaymentMode";
import {fetchExpense} from "../util/http";
import expensesContext, {ExpensesContext} from "../store/expenses-context";

function DashBoard() {
    const [refreshing, setRefreshing] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState('')
    const expensesContext = useContext(ExpensesContext);

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true)
            let expenses;
            try {
                expenses = await fetchExpense();
            } catch (error) {
                setError('Could not fetch expenses!!')
            }
            setIsFetching(false)
            expensesContext.setExpenses(expenses)
        }

        getExpenses()
    }, [])

    const onRefresh = () => {
        setRefreshing(true);
        setRefreshing(false);
    };

    const handleMonthChange = (newDate) => {
        setSelectedMonth(newDate); // Update selected month state
    };

    return (<ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
    >
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
