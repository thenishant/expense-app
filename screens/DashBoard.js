import React, {useContext, useEffect, useState} from "react";
import {RefreshControl, ScrollView, StyleSheet} from "react-native";
import MonthYearHeader from "../components/UI/HeaderWithArrow";
import ExpensePerMonthChart from "./sections/dashboard/ExpensePerMonthChart";
import {getBudgetForMonth, getCategoryTransactionResponse, getSummary, getTransactionsResponse} from "../util/http";
import {ExpensesContext} from "../store/expenses-context";
import {CategoryContext} from "../store/category-context";
import {BudgetContext} from "../store/budget-context";
import {getMonth, getYear} from "../util/Date";
import IncomeVsExpenseChart from "./sections/dashboard/IncomeVsExpenseChart";
import PaymentModePerMonth from "./sections/dashboard/PaymentMode";
import CardSection from "./sections/dashboard/CardSection";
import {SummaryContext} from "../store/summary-context";
import BankBalance from "./sections/dashboard/BankBalance";

function DashBoard() {
    const [refreshing, setRefreshing] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState(new Date());
    const [isFetching, setIsFetching] = useState(true)
    const expensesContext = useContext(ExpensesContext);
    const categoryContext = useContext(CategoryContext);
    const budgetContext = useContext(BudgetContext);
    const investmentContext = useContext(SummaryContext);

    useEffect(() => {
        const month = getMonth(selectedMonth);
        const year = getYear(selectedYear);

        const fetchData = async () => {
            setIsFetching(true);
            const hasPlans = (context) => context.plans && context.plans.length > 0;

            if (hasPlans(expensesContext) && hasPlans(categoryContext) && hasPlans(budgetContext) && hasPlans(investmentContext)) {
                return;
            }

            try {
                const [expensesResponse, categoryResponse, budgetResponse, summaryResponse] = await Promise.all([getTransactionsResponse(month, year), getCategoryTransactionResponse(month, year), getBudgetForMonth(month, year), getSummary(year)])

                expensesContext.setExpenses(expensesResponse);
                categoryContext.setCategory(categoryResponse);
                investmentContext.setSummary(summaryResponse)

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
        <BankBalance/>
        <CardSection selectedMonth={selectedMonth}/>
        <ExpensePerMonthChart selectedMonth={selectedMonth}/>
        <IncomeVsExpenseChart/>
        <PaymentModePerMonth selectedMonth={selectedMonth} selectedYear={selectedYear}/>
    </ScrollView>);
}

export default DashBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#eef4f8'
    }
});
