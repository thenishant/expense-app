import React, {useContext, useEffect, useState} from "react";
import {RefreshControl, ScrollView, StyleSheet} from "react-native";
import MonthYearHeader from "../components/UI/HeaderWithArrow";
import ExpensePerMonthChart from "./sections/ExpensePerMonthChart";
import {getBudgetForMonth, getCategoryTransactionResponse, getTransactionsResponse} from "../util/http";
import {ExpensesContext} from "../store/expenses-context";
import {CategoryContext} from "../store/category-context";
import {BudgetContext} from "../store/budget-context";
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
    const budgetContext = useContext(BudgetContext);

    useEffect(() => {
        const month = getMonth(selectedMonth);
        const year = getYear(selectedYear);

        const fetchData = async () => {
            setIsFetching(true);

            try {
                const [expensesResponse, categoryResponse, budgetResponse] = await Promise.all([getTransactionsResponse(month, year), getCategoryTransactionResponse(month, year), getBudgetForMonth(month, year)]);
                expensesContext.setExpenses(expensesResponse);
                categoryContext.setCategory(categoryResponse);

                const calculateSpentVsBudget = (budget, spent) => {
                    return budget.map((budgetItem) => {
                        const spentItem = spent.find((item) => item.category === budgetItem.category);
                        const spentAmount = spentItem ? spentItem.amount : 0;
                        const spentPercentage = spentAmount > 0 ? ((spentAmount / budgetItem.amount) * 100).toFixed(2) + "%" : "0%";
                        return {
                            category: budgetItem.category,
                            budgetedAmount: budgetItem.amount,
                            spentAmount,
                            remainingAmount: budgetItem.amount - spentAmount,
                            spentPercentage,
                            month: budgetItem.month,
                            year: budgetItem.year
                        };
                    });
                };

                const budgetWithSpent = calculateSpentVsBudget(budgetResponse, categoryResponse);
                budgetContext.setBudgets(budgetWithSpent);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
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
