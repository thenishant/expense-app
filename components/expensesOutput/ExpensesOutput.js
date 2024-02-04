import {StyleSheet, View} from "react-native";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";
import {GlobalStyles} from "../../constansts/styles";


function ExpensesOutput({expenses, expensesPeriod}) {
    return (
        <View style={styles.container}>
            <ExpenseSummary expenses={expenses} periodName={expensesPeriod}/>
            <ExpenseList expenses={expenses}/>
        </View>
    )
}

export default ExpensesOutput

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary100,
        flex: 1
    }
});