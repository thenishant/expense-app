import {useContext, useEffect, useState} from "react";
import {getDateMinusDays} from "../util/Date";
import {ExpensesContext} from "../store/expenses-context";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import {fetchExpense} from "../util/http";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import moment from "moment";
import LoadingOverlay from "../components/UI/LoadingOverlay.js";

function RecentExpenses() {
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

    if (isFetching) return <LoadingOverlay/>

    if (!isFetching && error) return <ErrorOverlay message={error}/>

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        const expenseDate = moment(expense.date).toDate();

        return (expenseDate >= date7DaysAgo) && (expenseDate <= today)
    })

    return (<ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 Days"}
                            fallbackText={"No Expenses registered for last 7 days"}
    />)

}

export default RecentExpenses