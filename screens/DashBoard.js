import React, {useContext, useEffect, useState} from "react";
import {ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import MonthYearHeader from "../components/UI/HeaderWithArrow";
import ExpensePerMonthChart from "./sections/dashboard/ExpensePerMonthChart";
import {getBudgetForMonth, getCategoryTransactionResponse, getSummary, getTransactionsResponse,} from "../util/http";
import {ExpensesContext} from "../store/expenses-context";
import {CategoryContext} from "../store/category-context";
import {BudgetContext} from "../store/budget-context";
import {getMonth, getYear} from "../util/Date";
import IncomeVsExpenseChart from "./sections/dashboard/IncomeVsExpenseChart";
import PaymentModePerMonth from "./sections/dashboard/PaymentMode";
import CardSection from "./sections/dashboard/CardSection";
import {SummaryContext} from "../store/summary-context";
import BankBalance from "./sections/dashboard/BankBalance";
import {GlobalStyles} from "../constansts/styles";

function DashBoard() {
    const [refreshing, setRefreshing] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isFetching, setIsFetching] = useState(true);
    const expensesContext = useContext(ExpensesContext);
    const categoryContext = useContext(CategoryContext);
    const budgetContext = useContext(BudgetContext);
    const summaryContext = useContext(SummaryContext);

    useEffect(() => {
        const month = getMonth(selectedDate);
        const year = getYear(selectedDate);

        const fetchData = async () => {
            setIsFetching(true);

            try {
                const [expensesResponse, categoryResponse, budgetResponse, summaryResponse,] = await Promise.all([getTransactionsResponse(month, year), getCategoryTransactionResponse(month, year), getBudgetForMonth(month, year), getSummary(year),]);

                expensesContext.setExpenses(expensesResponse || []);
                categoryContext.setCategory(categoryResponse || []);
                summaryContext.setSummary(summaryResponse || []);

                const calculateSpentVsBudget = (budget, spent) => {
                    if (!budget || !Array.isArray(budget)) return [];

                    return budget.map((budgetItem) => {
                        const spentItem = spent?.find((item) => item.category === budgetItem.category);
                        const spentAmount = spentItem ? spentItem.amount : 0;
                        const spentPercentage = spentAmount > 0 ? ((spentAmount / budgetItem.amount) * 100).toFixed(2) + "%" : "0%";
                        return {
                            category: budgetItem.category,
                            budgetedAmount: budgetItem.amount,
                            spentAmount,
                            remainingAmount: budgetItem.amount - spentAmount,
                            spentPercentage,
                            month: budgetItem.month,
                            year: budgetItem.year,
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
    }, [selectedDate]);

    const onRefresh = () => {
        setRefreshing(true);
        setRefreshing(false);
    };

    const handleMonthChange = (newDate) => {
        setSelectedDate(newDate);
        expensesContext.setExpenses([]);
        categoryContext.setCategory([]);
        budgetContext.setBudgets([]);
        summaryContext.setSummary([]);
    };

    const renderContent = () => {
        if (isFetching) {
            return (<View style={styles.centered}>
                <ActivityIndicator size="large" color={GlobalStyles.colors.black50}/>
                <Text style={styles.loadingText}>Loading data...</Text>
            </View>);
        }

        return (<>
            <BankBalance/>
            <CardSection selectedMonth={selectedDate}/>
            {expensesContext.expenses.length === 0 ? (<View style={styles.centered}>
                <Text style={styles.noDataText}>No data available for this month</Text>
            </View>) : (<ExpensePerMonthChart selectedMonth={selectedDate}/>)}
            <IncomeVsExpenseChart/>
            <PaymentModePerMonth
                selectedMonth={selectedDate}
                selectedYear={selectedDate}
            />
        </>);
    };

    return (<ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
    >
        <MonthYearHeader onChange={handleMonthChange}/>
        {renderContent()}
    </ScrollView>);
}

export default DashBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#eef4f8",
    }, centered: {
        padding: 30, alignItems: "center", justifyContent: "center",
    }, loadingText: {
        marginTop: 10, fontSize: 16, color: "#666",
    }, noDataText: {
        fontSize: 16, color: "#666",
    },
});
