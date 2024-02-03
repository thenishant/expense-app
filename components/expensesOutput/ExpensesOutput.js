import {StyleSheet, View} from "react-native";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";
import {GlobalStyles} from "../../constansts/styles";

const dummyExpense = [{
    id: 'e1',
    desc: 'Shoes',
    amount: 1200,
    date: new Date('2024-01-20')
}, {
    id: 'e2',
    desc: 'Book',
    amount: 614,
    date: new Date('2024-01-22')
}, {
    id: 'e3',
    desc: 'Loan',
    amount: 12000,
    date: new Date('2024-01-29')
}, {
    id: 'e4',
    desc: 'Bag',
    amount: 1000,
    date: new Date('2024-01-30')
}]

function ExpensesOutput({expenses, expensesPeriod}) {
    return (
        <View style={styles.container}>
            <ExpenseSummary expenses={dummyExpense} periodName={expensesPeriod}/>
            <ExpenseList expenses={dummyExpense}/>
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