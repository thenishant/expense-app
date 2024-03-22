import {StyleSheet, Text, View} from "react-native";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";
import {GlobalStyles} from "../../constansts/styles";


function ExpensesOutput({expenses, expensesPeriod, fallbackText}) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if (expenses.length > 0)
        content = <ExpenseList expenses={expenses}/>


    return (
        <View style={styles.container}>
            <ExpenseSummary expenses={expenses} periodName={expensesPeriod}/>
            {content}
        </View>
    )
}

export default ExpensesOutput

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#eef4f8',
        flex: 1
    },
    infoText: {
        color: 'black',
        fontSize: 16,
        textAlign: "center",
        marginTop: 16
    }
});