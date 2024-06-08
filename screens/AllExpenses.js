import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";

function AllExpenses() {
    const expensesContext = useContext(ExpensesContext);
    return (<>
        <ExpensesOutput expenses={expensesContext.expenses}
                        expensesPeriod={"Total"} fallbackText={"No Expenses found!!"}/>
    </>)
}

export default AllExpenses
