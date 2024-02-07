import {useContext, useEffect, useState} from "react";
import {getDateMinusDays} from "../util/Date";
import {ExpensesContext} from "../store/expenses-context";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import {fetchExpense} from "../util/http";

function RecentExpenses() {
    const expensesContext = useContext(ExpensesContext);

    useEffect(() => {
        async function getExpenses() {
            const expenses = await fetchExpense();
            expensesContext.setExpenses(expenses)
        }

        getExpenses()
    }, [])

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (expense.date >= date7DaysAgo) && (expense.date <= today)
    })

    return (<ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 Days"}
                            fallbackText={"No Expenses registered for last 7 days"}/>)
}

export default RecentExpenses