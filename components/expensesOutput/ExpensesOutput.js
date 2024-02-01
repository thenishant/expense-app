import {View} from "react-native";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";

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
        <View>
            <ExpenseSummary expenses={dummyExpense} periodName={expensesPeriod}/>
            <ExpenseList/>
        </View>
    )
}

export default ExpensesOutput