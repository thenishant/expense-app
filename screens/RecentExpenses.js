import {Text} from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";

function RecentExpenses() {
    return (
        <ExpensesOutput expensesPeriod={"Last 7 Days"}/>
    )
}

export default RecentExpenses