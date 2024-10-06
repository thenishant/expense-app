import React, {useContext, useEffect, useState} from "react";
import {RefreshControl, ScrollView, StyleSheet} from "react-native";
import MonthYearHeader from "../components/UI/HeaderWithArrow";
import ExpensePerMonthChart from "./sections/ExpensePerMonthChart";
import {getCategoryTransactionResponse, getTransactionsResponse} from "../util/http";
import {ExpensesContext} from "../store/expenses-context";
import {CategoryContext} from "../store/category-context";
import {getMonth, getYear} from "../util/Date";
import IncomeVsExpenseChart from "./sections/IncomeVsExpenseChart";
import PaymentModePerMonth from "./sections/PaymentMode";
import CardSection from "./sections/CardSection";

function DashBoard() {
    const [refreshing, setRefreshing] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState(new Date());
    const [isFetching, setIsFetching] = useState(true)
    const expensesContext = useContext(ExpensesContext);
    const categoryContext = useContext(CategoryContext);

    useEffect(() => {
        const month = getMonth(selectedMonth);
        const year = getYear(selectedYear);

        async function getExpenses() {
            setIsFetching(true);
            const response = await getTransactionsResponse(month, year);
            expensesContext.setExpenses(response)
            setIsFetching(false);
        }

        const expenseCategoryHandler = async () => {
            setIsFetching(true);
            const response = await getCategoryTransactionResponse(month, year);
            categoryContext.setCategory(response);
            setIsFetching(false);
        }
        getExpenses();
        expenseCategoryHandler();
    }, [selectedMonth, selectedYear]);

    const onRefresh = () => {
        setRefreshing(true);
        setRefreshing(false);
    };

    const handleMonthChange = (newDate) => {
        setSelectedMonth(newDate);
        setSelectedYear(newDate);
    };

    return (<ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <MonthYearHeader onChange={handleMonthChange}/>
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
