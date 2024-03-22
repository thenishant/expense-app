import {StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constansts/styles";

function ExpenseSummary({expenses, periodName}) {

    const expenseSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0)

    return (
        <View style={styles.container}>
            <Text style={styles.period}> {periodName}</Text>
            <Text style={styles.sum}>{expenseSum.toFixed(2)}</Text>
        </View>
    )
}

export default ExpenseSummary

const styles = StyleSheet.create({
        container: {
            padding: 8,
            backgroundColor: GlobalStyles.colors.primary100,
            borderRadius: 6,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        period: {
            fontSize: 12,
            fontWeight: "bold",
            color: GlobalStyles.colors.black700
        }, sum: {
            fontWeight: "bold",
            fontSize: 16,
            color: GlobalStyles.colors.black700
        }
    })
;