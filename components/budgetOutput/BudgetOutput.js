import {StyleSheet, Text, View} from "react-native";
import BudgetList from "./BudgetList";
import BudgetSummary from "./BudgetSummary";


function BudgetOutput({budgets, expensesPeriod, fallbackText}) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if (budgets.length > 0)
        content = <BudgetList budgets={budgets}/>

    return (
        <View style={styles.container}>
            {/*<BudgetSummary expenses={budget} periodName={expensesPeriod}/>*/}
            {content}
        </View>
    )
}

export default BudgetOutput

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