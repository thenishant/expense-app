import {useContext} from "react";
import {getDateMinusDays} from "../util/Date";
import {ExpensesContext} from "../store/expenses-context";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";

function RecentExpenses() {
    const expensesContext = useContext(ExpensesContext);

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo
    })

    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 Days"}/>
    )
}

export default RecentExpenses