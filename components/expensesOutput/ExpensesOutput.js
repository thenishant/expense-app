import {View} from "react-native";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";

function ExpensesOutput({expenses}) {
    return (
        <View>
            <ExpenseSummary/>
            <ExpenseList/>
        </View>
    )
}

export default ExpensesOutput