import {StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constansts/styles";

function BudgetSummary({budgets, periodName}) {

    const budgetArray = typeof budgets === 'number' ? [{amount: budgets}] : budgets;

    const budgetSpentSum = Array.isArray(budgetArray) ? budgetArray
        .reduce((sum, budget) => sum + budget.spentAmount, 0) : 0;

    const budgetAllocatedSum = Array.isArray(budgetArray) ? budgetArray
        .reduce((sum, budget) => sum + budget.budgetedAmount, 0) : 0;

    const totalSpentPercentage = budgetAllocatedSum > 0 ? (budgetSpentSum / budgetAllocatedSum) * 100 : 0;

    return (<View style={styles.container}>
        <Text style={styles.period}>Spent {totalSpentPercentage.toFixed(1)}%
            of {GlobalStyles.characters.rupee}{budgetAllocatedSum.toFixed(0)}: {GlobalStyles.characters.rupee}{budgetSpentSum.toFixed(0)}</Text>
    </View>)
}

export default BudgetSummary

const styles = StyleSheet.create({
    container: {
        padding: 8, backgroundColor: GlobalStyles.colors.primary50, borderRadius: 6, flexDirection: "row", // justifyContent: "space-between",
        alignItems: "center"
    }, period: {
        fontSize: 16, fontWeight: "bold", color: GlobalStyles.colors.black50
    }, sum: {
        fontWeight: "bold", fontSize: 16, color: GlobalStyles.colors.black50
    }
});