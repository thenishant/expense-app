import {StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constansts/styles";

function BudgetSummary({expenses, periodName}) {

    const expenseArray = typeof expenses === 'number' ? [{amount: expenses}] : expenses;

    const expenseSum = Array.isArray(expenseArray)
        ? expenseArray
            .filter(expense => expense.type === 'Expense')
            .reduce((sum, expense) => sum + expense.amount, 0)
        : 0;


    return (<View style={styles.container}>
        <Text style={styles.period}>{periodName}</Text>
        <Text style={styles.sum}>{GlobalStyles.characters.rupee}{expenseSum.toFixed(0)}</Text>
    </View>)
}

export default BudgetSummary

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }, period: {
        fontSize: 16, fontWeight: "bold", color: GlobalStyles.colors.black50
    }, sum: {
        fontWeight: "bold", fontSize: 16, color: GlobalStyles.colors.black50
    }
});